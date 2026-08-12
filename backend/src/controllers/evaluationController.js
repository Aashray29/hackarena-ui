const pool = require("../config/db");


// ============================================
// CREATE EVALUATION
// ============================================

const createEvaluation = async (req, res) => {
    try {
        const {
            assignment_id,
            innovation_score,
            technical_score,
            presentation_score,
            impact_score,
            feedback
        } = req.body;

        const judgeId = req.user.userId;

        // Validate required fields
        if (
            !assignment_id ||
            innovation_score === undefined ||
            technical_score === undefined ||
            presentation_score === undefined ||
            impact_score === undefined
        ) {
            return res.status(400).json({
                success: false,
                message: "Assignment ID and all scores are required"
            });
        }

        // Validate scores
        const scores = [
            innovation_score,
            technical_score,
            presentation_score,
            impact_score
        ];

        for (const score of scores) {
            if (
                typeof score !== "number" ||
                score < 0 ||
                score > 25
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Each score must be between 0 and 25"
                });
            }
        }

        // Check assignment belongs to this judge
        const [assignments] = await pool.query(
            `SELECT
                assignment_id,
                judge_id,
                submission_id
             FROM judge_assignments
             WHERE assignment_id = ?
             AND judge_id = ?`,
            [assignment_id, judgeId]
        );

        if (assignments.length === 0) {
            return res.status(403).json({
                success: false,
                message: "You are not assigned to this submission"
            });
        }

        // Check if already evaluated
        const [existing] = await pool.query(
            `SELECT evaluation_id
             FROM evaluations
             WHERE assignment_id = ?`,
            [assignment_id]
        );

        if (existing.length > 0) {
            return res.status(409).json({
                success: false,
                message: "This submission has already been evaluated"
            });
        }

        // Create evaluation
        const [result] = await pool.query(
            `INSERT INTO evaluations
            (
                assignment_id,
                innovation_score,
                technical_score,
                presentation_score,
                impact_score,
                feedback
            )
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                assignment_id,
                innovation_score,
                technical_score,
                presentation_score,
                impact_score,
                feedback || null
            ]
        );

        res.status(201).json({
            success: true,
            message: "Evaluation submitted successfully",
            data: {
                evaluation_id: result.insertId,
                assignment_id: Number(assignment_id),
                innovation_score,
                technical_score,
                presentation_score,
                impact_score
            }
        });

    } catch (error) {
        console.error("Create evaluation error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to submit evaluation"
        });
    }
};
// ============================================
// GET EVALUATION BY ID
// ============================================

const getEvaluationById = async (req, res) => {
    try {
        const { id } = req.params;

        const [evaluations] = await pool.query(
            `SELECT
                e.evaluation_id,
                e.assignment_id,

                e.innovation_score,
                e.technical_score,
                e.presentation_score,
                e.impact_score,
                e.total_score,
                e.feedback,
                e.evaluated_at,

                ja.judge_id,
                u.name AS judge_name,
                u.email AS judge_email,

                ja.submission_id,
                s.project_name,
                s.team_id,

                t.team_name

             FROM evaluations e

             JOIN judge_assignments ja
                ON e.assignment_id = ja.assignment_id

             JOIN users u
                ON ja.judge_id = u.user_id

             JOIN submissions s
                ON ja.submission_id = s.submission_id

             JOIN teams t
                ON s.team_id = t.team_id

             WHERE e.evaluation_id = ?`,
            [id]
        );

        if (evaluations.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Evaluation not found"
            });
        }

        res.status(200).json({
            success: true,
            data: evaluations[0]
        });

    } catch (error) {
        console.error("Get evaluation error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch evaluation"
        });
    }
};
// ============================================
// GET HACKATHON LEADERBOARD
// ============================================

const getLeaderboard = async (req, res) => {
    try {
        const { id } = req.params;

        // Check hackathon exists
        const [hackathons] = await pool.query(
            `SELECT hackathon_id, name
             FROM hackathons
             WHERE hackathon_id = ?`,
            [id]
        );

        if (hackathons.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Hackathon not found"
            });
        }

        // Get leaderboard
        const [leaderboard] = await pool.query(
            `SELECT
                t.team_id,
                t.team_name,

                s.submission_id,
                s.project_name,

                COUNT(e.evaluation_id) AS evaluation_count,

                ROUND(AVG(e.total_score), 2) AS average_score,

                ROUND(AVG(e.innovation_score), 2) AS average_innovation,
                ROUND(AVG(e.technical_score), 2) AS average_technical,
                ROUND(AVG(e.presentation_score), 2) AS average_presentation,
                ROUND(AVG(e.impact_score), 2) AS average_impact

             FROM teams t

             JOIN submissions s
                ON t.team_id = s.team_id

             JOIN judge_assignments ja
                ON s.submission_id = ja.submission_id

             JOIN evaluations e
                ON ja.assignment_id = e.assignment_id

             WHERE t.hackathon_id = ?

             GROUP BY
                t.team_id,
                t.team_name,
                s.submission_id,
                s.project_name

             ORDER BY average_score DESC`,
            [id]
        );

        // Add rank
        const rankedLeaderboard = leaderboard.map((team, index) => ({
            rank: index + 1,
            ...team
        }));

        res.status(200).json({
            success: true,
            data: {
                hackathon_id: hackathons[0].hackathon_id,
                hackathon_name: hackathons[0].name,
                leaderboard: rankedLeaderboard
            }
        });

    } catch (error) {
        console.error("Leaderboard error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch leaderboard"
        });
    }
};

// ============================================
// GET ALL EVALUATIONS
// ============================================

const getAllEvaluations = async (req, res) => {
    try {
        const [evaluations] = await pool.query(
            `SELECT
                e.evaluation_id,
                e.assignment_id,
                e.innovation_score,
                e.technical_score,
                e.presentation_score,
                e.impact_score,
                e.total_score,
                e.feedback,
                e.evaluated_at,
                ja.judge_id,
                u.name AS judge_name,
                ja.submission_id,
                s.project_name,
                s.team_id,
                t.team_name,
                h.hackathon_id,
                h.name AS hackathon_name
             FROM evaluations e
             JOIN judge_assignments ja ON e.assignment_id = ja.assignment_id
             JOIN users u ON ja.judge_id = u.user_id
             JOIN submissions s ON ja.submission_id = s.submission_id
             JOIN teams t ON s.team_id = t.team_id
             JOIN hackathons h ON t.hackathon_id = h.hackathon_id
             ORDER BY e.evaluated_at DESC`
        );

        res.status(200).json({
            success: true,
            count: evaluations.length,
            data: evaluations
        });

    } catch (error) {
        console.error("Get all evaluations error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch evaluations"
        });
    }
};

// ============================================
// GET MY RESULTS (PARTICIPANT)
// ============================================

const getMyResults = async (req, res) => {
    try {
        const userId = req.user.userId;

        const [evaluations] = await pool.query(
            `SELECT
                e.evaluation_id,
                e.innovation_score,
                e.technical_score,
                e.presentation_score,
                e.impact_score,
                e.total_score,
                e.feedback,
                e.evaluated_at,
                u.name AS judge_name,
                s.project_name,
                s.submission_id,
                t.team_name,
                h.name AS hackathon_name
             FROM evaluations e
             JOIN judge_assignments ja ON e.assignment_id = ja.assignment_id
             JOIN users u ON ja.judge_id = u.user_id
             JOIN submissions s ON ja.submission_id = s.submission_id
             JOIN teams t ON s.team_id = t.team_id
             JOIN hackathons h ON t.hackathon_id = h.hackathon_id
             JOIN team_members tm ON tm.team_id = t.team_id
             WHERE tm.user_id = ?
             ORDER BY e.evaluated_at DESC`,
            [userId]
        );

        res.status(200).json({
            success: true,
            count: evaluations.length,
            data: evaluations
        });

    } catch (error) {
        console.error("Get my results error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch results"
        });
    }
};

// ============================================
// GET COMBINED LEADERBOARD
// ============================================

const getCombinedLeaderboard = async (req, res) => {
    try {
        const { hackathon_id } = req.query;

        let query = `
            SELECT
                t.team_id,
                t.team_name,
                s.submission_id,
                s.project_name,
                h.hackathon_id,
                h.name AS hackathon_name,
                u.college,
                COUNT(e.evaluation_id) AS evaluation_count,
                ROUND(AVG(e.total_score), 0) AS average_score
             FROM teams t
             JOIN submissions s ON t.team_id = s.team_id
             JOIN hackathons h ON t.hackathon_id = h.hackathon_id
             JOIN users u ON t.leader_id = u.user_id
             JOIN judge_assignments ja ON s.submission_id = ja.submission_id
             JOIN evaluations e ON ja.assignment_id = e.assignment_id
        `;

        const params = [];

        if (hackathon_id) {
            query += " WHERE t.hackathon_id = ?";
            params.push(hackathon_id);
        }

        query += `
             GROUP BY
                t.team_id,
                t.team_name,
                s.submission_id,
                s.project_name,
                h.hackathon_id,
                h.name,
                u.college
             ORDER BY average_score DESC
        `;

        const [leaderboard] = await pool.query(query, params);

        const rankedLeaderboard = leaderboard.map((entry, index) => ({
            rank: index + 1,
            ...entry
        }));

        res.status(200).json({
            success: true,
            data: rankedLeaderboard
        });

    } catch (error) {
        console.error("Combined leaderboard error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch leaderboard"
        });
    }
};

module.exports = {
    createEvaluation,
    getEvaluationById,
    getLeaderboard,
    getAllEvaluations,
    getMyResults,
    getCombinedLeaderboard
};
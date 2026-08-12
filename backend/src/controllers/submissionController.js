const pool = require("../config/db");


// ============================================
// CREATE SUBMISSION
// ============================================

const createSubmission = async (req, res) => {
    try {
        const {
            team_id,
            project_name,
            description,
            github_url,
            demo_url,
            technologies
        } = req.body;

        const userId = req.user.userId;

        // Validate required fields
        if (!team_id || !project_name) {
            return res.status(400).json({
                success: false,
                message: "Team ID and project name are required"
            });
        }

        // Check team and leader
        const [teams] = await pool.query(
            `SELECT
                t.team_id,
                t.hackathon_id,
                t.leader_id
             FROM teams t
             WHERE t.team_id = ?`,
            [team_id]
        );

        if (teams.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Team not found"
            });
        }

        const team = teams[0];

        // Only team leader can submit
        if (team.leader_id !== userId) {
            return res.status(403).json({
                success: false,
                message: "Only the team leader can submit the project"
            });
        }

        // Check leader registration
        const [registrations] = await pool.query(
            `SELECT registration_id
             FROM registrations
             WHERE user_id = ?
             AND hackathon_id = ?`,
            [userId, team.hackathon_id]
        );

        if (registrations.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Team leader is not registered for this hackathon"
            });
        }

        // Check if team already submitted
        const [existingSubmission] = await pool.query(
            `SELECT submission_id
             FROM submissions
             WHERE team_id = ?`,
            [team_id]
        );

        if (existingSubmission.length > 0) {
            return res.status(409).json({
                success: false,
                message: "This team has already submitted a project"
            });
        }

        // Create submission
        const [result] = await pool.query(
            `INSERT INTO submissions
            (
                team_id,
                project_name,
                description,
                github_url,
                demo_url,
                technologies
            )
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                team_id,
                project_name,
                description || null,
                github_url || null,
                demo_url || null,
                technologies || null
            ]
        );

        res.status(201).json({
            success: true,
            message: "Project submitted successfully",
            data: {
                submission_id: result.insertId,
                team_id: Number(team_id),
                project_name
            }
        });

    } catch (error) {
        console.error("Create submission error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to submit project"
        });
    }
};
// ============================================
// GET SUBMISSION BY ID
// ============================================

const getSubmissionById = async (req, res) => {
    try {
        const { id } = req.params;

        const [submissions] = await pool.query(
            `SELECT
                s.submission_id,
                s.team_id,
                s.project_name,
                s.description,
                s.github_url,
                s.demo_url,
                s.technologies,
                s.submitted_at,
                s.updated_at,

                t.team_name,
                t.leader_id,

                h.hackathon_id,
                h.name AS hackathon_name

             FROM submissions s

             JOIN teams t
                ON s.team_id = t.team_id

             JOIN hackathons h
                ON t.hackathon_id = h.hackathon_id

             WHERE s.submission_id = ?`,
            [id]
        );

        if (submissions.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Submission not found"
            });
        }

        res.status(200).json({
            success: true,
            data: submissions[0]
        });

    } catch (error) {
        console.error("Get submission error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch submission"
        });
    }
};

// ============================================
// GET MY SUBMISSION
// ============================================

const getMySubmission = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { hackathon_id } = req.query;

        let query = `
            SELECT
                s.submission_id,
                s.team_id,
                s.project_name,
                s.description,
                s.github_url,
                s.demo_url,
                s.technologies,
                s.submitted_at,
                s.updated_at,
                t.team_name,
                t.leader_id,
                t.hackathon_id,
                h.name AS hackathon_name,
                CASE
                    WHEN EXISTS (
                        SELECT 1 FROM evaluations e
                        JOIN judge_assignments ja ON e.assignment_id = ja.assignment_id
                        WHERE ja.submission_id = s.submission_id
                    ) THEN 'Evaluated'
                    WHEN EXISTS (
                        SELECT 1 FROM judge_assignments ja
                        WHERE ja.submission_id = s.submission_id
                    ) THEN 'In Review'
                    ELSE 'Pending'
                END AS evaluation_status
             FROM submissions s
             JOIN teams t ON s.team_id = t.team_id
             JOIN hackathons h ON t.hackathon_id = h.hackathon_id
             JOIN team_members tm ON tm.team_id = t.team_id
             WHERE tm.user_id = ?
        `;

        const params = [userId];

        if (hackathon_id) {
            query += " AND t.hackathon_id = ?";
            params.push(hackathon_id);
        }

        query += " ORDER BY s.submitted_at DESC LIMIT 1";

        const [submissions] = await pool.query(query, params);

        if (submissions.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Submission not found"
            });
        }

        res.status(200).json({
            success: true,
            data: submissions[0]
        });

    } catch (error) {
        console.error("Get my submission error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch submission"
        });
    }
};

// ============================================
// GET ALL SUBMISSIONS
// ============================================

const getAllSubmissions = async (req, res) => {
    try {
        const [submissions] = await pool.query(
            `SELECT
                s.submission_id,
                s.team_id,
                s.project_name,
                s.description,
                s.github_url,
                s.demo_url,
                s.technologies,
                s.submitted_at,
                t.team_name,
                t.hackathon_id,
                h.name AS hackathon_name,
                CASE
                    WHEN EXISTS (
                        SELECT 1 FROM evaluations e
                        JOIN judge_assignments ja ON e.assignment_id = ja.assignment_id
                        WHERE ja.submission_id = s.submission_id
                    ) THEN 'Evaluated'
                    WHEN EXISTS (
                        SELECT 1 FROM judge_assignments ja
                        WHERE ja.submission_id = s.submission_id
                    ) THEN 'In Review'
                    ELSE 'Pending'
                END AS evaluation_status,
                (
                    SELECT ROUND(AVG(e.total_score), 0)
                    FROM evaluations e
                    JOIN judge_assignments ja ON e.assignment_id = ja.assignment_id
                    WHERE ja.submission_id = s.submission_id
                ) AS average_score
             FROM submissions s
             JOIN teams t ON s.team_id = t.team_id
             JOIN hackathons h ON t.hackathon_id = h.hackathon_id
             ORDER BY s.submitted_at DESC`
        );

        res.status(200).json({
            success: true,
            count: submissions.length,
            data: submissions
        });

    } catch (error) {
        console.error("Get all submissions error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch submissions"
        });
    }
};

module.exports = {
    createSubmission,
    getSubmissionById,
    getMySubmission,
    getAllSubmissions
};
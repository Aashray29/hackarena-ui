const pool = require("../config/db");


// ============================================
// ASSIGN JUDGE TO SUBMISSION
// ============================================

const assignJudge = async (req, res) => {
    try {
        const { judge_id, submission_id } = req.body;

        // Validate input
        if (!judge_id || !submission_id) {
            return res.status(400).json({
                success: false,
                message: "Judge ID and submission ID are required"
            });
        }

        // Check judge exists and has judge role
        const [judges] = await pool.query(
            `SELECT user_id, name, email, role
             FROM users
             WHERE user_id = ?
             AND role = 'judge'`,
            [judge_id]
        );

        if (judges.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Judge not found"
            });
        }

        // Check submission exists
        const [submissions] = await pool.query(
            `SELECT
                submission_id,
                team_id
             FROM submissions
             WHERE submission_id = ?`,
            [submission_id]
        );

        if (submissions.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Submission not found"
            });
        }

        // Check if judge is already assigned
        const [existing] = await pool.query(
            `SELECT assignment_id
             FROM judge_assignments
             WHERE judge_id = ?
             AND submission_id = ?`,
            [judge_id, submission_id]
        );

        if (existing.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Judge is already assigned to this submission"
            });
        }

        // Create assignment
        const [result] = await pool.query(
            `INSERT INTO judge_assignments
            (judge_id, submission_id)
            VALUES (?, ?)`,
            [judge_id, submission_id]
        );

        res.status(201).json({
            success: true,
            message: "Judge assigned successfully",
            data: {
                assignment_id: result.insertId,
                judge_id: Number(judge_id),
                submission_id: Number(submission_id)
            }
        });

    } catch (error) {
        console.error("Assign judge error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to assign judge"
        });
    }
};

// ============================================
// GET MY ASSIGNMENTS (JUDGE)
// ============================================

const getMyAssignments = async (req, res) => {
    try {
        const judgeId = req.user.userId;

        const [assignments] = await pool.query(
            `SELECT
                ja.assignment_id,
                ja.assigned_at,
                s.submission_id,
                s.project_name,
                s.description,
                s.github_url,
                s.demo_url,
                s.technologies,
                s.submitted_at,
                t.team_id,
                t.team_name,
                h.hackathon_id,
                h.name AS hackathon_name,
                CASE
                    WHEN EXISTS (
                        SELECT 1 FROM evaluations e
                        WHERE e.assignment_id = ja.assignment_id
                    ) THEN 'Evaluated'
                    ELSE 'Pending'
                END AS evaluation_status
             FROM judge_assignments ja
             JOIN submissions s ON ja.submission_id = s.submission_id
             JOIN teams t ON s.team_id = t.team_id
             JOIN hackathons h ON t.hackathon_id = h.hackathon_id
             WHERE ja.judge_id = ?
             ORDER BY ja.assigned_at DESC`,
            [judgeId]
        );

        res.status(200).json({
            success: true,
            count: assignments.length,
            data: assignments
        });

    } catch (error) {
        console.error("Get my assignments error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch assignments"
        });
    }
};

// ============================================
// GET ALL JUDGES (ADMIN)
// ============================================

const getAllJudges = async (req, res) => {
    try {
        const [judges] = await pool.query(
            `SELECT
                u.user_id,
                u.name,
                u.email,
                u.college,
                u.phone,
                (
                    SELECT COUNT(*)
                    FROM judge_assignments ja
                    WHERE ja.judge_id = u.user_id
                ) AS assigned,
                (
                    SELECT COUNT(*)
                    FROM judge_assignments ja
                    JOIN evaluations e ON e.assignment_id = ja.assignment_id
                    WHERE ja.judge_id = u.user_id
                ) AS evaluated
             FROM users u
             WHERE u.role = 'judge'
             ORDER BY u.name ASC`
        );

        res.status(200).json({
            success: true,
            count: judges.length,
            data: judges
        });

    } catch (error) {
        console.error("Get all judges error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch judges"
        });
    }
};

module.exports = {
    assignJudge,
    getMyAssignments,
    getAllJudges
};
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


module.exports = {
    assignJudge
};
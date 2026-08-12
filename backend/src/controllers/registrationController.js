const pool = require("../config/db");


// ============================================
// REGISTER FOR HACKATHON
// ============================================

const registerForHackathon = async (req, res) => {
    try {
        const { hackathon_id } = req.body;
        const userId = req.user.userId;

        // Validate input
        if (!hackathon_id) {
            return res.status(400).json({
                success: false,
                message: "Hackathon ID is required"
            });
        }

        // Check hackathon exists
        const [hackathons] = await pool.query(
            `SELECT
                hackathon_id,
                name,
                registration_deadline,
                status
             FROM hackathons
             WHERE hackathon_id = ?`,
            [hackathon_id]
        );

        if (hackathons.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Hackathon not found"
            });
        }

        const hackathon = hackathons[0];

        // Check registration deadline
        if (
            hackathon.registration_deadline &&
            new Date(hackathon.registration_deadline) < new Date()
        ) {
            return res.status(400).json({
                success: false,
                message: "Registration deadline has passed"
            });
        }

        // Check if already registered
        const [existing] = await pool.query(
            `SELECT registration_id
             FROM registrations
             WHERE user_id = ?
             AND hackathon_id = ?`,
            [userId, hackathon_id]
        );

        if (existing.length > 0) {
            return res.status(409).json({
                success: false,
                message: "You are already registered for this hackathon"
            });
        }

        // Register user
        const [result] = await pool.query(
            `INSERT INTO registrations
            (user_id, hackathon_id)
            VALUES (?, ?)`,
            [userId, hackathon_id]
        );

        res.status(201).json({
            success: true,
            message: "Registered for hackathon successfully",
            data: {
                registration_id: result.insertId,
                user_id: userId,
                hackathon_id: Number(hackathon_id)
            }
        });

    } catch (error) {
        console.error("Registration error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to register for hackathon"
        });
    }
};
// ============================================
// GET MY REGISTRATIONS
// ============================================

const getMyRegistrations = async (req, res) => {
    try {
        const userId = req.user.userId;

        const [registrations] = await pool.query(
            `SELECT
                r.registration_id,
                r.registration_date,
                h.hackathon_id,
                h.name,
                h.description,
                h.start_date,
                h.end_date,
                h.registration_deadline,
                h.team_size_min,
                h.team_size_max,
                h.status
             FROM registrations r
             JOIN hackathons h
                ON r.hackathon_id = h.hackathon_id
             WHERE r.user_id = ?
             ORDER BY r.registration_date DESC`,
            [userId]
        );

        res.status(200).json({
            success: true,
            count: registrations.length,
            data: registrations
        });

    } catch (error) {
        console.error("Get my registrations error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch registrations"
        });
    }
};
// ============================================
// GET HACKATHON REGISTRATIONS
// ============================================

const getHackathonRegistrations = async (req, res) => {
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

        // Get registered users
        const [registrations] = await pool.query(
            `SELECT
                r.registration_id,
                r.registration_date,
                u.user_id,
                u.name,
                u.email,
                u.college,
                u.phone
             FROM registrations r
             JOIN users u
                ON r.user_id = u.user_id
             WHERE r.hackathon_id = ?
             ORDER BY r.registration_date ASC`,
            [id]
        );

        res.status(200).json({
            success: true,
            data: {
                hackathon_id: hackathons[0].hackathon_id,
                hackathon_name: hackathons[0].name,
                total_registrations: registrations.length,
                registrations: registrations
            }
        });

    } catch (error) {
        console.error(
            "Get hackathon registrations error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch hackathon registrations"
        });
    }
};
// ============================================
// CANCEL REGISTRATION
// ============================================

const cancelRegistration = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        // Find registration belonging to logged-in user
        const [registrations] = await pool.query(
            `SELECT
                r.registration_id,
                r.hackathon_id,
                h.registration_deadline
             FROM registrations r
             JOIN hackathons h
                ON r.hackathon_id = h.hackathon_id
             WHERE r.registration_id = ?
             AND r.user_id = ?`,
            [id, userId]
        );

        if (registrations.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Registration not found"
            });
        }

        const registration = registrations[0];

        // Don't allow cancellation after deadline
        if (
            registration.registration_deadline &&
            new Date(registration.registration_deadline) < new Date()
        ) {
            return res.status(400).json({
                success: false,
                message: "Registration deadline has passed"
            });
        }

        // Delete registration
        await pool.query(
            `DELETE FROM registrations
             WHERE registration_id = ?
             AND user_id = ?`,
            [id, userId]
        );

        res.status(200).json({
            success: true,
            message: "Registration cancelled successfully"
        });

    } catch (error) {
        console.error("Cancel registration error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to cancel registration"
        });
    }
};
// ============================================
// UPDATE SUBMISSION
// ============================================

const updateSubmission = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            project_name,
            description,
            github_url,
            demo_url,
            technologies
        } = req.body;

        const userId = req.user.userId;

        // Find submission and team leader
        const [submissions] = await pool.query(
            `SELECT
                s.submission_id,
                s.team_id,
                t.leader_id
             FROM submissions s
             JOIN teams t
                ON s.team_id = t.team_id
             WHERE s.submission_id = ?`,
            [id]
        );

        if (submissions.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Submission not found"
            });
        }

        const submission = submissions[0];

        // Only team leader can update
        if (submission.leader_id !== userId) {
            return res.status(403).json({
                success: false,
                message: "Only the team leader can update the submission"
            });
        }

        // Validate project name
        if (!project_name) {
            return res.status(400).json({
                success: false,
                message: "Project name is required"
            });
        }

        // Update submission
        await pool.query(
            `UPDATE submissions
             SET
                project_name = ?,
                description = ?,
                github_url = ?,
                demo_url = ?,
                technologies = ?
             WHERE submission_id = ?`,
            [
                project_name,
                description || null,
                github_url || null,
                demo_url || null,
                technologies || null,
                id
            ]
        );

        res.status(200).json({
            success: true,
            message: "Submission updated successfully"
        });

    } catch (error) {
        console.error("Update submission error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to update submission"
        });
    }
};


module.exports = {
    registerForHackathon,
    getMyRegistrations,
    getHackathonRegistrations,
    cancelRegistration,
    updateSubmission
};
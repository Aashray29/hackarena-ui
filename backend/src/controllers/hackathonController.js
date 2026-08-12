const pool = require("../config/db");

const getAllHackathons = async (req, res) => {
    try {
        const [hackathons] = await pool.query(
            "SELECT * FROM hackathons ORDER BY start_date ASC"
        );

        res.status(200).json({
            success: true,
            count: hackathons.length,
            data: hackathons
        });

    } catch (error) {
        console.error("Error fetching hackathons:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch hackathons"
        });
    }
};


const getHackathonById = async (req, res) => {
    try {
        const { id } = req.params;

        const [hackathons] = await pool.query(
            "SELECT * FROM hackathons WHERE hackathon_id = ?",
            [id]
        );

        if (hackathons.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Hackathon not found"
            });
        }

        res.status(200).json({
            success: true,
            data: hackathons[0]
        });

    } catch (error) {
        console.error("Error fetching hackathon:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch hackathon"
        });
    }
};
// ============================================
// CREATE HACKATHON
// ============================================

const createHackathon = async (req, res) => {
    try {
        const {
            name,
            description,
            start_date,
            end_date,
            registration_deadline,
            team_size_min,
            team_size_max,
            status
        } = req.body;

        // Validate required fields
        if (
            !name ||
            !start_date ||
            !end_date ||
            !registration_deadline
        ) {
            return res.status(400).json({
                success: false,
                message: "Name, start date, end date and registration deadline are required"
            });
        }

        // Validate team size
        if (
            team_size_min < 1 ||
            team_size_max < team_size_min
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid team size"
            });
        }

        const [result] = await pool.query(
            `INSERT INTO hackathons
            (
                name,
                description,
                start_date,
                end_date,
                registration_deadline,
                team_size_min,
                team_size_max,
                status
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                name,
                description || null,
                start_date,
                end_date,
                registration_deadline,
                team_size_min || 1,
                team_size_max || 4,
                status || "upcoming"
            ]
        );

        res.status(201).json({
            success: true,
            message: "Hackathon created successfully",
            data: {
                hackathon_id: result.insertId,
                name,
                description: description || null,
                start_date,
                end_date,
                registration_deadline,
                team_size_min: team_size_min || 1,
                team_size_max: team_size_max || 4,
                status: status || "upcoming"
            }
        });

    } catch (error) {
        console.error("Create hackathon error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to create hackathon"
        });
    }
};
// ============================================
// UPDATE HACKATHON
// ============================================

const updateHackathon = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            name,
            description,
            start_date,
            end_date,
            registration_deadline,
            team_size_min,
            team_size_max,
            status
        } = req.body;

        // Check if hackathon exists
        const [existing] = await pool.query(
            "SELECT * FROM hackathons WHERE hackathon_id = ?",
            [id]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Hackathon not found"
            });
        }

        // Validate team size if provided
        if (
            team_size_min !== undefined &&
            team_size_max !== undefined &&
            (team_size_min < 1 || team_size_max < team_size_min)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid team size"
            });
        }

        // Keep old values if fields are not provided
        const old = existing[0];

        const updatedName = name ?? old.name;
        const updatedDescription = description ?? old.description;
        const updatedStartDate = start_date ?? old.start_date;
        const updatedEndDate = end_date ?? old.end_date;
        const updatedRegistrationDeadline =
            registration_deadline ?? old.registration_deadline;
        const updatedTeamSizeMin =
            team_size_min ?? old.team_size_min;
        const updatedTeamSizeMax =
            team_size_max ?? old.team_size_max;
        const updatedStatus = status ?? old.status;

        await pool.query(
            `UPDATE hackathons
             SET
                name = ?,
                description = ?,
                start_date = ?,
                end_date = ?,
                registration_deadline = ?,
                team_size_min = ?,
                team_size_max = ?,
                status = ?
             WHERE hackathon_id = ?`,
            [
                updatedName,
                updatedDescription,
                updatedStartDate,
                updatedEndDate,
                updatedRegistrationDeadline,
                updatedTeamSizeMin,
                updatedTeamSizeMax,
                updatedStatus,
                id
            ]
        );

        res.status(200).json({
            success: true,
            message: "Hackathon updated successfully"
        });

    } catch (error) {
        console.error("Update hackathon error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to update hackathon"
        });
    }
};
// ============================================
// DELETE HACKATHON
// ============================================

const deleteHackathon = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if hackathon exists
        const [existing] = await pool.query(
            "SELECT hackathon_id FROM hackathons WHERE hackathon_id = ?",
            [id]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Hackathon not found"
            });
        }

        // Delete hackathon
        await pool.query(
            "DELETE FROM hackathons WHERE hackathon_id = ?",
            [id]
        );

        res.status(200).json({
            success: true,
            message: "Hackathon deleted successfully"
        });

    } catch (error) {
        console.error("Delete hackathon error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to delete hackathon"
        });
    }
};
module.exports = {
    getAllHackathons,
    getHackathonById,
    createHackathon,
    updateHackathon,
    deleteHackathon
};
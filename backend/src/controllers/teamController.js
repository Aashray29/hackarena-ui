const pool = require("../config/db");


// ============================================
// CREATE TEAM
// ============================================

const createTeam = async (req, res) => {
    try {
        const { hackathon_id, team_name } = req.body;

        // User creating the team
        const leaderId = req.user.userId;

        // Validate input
        if (!hackathon_id || !team_name) {
            return res.status(400).json({
                success: false,
                message: "Hackathon ID and team name are required"
            });
        }

        // Check hackathon exists
        const [hackathons] = await pool.query(
            "SELECT * FROM hackathons WHERE hackathon_id = ?",
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
        const now = new Date();

        if (new Date(hackathon.registration_deadline) < now) {
            return res.status(400).json({
                success: false,
                message: "Registration deadline has passed"
            });
        }

        // Check whether user is already leading a team
        const [existingTeams] = await pool.query(
            `SELECT team_id
             FROM teams
             WHERE hackathon_id = ?
             AND leader_id = ?`,
            [hackathon_id, leaderId]
        );

        if (existingTeams.length > 0) {
            return res.status(409).json({
                success: false,
                message: "You already have a team for this hackathon"
            });
        }

        // Create team
        const [result] = await pool.query(
            `INSERT INTO teams
            (hackathon_id, team_name, leader_id)
            VALUES (?, ?, ?)`,
            [
                hackathon_id,
                team_name,
                leaderId
            ]
        );

        const teamId = result.insertId;

        // Automatically add leader as team member
        await pool.query(
            `INSERT INTO team_members
            (team_id, user_id)
            VALUES (?, ?)`,
            [teamId, leaderId]
        );

        res.status(201).json({
            success: true,
            message: "Team created successfully",
            data: {
                team_id: teamId,
                hackathon_id,
                team_name,
                leader_id: leaderId
            }
        });

    } catch (error) {
        console.error("Create team error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to create team"
        });
    }
};
// ============================================
// JOIN TEAM
// ============================================

const joinTeam = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        // Find team + hackathon details
        const [teams] = await pool.query(
            `SELECT
                t.team_id,
                t.team_name,
                t.hackathon_id,
                h.team_size_max,
                h.registration_deadline
             FROM teams t
             JOIN hackathons h
                ON t.hackathon_id = h.hackathon_id
             WHERE t.team_id = ?`,
            [id]
        );

        if (teams.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Team not found"
            });
        }

        const team = teams[0];

        // Check registration deadline
        if (new Date(team.registration_deadline) < new Date()) {
            return res.status(400).json({
                success: false,
                message: "Registration deadline has passed"
            });
        }

        // Check if user is already in this team
        const [existingMember] = await pool.query(
            `SELECT team_member_id
             FROM team_members
             WHERE team_id = ?
             AND user_id = ?`,
            [id, userId]
        );

        if (existingMember.length > 0) {
            return res.status(409).json({
                success: false,
                message: "You are already a member of this team"
            });
        }

        // Check if user is already in another team
        // for the same hackathon
        const [otherTeams] = await pool.query(
            `SELECT tm.team_member_id
             FROM team_members tm
             JOIN teams t
                ON tm.team_id = t.team_id
             WHERE tm.user_id = ?
             AND t.hackathon_id = ?`,
            [userId, team.hackathon_id]
        );

        if (otherTeams.length > 0) {
            return res.status(409).json({
                success: false,
                message: "You are already part of a team in this hackathon"
            });
        }

        // Count current team members
        const [memberCount] = await pool.query(
            `SELECT COUNT(*) AS count
             FROM team_members
             WHERE team_id = ?`,
            [id]
        );

        if (memberCount[0].count >= team.team_size_max) {
            return res.status(400).json({
                success: false,
                message: "Team is already full"
            });
        }

        // Add user to team
        await pool.query(
            `INSERT INTO team_members
            (team_id, user_id)
            VALUES (?, ?)`,
            [id, userId]
        );

        res.status(200).json({
            success: true,
            message: "Joined team successfully"
        });

    } catch (error) {
        console.error("Join team error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to join team"
        });
    }
};
// ============================================
// GET TEAM BY ID
// ============================================

const getTeamById = async (req, res) => {
    try {
        const { id } = req.params;

        // Get team information
        const [teams] = await pool.query(
            `SELECT
                t.team_id,
                t.team_name,
                t.hackathon_id,
                t.leader_id,
                h.name AS hackathon_name,
                h.team_size_min,
                h.team_size_max,
                t.created_at
             FROM teams t
             JOIN hackathons h
                ON t.hackathon_id = h.hackathon_id
             WHERE t.team_id = ?`,
            [id]
        );

        if (teams.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Team not found"
            });
        }

        const team = teams[0];

        // Get team members
        const [members] = await pool.query(
            `SELECT
                u.user_id,
                u.name,
                u.email,
                u.college,
                tm.joined_at
             FROM team_members tm
             JOIN users u
                ON tm.user_id = u.user_id
             WHERE tm.team_id = ?
             ORDER BY tm.joined_at ASC`,
            [id]
        );

        res.status(200).json({
            success: true,
            data: {
                team_id: team.team_id,
                team_name: team.team_name,
                hackathon_id: team.hackathon_id,
                hackathon_name: team.hackathon_name,
                leader_id: team.leader_id,

                team_size_min: team.team_size_min,
                team_size_max: team.team_size_max,

                current_members: members.length,

                members: members,

                created_at: team.created_at
            }
        });

    } catch (error) {
        console.error("Get team error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch team"
        });
    }
};
// ============================================
// LEAVE TEAM
// ============================================

const leaveTeam = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        // Check if team exists
        const [teams] = await pool.query(
            `SELECT team_id, leader_id
             FROM teams
             WHERE team_id = ?`,
            [id]
        );

        if (teams.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Team not found"
            });
        }

        const team = teams[0];

        // Leader cannot leave directly
        if (team.leader_id === userId) {
            return res.status(400).json({
                success: false,
                message: "Team leader cannot leave the team. Transfer leadership first."
            });
        }

        // Check membership
        const [members] = await pool.query(
            `SELECT team_member_id
             FROM team_members
             WHERE team_id = ?
             AND user_id = ?`,
            [id, userId]
        );

        if (members.length === 0) {
            return res.status(400).json({
                success: false,
                message: "You are not a member of this team"
            });
        }

        // Remove member
        await pool.query(
            `DELETE FROM team_members
             WHERE team_id = ?
             AND user_id = ?`,
            [id, userId]
        );

        res.status(200).json({
            success: true,
            message: "You left the team successfully"
        });

    } catch (error) {
        console.error("Leave team error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to leave team"
        });
    }
};
// ============================================
// GET TEAM MEMBERS
// ============================================

const getTeamMembers = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if team exists
        const [teams] = await pool.query(
            `SELECT team_id, team_name
             FROM teams
             WHERE team_id = ?`,
            [id]
        );

        if (teams.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Team not found"
            });
        }

        // Get members
        const [members] = await pool.query(
            `SELECT
                u.user_id,
                u.name,
                u.email,
                u.college,
                tm.joined_at,
                CASE
                    WHEN t.leader_id = u.user_id THEN true
                    ELSE false
                END AS is_leader
             FROM team_members tm
             JOIN users u
                ON tm.user_id = u.user_id
             JOIN teams t
                ON tm.team_id = t.team_id
             WHERE tm.team_id = ?
             ORDER BY tm.joined_at ASC`,
            [id]
        );

        res.status(200).json({
            success: true,
            data: {
                team_id: teams[0].team_id,
                team_name: teams[0].team_name,
                member_count: members.length,
                members
            }
        });

    } catch (error) {
        console.error("Get team members error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch team members"
        });
    }
};

module.exports = {
    createTeam,
    joinTeam,
    getTeamById,
    leaveTeam,
    getTeamMembers
};
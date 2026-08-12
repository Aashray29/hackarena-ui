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

        // User must be registered for this hackathon
        const [registrations] = await pool.query(
            `SELECT registration_id
             FROM registrations
             WHERE user_id = ?
             AND hackathon_id = ?`,
            [leaderId, hackathon_id]
        );

        if (registrations.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Register for this hackathon before creating a team"
            });
        }

        // User cannot already belong to a team in this hackathon
        const [existingMembership] = await pool.query(
            `SELECT tm.team_member_id
             FROM team_members tm
             JOIN teams t ON tm.team_id = t.team_id
             WHERE tm.user_id = ?
             AND t.hackathon_id = ?`,
            [leaderId, hackathon_id]
        );

        if (existingMembership.length > 0) {
            return res.status(409).json({
                success: false,
                message: "You are already part of a team for this hackathon"
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

        // User must be registered for this hackathon
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
                message: "Register for this hackathon before joining a team"
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

// ============================================
// GET ALL TEAMS
// ============================================

const getAllTeams = async (req, res) => {
    try {
        const { hackathon_id } = req.query;

        let query = `
            SELECT
                t.team_id,
                t.team_name,
                t.hackathon_id,
                t.leader_id,
                t.created_at,
                h.name AS hackathon_name,
                h.team_size_max,
                u.name AS leader_name,
                (SELECT COUNT(*) FROM team_members tm WHERE tm.team_id = t.team_id) AS member_count,
                CASE
                    WHEN EXISTS (
                        SELECT 1 FROM submissions s WHERE s.team_id = t.team_id
                    ) THEN 'Submitted'
                    ELSE 'Not Submitted'
                END AS submission_status
             FROM teams t
             JOIN hackathons h ON t.hackathon_id = h.hackathon_id
             JOIN users u ON t.leader_id = u.user_id
        `;

        const params = [];

        if (hackathon_id) {
            query += " WHERE t.hackathon_id = ?";
            params.push(hackathon_id);
        }

        query += " ORDER BY t.created_at DESC";

        const [teams] = await pool.query(query, params);

        res.status(200).json({
            success: true,
            count: teams.length,
            data: teams
        });

    } catch (error) {
        console.error("Get all teams error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch teams"
        });
    }
};

// ============================================
// GET MY TEAM
// ============================================

const getMyTeam = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { hackathon_id } = req.query;

        let query = `
            SELECT
                t.team_id,
                t.team_name,
                t.hackathon_id,
                t.leader_id,
                t.created_at,
                h.name AS hackathon_name,
                h.team_size_min,
                h.team_size_max,
                leader.name AS leader_name,
                CASE
                    WHEN EXISTS (
                        SELECT 1 FROM submissions s WHERE s.team_id = t.team_id
                    ) THEN 'Submitted'
                    ELSE 'Not Submitted'
                END AS submission_status
             FROM team_members tm
             JOIN teams t ON tm.team_id = t.team_id
             JOIN hackathons h ON t.hackathon_id = h.hackathon_id
             JOIN users leader ON t.leader_id = leader.user_id
             WHERE tm.user_id = ?
        `;

        const params = [userId];

        if (hackathon_id) {
            query += " AND t.hackathon_id = ?";
            params.push(hackathon_id);
        }

        query += " ORDER BY t.created_at DESC LIMIT 1";

        const [teams] = await pool.query(query, params);

        if (teams.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Team not found"
            });
        }

        const team = teams[0];

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
             JOIN users u ON tm.user_id = u.user_id
             JOIN teams t ON tm.team_id = t.team_id
             WHERE tm.team_id = ?
             ORDER BY tm.joined_at ASC`,
            [team.team_id]
        );

        res.status(200).json({
            success: true,
            data: {
                ...team,
                current_members: members.length,
                members
            }
        });

    } catch (error) {
        console.error("Get my team error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch team"
        });
    }
};

// ============================================
// DELETE TEAM (ADMIN)
// ============================================

const deleteTeam = async (req, res) => {
    try {
        const { id } = req.params;

        const [existing] = await pool.query(
            "SELECT team_id FROM teams WHERE team_id = ?",
            [id]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Team not found"
            });
        }

        await pool.query(
            "DELETE FROM teams WHERE team_id = ?",
            [id]
        );

        res.status(200).json({
            success: true,
            message: "Team deleted successfully"
        });

    } catch (error) {
        console.error("Delete team error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to delete team"
        });
    }
};

// ============================================
// INVITE MEMBER BY EMAIL
// ============================================

const inviteMember = async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.body;
        const leaderId = req.user.userId;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const [teams] = await pool.query(
            `SELECT t.team_id, t.leader_id, h.team_size_max
             FROM teams t
             JOIN hackathons h ON t.hackathon_id = h.hackathon_id
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

        if (team.leader_id !== leaderId) {
            return res.status(403).json({
                success: false,
                message: "Only the team leader can invite members"
            });
        }

        const [users] = await pool.query(
            "SELECT user_id FROM users WHERE email = ?",
            [email]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User with this email was not found"
            });
        }

        const userId = users[0].user_id;

        const [memberCount] = await pool.query(
            "SELECT COUNT(*) AS count FROM team_members WHERE team_id = ?",
            [id]
        );

        if (memberCount[0].count >= team.team_size_max) {
            return res.status(400).json({
                success: false,
                message: "Team is already full"
            });
        }

        const [existingMember] = await pool.query(
            "SELECT team_member_id FROM team_members WHERE team_id = ? AND user_id = ?",
            [id, userId]
        );

        if (existingMember.length > 0) {
            return res.status(409).json({
                success: false,
                message: "User is already a member of this team"
            });
        }

        await pool.query(
            "INSERT INTO team_members (team_id, user_id) VALUES (?, ?)",
            [id, userId]
        );

        res.status(200).json({
            success: true,
            message: "Member invited successfully"
        });

    } catch (error) {
        console.error("Invite member error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to invite member"
        });
    }
};

module.exports = {
    createTeam,
    joinTeam,
    getTeamById,
    leaveTeam,
    getTeamMembers,
    getAllTeams,
    getMyTeam,
    deleteTeam,
    inviteMember
};
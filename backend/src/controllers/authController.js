const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ============================================
// REGISTER USER
// ============================================

const registerUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            college,
            phone
        } = req.body;

        // 1. Check required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required"
            });
        }

        // 2. Check if email already exists
        const [existingUsers] = await pool.query(
            "SELECT user_id FROM users WHERE email = ?",
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

        // 3. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Insert user
        const [result] = await pool.query(
            `INSERT INTO users
            (name, email, password, college, phone, role)
            VALUES (?, ?, ?, ?, ?, 'participant')`,
            [
                name,
                email,
                hashedPassword,
                college || null,
                phone || null
            ]
        );

        // 5. Return response
        res.status(201).json({
            success: true,
            message: "Registration successful",
            data: {
                user_id: result.insertId,
                name,
                email,
                college: college || null,
                phone: phone || null,
                role: "participant"
            }
        });

    } catch (error) {
        console.error("Registration error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error during registration"
        });
    }
};
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Find user
        const [users] = await pool.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const user = users[0];

        // Compare password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Generate JWT
        const token = jwt.sign(
            {
                userId: user.user_id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                user_id: user.user_id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error during login"
        });
    }
};
const getCurrentUser = async (req, res) => {
    try {
        const [users] = await pool.query(
            `SELECT
                user_id,
                name,
                email,
                college,
                phone,
                role,
                created_at
             FROM users
             WHERE user_id = ?`,
            [req.user.userId]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user: users[0]
        });

    } catch (error) {
        console.error("Get current user error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch user"
        });
    }
};

// ============================================
// UPDATE PROFILE
// ============================================

const updateProfile = async (req, res) => {
    try {
        const { name, college, phone } = req.body;
        const userId = req.user.userId;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Name is required"
            });
        }

        await pool.query(
            `UPDATE users
             SET name = ?, college = ?, phone = ?
             WHERE user_id = ?`,
            [name, college || null, phone || null, userId]
        );

        const [users] = await pool.query(
            `SELECT user_id, name, email, college, phone, role
             FROM users WHERE user_id = ?`,
            [userId]
        );

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: users[0]
        });

    } catch (error) {
        console.error("Update profile error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to update profile"
        });
    }
};

// ============================================
// GET ALL PARTICIPANTS (ADMIN)
// ============================================

const getAllParticipants = async (req, res) => {
    try {
        const [participants] = await pool.query(
            `SELECT
                u.user_id,
                u.name,
                u.email,
                u.college,
                u.phone,
                u.role,
                u.created_at,
                (
                    SELECT COUNT(*)
                    FROM registrations r
                    WHERE r.user_id = u.user_id
                ) AS registered_hackathons,
                (
                    SELECT t.team_name
                    FROM team_members tm
                    JOIN teams t ON tm.team_id = t.team_id
                    WHERE tm.user_id = u.user_id
                    ORDER BY tm.joined_at DESC
                    LIMIT 1
                ) AS team_name
             FROM users u
             WHERE u.role = 'participant'
             ORDER BY u.name ASC`
        );

        res.status(200).json({
            success: true,
            count: participants.length,
            data: participants
        });

    } catch (error) {
        console.error("Get participants error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch participants"
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
    updateProfile,
    getAllParticipants
};
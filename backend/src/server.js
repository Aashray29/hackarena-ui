const express = require("express");
const hackathonRoutes = require("./routes/hackathonRoutes");
const authRoutes = require("./routes/authRoutes");
const teamRoutes = require("./routes/teamRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const judgeAssignmentRoutes = require("./routes/judgeAssignmentRoutes");
const cors = require("cors");
const evaluationRoutes = require("./routes/evaluationRoutes");
require("dotenv").config();

const pool = require("./config/db");

const app = express();


// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());
app.use(express.json());
app.use("/api/hackathons", hackathonRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/submissions", submissionRoutes);
app.use(
    "/api/judge-assignments",
    judgeAssignmentRoutes
);
app.use(
    "/api/evaluations",
    evaluationRoutes
);
// ===============================
// HEALTH CHECK
// ===============================

app.get("/api/health", async (req, res) => {
    try {
        const [result] = await pool.query("SELECT 1 AS result");

        res.status(200).json({
            success: true,
            message: "HackArena backend is running",
            database: "connected"
        });

    } catch (error) {

        console.error("Database error:", error);

        res.status(500).json({
            success: false,
            message: "Database connection failed"
        });
    }
});


// ===============================
// START SERVER
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`HackArena backend running on port ${PORT}`);
});
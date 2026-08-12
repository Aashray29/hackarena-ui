const express = require("express");

const {
    createEvaluation,
    getEvaluationById,
    getLeaderboard
} = require("../controllers/evaluationController");

const {
    authenticate
} = require("../middleware/authMiddleware");

const router = express.Router();


// JUDGE - CREATE EVALUATION
router.post(
    "/",
    authenticate,
    createEvaluation
);
// GET EVALUATION
router.get(
    "/:id",
    authenticate,
    getEvaluationById
);
router.get(
    "/hackathon/:id/leaderboard",
    authenticate,
    getLeaderboard
);


module.exports = router;
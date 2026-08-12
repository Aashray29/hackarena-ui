const express = require("express");

const {
    createEvaluation,
    getEvaluationById,
    getLeaderboard,
    getAllEvaluations,
    getMyResults,
    getCombinedLeaderboard
} = require("../controllers/evaluationController");

const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
    "/leaderboard",
    getCombinedLeaderboard
);

router.get(
    "/my",
    authenticate,
    getMyResults
);

router.get(
    "/",
    authenticate,
    authorize("admin"),
    getAllEvaluations
);

router.post(
    "/",
    authenticate,
    authorize("judge"),
    createEvaluation
);

router.get(
    "/hackathon/:id/leaderboard",
    getLeaderboard
);

router.get(
    "/:id",
    authenticate,
    getEvaluationById
);

module.exports = router;

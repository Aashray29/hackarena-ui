const express = require("express");

const {
    assignJudge,
    getMyAssignments,
    getAllJudges
} = require("../controllers/judgeAssignmentController");

const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
    "/my",
    authenticate,
    authorize("judge"),
    getMyAssignments
);

router.get(
    "/judges",
    authenticate,
    authorize("admin"),
    getAllJudges
);

router.post(
    "/",
    authenticate,
    authorize("admin"),
    assignJudge
);

module.exports = router;

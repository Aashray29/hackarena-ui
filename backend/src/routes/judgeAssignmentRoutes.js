const express = require("express");

const {
    assignJudge
} = require("../controllers/judgeAssignmentController");

const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");

const router = express.Router();


// ADMIN - ASSIGN JUDGE
router.post(
    "/",
    authenticate,
    authorize("admin"),
    assignJudge
);


module.exports = router;
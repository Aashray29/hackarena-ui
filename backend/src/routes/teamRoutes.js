const express = require("express");

const {
    createTeam,
    joinTeam,
    getTeamById,
    leaveTeam,getTeamMembers
} = require("../controllers/teamController");

const {
    authenticate
} = require("../middleware/authMiddleware");

const router = express.Router();


// POST /api/teams
router.post(
    "/",
    authenticate,
    createTeam
);
// POST /api/teams/:id/join
router.post(
    "/:id/join",
    authenticate,
    joinTeam
);
router.get(
    "/:id/members",
    authenticate,
    getTeamMembers
);
// GET TEAM BY ID
router.get(
    "/:id",
    authenticate,
    getTeamById
);
// LEAVE TEAM
router.delete(
    "/:id/leave",
    authenticate,
    leaveTeam
);
module.exports = router;
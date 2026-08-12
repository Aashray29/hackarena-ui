const express = require("express");

const {
    createTeam,
    joinTeam,
    getTeamById,
    leaveTeam,
    getTeamMembers,
    getAllTeams,
    getMyTeam,
    deleteTeam,
    inviteMember
} = require("../controllers/teamController");

const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
    "/my",
    authenticate,
    getMyTeam
);

router.get(
    "/",
    authenticate,
    getAllTeams
);

router.post(
    "/",
    authenticate,
    createTeam
);

router.post(
    "/:id/join",
    authenticate,
    joinTeam
);

router.post(
    "/:id/invite",
    authenticate,
    inviteMember
);

router.get(
    "/:id/members",
    authenticate,
    getTeamMembers
);

router.get(
    "/:id",
    authenticate,
    getTeamById
);

router.delete(
    "/:id/leave",
    authenticate,
    leaveTeam
);

router.delete(
    "/:id",
    authenticate,
    authorize("admin"),
    deleteTeam
);

module.exports = router;

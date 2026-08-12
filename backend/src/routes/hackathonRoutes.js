const express = require("express");

const {
    getAllHackathons,
    getHackathonById,
    createHackathon,
    updateHackathon,
    deleteHackathon
} = require("../controllers/hackathonController");

const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");

const router = express.Router();


// GET all hackathons
router.get("/", getAllHackathons);


// GET hackathon by ID
router.get("/:id", getHackathonById);


// CREATE hackathon - ADMIN ONLY
router.post(
    "/",
    authenticate,
    authorize("admin"),
    createHackathon
);
// UPDATE hackathon - ADMIN ONLY
router.put(
    "/:id",
    authenticate,
    authorize("admin"),
    updateHackathon
);
// DELETE hackathon - ADMIN ONLY
router.delete(
    "/:id",
    authenticate,
    authorize("admin"),
    deleteHackathon
);

module.exports = router;
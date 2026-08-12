const express = require("express");

const {
    registerForHackathon,
    getMyRegistrations,
    getHackathonRegistrations,
    cancelRegistration,
    updateSubmission
} = require("../controllers/registrationController");

const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");

const router = express.Router();


// REGISTER FOR HACKATHON
router.post(
    "/",
    authenticate,
    registerForHackathon
);
// GET MY REGISTRATIONS
router.get(
    "/my",
    authenticate,
    getMyRegistrations,
    updateSubmission
);
// ADMIN - GET HACKATHON REGISTRATIONS
router.get(
    "/hackathon/:id",
    authenticate,
    authorize("admin"),
    getHackathonRegistrations
);
// CANCEL REGISTRATION
router.delete(
    "/:id",
    authenticate,
    cancelRegistration
);
// UPDATE SUBMISSION
router.put(
    "/:id",
    authenticate,
    updateSubmission
);


module.exports = router;
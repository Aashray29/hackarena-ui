const express = require("express");

const {
    createSubmission,
    getSubmissionById
} = require("../controllers/submissionController");

const {
    authenticate
} = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE SUBMISSION
router.post(
    "/",
    authenticate,
    createSubmission
);
// GET SUBMISSION
router.get(
    "/:id",
    authenticate,
    getSubmissionById
);


module.exports = router;
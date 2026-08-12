const express = require("express");

const {
    createSubmission,
    getSubmissionById,
    getMySubmission,
    getAllSubmissions
} = require("../controllers/submissionController");

const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
    "/my",
    authenticate,
    getMySubmission
);

router.get(
    "/",
    authenticate,
    authorize("admin", "judge"),
    getAllSubmissions
);

router.post(
    "/",
    authenticate,
    createSubmission
);

router.get(
    "/:id",
    authenticate,
    getSubmissionById
);

module.exports = router;

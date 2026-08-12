const express = require("express");

const {
    registerUser,
    loginUser,
    getCurrentUser,
    updateProfile,
    getAllParticipants
} = require("../controllers/authController");
const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me", authenticate, getCurrentUser);

router.put("/profile", authenticate, updateProfile);

router.get(
    "/participants",
    authenticate,
    authorize("admin"),
    getAllParticipants
);

router.get(
    "/admin-test",
    authenticate,
    authorize("admin"),
    (req, res) => {
        res.json({
            success: true,
            message: "Welcome Admin!",
            user: req.user
        });
    }
);

module.exports = router;
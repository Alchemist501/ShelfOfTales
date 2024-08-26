const express = require("express");
const authController = require("./../controllers/authController");
const viewController = require("./../controllers/viewControllers");
const router = express.Router();
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/users/:id/verify/:token", authController.verifyEmail);
module.exports = router;

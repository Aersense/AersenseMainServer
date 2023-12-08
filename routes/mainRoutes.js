// Main server routes
const express = require('express');
const { isLoggedIn } = require('../middleware/authMiddleware');
const router = express.Router();

router.get("/", function (req, res) {
    res.render("index", {});
});

router.get("/register", function (req, res) {
    res.render("register", {});
});

router.get("/about", function (req, res) {
    res.render("about", {});
});

router.get("/contact", function (req, res) {
    res.render("contact", {});
});

router.get("/userHome", isLoggedIn, function (req, res) {
    res.send(`Hello dear ${req.user.name}`);
})

module.exports = router;
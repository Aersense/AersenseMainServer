// Main server routes
const express = require('express');
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

module.exports = router;
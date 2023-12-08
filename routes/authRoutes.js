//Auth Routes
const express = require('express')
const router = express.Router();
const { isLoggedIn, isLoggedOut } = require('./../middleware/authMiddleware.js');
const passport = require('passport');
const User = require('./../models/User.js');
const bcrypt = require('bcrypt');

router.get("/notLoggedIn", function (req, res) {
    res.send("Failed to login.");
});

router.get("/login", function (req, res) {
    res.send("Login Page");
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/notLoggedIn'
}));

router.post('/register', async (req, res) => {
    const exists = await User.exists({ emailId: req.body.emailId });

    if (exists) {
        res.send("User already exists.")
        return;
    };

    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            if (err) return next(err);
            oldUserId++;
            const newUser = new User({
                userId: oldUserId,
                emailId: req.body.emailId,
                password: hash,
                name: req.body.name,
                age: req.body.age,
                country: req.body.country,
                city: req.body.city,
                devices: []
            });
            newUser.save();

            res.send("Registered Successfully");
        });
    });
});

module.exports = router;
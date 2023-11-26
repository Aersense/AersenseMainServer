//jshint esversion:6
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const app = express();
const PORT = process.env.PORT || 3000;
let oldUserId = 1000000;

//Middleware
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: toString(process.env.MySecret),
    resave: false,
    saveUninitialized: true
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());



//DB connection
mongoose.set('strictQuery', true);
const dbURL = process.env.DBURL;
mongoose.connect(dbURL).then(() => {
    console.log("Database connection Established.");
});

//User Schema
const UserSchema = new mongoose.Schema({
    userId: Number,
    emailId: String,
    password: String,
    name: String,
    age: Number,
    country: String,
    city: String,
    devices: [Number]
});
const User = mongoose.model('User', UserSchema);

// Updation of Id's for data integrity in case of server restart
async function updateIds() {
    try {
        let LastUser = await User.findOne({}).sort({ field: 'asc', _id: -1 }).limit(1);
        if (LastUser != null)
            oldUserId = LastUser.userId;
    }
    catch (err) {
        console.log(err);
    }
}
updateIds();    // This helps attain the oldUserId value in case of server restart

// Passport.js
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const USER = await User.findById(id);
    done(null, USER);
});

passport.use(new localStrategy({
    usernameField: 'emailId',
    passwordField: 'password'
},
    function (username, password, done) {
        async function executer1() {
            let user = [];
            try {
                user = await User.findOne({ emailId: username });
            }
            catch (err) {
                return done(err);
            }
            function executer2(user) {
                if (!user) return done(null, false, { message: "Incorrect username" });
                bcrypt.compare(password, user.password, function (err, res) {
                    if (err) return done(err);
                    if (res === false) return done(null, false, { message: "Incorrect password" });
                    return done(null, user);
                });
            }
            executer2(user);
        }
        executer1();
    }
));

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}

function isLoggedOut(req, res, next) {
    if (!req.isAuthenticated()) return next();
    res.redirect('/');
}

//Routes
app.get("/notLoggedIn", function (req, res) {
    res.send("Failed to login.");
});

app.get("/", isLoggedIn, function (req, res) {
    res.send("Logged In and entered Home.");
});

app.get("/login", function (req, res) {
    res.send("Login Page");
});

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/notLoggedIn'
}));

app.post('/register', async (req, res) => {
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

// Server listening
app.listen(PORT, function () {
    console.log(`App is listening on Port : ${PORT}`);
});
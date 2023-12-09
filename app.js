//jshint esversion:6
const dotenv = require('dotenv');
dotenv.config({ path: "./env/secrets.env" });

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
const nodemailer = require("nodemailer");
const PORT = process.env.PORT || 3000;

//Connection for Database
const connectToDB = require('./db/dbConnection.js');
connectToDB();

//Mailer initialisation
const transporter = require('./controllers/nodemailerInitializer.js');

//Middleware
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/frontend'));
app.use(session({
    secret: toString(process.env.MySecret),
    resave: false,
    saveUninitialized: true
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.set('view engine', 'ejs');


// Models
const User = require('./models/User.js');

// Passport.js for user authentication [Do not remove]
app.use(passport.initialize());
app.use(passport.session());
const passportSerialization = require('./config/passportSerialization.js');
const myLocalStrategy = require('./config/localStrategy.js');
const { isLoggedIn, isLoggedOut } = require('./middleware/authMiddleware.js');

//Routes
const mainRoutes = require('./routes/mainRoutes.js');
app.use("/", mainRoutes);
const authRoutes = require('./routes/authRoutes.js');
app.use("/", authRoutes);

// Server listening
app.listen(PORT, function () {
    console.log(`App is listening on Port : ${PORT}`);
});
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('./../models/User.js');
const bcrypt = require('bcrypt');

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
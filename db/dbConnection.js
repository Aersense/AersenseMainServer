const mongoose = require('mongoose');

//DB connection
mongoose.set('strictQuery', true);
const dbURL = process.env.DBURL;

function connectToDB() {
    mongoose.connect(dbURL).then(() => {
        console.log("Database connection Established.");
    });
}

module.exports = connectToDB;
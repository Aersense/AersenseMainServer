const mongoose = require('mongoose');
const User = require('./../models/User.js');

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

module.exports = updateIds;
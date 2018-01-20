const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: true
    },
    username:{
        type: String,
        unique: true,
        required: true,
    },
    password:{
        type: String,
        required: true
    }
});

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const usersSchema = require('../schemas/user');

module.exports = mongoose.model('User', usersSchema);
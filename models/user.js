const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let emailLengthChecker = (email) => {
    if (!email) {
        return false;
    } else {
        if (email.length < 5 || email.length > 30 ) {
            return false;
        } else {
            return true;
        }
    }
};

let validEmailChecker = (email) => {
    if (!email) {
        return false
    } else {
        const regExp = new RegExp(/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/);
        return regExp.test(email);
    }
};

const emailValidators = [{
    validator: emailLengthChecker,
    message: 'E-mail must be at least 5 characters but no more than 30.'
    },
    {
    validator: validEmailChecker,
    message: 'It should be a valid email.'
    }];

let usernameLengthChecker = (username) => {
    if (!username) {
        return false;
    } else {
        if (username.length < 3 || username.length > 15 ) {
            return false;
        } else {
            return true;
        }
    }
};

let validUsernameChecker = (username) => {
    if (!username) {
        return false
    } else {
        const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
        return regExp.test(username);
    }
};

const usernameValidators = [{
    validator: usernameLengthChecker,
    message: 'Username must be at least 3 characters but no more than 15.'
},
    {
        validator: validUsernameChecker,
        message: 'It should be a valid username.'
    }];

let passwordLengthChecker = (password) => {
    if (!password) {
        return false;
    } else {
        if (password.length < 6 || password.length > 16 ) {
            return false;
        } else {
            return true;
        }
    }
};

let validPasswordChecker = (password) => {
    if (!password) {
        return false
    } else {
        const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
        return regExp.test(password);
    }
};

const passwordValidators = [{
    validator: passwordLengthChecker,
    message: 'Password must be at least 3 characters but no more than 15.'
},
    {
        validator: validPasswordChecker,
        message: 'It should be a valid password.'
    }];

const usersSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: true,
        validate: emailValidators
    },
    username:{
        type: String,
        unique: true,
        required: true,
        validate: usernameValidators
    },
    password:{
        type: String,
        required: true,
        validate: passwordValidators
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', usersSchema);
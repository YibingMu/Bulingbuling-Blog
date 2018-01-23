const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

router.post('/register', (req, res) => {
    if (!req.body.username) {
        res.json({success: false, message: 'Username is required'});
    } else {
        if (!req.body.email) {
            res.json({success: false, message: 'E-mail is required'});
        } else {
            if (!req.body.password) {
                res.json({success: false, message: 'Password is required'});
            } else {
                let user = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                });
                user.save((err) => {
                    if (err) {
                        if (err.code === 11000) {
                            res.json({success: false, message: 'Username or E-mail has already exists'});
                        } else{
                            if (err.errors) {
                                if (err.errors.email) {
                                    res.json({success: false, message: err.errors.email.message});
                                } else {
                                    if (err.errors.username) {
                                        res.json({success: false, message: err.errors.username.message});
                                    } else {
                                        if (err.errors.password) {
                                            res.json({success: false, message: err.errors.password.message});
                                        } else {
                                            res.json({success: false, message: 'Could not save user. Error: ', err});
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        res.json({success: true, message: 'Registration Successfully'});
                    }
                });
            }
        }
    }
});

router.get('/checkEmail/:email', (req, res) => {
    if (!req.params.email) {
        res.json({success: false, message: 'No E-mail provided'})
    } else {
        User.findOne({email: req.params.emial}, (err, user) => {
            if (err) {
                res.json({success: false, message: 'Something went wrong' + err})
            } else {
                if (user) {
                    res.json({success: false, message: 'This E-mail is already taken'})
                } else {
                    res.json({success: true, message: 'This E-mail is available'})
                }
            }
        });
    }
});

router.get('/checkUsername/:username', (req, res) => {
    if (!req.params.username) {
        res.json({success: false, message: 'No Username provided'})
    } else {
        User.findOne({username: req.params.username}, (err, user) => {
            if (err) {
                res.json({success: false, message: 'Something went wrong' + err})
            } else {
                if (user) {
                    res.json({success: false, message: 'This Username is already taken'})
                } else {
                    res.json({success: true, message: 'This Username is available'})
                }
            }
        });
    }
});

router.post('/login', (req, res) => {
    if (!req.body.username) {
        res.json({success: false, message: 'Username is needed'});
    } else {
        if (!req.body.password) {
            res.json({success: false, message: 'Password is needed'});
        } else {
            User.findOne({username: req.body.username}, (err, user) => {
                if (err) {
                    res.json({success: false, message: 'Something went wrong' + err});
                } else {
                    if (!user) {
                        res.json({success: false, message: 'Username is not valid'});
                    } else {
                        if (user.password !== req.body.password) {
                            res.json({success: false, message: 'Password is not correct'});
                        } else {
                            const token = jwt.sign({userId: req.body.user_id}, config.secret, {expiresIn: '48h'});
                            res.json({success: true, message: 'Successfully Login', token: token, user: {username: user.username} });
                        }
                    }
                }
            });
        }
    }
});


module.exports = router;
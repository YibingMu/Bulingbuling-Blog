const express = require('express');
const router = express.Router();
const User = require('../models/user');
const config = require('../config/database');

router.use((req, res, next) => {
    if (!req.body.isAdmin) {
        res.json({success: false, message:'Only administrators have permission to enter the back-end.'});
    }
    console.log('ganshenmea');
    next();
});

module.exports = router;
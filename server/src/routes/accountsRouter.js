const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const createToken = require('../config/createToken');
const Account = require('../models/Account');


router.post('/register', async (req, res) => {
    try {
        const {email, password} = req.body;
        console.log(`Email and Passowrd are : ${email}, ${password}`);
        const duplicateUser = await Account.findOne({email});
        if (duplicateUser) {
            return res.status(409).json({message: "A User with the Provided Email Already Exists"});
        }
        const _ = await Account.create({email, password});
        return res.status(201).json({message: "Account Created"});
    } catch (error) {
        console.error(error);
    }
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await Account.findOne({email});
        if (!user) {
            return res.status(404).json({message: "Incorrect Email or Password"});
        }
        const passCheck = await bcrypt.compare(password, user.password);
        if (!passCheck) {
            return res.status(404).json({message: "Incorrect Email or Password"});
        }
        const token = createToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
        });
        res.status(200).json({message: "Login Successful"});
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
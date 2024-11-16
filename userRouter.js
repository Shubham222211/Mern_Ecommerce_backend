
const express = require('express');
const userModel = require('./userModal');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')




userRouter.post("/register", async (req, res) => {
    try {
        // Password format check before hashing
        const password = req.body.password;
        

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        req.body.password = hashedPassword;

        // Attempt to create the user
        const signData = await userModel.create(req.body);
        res.status(200).json({ msg: 'User registered successfully' });
    } catch (error) {
        console.error("Registration error:", error);

        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ msg: 'Validation error', errors: messages });
        }

        // Handle duplicate email error
        if (error.code === 11000 && error.message.includes("email")) {
            return res.status(400).json({ msg: 'Oops! Email already in use.' });
        }

        // Handle other unexpected errors
        res.status(500).json({ msg: 'Unexpected error occurred during registration.' });
    }
});


userRouter.post('/login', async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Verify password with bcrypt
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ msg: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.SECRETKEY, { expiresIn: '1d' });

        res.status(200).json({ msg: 'Login successful', token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ msg: 'Error during login' });
    }
});






module.exports = userRouter;





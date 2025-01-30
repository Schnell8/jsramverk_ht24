import express from 'express';
import checkToken from '../middleware/checkToken.mjs';
import userModel from "../models/userModel.mjs";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import 'dotenv/config';

const router = express.Router();

// Registera route
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Kalla på registerUser i userModel
        const result = await userModel.registerUser({ email, password });

        // Om användaren redan finns
        if (result.message === 'User already exists') {
            return res.status(409).json({
                message: result.message
            });
        }

        // Generera JWT-token
        const token = jwt.sign(
            { userId: result.userId, email: result.email }, // Payload
            process.env.JWT_SECRET, // Secret
            { expiresIn: '1h' } // Token giltighetstid
        );

        // Returnera lyckat meddelande och token
        return res.status(201).json({
            message: result.message,
            token: token,
        });
    } catch (error) {
        console.error('Error in backend route /users/register:', error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
});

// Logga in route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Hämta användaren från databasen med hjälp av e-post
        const user = await userModel.findUserByEmail(email);

        // Om användaren inte finns
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        // Kontrollera lösenordet
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid credentials',
            });
        }

        // Generera JWT-token
        const token = jwt.sign(
            { userId: user.userId, email: user.email }, // Payload
            process.env.JWT_SECRET, // Secret
            { expiresIn: '1h' } // Token giltighetstid
        );

        // Returnera lyckat meddelande och token
        return res.status(200).json({
            message: 'Login successful',
            token: token,
        });
    } catch (error) {
        console.error('Error in backend route /users/login:', error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
});

// Användare route
router.get('/user', checkToken, async (req, res) => {
    const email = req.user.email; // Få e-posten från JWT-token

    try {
        // Hämta användaren från databasen baserat på e-posten
        const user = await userModel.findUserByEmail(email);

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        return res.status(200).json({
            email: user.email,
            docs: user.docs,
        });
    } catch (error) {
        console.error('Error in backend route /users/user:', error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
});

export default router;

import logger from '../config/logger.js';
import User from '../models/user.model.js';
import bcypt from 'bcryptjs';

export const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ fullName, email, password: hashedPassword });
        await user.save();

        res.status(201).json({success: true, message: 'User registered successfully'});

    } catch (err) {
        logger.error('Error in register', err);
        res.status(500).json({success: false, message: 'Internal Server Error'})
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        res.status(200).json({ success: true, message: 'Login successful' });

    } catch (err) {
        logger.error('Error in login', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
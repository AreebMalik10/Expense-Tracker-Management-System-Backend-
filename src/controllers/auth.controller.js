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
        res.status(500).json({success: false, message: 'Internal Server Error'})

    }
}
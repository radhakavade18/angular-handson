const bcrypt = require("bcrypt");
const User = require("../model/User");
const jwt = require("jsonwebtoken");

const JWT_SECRET = 'your jwt secret';

// Register a new user
const register = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.json({ message: "Registration successful!" })
    } catch (error) {
        next(error);
    }
}

// login with existing user
const login = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) {
            return res.status(404).json({ message: "Incorrect password" });
        }

        const token = jwt.sign({ userId: user_id }, JWT_SECRET, {
            expiresIn: '1 hour'
        });
        res.json({ token });
    } catch (error) {
        next(error);
    }
}

module.exports = { register, login }
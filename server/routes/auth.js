import express from "express";
const router = express.Router();
// import { v4 as uuidv4 } from 'uuid';

import User from "../model/User.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = 'your jwt secret';

// Registration route
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }
        const newUser = new User({ username, email, password, roles });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
})

// login route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isValidPassword = await user.isValidPassword(password);

        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Create JWT
        const token = jwt.sign(
            { id: user._id, roles: user.roles },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
})

// middleware to verify token 
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'No token provided' });

    jwt.verify(token, JWT_SECRET, (err, decode) => {
        if (err) return res.status(500).json({ message: 'Failed to authenticate token' });
        req.userId = decoded.id;
        req.roles = decoded.roles;
        next();
    })
}

// Route to Access a Protected Resource
router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'This is a protected route', roles: req.roles });
});

// check roles
const checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.roles.some(role => roles.includes(role))) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
};

// Example protected route for admins only
router.get('/admin', verifyToken, checkRole(['admin']), (req, res) => {
    res.json({ message: 'Admin content' });
});

// Getting the list of users from the mock database
// router.get('/', (req, res) => {
//     res.send(users);
// });

// router.post('/', (req, res) => {
//     //req.body property contains the data (first name, last name, and email) that the client will send as part of the POST request's body.
//     const newUser = req.body;
//     users.push({ ...newUser, id: uuidv4() });
//     res.send(`${newUser.userName} has been added to the database`);
// })

// router.get('/:id', (req, res) => {
//     //req.params, which holds the values of route parameter
//     const { id } = req.params;
//     const foundUser = users.find((user) => user.id === id);
//     res.send(foundUser)
// })

// router.delete('/:id', (req, res) => {
//     const { id } = req.params;
//     users = users.filter((user) => user.id !== id);
//     res.send(`${id} is removed from database`);
// })

// router.patch('/:id', (req, res) => {
//     const { id } = req.params;
//     const { userName, email, password } = req.body;

//     const user = users.find((user) => user.id !== id);
//     if (userName) {
//         user.userName = userName;
//     }
//     if (password) {
//         user.password = password;
//     }
//     if (email) {
//         user.email = email
//     }

//     res.send(`User with id ${id} has been updated`);
// })

export default router;
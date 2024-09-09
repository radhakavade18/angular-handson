const bcrypt = require("bcrypt");
const User = require("../model/User");
const jwt = require("jsonwebtoken");

const JWT_SECRET = 'your_jwt_secret_should_be_long';

// Register a new user
const register = (req, res, next) => {
    const { username, email, password } = req.body;

    // hashed password
    bcrypt.hash(password, 10).then((hashedPassword) => {
        const user = new User({ username: username, email: email, password: hashedPassword });

        user.save()
            .then((result) => {
                res.status(201).json({ message: "Registration successful!", result: result });
            })
            .catch(error => {
                res.status(500).json({ error: error });
            });
    }).catch(error => {
        res.status(500).json({ error: error });
    });
}

// login with existing user
const login = async (req, res, next) => {

    let fetchedUser;
    User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(result => {
        if (!result) {
            return res.status(401).json({ message: "User not found" });
        }
        // generate new token, by passing 2 required parameters and 1 optional parameter
        // encoding data into the token - email and userId
        const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id }, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ token: token, expiresIn: 3600, userId: fetchedUser._id });
    }).catch(err => {
        return res.status(401).json({ message: "User not found" });
    });

}

module.exports = { register, login }
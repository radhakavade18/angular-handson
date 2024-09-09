const jwt = require("jsonwebtoken");

const JWT_SECRET = 'your_jwt_secret_should_be_long';

const authenticate = async (req, res, next) => {
    // get the token from user in a header object
    try {
        const token = req.headers.authorization?.split(" ")[1];
        // we get back the decoded token 
        const decodedToken = jwt.verify(token, JWT_SECRET);
        // add extra info to the the request which is running after the auth check
        req.userData = { email: decodedToken.email, userId: decodedToken.userId }
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication Failed' });
    }
}

module.exports = authenticate;

/*
    to protect routes by validating if user is Autheticated or not, we created a middleware which checks if,
    request has token and it should be valid, then and then only we able to access that route to the user.
*/
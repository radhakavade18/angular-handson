const express = require('express');
const bodyParser = require("body-parser");
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const postsRoutes = require('./routes/posts');
const cors = require("cors");
const Posts = require('./model/Posts');
const mongoose = require("mongoose");


const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'x-access-token']
}));

const PORT = 3001;

// connect to mongoDB
connectDB();

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// parse request of content type - application/x-www-form-urlencoded
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("HELLO FROM HOMEPAGE")
})

// Define authentication routes
// app.use('/auth', authRoutes);

// Define user routes
// app.use('/user', userRoutes);

// Define posts routes
app.use('/posts', postsRoutes)

app.listen(PORT, () => {
    console.log(`Server is listening on port: http://localhost:${PORT}`);
})
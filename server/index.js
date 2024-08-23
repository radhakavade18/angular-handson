const express = require('express');
const bodyParser = require("body-parser");
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const cors = require("cors");
const Posts = require('./model/Posts');
const mongoose = require("mongoose")

const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
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

app.post('/posts', (req, res, next) => {
    const post = new Posts({ title: req.body.title, content: req.body.content })
    // console.log(post);
    post.save().then((createdPost) => {
        res.status(201).json({
            message: "Post added successfully!",
            postId: createdPost._id
        })
    })
})

app.get('/posts', (req, res) => {
    Posts.find().then(documents => {
        res.status(200).json({
            message: "Posts fetch successfully!",
            posts: documents
        })
    });
})

app.delete('/posts/:id', (req, res) => {
    const postId = req.params.id;
    Posts.deleteOne({ _id: postId }).then((result) => {
        console.log(result);
        res.status(200).json({ message: "Post deleted" })
    })
})

app.listen(PORT, () => {
    console.log(`Server is listening on port: http://localhost:${PORT}`);
})
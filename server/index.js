const express = require('express');
const bodyParser = require("body-parser");
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const cors = require("cors");
const app = express();
const path = require("path");

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'x-access-token', 'Authorization']
}));

const PORT = 3001;

// connect to mongoDB
connectDB();

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// parse request of content type - application/x-www-form-urlencoded
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/images", express.static(path.join('server/images')))

app.get('/', (req, res) => {
    res.send("HELLO FROM HOMEPAGE")
})

// Define posts routes
app.use('/posts', postsRoutes)

// Define user routes
app.use('/user', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on port: http://localhost:${PORT}`);
})
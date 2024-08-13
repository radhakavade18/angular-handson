import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js"
import cors from "cors";
import mongoose from "mongoose";

const corsOption = {
    origin: "http://localhost:4200/"
}

const app = express();
app.use(cors(corsOption));

const PORT = 3001;
// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

// parse request of content type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// connect to mongoDB
mongoose.connect('mongodb://localhost:27017/auth-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to mongoDB")).catch((err) => console.log('Failed to connect with Mongodb'))

app.get('/', (req, res) => {
    console.log("[GET ROUTE]");
    res.send("HELLO FROM HOMEPAGE")
})

//routes 
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on port: http://localhost:${PORT}`);
})
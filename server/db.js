const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://radhakavade:wRUVQNSl2eb2cGNC@mean.ouqmj.mongodb.net/");
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }
};

module.exports = connectDB;
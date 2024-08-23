const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    title: { type: String, require: true },
    content: { type: String, require: true }
})

const Posts = mongoose.model("Post", postSchema);

module.exports = Posts;
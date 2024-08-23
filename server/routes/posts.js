const express = require('express');
const router = express.Router();
const Posts = require('./model/Posts');


router.post('/', (req, res, next) => {
    const post = new Posts({ title: req.body.title, content: req.body.content })
    console.log(post);
    post.save().then((createdPost) => {
        res.status(201).json({
            message: "Post added successfully!",
            postId: createdPost._id
        })
    })
})

router.get('/', (req, res) => {
    Posts.find().then(documents => {
        res.status(200).json({
            message: "Posts fetch successfully!",
            posts: documents
        })
    });
})

router.delete('/:id', (req, res) => {
    const postId = req.params.id;
    Posts.deleteOne({ _id: postId }).then((result) => {
        console.log(result);
        res.status(200).json({ message: "Post deleted" })
    })
})

module.exports = router;
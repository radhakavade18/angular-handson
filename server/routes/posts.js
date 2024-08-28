const express = require('express');
const router = express.Router();
const Posts = require('../model/Posts')

router.post('', (req, res, next) => {
    const post = new Posts({ title: req.body.title, content: req.body.content })
    // console.log(post);
    post.save().then((createdPost) => {
        res.status(201).json({
            message: "Post added successfully!",
            postId: createdPost._id
        })
    })
})

router.get('', (req, res) => {
    Posts.find().then(documents => {
        res.status(200).json({
            message: "Posts fetch successfully!",
            posts: documents
        })
    });
})

router.get("/:id", (req, res, next) => {
    Posts.findById(req.params.id).then((post) => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "Post not found" });
        }
    })
})

router.delete('/:id', (req, res) => {
    const postId = req.params.id;
    Posts.deleteOne({ _id: postId }).then((result) => {
        console.log(result);
        res.status(200).json({ message: "Post deleted" })
    })
})

router.put('/:id', async (req, res, next) => {
    const post = new Posts({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    })

    Posts.updateOne({ _id: req.body.id }, post).then((result) => {
        console.log(result);
        res.status(200).json({ message: "Post updated successfully!" })
    })
})

module.exports = router;
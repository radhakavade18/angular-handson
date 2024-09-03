const express = require('express');
const router = express.Router();
const Posts = require('../model/Posts')
const multer = require("multer");

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
}

// multer configuration to store images
const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cd(error, "images")
    },
    filename: (req, file, cd) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cd(null, name + '_' + Date.now() + '.' + ext);
    }
})

router.post('', multer({ storage: storage }).single("image"), (req, res, next) => {
    const url = req.protocol + '://' + req.get("host");
    const post = new Posts({ title: req.body.title, content: req.body.content, imagePath: url + "/images/" + req.file.filename });
    console.log("new post", post)
    post.save().then((createdPost) => {
        res.status(201).json({
            message: "Post added successfully!",
            post: {
                ...createdPost,
                id: createdPost._id
            }
            // post: {
            //     id: createdPost._id,
            //     title: createdPost.title,
            //     content: createdPost.content,
            //     imagePath: createdPost.imagePath
            // }
        })
    })
})

router.get('', (req, res) => {
    // extract anything from req.query is string as a type
    console.log(req.query)
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const postQuery = Posts.find();
    let fetchedPosts;
    if (pageSize && currentPage) {
        postQuery
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize)
    }
    postQuery.then(documents => {
        fetchedPosts = documents;
        return Posts.countDocuments();
    }).then(count => {
        res.status(200).json({
            message: "Posts fetch successfully!",
            posts: fetchedPosts,
            maxPosts: count
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

router.put('/:id', multer({ storage: storage }).single("image"), async (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
        const url = req.protocol + '://' + req.get("host");
        imagePath = url + '/images/' + req.file.filename;
    }
    const post = new Posts({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        imagePath: imagePath
    })

    Posts.updateOne({ _id: req.body.id }, post).then((result) => {
        console.log(result);
        res.status(200).json({ message: "Post updated successfully!" })
    })
})

module.exports = router;
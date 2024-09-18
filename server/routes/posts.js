const express = require('express');
const router = express.Router();
const authenticate = require("../middleware/auth");         // for protecteting routes 
const extractFile = require("../middleware/file");
const postController = require("../controller/posts");
const Posts = require('../model/Posts');

router.post('', authenticate, extractFile, postController.createPost)

router.get('', postController.fetchPosts)

router.get("/:id", postController.getPost)

router.delete('/:id', authenticate, postController.deletePost);

router.put('/:id', authenticate, extractFile, postController.updatePost)

module.exports = router;
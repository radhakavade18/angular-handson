const Posts = require('../model/Posts')

exports.createPost = (req, res, next) => {
    const url = req.protocol + '://' + req.get("host");
    const post = new Posts({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + "/images/" + req.file.filename,
        creator: req.userData.userId
    });

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
    }).catch(error => {
        res.status(500).json({ message: "Post creation failed!" })
    })
}

exports.fetchPosts = (req, res) => {
    // extract anything from req.query is string as a type
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const postQuery = Posts.find();
    let fetchedPosts;
    if (pageSize && currentPage) {
        postQuery
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize)
    }
    postQuery.lean().then(posts => {
        fetchedPosts = posts.map(post => {
            post.creator = post.creator.toString(); // Convert ObjectId to string
            return post;
        });
        return Posts.countDocuments();
    }).then(count => {
        res.status(200).json({
            message: "Posts fetch successfully!",
            posts: fetchedPosts,
            maxPosts: count
        })
    }).catch(error => {
        res.status(500).json({ message: "Fetching posts failed!" })
    });
}

exports.getPost = (req, res, next) => {
    Posts.findById(req.params.id).then((post) => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "Post not found" });
        }
    }).catch(error => {
        res.status(500).json({ message: "Fetching post failed!" })
    });
}

exports.deletePost = (req, res) => {
    const postId = req.params.id;
    Posts.deleteOne({ _id: postId, creator: req.userData.userId }).then((result) => {
        if (result.deletedCount > 0) {
            return res.status(200).json({ message: "Post deleted successfully!" });
        } else {
            return res.status(401).json({ message: "Not Authorized!" });
        }
    }).catch(error => {
        return res.status(500).json({ message: "Something went wrong", error });
    });
}

exports.updatePost = async (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
        const url = req.protocol + '://' + req.get("host");
        imagePath = url + '/images/' + req.file.filename;
    }
    const post = new Posts({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        imagePath: imagePath,
        creator: req.userData.userId
    })

    // only update if post id and creator id is same
    Posts.updateOne({ _id: req.body.id, creator: req.userData.userId }, post).then((result) => {
        if (result.matchedCount > 0) {
            res.status(200).json({ message: "Post updated successfully!" })
        } else {
            res.status(401).json({ message: "Not Authorised!" })
        }
    }).catch(error => {
        res.status(500).json({ message: "Couldn't update post!" })
    })
}
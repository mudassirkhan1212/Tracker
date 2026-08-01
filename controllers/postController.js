const Post = require("../models/post");

exports.newPost = async (req, res) => {
  try {
    const newPost = new Post({
      companyName: req.body.companyName?.trim() || null,
      departmentName: req.body.departmentName?.trim() || null,
      refrenceEmployee: req.body.refrenceEmployee,
      totalEmployee: req.body.totalEmployee,
    });
    await newPost.save();
res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    }); 
   } 
    catch (error){
   res.status(500).json({
      message: "Error creating post",
      error: error.message,
    });
    }

};


exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching posts",
      error: error.message,
    });
  }
};
const express = require('express');
const router = express.Router();
const Post = require('../models/Post')
const User= require('../models/User')
const uploadCloud = require('../config/cloudinary');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/', ensureLoggedIn('/auth/login'), (req, res, next) => {
    res.render('auth/profile');
  });
  router.post('/', [ensureLoggedIn('/auth/login'), uploadCloud.single('image')] ,(req,res,next)=>{
    const imageURL  = req.file.url;
    console.log(`${imageURL }`);
  
    req.user.update({image:imageURL})
    .then(() => {
      res.redirect("/auth/profile");
    })
  

  })
  
  router.get('/user', (req, res, next) => {
    Post.find({imageURL:req.user.image})
      .then(posts => {
        console.log(posts)
        res.render('posts/posts', {posts});
      })
  });
  router.get("/view", (req, res) => {
    res.render("user")
  })
  
  module.exports = router;
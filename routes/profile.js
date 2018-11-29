const express = require('express');
const router = express.Router();
const Post = require('../models/Post')
const User = require('../models/User')
const uploadCloud = require('../config/cloudinary');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const isActive = require("../middleware/confirmEmail");




router.post('/', [ensureLoggedIn('/auth/login'),isActive(), uploadCloud.single('photo')], (req, res, next) => {
  const {text,
    content
  } = req.body;
  const creatorId = req.user._id;
  const pictureURL = req.file.url;
  const picName = req.file.originalname;

  let newPost = new Post({
    text:text,
    coments: content,
    author: creatorId,
    picture: pictureURL
  });


  newPost.save()
    .then(() => {
      res.redirect('/profile');
    })
    .catch((err) => {
      return err
    })
})

router.get('/', [ensureLoggedIn('/auth/login'),isActive()],(req, res, next) => {
  Post.find({author:req.user._id})
    .then(posts => {
      console.log(posts)
      res.render('posts/posts', {posts});
    })
});

module.exports = router;
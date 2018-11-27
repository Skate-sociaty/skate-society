const express = require('express');
const router = express.Router();
const Post = require('../models/Post')
const uploadCloud = require('../config/cloudinary');
const { passport, ensureLoggedOut } = require('connect-ensure-login');
const passport=require ('passport');




router.get('/views/auth/profile', passport('/views/auth/login'), (req, res, next) => {
  res.render('../routes/profile', req.user);
});
router.post('/profile', [passport('/login'), uploadCloud.single('photo')] ,(req,res,next)=>{
  const {content} = req.body;
  const creatorId = req.user._id;
  const picPath = req.file.url;
  const picName = req.file.originalname;

  console.log(`${content}, ${creatorId}, ${picPath}, ${picName}`);

  let newPost = new Post({content, creatorId, picPath, picName});

  console.log(newPost);

  newPost.save()
  .then(()=>{
    res.redirect('/profile');
  })
  .catch((err)=>{
    return err
  })
})

router.get('/profile', (req, res, next) => {
  res.render('profile', req.user);
});

module.exports = router;
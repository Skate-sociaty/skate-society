require('dotenv').config();
const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const transporter=require('../mail/transporter')
const isActive = require("../middleware/confirmEmail");
const moment = require("moment");
const Event = require("../models/Events")
const Post = require('../models/Post')

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const nodemailer=require("nodemailer")

router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});
router.get ('/profile',isActive(),(req,res,next)=>{
  Post.find({author: req.user._id}).then(function(allMyPostsPayload){
    res.render('auth/profile', {allMyPosts: allMyPostsPayload})
  })
  
})


router.post("/login", passport.authenticate("local", {
  successRedirect: "/auth/profile",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true

})

);

router.get("/signup", (req, res, next) => {

  res.render("auth/signup");
});
router.get("/pepe",isActive(), (req, res, next) => {
  res.render("auth/pepe");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const confpass = req.body.confpass;
  const email = req.body.email;

  const createdAt=req.body.createdAt;
  const updatedAt=req.body.updatedAt;
  
 
  if (confpass!==password){
    
    res.render("auth/signup", { messageWrongPass: "wrong password when you try to confirm" })
    return
  }

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    const hashPassConf = bcrypt.hashSync(confpass,salt)
    const newUser = new User({
      username,
      password: hashPass,
      email,
      confpass:hashPassConf
    });
      
    newUser.save()
    .then(() => {
      transporter.sendMail({
        from: 'Miguel <migueliron166@gmail.com>',
        to: email,
        subject: 'Confirmation message',
        text: 'Confirmation message',
        html: `<h1>WELCOME TO SKATE-SOCIETY</h1>
        <img src="https://cdn.pixabay.com/photo/2015/06/25/16/54/skater-821502_960_720.jpg"></img>
        <p> To confirm you have logged in our web click in the link below </p>
        <a href="http://localhost:3000/auth/confirm/${encodeURIComponent(newUser.confpass)}">CONFIRM<a>`,
      }
    ).then(() => {
      res.redirect("/");
    })
    .catch(err => {
      res.render("auth/signup", { message: "Something went wrong" });
    })
  });
});
});

router.get("/confirm/:confpass", (req, res) => {
  User.find({ confpass: req.params.confpass })
    .then((user) => {
      if (user !== null) {
        let status = "Active"
        User.findByIdAndUpdate(user[0]._id, { status })
          .then((user) => {
            res.render('auth/confirm', { message: "Confirmation Successful" });
          })
          .catch((err) => {
            res.render('auth/confirm', {
              message: `Confirmation FAILED. Please check that everything is in order at the nodemailer. 
        Error: ${err}`
            });
            return err
          })
      }
    })
    .catch((err) => {
      return err
    })
})


router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;

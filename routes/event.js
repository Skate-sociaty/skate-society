require('dotenv').config();
const express = require("express");
const router = express.Router();
const isActive = require("../middleware/confirmEmail");
const Event = require("../models/Events")

router.get("/", (req, res, next) => {
    res.render("auth/event");
  });
router.post("/",(req, res, next) => {
    const {title,description,place,time,date}=req.body;
    const join_us=[req.user._id];
    
    const newEvent = new Event({
      title,
      description,
      place,
      date,
      time,
      join_us
    }) 
    
    if (title === "" || description === "" || place === "" || date === "" || time === "") {
        res.render("auth/event", { message: "Some field is empty" });
        return;
      }

    newEvent.save()
    .then((event) => {
      console.log(event);
      
      res.redirect("/event/showevent")
    })
  })

  router.get('/showevent',(req,res,next)=>{
    Event.find()
    // .populate("join_us", "username")
    .then(events => {
      res.render('auth/forum', {events})
    })
  }) 
  
  router.get("/showevent/:id",(req,res,next)=>{
    Event.findById(req.params.id)
    .populate("join_us", "username")
    .then(event=>{
      res.render('auth/showevent', {event})
    })
  })
  
  router.get("/join/:eventid",(req,res,next)=>{
    Event.findByIdAndUpdate(req.params.eventid, {$push:{join_us:req.user._id}}, {new:true})
    .then(event=>{
      res.redirect(`/event/showevent/${event._id}`)
  })
  })
  
module.exports = router;
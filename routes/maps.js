require('dotenv').config();
const express = require("express");

const router = express.Router();
const User = require("../models/User");
const transporter = require('../mail/transporter')
const isActive = require("../middleware/confirmEmail");
const Park = require("../models/Parks");
const Event = require("../models/Events")

router.get("/", (req, res, next) => {
  Park.find()
  .then(parks => {
    const JSONparks = JSON.stringify(parks)
    res.render("auth/maps", {parks:JSONparks});
  })
});
router.post("/", (req, res, next) => {
  
  const park = {map, title}= req.body;
  const {lat, lng} = req.body;
  park.position = {lat, lng}
  console.log(park);
  
  const newPark = new Park(park)
  newPark.save()
  .then(park => {
    console.log(park);
    res.redirect("/maps");
  })
});
module.exports = router;
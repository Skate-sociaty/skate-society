const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const eventSchema= new Schema({
  title:String,
  text:String,
  place:String,
  date:Date,
  join_us:[{type: Schema.Types.ObjectId, ref:'user'}]
});
const Events = mongoose.model('Events',eventSchema)
module.exports= Events;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const parkSchema = new Schema({
  position: {
    lat:Number,
    lng:Number
  },
  map: String,
  title:String
})

const Parks = mongoose.model('Parks', parkSchema)
module.exports = Parks;
const Mongoose = require('mongoose');
const Schema=mongoose.Schema;
const eventoSchema= new Schema({
  title:String,
  text:String,
  place:String,
  date:Date,
  join_us:[Array]
});
const Eventos = mongoose.model('Eventos',eventoSchema)
module.exports= Eventos;
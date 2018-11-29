const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const eventSchema = new Schema({
  title: String,
  description: String,
  place: String,
  date: String,
  time:String,
  join_us: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
  });
const Events = mongoose.model('Events', eventSchema)
module.exports = Events;
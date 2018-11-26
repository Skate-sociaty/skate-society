const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email:String,
  password: String,
  confpass:String,
  status: {type:String,enum:["Pending Confirmation", "Active"], default:"Pending Confirmation"},
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  tries:{type:Number, default:0}
});

const User = mongoose.model('User', userSchema);
module.exports = User;
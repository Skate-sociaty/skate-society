const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const postSchema= new Schema({
  author:{type: Schema.Types.ObjectId , ref:"User"},
  picture:String,
  coments:String,
  video:String,
  ratio:Number,
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
const Post= mongoose.model('Post',postSchema);
module.exports=Post;
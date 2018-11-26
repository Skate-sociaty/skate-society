const Mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const postSchema= new Schema({
  picture:URL,
  coments:String,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  video:URL,
  ratio:Number,
})
const Post= mongoose.model('Post',postSchema);
module.exports=Post;
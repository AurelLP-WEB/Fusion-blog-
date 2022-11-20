const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    username:String,
    image: String,
});
const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
const Post = require('./database/models/Post');
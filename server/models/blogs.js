const mongoose = require('mongoose');

let blogSchema = mongoose.Schema({
  title: String,
  content: String,
},{
  timestamps: true
})

let blog = mongoose.model('blog', blogSchema)

module.exports = blog;

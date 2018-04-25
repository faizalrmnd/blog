const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
  email: String,
  password: String,
  article: [{ type: mongoose.Schema.Types.ObjectId, ref: 'blog' }]
},{
  timestamps: true
})

let user = mongoose.model('user', userSchema)

module.exports = user;

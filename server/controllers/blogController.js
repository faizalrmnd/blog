const jwt = require('jsonwebtoken');
const users = require('../models/users');
const blog = require('../models/blogs');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config()

module.exports = {
  addArticle: function (req, res) {
    let token = req.headers.token;

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      let newBlog = new question({
        title: req.body.title,
        content: req.body.content
      })

      newBlog.save((err, result) => {
        if(err) {
          console.log(err);
        } else {
          res.status(201).json({
            message: 'successfully added a new question !',
            data: result
          })
        }

        users
          .findOneAndUpdate({ _id: decoded.id }, {
            $push: { article: mongoose.Types.ObjectId(result._id) }
          })
          .then(update => {
            res.status(200).json({
              message: `berhasil menambah data ${result.activity}`,
              data: update
            })
          })
          .catch(err => {
            res.status(500).json({
              message: 'failed to update data'
            })
          })
      })
    })
  },
  getArticle: function(req, res) {
    let id = mongoose.Types.ObjectId(req.params.id)

    users
      .findById(id)
      .populate('todo')
      .then(user => {
        res.status(200).json({
          message: 'success get data',
          data: user
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'failed to get data'
        })
      })
  },
  updateArticle: function (req, res) {
    blog.findByIdAndUpdate({ _id: req.body.id }, {
      title: req.body.title,
      content: req.body.content
    })
    .then(update => {
      res.status(200).json({
        message: `berhasil mengubah data`,
        data: update
      })
    })
  },
  removeArticle: function (req, res) {
    blog.findByIdAndRemove({ _id: req.body.id })
    .then(update => {
      res.status(200).json({
        message: `berhasil menghapus data`,
        data: update
      })
    })
  }
};

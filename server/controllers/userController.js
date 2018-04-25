const jwt = require('jsonwebtoken');
const users = require('../models/users');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config()



module.exports = {
  signUp: function(req, res) {
    users.findOne({
      username: req.body.username
    })
    .then(userData => {
      if(userData == null) {
        const saltRounds = 10;
        let pass = bcrypt.hashSync(req.body.password, saltRounds);

        let newUser = new users({
          username: req.body.username,
          password: pass
        })

        newUser.save((err, result) => {
          if(err) {
            console.log(err);
          } else {
            let token = jwt.sign({ id: result._id, username: result.username }, process.env.SECRET)
            res.status(201).json({
              message: 'successfully added a new user !',
              token: token
            })
          }
        })
      } else {
        res.status(400).json({
          msg: 'Username taken, pick another username!'
        })
      }
    })


  },
  signIn: function(req, res) {
    users
      .findOne({ username: req.body.username})
      .then(user => {
        if(bcrypt.compareSync(req.body.password, user.password)){
          let token = jwt.sign({ id: user._id, username: user.username }, process.env.SECRET)
          res.status(200).json({
            token: token
          })
        } else {
          res.status(500).json({
            msg: 'wrong password or username!'
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          msg: 'wrong password or username!'
        })
      })
  }
};

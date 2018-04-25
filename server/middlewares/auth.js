
var jwt = require('jsonwebtoken');
const users = require('../models/users');
var bcrypt = require('bcryptjs');
const ObjectID = require('mongodb').ObjectID
require('dotenv').config()


module.exports = {
  isUser(req, res, next){

    let token = req.headers.token;
    // console.log(token);

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if(token){
        users.findOne({_id:ObjectID(decoded.id)})
             .then(users => {
               // console.log(users);
               if(!users){
                  res.status(401).json({
                    message: "You need to Login"
                  })
               }else{
                  next()
               }
             })
             .catch(err =>{
                res.status(500).json({
                  message: err
                })
             })
      }else{
        res.status(403).json({
          message: "You need to Login",
          data: token
        })
      }
    });
  }
};

const mongoose=require("mongoose");
const connection = require('../config/mongoose');

const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(connection);
const multer = require('multer');
const path = require('path');
// const PDF_PATH = path.join('/assignments');
const PDF_PATH = path.join('/submissions');

const schema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true

    },
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
     rollNo:{
         type:Number,
        
        
     },
     assignmentSubmitted:{
         type:Array
         
    },
     
},{
    timestamps:true
})


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',PDF_PATH));
    },
    filename: function (req, file, cb) {
        console.log(file);
      cb(null, Date.now()+file.originalname)
    }
  });

  //static functions
  schema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');
  schema.statics.avatarPath = PDF_PATH;

schema.plugin(autoIncrement.plugin, { model: 'student', field: 'rollNo' }); 

const model = connection.model('student', schema);



module.exports=model;
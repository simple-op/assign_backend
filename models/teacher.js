const mongoose=require("mongoose");
const connection = require('../config/mongoose');

const autoIncrement = require('mongoose-auto-increment');

const multer = require('multer');
const path = require('path');
const PDF_PATH = path.join('/assignments');

autoIncrement.initialize(connection);


const schema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
     ,
     empId:{
         type:Number,
         required:true,
        
     },

     assignmentGiven:{
         type:Array,
     }
     
    

     

},{
    timestamps:true
})


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',PDF_PATH));
    },
    filename: function (req, file, cb) {
      const  name=Date.now()+file.originalname;
      cb(null, name)
       return name;
    }
  });

  //static functions
  schema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');

  schema.statics.avatarPath = PDF_PATH;
  
schema.plugin(autoIncrement.plugin, { model: 'Teacher', field: 'empId' });

const model = connection.model('Teacher', schema);









// const model=mongoose.model("doctors",schema);

module.exports=model;
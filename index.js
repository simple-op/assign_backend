// const  bodyParser  = require('body-parser');
const express = require('express');
// const formData = require("express-form-data");
const app = express();
const db = require('./config/mongoose');
const port=process.env.PORT||8000;
const passport = require('passport');
// var multer = require('multer');
// var upload = multer();
var bodyParser = require('body-parser');
const {upload} =require("./api/upload")
const path =require("path")

const cors = require('cors');
app.use(express.static(path.join(__dirname, '/assignments')));
app.use(express.static(path.join(__dirname, '/submissions')));
app.use(cors());


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());  
// in latest body-parser use like below.
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(formData.union());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));






app.use('/',require('./routes'));
// app.post("/upload",upload)
 










app.listen(port,(err)=>{
    if(err){
        console.log(`Server is not running Error: ${err}`)
    }
    console.log(`Server is running on port: ${port}`); 
})
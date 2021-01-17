const express = require('express');
const passport=require("../config/passport-jwt")
const router = express.Router();
const signup = require('../api/signup');
const signin = require('../api/signin');
const info = require('../api/info');
const assignment=require("../api/assignment")
const grade=require("../api/grade")
const {upload,uploadAssignment, uploadSubmission} =require("../api/upload")

// router.get('/')

// const passport=require("../config/passport-jwt")
router.post('/signup',signup);
router.post('/signin',signin);
router.get("/",passport.authenticate('jwt',{session: false}),info)
router.post("/upload",passport.authenticate('jwt',{session: false}),upload);
router.post("/uploadAssignment",passport.authenticate('jwt',{session: false}),uploadAssignment);
router.post("/uploadSubmission",passport.authenticate('jwt',{session: false}),uploadSubmission);
router.get("/assignment",assignment);
router.post("/grade",grade);

module.exports = router;   
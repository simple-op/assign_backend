const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const Student = require('../models/student');
const Teacher = require("../models/teacher");


// options for jwt secret string ,and bearer token extraction
let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'ptwmjgad'
}

console.log("jwtPayLoad")
passport.use(new JWTStrategy(opts, function (jwtPayLoad, done) {

  
    Student.findById(jwtPayLoad._id, function (err, user) {
        console.log(jwtPayLoad, "asdsa")
        if (err) {
            console.log('Error in finding user from JWT');
            return;
        }

        if (user) {
            return done(null, user);
        } else {
           
            Teacher.findById(jwtPayLoad._id, function (err, user) {
                console.log(jwtPayLoad, "asdsa")
                if (err) {
                    console.log('Error in finding user from JWT');
                    return;
                }
        
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            }) 
        }
    })

  

}));


module.exports = passport;
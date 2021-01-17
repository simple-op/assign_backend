const Student = require("../models/student");
const Teacher = require("../models/teacher");

const signUp = async function (req, res) {
  console.log(req.body.name);
  try {
    //if email already exist
    if(req.body.email){
      req.body.email=req.body.email.toLowerCase();
    }

    if (req.body.role == "student") {
        const teacher = await Teacher.findOne({ email: req.body.email });
        const student = await Student.findOne({ email: req.body.email });
        if (teacher) {
          return res.json(409, {
            status:409,
            message: "User already exists",
          });
  
         
        }
       
        else if (student) {
          return res.json(409, {
            status:409,
            message: "User already exists",
          });   
      } else { 
        await Student.create(req.body);
        return res.json(200, {
          message: "Registered Successfully",
        });
      }
    }
 else  if (req.body.role == "teacher") {
      const teacher = await Teacher.findOne({ email: req.body.email });
      const student = await Student.findOne({ email: req.body.email });
      if (teacher) {
        return res.json(409, {
          message: "User already exists",
        });

       
      }
     
      else if (student) {
        return res.json(409, {
          message: "User already exists",
        });   
    }
      
      else {
        await Teacher.create(req.body);
        return res.json(200, {
          message: "Registered Successfully",
        });
      }
    }

  else{
      throw new Error("");
  }  
  } catch (err) {
    console.log(err);
    return res.json(404, {
      err:err,
      message: "err in register ",
    });
  }
};

module.exports = signUp;

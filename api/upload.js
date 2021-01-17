const Student = require("../models/student");
const Teacher = require("../models/teacher");
const fs = require("fs");
const path = require("path");

function assignment(id,name, path, deadline) {
  return {
    id,  
    name,
    path,
    deadline,
    givenOn:new Date()
  };
}

function submission(id,assignmentId,teacher, path) {
  return {
    assignmentId,
    id,  
    grade:"-",
    path,
    teacher ,
    SubmittedOn:new Date()
  };
}



module.exports.upload = async (req, res) => {
  try {
    let teacher = await Teacher.findOne({ email: req.user.email });
    
  
    if(teacher)
    Teacher.uploadedAvatar(req, res, (err) => {
      if (err) {
        console.log(`Multer error`, err);
        return;
      }
      

      return res.json(200, {
        message: "File Uploaded",
        link: "http://localhost:8000/" + req.file.filename,
        status: 200,
      });
    });
    else
     Student.uploadedAvatar(req, res, (err) => {
      if (err) {
        console.log(`Multer error`, err);
        return;
      }
      

      return res.json(200, {
        message: "File Uploaded",
        link: "http://localhost:8000/" + req.file.filename,
        status: 200,
      });
    });
  } catch (err) {
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.uploadAssignment = async (req, res) => {
  try {
    let teacher = await Teacher.findOne({ email: req.user.email });

    if (req.body.name && req.body.file && req.body.deadline) {
      teacher.assignmentGiven.push(
        assignment(teacher.assignmentGiven.length,req.body.name, req.body.file, req.body.deadline)
      );
      
      teacher.save();
      return res.json(200, {
        message: "Assignment Uploaded",
      });
    }
    throw new Error("All fields are required");
  } catch (err) {
    return res.json(500, {
      message: err,
    });
  }
};


module.exports.uploadSubmission = async (req, res) => {
  try {
    let student = await Student.findOne({ email: req.user.email });
    console.log(req.body)
    
    if ((req.body.id!=undefined)&&req.body.file&&req.body.teacher) {
      student.assignmentSubmitted.push(
        submission(student.assignmentSubmitted.length,req.body.id,req.body.teacher,req.body.file)
      );
      
      student.save();
      return res.json(200, {
        message: "Submission Uploaded",
      });
    }
    return res.json(400, {
      message: "Submission Denied",
    });
    
  } catch (err) {
    return res.json(500, {
      message: err,
    });
  }
};
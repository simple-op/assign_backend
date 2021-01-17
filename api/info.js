const Student = require("../models/student");
const Teacher = require("../models/teacher");
const jwt = require('jsonwebtoken');


const info= async function(req, res){
    try{
        
        let student = await Student.findOne({email: req.user.email});
       
        if(student)
         {
          let  assignmentSubmitted = student.assignmentSubmitted.filter((v)=>{ 
          return    v.teacher==req.query.email?true:false

           })
        let {name,email,rollNo,role}=student;

      
      
       
        let teacher = await Teacher.findOne({email: req.query.email});

        if(!student || student.password!= req.user.password){
            return res.json(401,{
                message: "Invalid Token"
            }); 
        }
        return res.json(200,{
            message: 'Success',
            data:  {
               name,
               email,
               rollNo,
               assignmentSubmitted,
               role,
               assignmentGiven:teacher.assignmentGiven
            
            
            }
        })}

      
        let teacher = await Teacher.findOne({email: req.user.email});
      
        let {name,email,empId,assignmentGiven,role}=teacher;

        if(!teacher || teacher.password!= req.user.password){
            return res.json(401,{
                message: "Invalid Token"
            });
        }
        return res.json(200,{
            message: 'Success',
            data:  {
               name,
               email,
               empId,
               assignmentGiven,
               role
            
            
            }
        })



    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
    

}

module.exports=info;
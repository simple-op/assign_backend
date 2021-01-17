const Student = require("../models/student");
const Teacher = require("../models/teacher");



const assignment= async function(req, res){
    try{
       
        let student = await Student.find({"assignmentSubmitted.assignmentId":+req.query.id,'assignmentSubmitted.teacher':req.query.email});
        
      
        return res.json(200,{
            message: 'Success',
            data:  {
              students:student
            
            
            
         } })

      
        

    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
    

}

module.exports=assignment;
const Student = require("../models/student");
const Teacher = require("../models/teacher");



const grade= async function(req, res){
    try{
        
        let student = await Student.findOne({email:req.body.email});

        if(student&&req.body.id!=undefined&&req.body.grade)
        {
        Student.updateOne(
            { email:req.body.email,'assignmentSubmitted.id':req.body.id },
            { $set: { 'assignmentSubmitted.$.grade': req.body.grade } },(e,r)=>{
               console.log(e,r)
            }
         )
        
         

        
      
        return res.json(200,{
            message: 'Success',
            })

        }

        console.log(req.body,"****************")
        

    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
    

}

module.exports=grade;
const joi=require('joi')

const signUpValidation=(req,res,next)=>{
    const schema= joi.object({
        email:joi.string().email().required(),
        password:joi.string().min(5).max(100).required()
    })
    const {error}=schema.validate(req.body)
     
    
    if(error){
        return res.status(400).json({ message: "Bad request", error })
    }
    next()
}

const logInVAlidation=(req,res,next)=>{
    const schema= joi.object({
        email:joi.string().email().required(),
        password:joi.string().min(5).max(100).required(),
        otp: joi.string().required()
    })
    const { error } = schema.validate(req.body);

    
    if (error) {
      res.json({ error: "Bad Request",error });
    }
    next();

}

module.exports={signUpValidation,logInVAlidation}
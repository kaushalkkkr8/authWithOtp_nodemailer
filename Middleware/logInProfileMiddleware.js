const  jwt= require("jsonwebtoken");
const UserModel = require("../Model/signUp.model");


const loginProfile=async (req,res,next)=>{
    const token= req.headers['authorization']
    if (!token) return res.status(401).json({ message: "Access token required" });
try {
    const decode=  jwt.verify(token,process.env.Jwt_Secret)
    console.log("decode",decode)
    req.profile = await UserModel.findById(decode.id);
console.log("req.profile",req.profile);

    next()
} catch (error) {
    res.status(500).json({err:"internal server error"})
}
}
module.exports=loginProfile
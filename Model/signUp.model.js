
const mongo = require("mongoose")

const userSchema = new mongo.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    otp:{
        type:String
    },
 
})
const UserModel = mongo.model("Users", userSchema)

module.exports = UserModel

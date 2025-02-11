const { signUp, logIn } = require("../Controller/authsignlog")
const { signUpValidation, logInVAlidation } = require("../Middleware/authValidation")

const router= require("express").Router()

router.post('/signUp',signUpValidation,signUp)
router.post('/logIn',logInVAlidation,logIn)

module.exports=router
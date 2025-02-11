const { signUp, logIn, otpVerify } = require("../Controller/authsignlog")
const { signUpValidation, logInVAlidation, otpVerification } = require("../Middleware/authValidation")

const router= require("express").Router()

router.post('/signUp',signUpValidation,signUp)
router.post('/logIn',logInVAlidation,logIn)
router.post('/otp-verify',otpVerification,otpVerify)

module.exports=router

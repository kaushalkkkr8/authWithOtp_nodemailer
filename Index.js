const express = require("express")
const {dataConnection}= require("./db.connect")



const authRouter= require('./Routes/authRouter')
const authProfile= require('./Routes/logInProfile')

const app = express()
app.use(express.json())
dataConnection()

app.use("/auth",authRouter)

app.use("/profile",authProfile)



// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true, 
//   auth: {
//     user: "kaushalrithvik8@gmail.email",
//     pass: "vbiarvnbtxzthlgz",
//   },
// });
// const sendMail=(to,sub,mail)=>{
//   return  transporter.sendMail({to,sub,mail})
// }




const PORT = 3000
app.listen(PORT, () => {
    console.log("App. is running in port", PORT);

})
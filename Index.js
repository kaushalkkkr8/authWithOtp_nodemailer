const express = require("express")
const {dataConnection}= require("./db.connect")



const authRouter= require('./Routes/authRouter')
const authProfile= require('./Routes/logInProfile')

const app = express()
app.use(express.json())
dataConnection()

app.use("/auth",authRouter)

app.use("/profile",authProfile)






const PORT = 3000
app.listen(PORT, () => {
    console.log("App. is running in port", PORT);

})
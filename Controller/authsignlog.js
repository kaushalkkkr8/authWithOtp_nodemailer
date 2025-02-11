const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const UserModel = require("../Model/signUp.model")
const nodemailer = require("nodemailer");



const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "kaushalrithvik8@gmail.com",
        pass: "vbiarvnbtxzthlgz",
    },
});
const sendMail = (to, sub, html) => {
    return transporter.sendMail({ to, sub, html })
}


const signUp = async (req, res) => {



    const randomOtp = Math.floor(100000 + Math.random() * 900000)


    try {
        const { email, password } = req.body


        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            return res.status(409).json({ msg: "User already Exist" })
        }
        const hashedPass = await bcrypt.hash(password, 10)
        const newUser = new UserModel({ email, password: hashedPass, otp: randomOtp })
  

        await sendMail(email, "Verification Code", `<p>Your verification code is <strong>${randomOtp}</strong>.</p><p>Seller email: <strong>${email}</strong>
            `);

        res.status(200).json({ message: "OTP sent successfully", signUp: "successfully" });
        await newUser.save()
    } catch (error) {
        res.status(500).json({ error: " Internal ServerError" })
    }
}

const logIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const User = await UserModel.findOne({ email });

        if (!User) {
            return res.status(409).json({ msg: "User Not Found, please sign up" });
        }

        const isPassword = await bcrypt.compare(password, User.password);
        if (!isPassword) {
            return res.status(409).json({ message: "Incorrect Password", success: false });
        }


        const token = jwt.sign({ id: User._id }, process.env.Jwt_Secret, { expiresIn: "24h" });

        return res.status(200).json({ message: "LogIn successfully", token });

    } catch (error) {
        console.error("Login Error:", error);

        return res.status(500).json({ msg: "Internal Server Error" });

    }
};

const otpVerify = async (req, res) => {
    const { otp, email } = req.body

    try {
        const User = await UserModel.findOne({email})
        if (!User) res.status(409).json({ msg: "User Not Found, please sign up" });

        if (User.otp === otp) {
            User.otp = null
            
            await User.save()
            return res.status(200).json({ message: "OTP verified successfully" });
        }
        else{
            return res.status(400).json({ error: "Invalid OTP" });

        }

    } catch (error) {
        return res.status(500).json({ msg: " otp Internal Server Error" });
    }

}


module.exports = { signUp, logIn, otpVerify }

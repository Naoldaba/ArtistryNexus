import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { User, userSignUpValidator, userSignInValidator } from '../models/user.js';


export const signup = async (req, res) => {
    try{
        const validatedResult = userSignUpValidator(req.body);
        if (validatedResult.error){
            return res.status(400).send(validatedResult.error.details[0].message)
        } 

        const { username, fullName, email, password, dateOfBirth } = req.body;
        const existing_user = await User.findOne({email});

        if (existing_user) {
            return res.status(400).json({msg:"User already registered"})
        }

        const hashed_password = await bcrypt.hash(password, 12)

        const user_profile = await User.create({email, password: hashed_password, username, fullName, dateOfBirth: Date(dateOfBirth)})

        const token = jwt.sign({id:user_profile._id, email:user_profile.email}, process.env.SECRET_KEY, {expiresIn: '24h'})
        return res.status(200).json({user: user_profile, token})

    } catch(err){
        console.log("error", err)
        return res.status(500).json({msg:"Signup failed"})
    }
}

export const signin = async (req, res) => {
    try{
        const validatedResult = userSignInValidator(req.body);

        if (validatedResult.error) {
            return res.status(400).send(validatedResult.error.details[0].message);
        };

        const {email, password} = req.body;
        const registered_user = await User.findOne({email})
        .populate('portfolio')
        .populate('following')
        .populate('followers');

        if (!registered_user) {
            return res.status(400).json({"msg":"couldn't find user"})
        }

        let isCorrect;
        if (!registered_user.googleId){
            isCorrect = await bcrypt.compare(password, registered_user.password)
        }else if (!registered_user.password){
            return res.status(404).send("Try signing in with google")
        }
        
        if (!isCorrect) {
            return res.status(401).json({"msg":"password or email is not correct"})
        }

        const token = jwt.sign({id:registered_user._id, email}, process.env.SECRET_KEY, {expiresIn: '24h'});
        return res.status(200).json({token, user: registered_user});

    }catch(err){
        console.log("error", err)
        res.status(500).json({"msg":"server error"})
    }
}

export const googleAuth = async (req, res)=> {
    try {
        const user = req.user; 
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '24h' });
        res.status(200).json({token, user});
      } catch (error) {
        console.error('Error during Google authentication callback:', error);
        res.status(500).send('Internal server error');
      }
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        console.log(`Received forgot password request for email: ${email}`);

        const user = await User.findOne({ email });
        if (!user) {
            console.log(`User not found for email: ${email}`);
            return res.status(404).json({ message: 'User not found' });
        }

        const otp = crypto.randomBytes(3).toString('hex'); 
        const resetPasswordOTP = otp;
        const otpExp = Date.now() + 3600000; 
        await User.findByIdAndUpdate(user._id, { resetPasswordOTP, otpExp }, { new: true });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, 
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            },
        })

        const html = `
            <p>Your OTP</p>
            <h2 style="color:red;">${otp}</h2>
            <p>This code <strong>expires in 1 hour</strong></p>
        `;

        const mailOptions = {
            from: `ArtistryNexus <${process.env.EMAIL}>`,
            to: email,
            subject: 'Reset password OTP',
            html: html
        };

        console.log(`Sending email to: ${email}`);
        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to: ${email}`);
        res.status(200).json({ message: "Email sent successfully" });

    } catch (err) {
        console.log("Error has occurred:", err);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email, resetPasswordOTP: otp });

        if (!user || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        const resetPasswordOTP = undefined
        const otpExp = undefined
        await User.findByIdAndUpdate(user._id, {resetPasswordOTP, otpExp}, {new: true})

        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        res.status(500).send(`error ${error}`);
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        const password = hashedPassword;
        
        await User.findByIdAndUpdate(user._id, {password}, {new: true})

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (err) {
        res.status(500).send(`error ${err}`)
    }
}
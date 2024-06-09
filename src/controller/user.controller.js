import nodemailer from 'nodemailer'
import userModel from "../model/user.model.js"
import { signAccessToken, verifyAccessToken } from "../utils/generateToken.js"
import { randomString } from '../utils/generateKeys.js'

class User
{
    static async register(req, res, next)
    {
        const {userName, email, password} = req.body
        try 
        {
            const doesExist = await userModel.findOne({email})
            if(doesExist) return res.status(400).send({message: `${doesExist.email} is already been registered.`})

            const createUser = await userModel.create(req.body)

            res.status(200).send({message: `Account created succesfully for ${createUser.userName}`})
        } catch (error) 
        {
            console.log("Error: ", error);
            next(error)
        }
    }

    static async login(req, res, next)
    {
        const {email, password} = req.body
        try 
        {
            const user = await userModel.findOne({email})
            if(!user) return res.status(400).send({message: "User Email not registered"})

            const isMatch = await user.isValidPassword(password)
            if(!isMatch) return res.status(400).send({message: "Email/password not valid"})

            const token = await signAccessToken(user._id);

            res.status(200).send({message: "Successfully signed", accessToken: token})
        } catch (error) 
        {
            console.log(error);
            next(error)
        }
    }

    static async forgotPassword(req, res, next)
    {
        const {email} = req.body
        try 
        {
            const user = await userModel.findOne({email})
            if(!user) return res.status(400).send({message: "User not registered"}) 
                
            const otp = randomString();
            const otpExpire = new Date();
            otpExpire.setMinutes(otpExpire.getMinutes() + 5)

            const link = `http://localhost:3000/reset-password`

            user.otp = otp;
            user.otpExpire = otpExpire
            await user.save();
            
            const transport = nodemailer.createTransport({
                service : 'gmail',
                auth:{
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD
                }
            })
            const mailOptions = {
                from: "Hello 👋 <noreply@gmail.com>",
                to: user.email,
                subject: "Password Reset",
                html: `Hello ${user.userName} ,
                <br> 
                Here's your password reset link:  <a style="color:green" href="${link}">Click Here To Reset</a> 
                <br> 
                Here is your One-Time Password (OTP): <strong>${otp}</strong></p>
                OTP expires in 5 Minutes...
                `
            }

            await transport.sendMail(mailOptions)
            res.status(200).send({message: "Password reset link has been send to your email"})

        } catch (error) 
        {
            console.log(error);
            next(error)
        }
    }

    static async resetPassword(req, res, next)
    {
        const {otp, email, newPassword} = req.body;
        try 
        {
            const user = await userModel.findOne({email})
            
            if(user.otp !== otp) return res.status(400).send({message: "Invalid OTP"})
            if(!user.userName) return res.status(400).send({message: "User not registered"})

            if (user.otpExpire > new Date()) 
            {
                user.password = newPassword;
                user.otp = null;
                user.otpExpire = null;

                await user.save()

                res.status(200).send({ message: "Password changed successfully" });
            } else 
            {
                // Handle expired OTP scenario
                res.status(400).send({ message: 'OTP has expired' });
            }

        } catch (error) 
        {
            console.log("Error: ", error);
            next(error)
        }
    }
}

export default User
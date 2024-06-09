import { Schema, model } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        userName: {type: String, required: true},
        email: {type: String, required: true, lowercase: true, unique: true},
        password: {type: String, required: true},
        otp: {type:String},
        otpExpire: {type:Date}
    },
    {
        collection: "users",
        versionKey: "false"
    }
)

// Middleware: hash the password was defined before the model was compiled
userSchema.pre('save', async function(next){
    try 
    {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    } catch (error) 
    {
        next(error)
    }
})

// validate the hashed password
userSchema.methods.isValidPassword = async function(password){
    try 
    {
        return await bcrypt.compare(password, this.password)
    } catch (error) 
    {
        throw error 
    }
}


const userModel = model("users", userSchema)

export default userModel
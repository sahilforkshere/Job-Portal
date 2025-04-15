import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        minLength: [3, "Name should be atleast 3 characters"],
        maxLength: [30, "Name should be less than 30 characters"],
        trim: true
    },

    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"],
        trim: true
    },

    phone: {
        type: Number,
        unique: true,
        required: [true, "Please enter your phone number"],
    },

    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [8, "Password should be atleast 8 characters"],
        select: false
    },
    // passwordConfirm: {
    //     type: String,
    //     required: [true, 'Please confirm your password!'],
    //     validate: {
    //         validator: function (el) {
    //             return el === this.password;
    //         },
    //         message: 'Passwords are not the same!'
    //     },
    //     select: false //Never show password in output
    // }

    // ,

    role: {
        type: String,
        required: [true, "Please enter your role"],
        enum: ["Employer", "User"]
    },

    createdAt: {
        type: Date,
        default: Date.now
    }






})


userSchema.pre("save",async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
    
});

//COMPARING PASSWORD

userSchema.methods.correctPassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword,this.password);
}



//GENERATE A JWT TOKEN
userSchema.methods.getJWTToken=function(){
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
}


export const User= mongoose.model("User",userSchema);
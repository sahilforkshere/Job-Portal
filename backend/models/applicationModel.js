import mongoose from "mongoose";

import validator from 'validator';


const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, "Name  must contain atleast 3 characters"],
        maxLength: [30, "Name  must contain atleast 3 characters"]
    },

    email: {
        type: String,
        validate: [validator.isEmail, "Please provide a valid email"],
        required: [true, "Please provide your email"]

    },

    coverLetter: {
        type: String,
        required: [true, 'Please provide your cover Letter']
    },

    phone: {
        type: Number,
        required: [true, 'Please provide your phone number']
    },
    resume: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    applicantId: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        role: {
            type: String,
            required: true,
            enum: ['User']
        }
    },
    employerId: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        role: {
            type: String,
            required: true,
            enum: ['Employer']
        }
    }
})


export const Application=mongoose.model("Application",applicationSchema)
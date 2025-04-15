import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter job title"],
        trim: true,
        maxLength: [100, "Job title should be less than 100 characters"]
    },

    description: {
        type: String,
        required: [true, "Please enter job description"],
        trim: true,
        maxLength: [1000, "Job description should be less than 1000 characters"]

    },
    category: {
        type: String,
        required: [true, "Please enter job category"],
        //  enum : [
        //     "Software Development",
        //     "Data Science",
        //     "Web Development",
        //     "Mobile Development",
        //     "Digital Marketing",
        //     "Graphic Design",
        //     "Content Writing",
        //     "Others"
        //  ]
    },
    country:{
        type: String,
        required: [true, "Please enter job country"],
        minLength: [3, "Country should be atleast 3 characters"]
    },
    city:{
        type: String,
        required: [true, "Please enter job city"],
        minLength: [3, "City should be atleast 3 characters"]

    },

    location: {
        type: String,
        required: [true, "Please enter job location"],
        minLength: [6, "Location should be atleast 6 chaarcters"]
    },

    fixedSalary: {
        type: String,
        required: true,
        default: "unpaid",
        enum: ["unpaid", "paid"],

    },

    salaryFrom: {
        type: Number,
        // required: [true, "Please enter job salary"],
        minLength: [0, "Salary should be atleast 1 character"],
        maxLength: [10, "Salary should be less than 10 characters"]
    },
    salaryTo: {
        type: Number,
        // required: [true, "Please enter job salary"],
        minLength: [0, "Salary should be atleast 1 character"],
        maxLength: [10, "Salary should be less than 10 characters"]
    },
       expired:{
        type:Boolean,
        default:false
       },
    createdAt: {
        type: Date,
        default: Date.now
    },

    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }


})
jobSchema.pre("save", function (next) {
    if (!this.salaryFrom && !this.salaryTo) {
        this.fixedSalary = "unpaid";
    }
    next();
});

export const Job= mongoose.model("Job",jobSchema);
import { Application } from "../models/applicationModel.js";
import catchAsync from "../middlewares/catchAsync.js";
import { ErrorHandler } from "../middlewares/error.js";
import cloudinary from "cloudinary"
import { Job } from "../models/jobModel.js";

export const employerGetAllApplications = catchAsync(async (req, res, next) => {
    const { _id } = req.user;
    const applications = await Application.find({ "employerId.user": _id })


    res.status(200).json({
        status: "success",
        applications
    })
})

export const userGetAllApplications = catchAsync(async (req, res, next) => {
    const { _id } = req.user;
    const applications = await Application.find({ "applicantId.user": _id })

    res.status(200).json({
        status: "success",
        applications
    })
})


export const userDeleteApplication = catchAsync(async (req, res, next) => {

    const { id } = req.params;
    const application = await Application.findByIdAndDelete(id);
    if (!application) {
        return next(new ErrorHandler("Application not found", 404));
    }

    res.status(200).json({
        status: "success",
        message: "Application deleted successfully",
    })
})



export const postApplication = catchAsync(async (req, res, next) => {
    //restrict to user
    if (!req.files || Object.keys(req.files).length == 0) {
        return next(new ErrorHandler("Resume Required in Application ", 400))
    }

    const { resume } = req.files;
    const allowedFormats = ['image/png', 'image/jpg', 'image/webp']
    if (!allowedFormats.includes(resume.mimetype)) {
        return next(new ErrorHandler("Resume must in proper format. Only png,jpg,webp formats are allowed", 400))
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
        resume.tempFilePath,
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary Error",
            cloudinaryResponse.error || "Unknown Cloudinary Error"
        )
        return next(new ErrorHandler("Failed tp upload resume", 500))
    }

    const { name, email, coverLetter, phone, jobId } = req.body;
    const applicantID = {
        user: req.user._id,
        role: "User"
    }

    if (!jobId) {
        return next(new ErrorHandler("Job not Found", 400))
    }

    const jobDetails = await Job.findById(jobId);
    if (!jobDetails) {
        return next(new ErrorHandler("Job not Found", 400));
    }
    const employerID = {
        user: jobDetails.postedBy,
        role: "Employer"
    }

    if (!name || !email || !coverLetter || !phone || !applicantID.user || !employerID.user || !resume) {
        return next(new ErrorHandler("Please fill all field", 400));
    }


    const newApplication = await Application.create({
        applicantId: applicantID,
        employerId: employerID,
        name,
        email,
        coverLetter,
        phone,
        resume: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        }

    })

    res.status(200).json({
        success: true,
        message: "Application Submitted",
        newApplication
    })



})



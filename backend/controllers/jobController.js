import { Job } from "../models/jobModel.js";
import catchAsync from "../middlewares/catchAsync.js";
import { ErrorHandler } from "../middlewares/error.js";


export const getAllJobs = catchAsync(async (req, res, next) => {
    const jobs = await Job.find({ expired: false, }).populate({
        path: 'postedBy',
        select: 'name -_id'
    })
    res.status(200).json({
        success: true,
        jobs
    })
})

export const getAJob= catchAsync(async(req,res,next)=>{
    const {id}=req.params;
    try {
        const job = await Job.findById(id);
        if (!job) {
            return next(new ErrorHandler('Job not found', 404));
        }
        res.status(200).json({
            success: true,
            job
        })
    } catch (error) {
        return next(new ErrorHandler("Invalid ID/Cast Erro"))
    }
})



export const createJob = catchAsync(async (req, res, next) => {



    const { title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo } = req.body;
    // if (!title || !description || !category || !country || !city || !location || !fixedSalary || !salaryFrom || !salaryTo) {
    //     return next(new ErrorHandler("Please fill all the fields", 400));
    // }
    if (salaryFrom > salaryTo) {
        return next(new ErrorHandler("Salary From should be less than Salary To", 400));
    }

    const job = await Job.create({
        title,
        description,
        category,
        country,
        city,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo,
        postedBy: req.user._id
    })
    res.status(201).json({
        success: true,
        job
    })






})


export const restrictTo = (...roles) => {
    return (req, res, next) => {
        //roles is an array ['admin','lead-guide']
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler('You do not have permission to perform this action', 403));
        }
        next();


    }

}


export const getMyJobs = catchAsync(async (req, res, next) => {
    const myJobs = await Job.find({ postedBy: req.user._id }).populate({
        path: 'postedBy',
        select: 'name -_id'
    })
    res.status(200).json({
        success: true,
        myJobs
    })

})

export const updateJob = catchAsync(async (req, res, next) => {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false


    })
    if (!job) {
        return next(new ErrorHandler("Job not found", 404));
    }

    res.status(200).json({
        status: "success",
        job,
        message: "Job updated successfully"
    });

})


export const deleteJob=catchAsync(async(req,res,next)=>{
   const job= await Job.findByIdAndDelete(req.params.id);
   if(!job){
    return next(new ErrorHandler("Job not found",404));
    }
    res.status(200).json({
        status:"success",
        message:"Job deleted successfully"
        });
        
})


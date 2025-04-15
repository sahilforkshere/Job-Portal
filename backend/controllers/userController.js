import catchAsync from "../middlewares/catchAsync.js";
import { User } from "../models/userModel.js";
import { ErrorHandler } from "../middlewares/error.js";
import jwt from "jsonwebtoken";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsync(async (req, res, next) => {
    const { name, email, phone, role, password } = req.body;
    if (!name || !email || !phone || !role || !password) {
        return next(new ErrorHandler("Please enter all fields", 400))
    }

    const isEmail = await User.findOne({ email });
    if (isEmail) {
        return next(new ErrorHandler("Email already exists", 400))
    }

    const isPhone = await User.findOne({ phone });
    if (isPhone) {
        return next(new ErrorHandler("Phone number already exists", 400))
    }

    const user = await User.create({
        name,
        email,
        phone,
        role,
        password
        // passwordConfirm
    })

    user.password = undefined;

    sendToken(user, 200, res, "User registered successfully")



})


export const login = catchAsync(async (req, res, next) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return next(new ErrorHandler("Please enter all fields", 400))
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }
    const isPasswordMatched = await user.correctPassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }
    if (user.role.toLowerCase() !== role.toLowerCase()) {
        return next(new ErrorHandler("Invalid role", 401));
    }
    user.password = undefined;
    sendToken(user, 200, res, "User logged in successfully")
})


export const logout = catchAsync(async (req, res, next) => {
    res.status(201).cookie("token", "", {

        httpOnly: true,

        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "Logged out successfully!"
    })
})


export const getAllUsers = catchAsync(async (req, res, next) => {
    const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

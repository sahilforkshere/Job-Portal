import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
const app = express();
// import globalErrorHandler from './middlewares/globalErrorHandler.js'; 
import userRouter from './routes/userRouter.js';
import applicationRouter from './routes/applicationRouter.js';
import jobRouter from './routes/jobRouter.js';
// import { dbConnection } from './database/dbConnection.js';
import  errorMiddleware  from './middlewares/error.js';


dotenv.config({ path: './config/config.env' })

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true

}))

app.use(express.json()); // parse application/json
app.use(express.urlencoded({ extended: true }))  // parse application/x-www-form-urlencoded
app.use(cookieParser());

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp"
}));


app.use('/api/v1/user', userRouter);
app.use('/api/v1/application', applicationRouter);
app.use('/api/v1/job', jobRouter);

// dbConnection();
app.use(errorMiddleware)
export default app;


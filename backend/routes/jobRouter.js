import express from 'express';
const router= express.Router();
import { getAllJobs,createJob,restrictTo,getMyJobs,updateJob, deleteJob,getAJob } from '../controllers/jobController.js';
import { isAuthorised } from '../middlewares/auth.js';

router.get('/getAllJobs',getAllJobs);
router.post('/postJob',isAuthorised,restrictTo('Employer'),createJob);
router.get('/getMyJobs',isAuthorised,restrictTo('Employer'),getMyJobs);
router.patch('/updateJob/:id',isAuthorised,restrictTo('Employer'),updateJob);
router.delete('/deleteJob/:id',isAuthorised,restrictTo('Employer'),deleteJob);
router.get("/getAJob/:id",isAuthorised,getAJob)

export default router;
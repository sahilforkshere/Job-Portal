import express from 'express';
const router= express.Router();
import { isAuthorised } from '../middlewares/auth.js';
import { employerGetAllApplications,postApplication,userDeleteApplication,userGetAllApplications } from '../controllers/applicationController.js';
import { restrictTo } from '../controllers/jobController.js';

router.get('/employerGetApplications',isAuthorised,restrictTo('Employer'),employerGetAllApplications)
router.get('/userGetApplications',isAuthorised,restrictTo('User'),userGetAllApplications)
router.delete('/deleteApplication/:id',isAuthorised,userDeleteApplication)
router.post('/postApplication',isAuthorised,postApplication)


export default router;
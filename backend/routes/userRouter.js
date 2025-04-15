import express from 'express';
import { getAllUsers, login, logout, register } from '../controllers/userController.js';
import { isAuthorised } from '../middlewares/auth.js';
const router= express.Router();

router.post('/register',register)
router.post('/login',login);
router.get('/logout',isAuthorised,logout);
router.get('/getAllUsers',isAuthorised,getAllUsers)


export default router;
const express=require('express');
const controller=require('../controllers/authController')

const router=express.Router();

// for signing up the first time
router.post('/signup',controller.signup);

// to login for a user who's already signed in
router.post('/login',controller.login);

// for signing out
router.get('/signout',controller.signout);

module.exports=router;
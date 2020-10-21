const express=require('express');
const controller=require('../controllers/authController')

const router=express.Router();

// for signing up the first time
router.get('/signup',controller.signup);

// for regular signin
router.get('/signin',controller.signin);

// for signing out
router.get('/signout',controller.signout);

module.exports=router;
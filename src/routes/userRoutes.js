const express=require('express');
const controller=require('../controllers/userController')


const router=express.Router();

// this will get the user info for the profile page for the current user
// passing the current user id as a query params

router.get('/:id',controller.userInfo);

// the following is to edit the user info 
router.put('/:id', controller.editUser);

// the following is to create the user info
router.post('/', controller.createUser);

module.exports=router;
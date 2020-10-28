const express=require('express');
const controller=require('../controllers/listingsController');

const router=express.Router();

// this will display all the information for the search bar ,
// can also display information from the filters which can be added
//  as query params /search?city=''&budget=''&xyz=''
//  will contain all the metadata required for the listings to be displayed with pagination

router.get('/search',controller.search);

// this will display all the information for the particular listing for the listing page
router.get('/:id',controller.findById);
router.post("/", controller.create);
module.exports=router;
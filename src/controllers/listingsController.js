const {Op}=require('sequelize');
// const { listing } = require('../model/indexModel');
const db=require('../model/indexModel');



const search=async (req,res)=>{
  try{
  if(!req.query.city){
    res.status(400).send('Please Enter a valid city');
  }
  else if(req.query.city[0]=="'" || req.query.city[req.query.city.length-1]=="'"){
    res.status(400).send('Please remove the double-quotes from the query param value')
  }
  else{
    
    // const listings=await db.listing.findAll({
    //   where:{
    //     cityId:db.sequelize.literal(`cityId in (select id from city where cityName='${req.query.city}')`)
    //     }
      
    // })
    const listings=await db.listing.findAll({
      include: {
        model: db.city,
        attributes: ["cityName"],
        where: {
          cityName: req.query.city,
        },
      },
    });
    
    if (listings.length==0){
    res.status(200).send('we are not yet operational in this city');  
  }

  res.status(200).send(listings);
}
  }
catch(err){
  console.error(err);
}
};

const findById=async (req,res)=>{
    try{
      if(Number(req.params.id).toString()!==req.params.id){
        res.status(400).send(`Please enter a valid id-number`);
      } 

      else{ 

        const listing=await db.listing.findOne({
          where:{
            id:req.params.id
          }
        })

        if(!listing){
        res.status(400).send(`No Listings exist for this entry`);
      }
    
      res.status(200).send(listing);
    
    }

  }
    catch(err){
      console.error(err);
    }

  
};

module.exports={search,findById}


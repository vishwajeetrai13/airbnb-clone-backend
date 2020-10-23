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

  const images= await Promise.all(listings.map(async (listing) =>{
    return await db.listingImage.findAll({
      attributes:['url'],
      where:{
        entityId:listing.id
      }
    }); 
}));

const listingsAndImages=[];

for(let i=0;i<listings.length;i++){
  let listingCopy=JSON.parse(JSON.stringify(listings));
  listingCopy[i].images=images[i]
  listingsAndImages.push(listingCopy[i]);
}

  res.status(200).send(listingsAndImages);

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
            id:Number(req.params.id),      
          },
        });
        
        if(!listing){
         return res.status(400).send(`No Listings exist for this entry`);
        }

        const city=await db.city.findOne({
          where:{
            id:listing.cityId,
          }
        });

        const host=await db.user.findAll({
          where:{
            id:listing.hostID,
          }
        });

        const images=await db.listingImage.findAll({
          attributes:['url'],
          where:{
            entityId:listing.id,
          }
        });

        const booking=await db.booking.findAll({
          where:{
            listingId:listing.id
          }
        })

        const review=await Promise.all(booking.map(async booking => {
          return await db.review.findAll({
          where:{
            bookingId:booking.id
          }
        });
      }));

     const deepClone=(entity)=> JSON.parse(JSON.stringify(entity));
        
        let resObj={listing:deepClone(listing),city:deepClone(city),host:deepClone(host),images:deepClone(images),bookings:deepClone(booking),revieiw:deepClone(review)}
      res.status(200).send(resObj);
    
    }

  }
    catch(err){
      console.error(err);
    }

  
};

module.exports={search,findById}


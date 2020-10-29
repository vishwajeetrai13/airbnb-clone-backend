const jwt=require('jsonwebtoken');


// this can be used as a middleware in protected routes to add the user-id 
// information from the jwt payload which can be used to determine the user

module.exports=(req,res,next)=>{
    
    const token=req.cookies.access_token;

    if(!token) return res.status(401).send({error:'Access Denied'});

    try{
        const verified=jwt.verify(token,process.env.TOKEN_SECRET);
        // res.status(200).json(verified);
        res.header({userPayload:JSON.stringify(verified)});
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}


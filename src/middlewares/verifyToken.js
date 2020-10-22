const jwt=require('jsonwebtoken');

// this can be used as a middleware in protected routes to add the user-id 
// information from the jwt payload which can be used to determine the user

module.exports=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified=jwt.verify(token,process.env.TOKEN_SECRET);
        req.user=verified;
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}


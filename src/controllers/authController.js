// import model

const signup=(req,res)=>{
        res.status(200).send(`this is the auth/signup route`);
  };
  
  const signin=(req,res)=>{
    res.status(200).send(`this is the auth/signin route`);
};
  
  const signout=(req,res)=>{
    res.status(200).send(`this is the auth/signout route`);

};
  module.exports={signup,signin,signout}
  
// import model

const userInfo=(req,res)=>{
    res.status(200).send('this is the current user info');
};
  
  const editUser=(req,res)=>{
    // update the user info in the users table and send a success status 
  
  };
  
  module.exports={userInfo,editUser}
  
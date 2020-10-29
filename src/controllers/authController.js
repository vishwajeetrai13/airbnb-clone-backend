const db = require("../model/indexModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const signupValidationSchema= Joi.object({
    firstName: Joi.string().alphanum().max(15).min(3).required(),
    lastName: Joi.string().alphanum().max(15).min(3).required(),
    email: Joi.string().email({
        minDomainSegments: 2
    }).required(),
    password: Joi.string().min(10).required(),
});

const loginValidationSchema=Joi.object({
    email: Joi.string().email({
        minDomainSegments: 2
    }).required(),
    password: Joi.string().min(10).required(),
});

// validity in secs
const maxAge = 3 * 24 * 60 * 60 * 1000; // 3 days


const createToken = (id,firstName,email) => {
    // let options = {
    //     expiresIn: maxAge,
    // };
    return jwt.sign({
        id,firstName,email
    }, process.env.TOKEN_SECRET, /*options*/);
};

/*  # Data Format to post to the endpoint

    {
    "firstName":"jansher",
    "lastName":"aquib",
    // "introduction":"random kahaani",
    "email":"random@gmail.com",
    // "dob":"2020-12-01 23:34:34",
    "password":"randomUserPasswordWhichwillbeHashed"
}

*/
const signup = async (req, res) => {
    const data = req.body;

    // Validating the form data submitted & returning errors if/any
    const { error } = signupValidationSchema.validate(data,{abortEarly:false});
    
    // if (error) return res.status(400).send({error:error.details[0].message});
    
    if (error) {
        let errorMessages=error.details.map(detail=>detail.message);
        return res.status(400).send({error:errorMessages});
    } 


    // checking if the email already exists

    const emailExists = await db.user.findOne({
        where: {
            email: data.email
        }
    });
    if (emailExists) return res.status(401).send({error:"This Email Already exists with a User"});

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);

        // create a new user object 
        const user = {
            firstName: data.firstName,
            lastName: data.lastName,
            // introductionOfUser: data.introduction,
            email: data.email,
            // dob: data.dob,
            password: hashedPassword,
            // profilePictureUrl: data.profilePictureUrl,
        };

        // return res.status(200).send(user);

        const record = await db.user.build(user).save();
       
        // create and assign a token
        const id=record.id;
        const email=record.email;
        const firstName=record.firstName;
       const token = createToken(id,firstName,email);

        // res.cookie('access_token',token,{
        //     maxAge,
        //     httpOnly:true,
        //     sameSite:'None',
        //     secure:true
        // })
       
        res.status(201).send({token,user:{id,email,firstName}});
    } catch (err) {
        res.status(400).send({error:err});
    }
};



const login = async (req, res) => {
    const data = req.body;

    // Validating the form data submitted & returning errors if/any
    const {error} = loginValidationSchema.validate(data,{abortEarly:false});

    if (error) return res.status(400).send({error:error.details[0].message});

    // checking if the email already exists

    const user = await db.user.findOne({  where: {email: data.email} });

    if (!user)  return res.status(401).send({error:"No User with this email exists"});

        // password checking
      const validPassword=await bcrypt.compare(req.body.password,user.password)  
        if(!validPassword) return res.status(401).send({error:'Invalid password'});

    try {
        // create and assign a token

        const token =createToken(user.id,user.firstName,user.email);

        // res.cookie('access_token',token,{
        //     maxAge,
        //     httpOnly:true,
        //     // secure:true
        // })
       let {id,email,firstName}=user;
        res.status(201).send({token,user:{id,email,firstName}});


    } catch (error) {
        console.error(error);
    }

};

const signout = (req, res) => {
   
    res.status(200).send({success:`Logged Out !!`});
};
module.exports = {
    signup,
    login,
    signout
};


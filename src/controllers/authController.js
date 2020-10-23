const db = require("../model/indexModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");


const signupValidationSchema= Joi.object({
    firstName: Joi.string().alphanum().max(15).min(3).required(),
    lastName: Joi.string().alphanum().max(15).min(3).required(),
    introduction: Joi.string().min(50).required(),
    email: Joi.string().email({
        minDomainSegments: 2
    }).required(),
    password: Joi.string().min(10).required(),
    dob: Joi.string().min(15),
});

const loginValidationSchema=Joi.object({
    email: Joi.string().email({
        minDomainSegments: 2
    }).required(),
    password: Joi.string().min(10).required(),
});

// validity in secs
// const maxAge = 3 * 24 * 60 * 60;


const createToken = id => {
    // let options = {
    //     expiresIn: maxAge,
    // };
    return jwt.sign({
        id
    }, process.env.TOKEN_SECRET, /*options*/);
};

/*  # Data Format to post to the endpoint

    {
    "firstName":"jansher",
    "lastName":"aquib",
    "introduction":"random kahaani",
    "email":"random@gmail.com",
    "dob":"2020-12-01 23:34:34",
    "password":"randomUserPasswordWhichwillbeHashed"
}

*/
const signup = async (req, res) => {
    const data = req.body;

    // Validating the form data submitted & returning errors if/any
    const { error } = signupValidationSchema.validate(data);
    if (error) return res.status(400).send(error.details[0].message);

    // checking if the email already exists

    const emailExists = await db.user.findOne({
        where: {
            email: data.email
        }
    });
    if (emailExists)
        return res.status(400).send("This Email Already exists with a User");

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);

        // create a new user object 
        const user = {
            firstName: data.firstName,
            lastName: data.lastName,
            introductionOfUser: data.introduction,
            email: data.email,
            dob: data.dob,
            password: hashedPassword,
            profilePictureUrl: data.profilePictureUrl,
        };

        // return res.status(200).send(user);

        const record = await db.user.build(user).save();
       
        // create and assign a token
        const {id}=record;
       const token = createToken(id);

       res.header('auth-token',token);
       
       res.sendStatus(201).send({
            id
        });
    } catch (err) {
        res.status(400).send({
            err: err
        });
    }
};



const login = async (req, res) => {
    const data = req.body;

    // Validating the form data submitted & returning errors if/any
    const {error} = loginValidationSchema.validate(data);

    if (error) return res.status(400).send(error.details[0].message);

    // checking if the email already exists

    const user = await db.user.findOne({  where: {email: data.email} });

    if (!user)  return res.status(400).send("No User with this email exists");

        // password checking
      const validPassword=await bcrypt.compare(req.body.password,user.password)  
        if(!validPassword) return res.status(400).send('Invalid password');

    try {
        // create and assign a token

        const token =createToken(user.id);

        res.header('auth-token',token).send('Signed In !!');

    } catch (error) {
        console.error(error);
    }

    res.status(200).send(`this is the auth/signin route`);
};

const signout = (req, res) => {

    res.header('auth-token',null)
    res.status(200).send(`Logged Out !!`);
};
module.exports = {
    signup,
    login,
    signout
};

// TODO Add jwt to cookie and see if implementing refresh token is possible
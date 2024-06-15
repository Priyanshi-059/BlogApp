import User from '../models/user.model.js'
import bycryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

// this function is asynchronous because user have to signup after giving the details and it will take some time
// next is the middleware
export const signup = async(req,res,next)=>{
    const {username,email,password} = req.body;

    if(!username || !email || !password || username=== "" || email === "" || password === ""){
        return next(errorHandler(400,"All fields are reqired"));
    }

    const hashedpassword = bycryptjs.hashSync(password,10);

    const newUser = new User(
        {
            username,
            email,
            password:hashedpassword,
        }
    );

    try {
        await newUser.save();
        res.json("SignUp successful");
        
    } catch (err) {
        next(err);
    }
    
};    
export const signin = async (req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password || !email==="" || !password===""){
        next(errorHandler(400,'All fields are required'));
    }
    try {
        const validUser = await User.findOne({email})
        if(!validUser){
            next(errorHandler(404,'User not found'));
        }

        const validpassword = bycryptjs.compareSync(password,validUser.password);
        if(!validpassword){
            return next(errorHandler(404,'Invalid Password'));
        }
        
        // jsonwebtoken is used to authenticate the user
        const token = jwt.sign(
            {id : validUser._id, isAdmin:validUser.isAdmin}, process.env.JWT_SECRET
        ) 
    // to remove the password to hide from us while signing \
        const {password : pass, ...rest} = validUser._doc;
        // rest will contain all the data except password

        res.status(200).cookie('access_token', token,
        {httpOnly:true}).json(rest);

    } catch (err) {
        next(err)
    }
};


export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bycryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
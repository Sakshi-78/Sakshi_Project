const User = require('../models/users');
// const passport = require("../Auth/passport");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

// module.exports.postSignup = async(req,res,next)=>{
//   try {
//   const { email, password } = req.body;

  
//     // Check if the user already exists
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user
//     const newUser = new User({
//       email,
//       password: hashedPassword
//     });

//     // Save the user to the database
//     await newUser.save();
//     const token = jwt.sign({ id: newUser._id }, secretKey, {
//       expiresIn: '1h', // Token expiration time (adjust as needed)
//     });
//     // const token = generateToken(newUser);

//     // res.json({ token });
//     res.status(201).json({ token });
//     // res.status(201).json({ message: "User created successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// }

module.exports.postSignup = async (req, res, next) => {
  console.log(req.body);
   try {
     const salt = bcrypt.genSaltSync(10);
     const hash = bcrypt.hashSync(req.body.password, salt);
     const newUser = new User({ ...req.body, password: hash });

     await newUser.save();

     const token = jwt.sign({ id: newUser._id }, process.env.JWT);

     const { password, ...othersData } = newUser._doc;
     res.cookie("access_token", token, {
         httpOnly: true,
      }).status(200).json(othersData);
   } catch (err) {
     next(err);
   }
};
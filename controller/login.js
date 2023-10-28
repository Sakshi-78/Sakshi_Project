const User = require("../models/users");
// const passport = require("../Auth/passport");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Import the jwt module
// const secretKey = process.env.JWT_SECRET;
const handleError = require("../error");

 module.exports.postLogin = async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.body.username });
  
      if (!user) return next(handleError(404, "User not found"));
  
      const isCorrect = await bcrypt.compare(req.body.password, user.password);
  
      if (!isCorrect) return next(handleError(400, "Wrong password"));
  
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      const { password, ...othersData } = user._doc;
  
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(othersData);
    } catch (err) {
      next(err);
    }
  };


// const express = require('express');
// const router  = express.Router();
// const jwt = require('jsonwebtoken');
// const passport = require("passport");
// const secretKey = process.env.JWT_SECRET;


// /* POST login. */
// router.post('/login', function (req, res, next) {
//     passport.authenticate('local', {session: false}, (err, user, info) => {
//         if (err || !user) {
//             return res.status(400).json({
//                 message: 'Something is not right',
//                 user   : user
//             });
//         }
//        req.login(user, {session: false}, (err) => {
//            if (err) {
//                res.send(err);
//            }
//            // generate a signed son web token with the contents of user object and return it in the response
//            const token = jwt.sign(user, secretKey);
//            return res.json({user, token});
//         });
//     })(req, res);
// });


// module.exports = router;


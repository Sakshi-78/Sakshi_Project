const jwt = require('jsonwebtoken');
const handleError = require("./error");

// const secretKey = 'ehdsdyjbsnm'; // Replace with your secret key

// function verifyToken(req, res, next) {
//   const token = req.headers.authorization.split(' ')[1]; // Assuming token is in the "Authorization" header

//   jwt.verify(token, secretKey, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: 'Authentication failed' });
//     }
//     req.userData = decoded; // Store user data in the request object for later use
//     next(); // Move to the next middleware
//   });
// }

const verifyToken = (req, res, next) => {
  // const authHeader = req.headers.authorization;
  const token = req.cookies.access_token;
  if (!token) return next(handleError(401,"You are not authenticated"));


   jwt.verify(token,process.env.JWT,(err,user)=>{
    if(err) return next(createError(403,"Token is invalid"));
    req.user=user;
    next();
   })
  // try {
  //     const verified = jwt.verify(token, 'your_secret_key_here');
  //     req.user = verified;
  //     next();
  // } catch (err) {
  //     res.status(403).json({ message: 'Invalid token.' });
  // }
};

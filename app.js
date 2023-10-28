// const express = require("express");
// const app = express();
// const path = require("path");
// const PORT = 4444;
// const mongoose = require("mongoose");
// // const jwt = require('jsonwebtoken');
// // const bcrypt = require('bcrypt');
// const session = require('express-session');
// // const passport = require('./Auth/passport');
// // const MongoStore = require('connect-mongo');
// // const cors = require("cors");
// // const bodyParser = require('body-parser');
// // const LocalStrategy = require('passport-local').Strategy;
// // const User= require("./models/users");
// // const Tweet = require("./models/tweet");

// // require("dotenv").config();
// // app.use(cors());

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(bodyParser.json());

// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true,
//   store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })
// }));

// // const corsOptions = {
// //   origin: 'http://localhost:3000',
// // };



// // Middleware to check if a JWT token is provided and valid
// const jwtAuth = passport.authenticate('jwt', { session: false });

// // Initialize Passport.js
// app.use(passport.initialize());


// // app.use("/api", jwtAuth, require("./routes/auth"))
// // app.use("/api", jwtAuth, require("./routes/auth"))
// // app.use("/api", jwtAuth, require("./routes/user"))
// app.post('/api/signup', (req, res) => {
//   const { email, password } = req.body;

//   // Validation
//   if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required.' });
//   }

//   // Check if the user already exists
//   if (findUserByEmail(email)) {
//       return res.status(400).json({ message: 'User already exists.' });
//   }

//   // Encrypt the password
//   const hashedPassword = bcrypt.hashSync(password, 10);

//   // Simulated user creation
//   const newUser = { email, password: hashedPassword };
//   users.push(newUser);

//   // Create JWT token
//   const token = jwt.sign({ user: newUser.email }, 'your_secret_key_here');

//   // Set the token as a cookie
//   res.cookie('jwt', token, { httpOnly: true });

//   // Return success response with token
//   res.status(200).json({ message: 'User created successfully.', token });
// });

// // Endpoint for user login using Passport and JWT
// app.post('/api/login', passport.authenticate('local'), (req, res) => {
//   // If this function gets called, authentication was successful.
//   const token = jwt.sign({ user: req.user.email }, 'your_secret_key_here');
//   res.cookie('jwt', token, { httpOnly: true });
//   res.json({ message: 'Login successful.', token });
// });

// app.post('/api/users/:userId/tweet', verifyToken, (req, res) => {
//   const { userId } = req.params;
//   const { tweet } = req.body;

//   // Validation
//   if (!tweet) {
//       return res.status(400).json({ message: 'Tweet content is required.' });
//   }

//   // Simulated article creation
//   articles.push({ userId, tweet });

//   // Return success response
//   res.status(200).json({ message: 'Article created successfully.' });
// });

// app.put('/api/users/:userId', verifyToken, (req, res) => {
//   const { userId } = req.params;
//   const { name, age } = req.body;

//   // Validation
//   if (!name || !age) {
//       return res.status(400).json({ message: 'Name and age are required.' });
//   }

//   // Simulated user profile update
//   const user = usersWithProfile.find((user) => user.id === userId);
//   if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//   }

//   user.name = name;
//   user.age = age;

//   // Return success response
//   res.status(200).json({ message: 'User profile updated successfully.', user });
// });

// app.get('/api/tweet', verifyToken, (req, res) => {
//   // Simulated tweet retrieval with user information
//   const tweetsWithUserInfo = tweets.map((tweet) => {
//       const user = usersWithProfile.find((user) => user.id === tweet.userId);
//       return { ...tweet, user };
//   });

//   res.status(200).json({ tweets: tweetsWithUserInfo });
// });


// mongoose.connect(process.env.MONGO_URL)
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`http://localhost:` + PORT);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });



const express = require("express");
 const app = express();
const path = require("path");
 const PORT = 4444;
 const mongoose = require("mongoose");
 const session = require('express-session');
const cookieParser = require('cookie-parser')

// Load environment variables from a .env file if you're using it
require('dotenv').config();
app.use(cookieParser())
app.use(express.json());


// Retrieve the MongoDB URI from the environment variables
const uri = "mongodb+srv://arsakshisharma2001:sakshisharma@cluster0.5dpzwjj.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Your further code here
    app.listen(PORT, () => {
    console.log(`http://localhost:` + PORT);
    });
    
    
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


 app.use("/api/users",require("./routes/user"));
 app.use("/api/auth",require("./routes/auth"));
 app.use("/api/tweet",require("./routes/tweet"));

 

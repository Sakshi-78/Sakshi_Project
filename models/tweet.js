// const mongoose = require('mongoose');

// const tweetSchema = new mongoose.Schema({
//   text: {
//     type: String,
//     required: true,
//   },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User', // Reference to the User model
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Tweet = mongoose.model('Tweet', tweetSchema);

// module.exports = Tweet;


const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      max: 280,
    },
    likes: {
      type: Array,
      defaultValue: [],
    },
  },
  { timestamps: true }
);

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;


const Tweet = require("../models/tweet");
const User =require("../models/users");

const handleError = require("../error");


module.exports.postCreate= async (req, res,next) =>{
    const newTweet = new Tweet(req.body);
    try{
        const savedTweet = await newTweet.save();
        res.status(200).json(savedTweet);
    }catch(err){
        handleError(500,err);
    }
}


module.exports.getAllTweets = async(req,res,next)=>{
    try {
        const currentUser = await User.findById(req.params.id);
        const userTweets = await Tweet.find({ userId: currentUser._id });
    
        res.status(200).json(userTweets);
      } catch (err) {
        handleError(500, err);
      }
}
  

module.exports.getUserTweet = async(req,res,next) => {
    try{
        const userTweets = await Tweet.find({userId: req.params.id}).sort({
            createAt:-1,
        });
        res.status(200).json(userTweets);
    }catch(err){
        handleError(500, err);
    }
}

module.exports.deleteTweet = async(req,res,next)=>{
    try{
        const tweet = await Tweet.findById(req,params.id);
        if(tweet.userId === req.body.id){
            await tweet.deleteOne();
            res.status(200).json("Tweet Deleted");
        }else{
            handleError(500, err);
        }
    }catch(err){
        handleError(500, err);
    }
}

module.exports.likeTweet = async(req,res,next)=>{
    try{
        const tweet = await Tweet.findById(req,params.id)
        if (!tweet.likes.includes(req.body.id)) {
            await tweet.updateOne({ $push: { likes: req.body.id } });
            res.status(200).json("tweet has been liked");
          } else {
            await tweet.updateOne({ $pull: { likes: req.body.id } });
            res.status(200).json("tweet has been disliked");
          }
        } catch (err) {
          handleError(500, err);
        }
      };

module.exports.getExplore = async(req,res,next)=>{
    try {
        const getExploreTweets = await Tweet.find({
          likes: { $exists: true },
        }).sort({ likes: -1 });
    
        res.status(200).json(getExploreTweets);
      } catch (err) {
        handleError(500, err);
      }
}
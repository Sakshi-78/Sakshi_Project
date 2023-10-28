
const User =require("../models/users");
const handleError = require("../error");



module.getUserProfile = async(req,res,next)=>{
  try {
    const user = await User.findById(req.params.userId);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}


module.exports.postUserProfile= async (req, res) => {
  if (req.params.userId === req.user.userId) {
    try {
      const { name, age } = req.body;

      // Construct the update object based on the extracted fields
      const updateObject = {};
      if (name) updateObject.name = name;
      if (age) updateObject.age = age;
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: updateObject,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can update only your account"));
  }
};
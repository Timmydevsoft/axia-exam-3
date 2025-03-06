import handleError from "../middleware/error.middleware.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt"

const createUser = async(req, res, next)=>{
  try{
    const{username, email, password}=req.body
    if(!username, !email, !password){
      return next(handleError(401, "username, mail and password required"))
    }
    const isAuser = await User.findOne({email: email})
    if(isAuser) return res.status(400).json({message: "email is already taken"})
    const hashedPassword =  bcrypt.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save()
    return res.status(201).json("User account creacted succesfully");
  }
  catch(err){
    next(err)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    if (req.id != req.params.id) return next(handleError(401, "You can only delete your own account"));
    const isAuser = await User.findById(req.params.id)
    if(!isAuser) return res.status(403).json({message:"No such user"})
     await isAuser.deleteOne()
     return res.status(200).json({message: "Account deleted successfully"})
  } catch (err) {
    next(err);
  }
}

const updateUser = async(req, res, next)=>{
  try{
    if (req.id != req.params.id)
      return next(handleError(401, "You can only update your own account"));
    let updatedHashedPassword;

    if(!req.body.password){
      updatedHashedPassword = await User.findById(req.params._id).password;
    } 
    else {
      updatedHashedPassword = bcrypt.hashSync(req.body.password, 10);
    }
    const isAuser = await User.findById(req.params.id)
    if(!isAuser) return next(handleError(400, 'No such user'))
    await User.findByIdAndUpdate(req.params.id, {
      $set: {
        email: req.body.email,
        password: updatedHashedPassword,
        username: req.body.username,
      },
    }, {new: true});
    return res.status(200).json({message: "User updated sucessful"})
  }
  catch(err){
    next(err)
  }
}

export {createUser,deleteUser, updateUser};
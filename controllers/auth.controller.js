import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import handleError from "../middleware/error.middleware.js";
import jwt from "jsonwebtoken"



const signIn = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) return next(handleError(403, "mail or password cannot be empty"));
    console.log(req.body.email)
    const email = req.body.email 
    const validUser = await User.findOne({ email});
    if (!validUser) return next(handleError(404, "User not found"));

    const validPassword = bcrypt.compareSync(req.body.password, validUser.password);
    if (!validPassword) return next(handleError(401, "Invalid password"));
    const accessToken = jwt.sign(
      { id: validUser._id, username: validUser.username },
      process.env.SECRET_KEY
    );

    const{password, ...rest}= validUser._doc

    return res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false, 
        sameSite: "None", 
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({...rest});
  } catch (err) {
    next(err);
  }
};


export {
  signIn
};

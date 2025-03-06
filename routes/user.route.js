import express from "express"
import { verifyCookie } from "../middleware/auth.middleware.js"
import { createUser, deleteUser, updateUser } from "../controllers/user.controller.js"
const userRouter = express.Router()

userRouter.route("/user").post(createUser)
userRouter.route("/user/:id").put(verifyCookie, updateUser)
userRouter.route("/user/:id").delete( verifyCookie, deleteUser)

export default userRouter
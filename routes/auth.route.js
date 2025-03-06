import express from "express"
import { signIn} from "../controllers/auth.controller.js"
const authRouter = express.Router()
authRouter.route("/signin").post(signIn)
export default authRouter



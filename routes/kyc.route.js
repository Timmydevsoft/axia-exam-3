import express from "express"
import { verifyCookie } from "../middleware/auth.middleware.js"
import { createKyc, updateKyc } from "../controllers/kyc.controller.js"
const kycRouter = express.Router()
kycRouter.route("/kyc").post(verifyCookie, createKyc)
kycRouter.route("/kyc").put(verifyCookie, updateKyc)
export default kycRouter
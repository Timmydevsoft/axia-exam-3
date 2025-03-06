import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import authRouter from "./routes/auth.route.js"
import errorHandler from "./middleware/errorHandler.js"
// import cookiePaser from "cookie-parser"
import { dbConnect } from "./config/db.connect.js"
import userRouter from "./routes/user.route.js"
import postRouter from "./routes/post.route.js"
import kycRouter from "./routes/kyc.route.js"
import {createRequire} from 'module'
const require = createRequire(import.meta.url)
const cookiePaser = require("cookie-parser")

dotenv.config()
const app = express()
app.use(express.json())
app.use(cookiePaser())
app.use(express.urlencoded({extended: true}))
const port = process.env.PORT || 5000

dbConnect()

const  coreOptions= {
    origin: ["http://localhost:5173"],
    credentials: true,
    methods:['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders:[
        'Authorization',
        'Content-Type'
    ]
}
app.use(cors(coreOptions))
app.use(express.json())
app.use("/api", authRouter)
app.use("/api", userRouter)
app.use("/api", postRouter)
app.use("/api", kycRouter)
app.use(errorHandler)

app.listen(port, ()=>{
    console.log('app is running on port ', port)
} )
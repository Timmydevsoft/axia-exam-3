import express from "express"
import { createPost, getAllPost, getPostById, deletePost, updatePost } from "../controllers/post.controller.js"
import { verifyCookie } from "../middleware/auth.middleware.js"

const postRouter = express.Router()
postRouter.route("/post").post(verifyCookie, createPost)
postRouter.route("/post").get(verifyCookie, getAllPost)
postRouter.route("/post/:id").get(verifyCookie,getPostById)
postRouter.route("/post/:id").put(verifyCookie,  updatePost)
postRouter.route("/post/:id").delete(verifyCookie, deletePost)

export default postRouter
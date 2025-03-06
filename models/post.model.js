import mongoose, { Schema } from "mongoose";
const PostSchema = new mongoose.Schema({
    title:{type: String, require:true, unique: true},
    text_body:{type: String, require:true},
    userId:{type: Schema.Types.ObjectId, ref: "user", required:true},
},{timestamps: true})

const Post = new mongoose.model("post", PostSchema)
 
export default Post
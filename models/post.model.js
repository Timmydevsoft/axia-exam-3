import mongoose, { Schema } from "mongoose";
import User from "./user.model.js";
const PostSchema = new mongoose.Schema({
    title:{type: String, require:true, unique: true},
    text_body:{type: String, require:true},
    userId:{type: Schema.Types.ObjectId, ref: "user", required:true},
},{timestamps: true})

PostSchema.pre("deleteOne", 
    {document: true, query: false}, 
    async function(next){
        try{
            console.log("fired")
            const user = await User.findById(this.userId)

            const{posts, ...rest} = user
            const uniquepost = posts.findIndex((item)=> item.toString() === this._id.toString())
            posts.splice(uniquepost, 1)
            await User.findByIdAndUpdate(this.userId, {$set:{
                rest,
                posts
            }})
            next()
        }
        catch(err){
            next(err)
        }
    }
)

PostSchema.post("save", async function (doc){
    try{
        console.log("fired")
        const user = await User.findById(doc.userId)
        const{posts, ...rest} =user
        posts.push(doc._id)
        await User.findByIdAndUpdate(doc.userId, {$set:{
            rest,
            posts
        }}, {new: true})
    }
    catch(err){
        console.log(err)
    }
})

const Post = new mongoose.model("post", PostSchema)
 
export default Post
import mongoose, {Schema} from "mongoose";
const UserSchema = new mongoose.Schema({
    username: { type: String, require: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    posts:[{type: Schema.Types.ObjectId, ref:"post"}],
    kyc:{type: Schema.Types.ObjectId, ref:"kyc"}
}, { timestamps: true })


UserSchema.pre("deleteOne",
    { document: true, query: false },
    async function (next) {
        try {
            console.log("usermidleware fired")
            const Post = mongoose.model("post")
            const KYC = mongoose.model("kyc")
            await Post.deleteMany({ userId: this._id })
            await KYC.deleteOne({ ownerId: this._id })
            next()
        }
        catch (err) {
            next(err)
        }
    })

const User = new mongoose.model("user", UserSchema)
export default User
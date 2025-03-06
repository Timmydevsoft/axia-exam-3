import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
}, { timestamps: true })


UserSchema.pre("deleteOne",
    { document: true, query: false },
    async function (next) {
        try {
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
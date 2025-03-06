import mongoose,{ Schema } from "mongoose"

const kycSchema = new mongoose.Schema({
    nickName:{type: String, required: true, unique: true},
    occupation:{type: String, required: true},
    ownerId:{type: Schema.Types.ObjectId, ref: "user", required:true}
})

const KYC = new mongoose.model("kyc", kycSchema)
export default KYC
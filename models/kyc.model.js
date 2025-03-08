import mongoose,{ Schema } from "mongoose"
import User from "./user.model.js"

const kycSchema = new mongoose.Schema({
    nickName:{type: String, required: true, unique: true},
    occupation:{type: String, required: true},
    ownerId:{type: Schema.Types.ObjectId, ref: "user", required:true}
})

kycSchema.post("save", async function(doc){
    try{
        const user = await User.findById(doc.ownerId)
        const {...rest} =  user
        await User.findByIdAndUpdate(doc.ownerId, {$set:{
            rest,
            kyc: doc._id
        }},{new: true}

        )
    }
    catch(err){
        console.log(err)
    }

})
const KYC = new mongoose.model("kyc", kycSchema)
export default KYC
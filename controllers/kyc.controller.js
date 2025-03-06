import handleError from "../middleware/error.middleware.js"
import KYC from "../models/kyc.model.js"
const createKyc = async(req,res, next)=>{
    try{
        const{nickName, occupation}=req.body
        if(!nickName || !occupation){
            return handleError(403," All field are required")
        }
        const kycAlreadyCreated = await KYC.findOne({userId: req.id})
        if(kycAlreadyCreated){
            return next(handleError(401, "You can't create kyc twice"))
        }

        const newKyc = new KYC({ownerId: req.id, nickName, occupation})
        await newKyc.save()
        res.status(201).json({message: "kyc created successfully"})
    }
    catch(err){
        next(err)
    }
}

const updateKyc = async(req, res, next)=>{
    try{
        const{nickName, occupation}=req.body
        if(!nickName || !occupation){
            return next(handleError(403," All field are required"))
        }
        const getUserKyc = await KYC.findOne({userId: req.params.id})
        if(!getUserKyc)return next(handleError(403, "No such user"))
        const{_id, ownerId,...rest} = getUserKyc
        if(req.id.toString() !== ownerId.toString()){
            return next(handleError(403, "You can only update your kyc"))
        }
        await KYC.findByIdAndUpdate(_id, {
            $set:{
                nickName, 
                occupation,
                ownerId
            }
        },{new: true})
        return res.status(200).json({message: "KYC updated successfully"})

    }
    catch(err){
        next(err)
    }
}
export{createKyc, updateKyc}
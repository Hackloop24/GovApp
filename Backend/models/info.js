import mongoose from 'mongoose';
 
const InfoSchema = new mongoose.Schema({
    username: String,  
    email: String,
    password: String
})
const InfoModel = mongoose.model("information", InfoSchema)
export default InfoModel;
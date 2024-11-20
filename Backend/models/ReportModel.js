import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
  queryNumber: {
    type: String,
    unique: true,
    default: () => `QR${Date.now()}${Math.floor(Math.random() * 1000)}`,
  },
  description:{type: String, required:true},
  state:{type: String, required:true},
  district:{type: String, required:true},
  taluk:{type: String, required:true},
  municipal:{type: String, required:true},
  pincode: {type: String, required:true},
  proof:{type: String, required:true},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
//connecting to the reports collection under information database
//(commented during error resolving to confirm the functioning->
const ReportModel = mongoose.model('Report', ReportSchema, 'reports');
export default ReportModel;

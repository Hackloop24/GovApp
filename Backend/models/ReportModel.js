import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
  queryNumber: {
    type: String,
    unique: true,
    default: () => `QR${Date.now()}${Math.floor(Math.random() * 1000)}`,
  },
  description: String,
  state: String,
  district: String,
  taluk: String,
  municipal: String,
  pincode: String,
  proof: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//connecting to the reports collection under information database
const ReportModel = mongoose.model('Report', ReportSchema, 'reports');

export default ReportModel;

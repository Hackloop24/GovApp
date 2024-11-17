import express from 'express';
import ReportModel from './models/ReportModel.js';

const router = express.Router();
// create a new report
router.post('/', async (req, res) => {
  //try with /report 
  //goback with / only if not worked (intially it was /)
  const {
    description,
    state,
    district,
    taluk,
    municipal,
    pincode,
    proof
  } = req.body;  //request the data

  try {
    // new report document
    const newReport = new ReportModel({
      description, 
      state,
      district,
      taluk,
      municipal,
      pincode,
      proof,
    });

    //save report to the database
    await newReport.save();

    // Respond with the created report
    res.status(201).json({
      message: 'Report submitted successfully',
      report: newReport,
    });
  } catch (error) {
    console.error('Error submitting report:', error);
    res.status(500).json({ message: 'Error submitting report', error });
  }
});

export default router;

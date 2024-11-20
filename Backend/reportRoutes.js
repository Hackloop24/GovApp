import express from 'express';
import ReportModel from './models/ReportModel.js';

const router = express.Router();
// create a new report
router.post('/create', async (req, res) => {
  //try with /report 
  //goback with / only if not worked (intially it was /)
  try{
    const newReport = new ReportModel(req.body);
    await newReport.save();
    res.status(201).send({
      message: 'Report submitted successfully',
      report: newReport,});
      }catch (error) {
        console.error('Error submitting report:', error);
        res.status(500).send({ message: 'Error submitting report', error });
      }
    });
router.get('/', async (req, res) => {
  try {
    const reports = await ReportModel.find();
    res.status(200).json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ message: 'Error fetching reports', error });
  }
});

export default router;

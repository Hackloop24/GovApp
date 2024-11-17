router.get('/reports', async (req, res) => {
    try {
      const reports = await ReportModel.find(); // Fetch all reports from the database and collection named reports
      res.status(200).json(reports); //sending report as the response
    } catch (error) {
      console.error('Error fetching reports:', error);
      res.status(500).json({ message: 'Error fetching reports', error });
    }
  });
  
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Track = () => {
  const [reports, setReports] = useState([]); // State to hold the reports
  const [error, setError] = useState(null); // Error state for error handling

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:5003/api/reports'); // Fetch reports from the backend
        setReports(response.data); // Store the fetched reports in state
      } catch (error) {
        console.error('Error fetching reports:', error);
        setError('Failed to fetch reports. Please try again later.');
      }
    };

    fetchReports(); // Call the function to fetch reports on component mount
  }, []); // Empty array means this effect runs once when the component mounts

  return (
    <>
      {/* Top Navigation Bar - Full Width */}
      <nav className="w-screen bg-gray-800 px-6 py-4 shadow-lg sticky top-0 z-50">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex space-x-8">
            <a href="/homeIn" className="text-gray-300 hover:text-blue-400">Home</a>
            <a href="/report" className="text-gray-300 hover:text-blue-400">Report</a>
            <a href="#help" className="text-gray-300 hover:text-blue-400">Help</a>
          </div>
        </div>
      </nav>

      <div className="min-h-screen bg-gray-900 text-gray-200">
        {/* Track Progress Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-4xl font-bold text-blue-400 mb-4">View Report Progress</h2>
          <p className="text-gray-400 mb-12">
            Easily track the status and progress of submitted reports.
          </p>

          {error && <p className="text-red-500">{error}</p>} {/* Display error message if any */}

          {/* Report Progress Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reports.length > 0 ? (
              reports.map((report) => (
                <div key={report._id} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300">
                  <h4 className="text-xl font-semibold text-blue-300 mb-2">Report #{report.queryNumber}</h4>
                  <p className="text-gray-400 mb-2">Submitted: {new Date(report.createdAt).toLocaleDateString()}</p>
                  {/* <p className="text-gray-400 mb-4">Last Updated: {new Date(report.updatedAt).toLocaleDateString()}</p> */}

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <label className="block text-gray-400 mb-2">Progress:</label>
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <span className="text-sm font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                          {/* Example progress percentage - you can adjust this based on your report data */}
                          {report.progress || 'N/A'}% {/* Assuming `progress` is a field in your report */}
                        </span>
                      </div>
                      <div className="flex mb-2 items-center justify-between">
                        <span className="text-sm font-semibold inline-block py-1 px-2 uppercase rounded-full text-orange-600 bg-orange-200">
                          Pending {/* Customize this depending on report's status */}
                        </span>
                      </div>
                      <div className="flex mb-2">
                        <div className="w-full bg-gray-300 rounded-full">
                          <div
                            className="bg-teal-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full"
                            style={{ width: `${report.progress || 0}%` }} // Use dynamic progress width
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Updates */}
                  <h5 className="text-lg font-semibold text-blue-300 mb-2">Status Updates:</h5>
                  <ul className="text-gray-400 list-inside list-decimal">
                    {report.statusUpdates && report.statusUpdates.length > 0 ? (
                      report.statusUpdates.map((update, index) => (
                        <li key={index}>{update}</li>
                      ))
                    ) : (
                      <p>No updates available.</p>
                    )}
                  </ul>

                  <p className="text-gray-400 mt-4">
                    Next step: <span className="text-teal-400 font-semibold">Government Review</span> {/* This can be dynamic based on the report */}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No reports to display.</p>
            )}
          </div>
        </section>

        {/* Footer - Full Width */}
        <footer className="w-screen bg-gray-800 py-4 text-gray-400 text-center">
          <p>&copy; 2024 Grievance Platform. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default Track;

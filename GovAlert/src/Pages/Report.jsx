import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Report = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    description: "",
    state: "",
    district: "",
    taluk: "",
    municipal: "",
    pincode: "",
    proof: null,
  });
  const [reports, setReports] = useState([]); // State to store fetched reports
  const [error, setError] = useState(null);
  // Handle text input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file uploads
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      proof: e.target.files, // Add selected files to formData
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to handle file uploads
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === "proof" && formData.proof) {
        Array.from(formData.proof).forEach((file) => formDataToSend.append(key, file));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post("http://localhost:5003/report", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(`Report submitted! Query Number: ${response.data.queryNumber}`);
      navigate("/track");
    } catch (error) {
      console.error("Error submitting report:", error);
      setError("Failed to submit report. Please try again.");
    }
  };

  // Fetch all reports
  const fetchReports = async () => {
    try {
      const response = await axios.get("http://localhost:5003/api/reports");
      setReports(response.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
      setError("Failed to fetch reports.");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="bg-gray-900 text-gray-200 flex flex-col min-h-screen w-screen overflow-hidden">
      {/* Navigation */}
      <nav className="bg-gray-800 p-4 shadow-lg flex justify-between items-center sticky top-0 z-50 w-full">
        <div className="flex items-center space-x-8">
          <a href="/" className="text-gray-300 hover:text-blue-400">Home</a>
          <a href="/report" className="text-gray-300 hover:text-blue-400">Report</a>
        </div>
      </nav>

      {/* Header */}
      <header className="text-center py-8 bg-gray-900 w-full">
        <h1 className="text-4xl font-bold text-blue-400">Grievance Redressal Platform</h1>
      </header>

      {/* Form Section */}
      <section className="flex-grow container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-blue-400 mb-8">Submit Your Grievance</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto" encType="multipart/form-data">
          {/* Problem Description */}
          <div>
            <label htmlFor="description" className="block text-left text-gray-200">Problem Description:</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              className="w-full p-2 rounded-md bg-gray-800 text-gray-200"
              placeholder="Describe the issue..."
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* File Upload */}
          <div>
            <label htmlFor="proof" className="block text-left text-gray-200">Upload Proof:</label>
            <input
              type="file"
              id="proof"
              multiple
              onChange={handleFileChange}
              className="block w-full text-gray-200"
            />
          </div>

          {/* Location Details */}
          <div>
            <h3 className="text-xl font-semibold text-blue-300">Location Details</h3>
            {["state", "district", "taluk", "municipal", "pincode"].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-left text-gray-200">
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </label>
                <input
                  type="text"
                  id={field}
                  name={field}
                  placeholder={`Enter ${field}`}
                  className="w-full p-2 rounded-md bg-gray-800 text-gray-200"
                  value={formData[field]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-gray-900 font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit Grievance
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 bg-gray-800 text-gray-400 w-full">
        &copy; 2024 Grievance Redressal Platform. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Report;

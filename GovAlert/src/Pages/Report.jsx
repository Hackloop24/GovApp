import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Report() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    description: '',
    state: '',
    district: '',
    taluk: '',
    municipal: '',
    pincode: '',
  });
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clearing previous errors
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('description', formData.description);
      formDataToSend.append('state', formData.state);
      formDataToSend.append('district', formData.district);
      formDataToSend.append('taluk', formData.taluk);
      formDataToSend.append('municipal', formData.municipal);
      formDataToSend.append('pincode', formData.pincode);

    
      Array.from(files).forEach((file) => {
        formDataToSend.append('files', file);
      });

      // Send data with files to the backend
      const response = await axios.post('http://localhost:5002/api/report', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      alert(`Report submitted! Query Number: ${response.data.queryNumber}`);
      navigate("/track");
    } catch (error) {
      console.error("Error submitting report:", error);
      setError("Failed to submit report. Please try again.");
    }
  };

  const goToHome = (event) => {
    event.preventDefault();
    alert("You are now going to the home page");
    navigate("/homeIn");
  };

  return (
    <div className="bg-gray-900 text-gray-200 flex flex-col min-h-screen w-screen overflow-hidden">
      <nav className="bg-gray-800 p-4 shadow-lg flex justify-between items-center sticky top-0 z-50 w-full">
        <div className="flex items-center space-x-8">
          <a href="/" onClick={goToHome} className="text-gray-300 hover:text-blue-400">Home</a>
          <a href="/report" className="text-gray-300 hover:text-blue-400">Report</a>
        </div>
      </nav>

      <header className="text-center py-8 bg-gray-900 w-full">
        <h1 className="text-4xl font-bold text-blue-400">Grievance Redressal Platform</h1>
      </header>

      <section className="flex-grow container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-blue-400 mb-8">Submit Your Grievance</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto" encType="multipart/form-data">
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

          <div>
            <h3 className="text-xl font-semibold text-blue-300">Location Details</h3>
            <label htmlFor="state" className="block text-left text-gray-200">State:</label>
            <input
              type="text"
              id="state"
              name="state"
              placeholder="Enter State"
              className="w-full p-2 rounded-md bg-gray-800 text-gray-200"
              value={formData.state}
              onChange={handleChange}
            />
            <label htmlFor="district" className="block text-left text-gray-200">District:</label>
            <input
              type="text"
              id="district"
              name="district"
              placeholder="Enter District"
              className="w-full p-2 rounded-md bg-gray-800 text-gray-200"
              value={formData.district}
              onChange={handleChange}
            />
            <label htmlFor="taluk" className="block text-left text-gray-200">Taluk:</label>
            <input
              type="text"
              id="taluk"
              name="taluk"
              placeholder="Enter Taluk"
              className="w-full p-2 rounded-md bg-gray-800 text-gray-200"
              value={formData.taluk}
              onChange={handleChange}
            />
            <label htmlFor="municipal" className="block text-left text-gray-200">Panchayat/Municipal Corporation:</label>
            <input
              type="text"
              id="municipal"
              name="municipal"
              placeholder="Enter Panchayat or Municipal Corporation"
              className="w-full p-2 rounded-md bg-gray-800 text-gray-200"
              value={formData.municipal}
              onChange={handleChange}
            />
            <label htmlFor="pincode" className="block text-left text-gray-200">Pin Code:</label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              placeholder="Enter Pin Code"
              className="w-full p-2 rounded-md bg-gray-800 text-gray-200"
              value={formData.pincode}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-gray-900 font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit Grievance
          </button>
        </form>
      </section>

      <footer className="text-center py-4 bg-gray-800 text-gray-400 w-full">
        &copy; 2024 Grievance Redressal Platform. All Rights Reserved.
      </footer>
    </div>
  );
}

export default Report;

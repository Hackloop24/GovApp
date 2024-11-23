import React from 'react';
import { Link } from "react-router-dom";

function Home() {
  const reloadPage = (event) => {
    event.preventDefault();
    window.location.reload();
    alert("You are now on the Home page/Main page");
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen w-full flex flex-col">
      {/* Top Navigation Bar (From Old Version) */}
      <nav className="bg-gray-800 p-4 shadow-lg flex justify-between items-center w-full sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <a
            href="/home"
            className="flex items-center space-x-1 text-gray-300 hover:text-blue-400"
            onClick={reloadPage}
          >
            <i className="fa fa-home"></i><span>Home</span>
          </a>
          <Link to="/report" className="flex items-center space-x-1 text-gray-300 hover:text-blue-400">
            <i className="fa fa-flag"></i><span>Report</span>
          </Link>
          <a href="#phone" className="flex items-center space-x-1 text-gray-300 hover:text-blue-400">
            <i className="fa fa-phone"></i><span>Contact</span>
          </a>
          <a href="#help" className="flex items-center space-x-1 text-gray-300 hover:text-blue-400">
            <i className="fa fa-question-circle"></i><span>Help</span>
          </a>
          <a href="#about" className="flex items-center space-x-1 text-gray-300 hover:text-blue-400">
            <i className="fa fa-info-circle"></i><span>About Us</span>
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <a href="/login" className="text-blue-400 hover:text-blue-500">
            Sign In
          </a>
          <a href="/signup" className="text-blue-400 hover:text-blue-500">
            Sign Up
          </a>
        </div>
      </nav>

      {/* Website Header (From Old Version) */}
      <header className="text-center py-8 bg-gray-900 w-full">
        <h1 className="text-4xl font-bold text-blue-400 typing-animation">
          Grievance Redressal Platform
        </h1>
        <p className="text-gray-400 mt-2 text-base">
          A transparent platform for residents to report issues and monitor their resolution.
        </p>
      </header>

      {/* Main Content (From New Version) */}
      <main className="w-full flex-grow flex flex-col items-center justify-center px-4 py-8">
        <h2 className="text-4xl font-bold mb-8 text-blue-400">Welcome to GovAlert</h2>
        <p className="text-gray-400 mb-12 text-base text-center">
          Facilitating communication between citizens and local governments. Report community issues directly and track their progress.
        </p>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2 lg:px-16 xl:px-24 2xl:px-32">
          <a href="/report" className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 flex flex-col items-center">
            <i className="fas fa-bullhorn text-blue-400 text-3xl mb-4"></i>
            <h3 className="text-xl font-semibold text-blue-300 mb-2">Report Issues</h3>
            <p className="text-gray-400 text-base text-center">
              Submit reports about local issues, attach photos, and provide descriptions.
            </p>
          </a>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 flex flex-col items-center">
            <i className="fas fa-map-marker-alt text-blue-400 text-3xl mb-4"></i>
            <h3 className="text-xl font-semibold text-blue-300 mb-2">Map Issues</h3>
            <p className="text-gray-400 text-base text-center">
              View reported issues on a map to enhance visibility for local governments.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 flex flex-col items-center">
            <i className="fas fa-comments text-blue-400 text-3xl mb-4"></i>
            <h3 className="text-xl font-semibold text-blue-300 mb-2">Government Response</h3>
            <p className="text-gray-400 text-base text-center">
              Local government officials can respond to reports and update their status.
            </p>
          </div>

          <a href="/track" className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 flex flex-col items-center">
            <i className="fas fa-tasks text-blue-400 text-3xl mb-4"></i>
            <h3 className="text-xl font-semibold text-blue-300 mb-2">Track Progress</h3>
            <p className="text-gray-400 text-base text-center">
              Users can track the progress of their reports, fostering engagement and trust.
            </p>
          </a>
          <a href="http://localhost:4000/" className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 flex flex-col items-center">
            <i className="fas fa-tasks text-blue-400 text-3xl mb-4"></i>
            <h3 className="text-xl font-semibold text-blue-300 mb-2">Community Engagement</h3>
            <p className="text-gray-400 text-base text-center">
            Encourage community involvement and collaboration to address local issues.
            </p>
          </a>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 flex flex-col items-center">
            <i className="fas fa-shield-alt text-blue-400 text-3xl mb-4"></i>
            <h3 className="text-xl font-semibold text-blue-300 mb-2">Transparency</h3>
            <p className="text-gray-400 text-base text-center">
              Ensure transparency and accountability in local government operations.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 bg-gray-800 text-gray-400 text-base w-full">
        &copy; 2024 Grievance Redressal Platform. All Rights Reserved.
      </footer>
    </div>
  );
}

export default Home;

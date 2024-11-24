import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import welcome from "../assets/welcome.jpg";

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5003/register', {
        username,
        email,
        password,
      });
      alert(response.data.message);
      navigate('/homeIn');
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.error || 'An error occurred during sign-up.');
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${welcome})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
      }}
      className="flex items-center justify-center"
    >
      {/* Background overlay for better readability */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative text-gray-200 flex flex-col min-h-screen w-screen h-screen overflow-hidden">
        {/* Top Navigation Bar */}
        <nav className="bg-gray-800 p-4 shadow-lg flex justify-between items-center sticky top-0 z-50 w-full">
          <div className="flex items-center space-x-8">
            <a href="/home" className="flex items-center space-x-1 text-gray-300 hover:text-blue-400">
              <i className="fa fa-home"></i><span>Home</span>
            </a>
            <a href="/report" className="flex items-center space-x-1 text-gray-300 hover:text-blue-400">
              <i className="fa fa-flag"></i><span>Report</span>
            </a>
            {/* <a href="#phone" className="flex items-center space-x-1 text-gray-300 hover:text-blue-400">
              <i className="fa fa-phone"></i><span>Contact</span>
            </a>
            <a href="#help" className="flex items-center space-x-1 text-gray-300 hover:text-blue-400">
              <i className="fa fa-question-circle"></i><span>Help</span>
            </a> */}
            <a href="http://localhost:4000/about" className="flex items-center space-x-1 text-gray-300 hover:text-blue-400">
              <i className="fa fa-info-circle"></i><span>About Us</span>
            </a>
          </div>
        </nav>

        <div className="min-h-screen w-screen flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-200 text-center">Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-300">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 text-gray-300 bg-gray-900 rounded-lg focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-300">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-gray-300 bg-gray-900 rounded-lg focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-300">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 text-gray-300 bg-gray-900 rounded-lg focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Sign Up
              </button>
            </form>
            <p className="mt-4 text-center text-gray-400">
              Already have an account?{' '}
              <a
                onClick={() => navigate('/login')}
                className="text-blue-500 hover:underline"
              >
                Log In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

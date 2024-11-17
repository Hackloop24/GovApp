import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signin() {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5003/login", { email: username, password })
      .then((result) => {
        console.log(result);
        if (result.data.message === "login successful") {
          navigate("/homeIn");
          // this code will be executed if the login is successful
          const onlyName = username.split("@")[0];
          const CapsName= onlyName.charAt(0).toUpperCase() + onlyName.slice(1);
          alert(`Welcome back ${CapsName}`);
          //here this will print the username
        } else {
          alert("No user found");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("An error occurred during login."); 
      });
  };

  return (
    <div className="bg-gray-900 text-gray-200 flex flex-col min-h-screen w-screen h-screen overflow-hidden">
      {/* Top Navigation Bar */}
      <nav className="bg-gray-800 p-4 shadow-lg flex justify-between items-center sticky top-0 z-50 w-full">
        <div className="flex items-center space-x-8">
          <a href="/" className="flex items-center space-x-1 text-gray-300 hover:text-blue-400">
            <i className="fa fa-home"></i><span>Home</span>
          </a>
          <a href="/report" className="flex items-center space-x-1 text-gray-300 hover:text-blue-400">
            <i className="fa fa-flag"></i><span>Report</span>
          </a>
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
      </nav>

      {/* Main Content */}
      <main className="flex items-center justify-center flex-grow w-full h-full">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">Sign In</h2>
          <form onSubmit={handleSignIn}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-300">Email</label>
              <input
                type="email"
                id="username"
                name="username"
                placeholder="Email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-300 bg-gray-900"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-300">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-300 bg-gray-900"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Sign In
            </button>
          </form>
          <p className="mt-4 text-center text-gray-400">
            Don't have an account?{" "}
            <a
              onClick={() => navigate("/signup")}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Sign Up
            </a>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 bg-gray-800 text-gray-400 w-full">
        &copy; 2024 GovAlert. All Rights Reserved.
      </footer>
    </div>
  );
}

export default Signin;

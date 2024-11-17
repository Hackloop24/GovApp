import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [username, setUsername] = useState(''); // Changed from name to username for clarity
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5003/register', { username, email, password }) // Send username instead of name
        //check this and change to 3001
            .then(result => {
                console.log(result);
                alert("Sign-up successful!");
                navigate('/homeIn'); // Navigate to homeIn after successful signup
            })
            .catch(err => {
                console.error(err);
                alert("Error occurred during sign-up");
            });
    };

    return (
        <>
            {/* Top Navigation Bar - Full Width */}
            <nav className="w-screen bg-gray-800 px-6 py-4 shadow-lg">
                <div className="flex justify-start">
                    <a href="/home" className="text-gray-300 hover:text-blue-400 mr-8">Home</a>
                    <a href="/report" className="text-gray-300 hover:text-blue-400 mr-8">Report</a>
                    <a href="/" className="text-gray-300 hover:text-blue-400 mr-8">Contact</a>
                    <a href="#help" className="text-gray-300 hover:text-blue-400 mr-8">Help</a>
                    <a href="#about" className="text-gray-300 hover:text-blue-400">About Us</a>
                </div>
            </nav>

            {/* Main Content */}
            <div className="min-h-screen bg-gray-900 flex flex-col">
                <main className="flex-grow flex items-center justify-center p-4">
                    <div className="bg-gray-800 p-4 shadow-lg rounded-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-6 text-center text-gray-200">Create an Account</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-300">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-300 bg-gray-900"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-gray-300">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-300 bg-gray-900"
                                    required
                                    onChange={(e) => setUsername(e.target.value)} // Update state for username
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password" className="block text-gray-300">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-300 bg-gray-900"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                            >
                                Sign Up
                            </button>
                        </form>
                        <p className="mt-4 text-center text-gray-400">
                            Already have an account?
                            <a onClick={() => navigate('/login')} className="text-blue-600 hover:underline ml-1">Sign In</a> {/* Updated to use navigate */}
                        </p>
                    </div>
                </main>

                {/* Footer - Full Width */}
                <footer className="w-screen bg-gray-800 py-4 text-gray-400 text-center">
                    &copy; 2024 Grievance Redressal Platform. All Rights Reserved.
                </footer>
            </div>
        </>
    );
}

export default Signup;
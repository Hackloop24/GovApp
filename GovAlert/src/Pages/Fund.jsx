// src/Pages/Fund.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Fund = () => {
    const fundsData = [
        { problemId: 1, description: "Street Light Repair", totalAllocated: 10000, utilized: 5000 },
        { problemId: 2, description: "Water Supply Issue", totalAllocated: 20000, utilized: 15000 },
        { problemId: 3, description: "Road Pothole Filling", totalAllocated: 15000, utilized: 5000 },
        { problemId: 4, description: "Park Maintenance", totalAllocated: 12000, utilized: 8000 }
    ];

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col">
            {/* Navbar */}
            <nav className="bg-gray-800 p-4 shadow-lg fixed w-full top-0 left-0 z-50">
                <div className="max-w-screen-xl mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <a
                            href="/homeIn"
                            className="flex items-center space-x-1 text-gray-300 hover:text-blue-400"
                        >
                            <i className="fa fa-home"></i>
                            <span>Home</span>
                        </a>
                        <Link
                            to="/report"
                            className="flex items-center space-x-1 text-gray-300 hover:text-blue-400"
                            onClick={() => console.log('Report clicked')}
                        >
                            <i className="fa fa-flag"></i>
                            <span>Report</span>
                        </Link>
                        <a
                            href="http://localhost:4000/about"
                            className="flex items-center space-x-1 text-gray-300 hover:text-blue-400"
                        >
                            <i className="fa fa-info-circle"></i>
                            <span>About Us</span>
                        </a>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex flex-col items-center justify-center flex-grow mt-16 w-full">
                <h1 className="text-white text-4xl mb-6 text-center">
                    Funds Allocation and Utilization
                </h1>
                <div className="overflow-x-auto w-full px-4 max-w-6xl">
                    <table className="min-w-full bg-gray-800 rounded-lg shadow-lg">
                        <thead>
                            <tr className="bg-gray-700 text-white">
                                <th className="py-3 px-4">Sl No</th>
                                <th className="py-3 px-4">Description</th>
                                <th className="py-3 px-4">Total Funds Allocated</th>
                                <th className="py-3 px-4">Funds Utilized</th>
                                <th className="py-3 px-4">Remaining Funds</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-300">
                            {fundsData.map(fund => {
                                const remaining = fund.totalAllocated - fund.utilized;
                                return (
                                    <tr key={fund.problemId} className="border-b border-gray-700">
                                        <td className="py-2 px-4">{fund.problemId}</td>
                                        <td className="py-2 px-4">{fund.description}</td>
                                        <td className="py-2 px-4">{fund.totalAllocated}</td>
                                        <td className="py-2 px-4">{fund.utilized}</td>
                                        <td className="py-2 px-4">{remaining}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Fund;

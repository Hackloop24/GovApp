import React from 'react';
import Home from './Pages/Home';
// import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';
import Submain from './Pages/submain';
import Track from './Pages/track';
import Report from './Pages/report';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home2 from './Pages/Home2';
import Fund from './Pages/Fund';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<Report />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/submain" element={<Submain />} />
        <Route path="/track" element={<Track />} />
        <Route path="/home" element={<Home />} />
        <Route path="/homeIn" element={<Home2 />} />
        <Route path="/fund" element={<Fund/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

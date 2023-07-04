import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import VideoLists from './pages/VideoLists/VideoLists';
import Education from './pages/Education/Education';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/education/videos" element={<VideoLists />} />
        <Route path="/education" element={<Education/>} />
      </Routes>
    </BrowserRouter >
  )
}

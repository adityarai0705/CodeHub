import React from 'react';
import UserHome from './pages/UserHome/UserHome';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Leaderboard from './pages/Leaderboard/Leaderboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/user-home' element={<UserHome cfID={"Aditya.Rai"}/>} />
        <Route path="/leader-board" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter >
  )
}
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import VideoLists from './pages/VideoLists/VideoLists';
import Education from './pages/Education/Education';
import NoticeBoard from './pages/NoticeBoard/NoticeBoard';
import Leaderboard from './pages/Leaderboard/Leaderboard';
import UserHome from './pages/UserHome/UserHome';
import {useState } from 'react';
import { loginContext } from './loginContext';
import { useParams } from 'react-router-dom';

export default function App() {
  const [login, setLogin] = useState(false);
  //cfID of user currently logged in
  const [userCfID,setUserCfID] = useState("")

  const params = useParams()
  return (
    <loginContext.Provider value={{ login, setLogin,userCfID,setUserCfID }}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/education/videos" element={<VideoLists />} />
        <Route path="/education" element={<Education />} />
        <Route path="/notice-board" element={<NoticeBoard />} />
        <Route path='/user-home/:id' element={<UserHome/>} />
        <Route path="/leader-board" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter >
    </loginContext.Provider>
  )
}
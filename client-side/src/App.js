import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import VideoLists from './pages/VideoLists/VideoLists';
import Education from './pages/Education/Education';
import NoticeBoard from "./pages/Noticeboard/Noticeboard"
import Leaderboard from './pages/Leaderboard/Leaderboard';
import DashBoard from './pages/DashBoard/dashboard';
import TeamMember from "./pages/Team/Team"
import Signup from "./pages/SignUp/signUp"
import VerifyEmail from "./pages/SignUp/verifyEmail"
import VerifyCfID from './pages/SignUp/verifyCfID';
import ContactUs from './pages/ContactUs/ContactUs';
import ProtectedRoute from './components/auth/ProtectRoute';
import Navbar from './components/NavBar/NavBar';
import { AuthWrapper } from './lib/AuthWrapper';
import ForgotPassword from './pages/SignUp/ForgetPassword';
export default function App() {


    return (

        <BrowserRouter>
            <AuthWrapper>
                <Navbar />
                <Routes>
                    <Route path={"/"} element={<LandingPage />} />
                    <Route path={"/login"} element={<LoginPage />} />
                    <Route path={"/signUp"} element={<Signup />} />
                    {/* Route for Forgot Password */}
                    <Route path={"/forgot-password"} element={<ForgotPassword />} />

                    <Route path={"/verify-email"} element={<VerifyEmail />} />
                    <Route path={"/verify-cf-id"} element={<VerifyCfID />} />
                    <Route path={"/education/videos"} element={<VideoLists />} />
                    <Route path={"/education"} element={<Education />} />
                    <Route path={"/notice-board"} element={<NoticeBoard />} />
                    <Route path={"/dashBoard"} element={<ProtectedRoute>
                        <DashBoard />
                    </ProtectedRoute>} />
                    <Route path={"/leaderboard"} element={<ProtectedRoute>
                        <Leaderboard />
                    </ProtectedRoute>} />
                    <Route path={"/team-member"} element={<TeamMember />} />
                    <Route path={"/contact-us"} element={<ContactUs />} />
                    <Route path= {"/get-codeforces-profile/:id"} element= {<ProtectedRoute>
                        <DashBoard />
                    </ProtectedRoute>}/>
                </Routes>
            </AuthWrapper>
        </BrowserRouter >

    )
}
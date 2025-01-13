import React, { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import VideoLists from './pages/VideoLists/VideoLists';
import Education from './pages/Education/Education';
import NoticeBoard from "./pages/Noticeboard/Noticeboard";
import Leaderboard from './pages/Leaderboard/Leaderboard';
import DashBoard from './pages/DashBoard/dashboard';
import TeamMember from "./pages/Team/Team";
import Signup from "./pages/SignUp/signUp";
import VerifyEmail from "./pages/SignUp/verifyEmail";
import VerifyCfID from './pages/SignUp/verifyCfID';
import ContactUs from './pages/ContactUs/ContactUs';
import ProtectedRoute from './components/auth/ProtectRoute';
import Navbar from './components/NavBar/NavBar';
import { AuthWrapper } from './lib/AuthWrapper';
import ForgotPassword from './pages/SignUp/ForgetPassword';

export default function App() {
    const handleCreateNotice = async (event) => {
        event.preventDefault();
        const title = event.target[0].value;
        const body = event.target[1].value;

        try {
            const response = await axios.post('/admin/notices', { title, body });
            if (response.data.status) {
                alert('Notice created successfully');
            }
        } catch (error) {
            console.error('Error creating notice:', error);
        }
    };

    const handleDeleteNotice = async (noticeId) => {
        try {
            const response = await axios.delete(`/admin/notices/${noticeId}`);
            if (response.data.status) {
                alert('Notice deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting notice:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            const response = await axios.delete(`/admin/users/${userId}`);
            if (response.data.status) {
                alert('User deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handlePromoteToAdmin = async (userId) => {
        try {
            const response = await axios.put(`/admin/users/${userId}/promote`);
            if (response.data.status) {
                alert('User promoted to admin successfully');
            }
        } catch (error) {
            console.error('Error promoting user:', error);
        }
    };

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
                    <Route path={"/admin-dashboard"} element={<ProtectedRoute>
                        <div>
                            <h1>Admin Dashboard</h1>
                            <div>
                                <h2>Create Notice</h2>
                                <form onSubmit={handleCreateNotice}>
                                    <input type="text" placeholder="Title" required />
                                    <textarea placeholder="Body" required></textarea>
                                    <button type="submit">Create Notice</button>
                                </form>
                            </div>
                            <div>
                                <h2>Manage Users</h2>
                                {/* List of users will be displayed here */}
                                <button onClick={() => handleDeleteUser(userId)}>Delete User</button>
                                <button onClick={() => handlePromoteToAdmin(userId)}>Promote to Admin</button>
                            </div>
                        </div>
                    </ProtectedRoute>} />
                    <Route path={"/team-member"} element={<TeamMember />} />
                    <Route path={"/contact-us"} element={<ContactUs />} />
                    <Route path={"/get-codeforces-profile/:id"} element={<ProtectedRoute>
                        <DashBoard />
                    </ProtectedRoute>} />
                </Routes>
            </AuthWrapper>
        </BrowserRouter>
    )
}

import React from 'react';
import UserHome from './pages/UserHome/UserHome';

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
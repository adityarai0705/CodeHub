import React from 'react'
import CTAdmin from './components/CTAdmin'
import AdminHome from './pages/AdminHome/AdminHome'
import AdminLogin from './pages/AdminLogin/AdminLogin'
import AdminNotice from './pages/AdminNotice/AdminNotice'

export default function App() {
  return (
    <div className='Container'>
        {/* <AdminHome /> */}
        {/* <AdminLogin /> */}
        <AdminNotice />
    </div>
  )
}

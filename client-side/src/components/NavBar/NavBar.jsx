/**
 * @fileoverview Navbar component for the application.
 */
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import CodeHubLogo from "./Assets/Logos/CodeHubSmall.png";
import HamburgerMenu from "./HamburgerMenu";
import { logout } from "../../redux/slices/authSlice";

function Navbar() {
  const auth = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleLogoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate("/");
  };

  return (
    <>
      <div className="w-[100vw] bg-primary custom1980:h-[92px] md:h-[60px] px-8 py-2 fixed bg-scheduleLargeText items-center justify-between z-50 md:flex hidden">
        <img
          src={CodeHubLogo}
          className="logo hover:cursor-pointer w-auto h-10 object-contain bg-transparent"
          onClick={handleLogoClick}
          alt="Codehub Website's Logo"
        />

        <div className="text-white navlinks w-[67%] flex h-full items-center justify-between font-bebas md:text-[1.6vw]">
          <h2
            className="hover:text-accent tracking-widest transition-colors cursor-pointer duration-300"
            onClick={() => navigate("/")}>
            HOME
          </h2>
          <h2
            className="hover:text-accent tracking-widest transition-colors cursor-pointer duration-300"
            onClick={() => navigate("/contact-us")}>
            Contact Us
          </h2>
          <h2
            className="hover:text-accent tracking-widest transition-colors cursor-pointer duration-300"
            onClick={() => navigate("/notice-board")}>
            NoticeBoard
          </h2>
        </div>

        {auth ? (
          <DropdownMenu />
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="auth rounded-lg w-[11vw] bg-[#008CFF] lg:w-[7.1vw] h-[47px] tracking-wider text-white font-semibold font-bebas hover:text-primary hover:bg-accent transition-all duration-500">
            <h1 className="lg:text-[1.3vw] md:text-[1.5vw]">Login</h1>
          </button>
        )}
      </div>

      <div className="w-screen h-auto -top-[15px] flex items-center justify-end z-50 md:hidden">
        <div className="bg-primary w-full h-24 absolute md:hidden"></div>
        <div className="z-30">
          <img
            src={CodeHubLogo}
            className="logo absolute left-2 logo hover:cursor-pointer w-auto h-10"
            onClick={handleLogoClick}
            alt="Codehub Website's Logo"
          />
        </div>
        <div>
          <HamburgerMenu />
        </div>
      </div>
    </>
  );
}

const DropdownMenu = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [arrowColor, setArrowColor] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("Inside HandleLogout navbar");
    await dispatch(logout());
    navigate("/login");
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Change Square color back to white incase mouseLeave is not triggered
  useEffect(() => {
    setArrowColor(false);
  }, [navigate])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleDropdownToggle}
        className="auth rounded-lg w-[11vw] bg-[#008CFF] lg:w-[7.1vw] h-[47px] tracking-wider text-white font-semibold font-bebas hover:text-primary hover:bg-accent transition-all duration-500">
        <h1 className="lg:text-[1.3vw] md:text-[1.5vw]">Profile</h1>
      </button>
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -7 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -7 }}
            key="dropdown"
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute right-0 w-[11vw] bg-slate-950 text-white rounded-lg shadow-lg mt-2 z-50">
            <div
              className={`absolute left-2/3 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 transition-colors duration-300 ${
                arrowColor ? "bg-blue-200" : "bg-slate-950"
              }`}
            />
            <h1
              className="hover:bg-blue-200 px-2 py-2 cursor-pointer transition-colors duration-300 hover:text-primary"
              onMouseEnter={() => setArrowColor(true)}
              onMouseLeave={() => setArrowColor(false)}
              onClick={() => {
                navigate("/dashboard");
                setDropdownOpen(false);
              }}>
              Dashboard
            </h1>
            <h1
              className="hover:bg-blue-200 px-2 py-2 cursor-pointer transition-colors duration-300 hover:text-primary"
              onClick={() => {
                navigate("/education");
                setDropdownOpen(false);
              }}>
              Education
            </h1>
            <h1
              className="hover:bg-blue-200 px-2 py-2 cursor-pointer transition-colors duration-300 hover:text-primary"
              onClick={() => {
                navigate("/leader-board");
                setDropdownOpen(false);
              }}>
              Leaderboard
            </h1>
            <h1
              className="hover:bg-red-200 px-2 py-2 cursor-pointer transition-colors duration-300 hover:text-red-500"
              onClick={() => {
                handleLogout();
                setDropdownOpen(false);
              }}>
              Logout
            </h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;

/**
 * @fileoverview Hamburger menu component for small screens.
 */
import { useState, useRef, useEffect } from "react";
import Hamburger from "hamburger-react"; //menu icon

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice"; 

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.user);
  const dropdownRef = useRef(null);

  // Toggle menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Toggle dropdown of profile.
  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Logout the user and navigate to login page.
  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
  };

  // Close dropdown when clicking outside the dropdown area.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (

    <div className="relative ">
      {/* menu icon */}
      <div
        className={`bg-opacity-[70%] rounded-xl ${
          isOpen ? "fixed" : "absolute right-4"
        } z-[90] right-4`}
      >

        <Hamburger
          toggled={isOpen}
          toggle={toggleMenu}
          color="#fff"
          size={30}
        />
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-gradient-to-b from-black to-primary z-30 transition-all duration-700"
          onClick={toggleMenu}
        />
      )}

      <div
        className={`fixed inset-0 py-16 w-full h-full text-white transition-all duration-700 ease-in-out transform ${
          isOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        } z-40`}
      >
        <nav className="flex flex-col justify-center gap-12 items-center h-full text-4xl font-bebas">
          <ul className="flex flex-col items-center justify-center gap-1">
            <li className="py-2 px-4 hover:text-blue1">
              <a href="/">Home</a>
            </li>
            <li className="py-2 px-4 hover:text-blue1">
              <a href="/contact-us">Contact Us</a>
            </li>
            <li className="py-2 px-4 hover:text-blue1">
              <a href="/notice-board">Notice Board</a>
            </li>
            {auth && (
              <li className="py-2 px-4 hover:text-blue1">
<a href="/leader-board">Leaderboard</a>
              </li>
            )}
          </ul>

          {/* Additional profile menu if the user is authenticated, otherwise show the login button */}
          {auth ? (
            <div
              ref={dropdownRef}
              className="relative w-[12rem] flex flex-col items-center"
            >
              <button
                onClick={handleProfileClick}
                className="w-full h-[3.5rem] bg-accent hover:bg-white hover:text-register rounded-md"
              >
                Profile
              </button>
              {dropdownOpen && (
                <div className="absolute top-[4rem] w-full bg-primary rounded-lg shadow-lg">
                  <a href="/dashboard">
                  <button
                    className="block w-full text-center py-2 hover:bg-blue1 rounded-md"
                  >
                    Dashboard
                  </button>
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-center py-2 hover:bg-red-500 rounded-md"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <a href="/login">
              <button className="w-[12rem] h-[4rem] bg-accent hover:bg-white hover:text-register rounded-md">
                Login
              </button>
            </a>
          )}
        </nav>
      </div>
    </div>
  );
};

export default HamburgerMenu;

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import logo1 from "../assets/scroll-logo.svg";
import { AuthContext } from "../provider/AuthProvider";
import sun from '../assets/contrast.png';
import moon from '../assets/moon.png'

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);

  // const [isTutor] = useTutor();
  // const [isStudent] = useStudent();
  // const [isAdmin] = useAdmin();


  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  // update state on toggle
  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  // set theme state in localstorage on mount & also update localstorage on state change
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    // add custom data-theme attribute to html tag required to update theme using DaisyUI
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`navbar ${
        isScrolled
          ? "bg-[#3b3563] text-white fixed top-0 left-0 w-full"
          : "bg-[#f5edfe]"
      } transition-all duration-300 py-3 container mx-auto px-12 z-50`}
    >
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><Link className="font-bold" to="/">Home</Link></li>
            <li><Link className="font-bold" to="/courses">Courses</Link></li>
            <li><Link className="font-bold" to="/aboutUs">About Us</Link></li>
          
            

{
            user && user.email && (
              <>
                <li><Link className="font-bold" to="/dashboard/overview">Dashboard</Link></li>
               <li><Link className="font-bold" to="/profile">Profile</Link></li>
              </>
             
            )
          }


          </ul>
        </div>
        <img src={isScrolled ? logo1 : logo} alt="Logo" />
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link className="font-bold" to="/">Home</Link></li>
          <li><Link className="font-bold" to="/courses">Courses</Link></li>
          <li><Link className="font-bold" to="/aboutUs">About Us</Link></li>

          {
            user && user.email && (
              <>
                <li><Link className="font-bold" to="/dashboard/overview">Dashboard</Link></li>
               <li><Link className="font-bold" to="/profile">Profile</Link></li>
              </>
            )
          }


        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end gap-4 hidden lg:flex">

         {/* Toggle button here */}
         <button className="btn btn-square btn-ghost">
          <label className="swap swap-rotate w-12 h-12">
            <input
              type="checkbox"
              onChange={handleToggle}
              // show toggle image based on localstorage theme
              checked={theme === "light" ? false : true}
            />
            {/* light theme sun image */}
            <img src={sun} alt="light" className="w-8 h-8 swap-on" />
            {/* dark theme moon image */}
            <img src={moon} alt="dark" className="w-8 h-8 swap-off" />
          </label>
        </button>



        {user ? (
          <div className="flex items-center justify-center gap-2">
            <img className="w-14 h-14 rounded-full" src={user?.photoURL} alt="User Avatar" />
            <button className="btn bg-[#ad6cf5] text-white font-bold" onClick={logOut}>
              Logout
            </button>
          </div>
        ) : (
          <div className="space-x-4">
            <button className="btn bg-[#ad6cf5] text-white font-bold">
              <Link to="/login">Log in</Link>
            </button>
            <button className="btn bg-[#ad6cf5] text-white font-bold">
              <Link to="/signup">Sign Up</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

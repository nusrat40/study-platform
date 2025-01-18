import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import logo1 from '../assets/scroll-logo.svg';
import { AuthContext } from "../provider/AuthProvider";
import useTutor from "../hooks/useTutor";
import useStudent from "../hooks/useStudent";
import useAdmin from "../hooks/useAdmin";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isScrolled,setIsScrolled]=useState(false);

  const [isTutor]=useTutor();
  const [isStudent]=useStudent();
  const [isAdmin]=useAdmin();

  useEffect(()=>{
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  },[])

  return (
    <div className={`navbar ${
      isScrolled ? "bg-[#3b3563] text-white fixed top-0 left-0 w-full" : "bg-[#f5edfe]"
    } transition-all duration-300 py-3 container mx-auto px-12 z-50`}>
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
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >

            {user && user?.email ? (
          <div className="flex flex-col gap-2">

            <div className="">
              <img className="w-14 h-14 rounded-full" src={user?.photoURL} alt="User Avatar" />
            </div>
            <button className="btn bg-[#ad6cf5] text-white font-bold" onClick={logOut}>Logout</button>
            <button className="btn bg-[#ad6cf5] text-white font-bold">Dashboard</button>

          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <button className="btn bg-[#ad6cf5] text-white font-bold">
              <Link to="/login">Log in</Link>
            </button>
            <button className="btn bg-[#ad6cf5] text-white font-bold">
              <Link to="/signup">Sign Up</Link>
            </button>
          </div>
        )}

          </ul>
        </div>

        <img src={isScrolled ? logo1 : logo} alt="" />
      </div>


      <div className="navbar-end gap-4 hidden lg:flex">
        {user && user?.email ? (
          <div className="flex items-center justify-center gap-2">

            <div className="">
              <img className="w-14 h-14 rounded-full" src={user?.photoURL} alt="User Avatar" />
            </div>
            <button className="btn bg-[#ad6cf5] text-white font-bold" onClick={logOut}>Logout</button>
            {
              user && isTutor && <Link to="/dashboard/addStudySession"> <button className="btn bg-[#ad6cf5] text-white font-bold">Dashboard</button></Link>
            }
            {
              user && isStudent && <Link to="/dashboard/viewBookedSessions"> <button className="btn bg-[#ad6cf5] text-white font-bold">Dashboard</button></Link>
            }
            {
              user && isAdmin && <Link to="/dashboard/allUsers"> <button className="btn bg-[#ad6cf5] text-white font-bold">Dashboard</button></Link>
            }
            

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

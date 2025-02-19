import React, { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import useTutor from "../../hooks/useTutor";
import useStudent from "../../hooks/useStudent";
import useAdmin from "../../hooks/useAdmin";
import { Link } from "react-router-dom";

const DashboardProfile = () => {
  const { user } = useContext(AuthContext);
  const [isTutor] = useTutor();
  const [isStudent] = useStudent();
  const [isAdmin] = useAdmin();

  // Determine User Role
  const getRole = () => {
    if (isAdmin) return "Admin";
    if (isTutor) return "Tutor";
    if (isStudent) return "Student";
    return "User";
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md text-center">
        <div className="relative flex justify-center">
          <img
            src={user?.photoURL || "https://via.placeholder.com/150"}
            alt="User Avatar"
            className="w-28 h-28 rounded-full border-4 border-purple-500 shadow-lg transition transform hover:scale-105"
          />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mt-4">{user?.displayName || "User Name"}</h2>
        <p className="text-gray-500 text-lg">{user?.email || "No Email Provided"}</p>
        
        <span className="mt-4 inline-block bg-purple-700 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md">
          {getRole()}
        </span>

        <div className="mt-6 flex justify-center gap-4">
          <button className="px-6 py-2 bg-purple-700 text-white font-bold rounded-lg shadow-lg hover:bg-purple-800 transition">
          <Link to='/'>Go Back to Home</Link>
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;

import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { FaBookOpen, FaCalendar, FaChalkboardTeacher, FaFileAlt, FaHome, FaStickyNote, FaUpload, FaUsers } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import useTutor from "../hooks/useTutor";
import useStudent from "../hooks/useStudent";

const DashboardLayout = () => {

  const [isAdmin] = useAdmin();
  const [isTutor] = useTutor();
  const [isStudent] =useStudent();

  return (
    <div className="flex">
      {/* dashboard side bar */}
      <div className="w-64 min-h-screen bg-[#f5edfe]">
        <ul className="menu p-4">

            {/* admin dashboard */}
          {isAdmin && (
            <>
              <li>
                <NavLink to="/dashboard/allUsers">
                  <FaUsers />
                  All Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allStudySession">
                  <MdMenuBook />
                  All Study Session
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allMaterials">
                  <FaFileAlt />
                  All Materials
                </NavLink>
              </li>
            </>
          )}


           {/* Tutor Dashboard */}
           {isTutor && (
            <>
              <li>
                <NavLink to="/dashboard/addStudySession">
                  <FaChalkboardTeacher />
                  Create Study Session
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/viewStudySessions">
                  <FaCalendar />
                   All Study Sessions
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/uploadMaterials">
                  <FaUpload />
                  Upload Materials
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/viewMaterials">
                  <FaFileAlt />
                  View All Materials
                </NavLink>
              </li>
            </>
          )}


          {/* Student Dashboard */}
          {isStudent && (
            <>
              <li>
                <NavLink to="/dashboard/viewBookedSessions">
                  <FaCalendar />
                  View Booked Sessions
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/createNote">
                  <FaStickyNote />
                  Create Note
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageNotes">
                  <FaBookOpen />
                  Manage Personal Notes
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/viewStudyMaterials">
                  <FaFileAlt />
                  View Study Materials
                </NavLink>
              </li>
            </>
          )}





          {/* shared nav links */}
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome>
              Home
            </NavLink>
          </li>
        </ul>
      </div>
      {/* dashboard content */}
      <div className="flex-1 p-2 lg:p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;

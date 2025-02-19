import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { FaBookOpen, FaCalendar, FaChalkboardTeacher, FaFileAlt, FaHome, FaStickyNote, FaUpload, FaUsers } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import useTutor from "../hooks/useTutor";
import useStudent from "../hooks/useStudent";
import { IoMdPerson } from "react-icons/io";
import { TbLayoutDashboardFilled } from "react-icons/tb";

const DashboardLayout = () => {

  const [isAdmin] = useAdmin();
  const [isTutor] = useTutor();
  const [isStudent] = useStudent();

  return (
    <div className="flex">
      {/* dashboard side bar */}
      <div className="w-64 min-h-screen bg-[#f5edfe]">
        <ul className="menu p-4">

          {/* Shared nav links - Dashboard and Home */}
          <li>
            <NavLink to="/dashboard/overview">
              <TbLayoutDashboardFilled />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/userProfile">
              <IoMdPerson />
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <FaHome />
              Home
            </NavLink>
          </li>

          <div className="divider"></div>

          {/* Admin Dashboard */}
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
            </>
          )}

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

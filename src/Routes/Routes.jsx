import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import ErrorPage from "../pages/Error/ErrorPage";
import DashboardLayout from "../Layout/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import AddStudySession from "../pages/Dashboard/Tutor/AddStudySession";
import ViewStudySession from "../pages/Dashboard/Tutor/ViewStudySession";
import UploadMaterials from "../pages/Dashboard/Tutor/UploadMaterials";
import ViewAllMaterials from "../pages/Dashboard/Tutor/ViewAllMaterials";
import BookedSession from "../pages/Dashboard/Student/BookedSession";
import CreateNote from "../pages/Dashboard/Student/CreateNote";
import ManageNotes from "../pages/Dashboard/Student/ManageNotes";
import StudyMaterials from "../pages/Dashboard/Student/StudyMaterials";
import AllUsers from "../pages/Dashboard/Admin/AllUsers";
import AllStudySession from "../pages/Dashboard/Admin/AllStudySession";
import AllMaterials from "../pages/Dashboard/Admin/AllMaterials";


export const router = createBrowserRouter([
  {
    path: "/",
    element:<MainLayout></MainLayout>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'login',
            element:<Login></Login>
        },
        {
            path:'signup',
            element:<SignUp></SignUp>
        }
    ]
  },
  {
    path:'dashboard',
    element:<PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[

      //tutor routes
      {
         path:'addStudySession',
         element:<AddStudySession></AddStudySession>
      },
      {
        path:'viewStudySessions',
        element:<ViewStudySession></ViewStudySession>
      },
      {
        path:'uploadMaterials',
        element:<UploadMaterials></UploadMaterials>
      },
      {
         path:'viewMaterials',
         element:<ViewAllMaterials></ViewAllMaterials>
      },

      //student routes
      {
        path:'viewBookedSessions',
        element:<BookedSession></BookedSession>
      },
      {
        path:'createNote',
        element:<CreateNote></CreateNote>
      },
      {
        path:'manageNotes',
        element:<ManageNotes></ManageNotes>
      },
      {
        path:'viewStudyMaterials',
        element:<StudyMaterials></StudyMaterials>
      },

      //admin routes
      {
        path:'allUsers',
        element:<AllUsers></AllUsers>
      },
      {
        path:'allStudySession',
        element:<AllStudySession></AllStudySession>
      },
      {
        path:'allMaterials',
        element:<AllMaterials></AllMaterials>
      }
    ]
  }
]);

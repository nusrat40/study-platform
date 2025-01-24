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
import AdminRoute from "./AdminRoute";
import StudentRoute from "./StudentRoute";
import TutorRoute from "./TutorRoute";
import UpdateStudySession from "../pages/Dashboard/Admin/UpdateStudySession";
import UpdateMaterial from "../pages/Dashboard/Tutor/UpdateMaterial";
import UpdateNote from "../pages/Dashboard/Student/UpdateNote";
import SessionDetails from "../pages/Home/SessionDetails";
import Payment from "../pages/Payment/Payment";
import BookedSessionDetail from "../pages/Dashboard/Student/BookedSessionDetail";


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
        },
        {
          path:'sessionDetails/:id',
          element:<PrivateRoute><SessionDetails></SessionDetails></PrivateRoute>,
          loader:({params})=> fetch(`http://localhost:5000/sessions/${params.id}`)
        },
        {
          path:'payment',
          element:<Payment></Payment>
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
         element:<TutorRoute><AddStudySession></AddStudySession></TutorRoute>
      },
      {
        path:'viewStudySessions',
        element:<TutorRoute><ViewStudySession></ViewStudySession></TutorRoute>
      },
      {
        path:'uploadMaterials',
        element:<TutorRoute><UploadMaterials></UploadMaterials></TutorRoute>
      },
      {
         path:'viewMaterials',
         element:<TutorRoute><ViewAllMaterials></ViewAllMaterials></TutorRoute>
      },
      {
        path:'updateMaterial/:id',
        element:<TutorRoute><UpdateMaterial></UpdateMaterial></TutorRoute>,
        loader: ({params})=> fetch(`http://localhost:5000/materials/${params.id}`)
        
      },

      //student routes
      {
        path:'viewBookedSessions',
        element:<StudentRoute><BookedSession></BookedSession></StudentRoute>
      },
      {
        path:'bookedSessionDetail/:id',
        element:<StudentRoute><BookedSessionDetail></BookedSessionDetail></StudentRoute>,
        loader: ({params})=> fetch(`http://localhost:5000/bookedSession/${params.id}`)
      },
      {
        path:'createNote',
        element:<StudentRoute><CreateNote></CreateNote></StudentRoute>
      },
      {
        path:'manageNotes',
        element:<StudentRoute><ManageNotes></ManageNotes></StudentRoute>
      },
      {
        path:'viewStudyMaterials/:id',
        element:<StudentRoute><StudyMaterials></StudyMaterials></StudentRoute>,
        loader: ({params})=> fetch(`http://localhost:5000/materials/session/${params.id}`)
      },
      {
        path:'updateNote/:id',
        element:<StudentRoute><UpdateNote></UpdateNote></StudentRoute>,
        loader: ({params})=> fetch(`http://localhost:5000/notes/${params.id}`)
        
      },

      //admin routes
      {
        path:'allUsers',
        element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
      {
        path:'allStudySession',
        element:<AdminRoute><AllStudySession></AllStudySession></AdminRoute>
      },
      {
        path:'allMaterials',
        element:<AdminRoute><AllMaterials></AllMaterials></AdminRoute>
      },
      {
        path:'updateItem/:id',
        element:<AdminRoute><UpdateStudySession></UpdateStudySession></AdminRoute>,
        loader: ({params})=> fetch(`http://localhost:5000/sessions/${params.id}`)
        
      }
    ]
  }
]);

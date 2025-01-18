import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useTutor from "../hooks/useTutor";




const TutorRoute = ({children}) => {
    const {user, loading }= useAuth(); 
     const [isTutor,isTutorLoading] =useTutor();
    const location = useLocation();

    if(loading || isTutorLoading){
        return <progress className="progress w-56"></progress>
    }

    if (user && isTutor) {
        return children;
    }
    return <Navigate to="/" state={{from: location}} replace></Navigate>
};

export default TutorRoute;

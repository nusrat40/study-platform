import { useNavigate } from "react-router-dom";
import { FaGithub, FaGoogle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast } from "react-toastify";

const SocialLogin = () => {
  const { googleSignIn, githubSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        // console.log(result.user);
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          photo: result.user?.photoURL,
          role: "student",
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          // console.log(res.data);
          navigate("/");
        });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleGithubSignIn = () => {
    githubSignIn()
      .then((result) => {
        console.log("github user", result.user);
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          photo: result.user?.photoURL,
          role: "student",
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          // console.log(res.data);
          navigate("/");
        });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="p-8">
      <div className="space-y-2">
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-outline btn-primary w-full"
        >
          <FaGoogle className="mr-2"></FaGoogle>
          Sign Up with Google
        </button>
        <button
          onClick={handleGithubSignIn}
          className="btn btn-outline btn-primary w-full"
        >
          <FaGithub className="mr-2"></FaGithub>
          Sign Up with Github
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;

import Lottie from 'lottie-react';
import React, { useContext } from 'react';
import loginAnimation from '../../assets/login.json'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';
import SocialLogin from '../../components/SocialLogin';

const Login = () => {

  const {signIn}=useContext(AuthContext);
  const navigate = useNavigate();
  const location =useLocation();

    const from = location.state?.from?.pathname || "/";


  const handleLogin = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);
    signIn(email, password)
        .then(result => {
            const user = result.user;
            // console.log(user);
            Swal.fire({
                title: 'User Login Successful.',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });
            navigate(from, { replace: true });
        })
}





    return (
        <>
        <Helmet>
          <title>iLearning | Login</title>
        </Helmet>
        <div className="hero mb-10">
        <div className="hero-content flex-col gap-10 lg:flex-row-reverse">
          <div className="w-[400px] lg:w-[600px]">
            <Lottie animationData={loginAnimation}></Lottie>
          </div>
  
          
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            
          <h1 className="text-3xl font-bold text-center mt-2">Login</h1>
          <SocialLogin></SocialLogin>
        
          <form onSubmit={handleLogin}  className="card-body">

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control relative">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}
            </div>


            <div className="form-control mt-6">
              <button className="btn bg-[#a054f4] text-white font-bold">Log In</button>
            </div>
          </form>
          <p className="px-4"><small>New Here? <Link to="/signup">Create an account</Link> </small></p>

          <div className="mx-auto py-4"></div>
        </div>
     

        </div>
      </div>
        </>
    );
};

export default Login;
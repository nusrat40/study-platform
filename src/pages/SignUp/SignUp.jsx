import Lottie from 'lottie-react';
import React, { useContext, useState } from 'react';
import registerAnimation from '../../assets/register.json'
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import SocialLogin from '../../components/SocialLogin';

const SignUp = () => {

  const axiosPublic =useAxiosPublic();

  const {createUser,setUser,updateUserProfile} =useContext(AuthContext);

    const [error, setError] = useState("");

    const navigate=useNavigate();

    const handleRegister = e =>{

        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        const name=e.target.name.value;
        const photo=e.target.photo.value;
        const role =e.target.role.value;
        

        if(password.length < 6){
          setError("Password should be longer");
          return;
        }
        if (!/[A-Z]/.test(password)) {
          setError( "Password must include at least one uppercase letter");
          return;
        }
        if (!/[a-z]/.test(password)) {
          setError( "Password must include at least one lowercase letter");
          return;
          
        }


        createUser(email,password)
        .then(result=>{
            const user = result.user;
            setUser(user);
            updateUserProfile({displayName:name,photoURL:photo})
            .then(()=>{
                
              //create user in the database
              const userInfo={
                name:name,
                email:email,
                photo:photo,
                role:role
              }
              axiosPublic.post('/users',userInfo)
              .then(res => {
                if (res.data.insertedId) {
                  console.log('user added to the database')
                  Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'User created successfully.',
                      showConfirmButton: false,
                      timer: 1500
                  });
                  navigate('/');
              }

              })
            })

          
            
        })
        .catch((error) => {
            toast.error(error.message);
        
            
          })
 
    }



    return (
        <div className="hero mb-10">
          <Helmet>
            <title>iLearning | SignUp</title>
          </Helmet>
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="w-[400px] lg:w-[600px]">
            <Lottie animationData={registerAnimation}></Lottie>
          </div>
  
          
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            
          <h1 className="text-3xl font-bold text-center mt-2">Register now!</h1>
          <SocialLogin></SocialLogin>
        
          <form onSubmit={handleRegister}  className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Photo URL</span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="photo"
                className="input input-bordered"
              />
            </div>

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
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Role</span>
              </label>
              <select
                defaultValue="Pick a role"
                name="role"
                className="select select-ghost w-full h-[45px] rounded-lg input-bordered bg-white"
              >
                <option value="pick a role">Pick a Tole</option>
                <option>student</option>
                <option>tutor</option>
                <option>admin</option>
              </select>
            </div>

            <div className="form-control mt-6">
              <button className="btn bg-[#a054f4] text-white font-bold">Sign Up</button>
            </div>
          </form>
          <p className="ml-4 mb-4 text-center font-semibold">
            Already have an account?{" "}
            <Link className="underline" to="/login">
              Log in
            </Link>
          </p>

        </div>
     

        </div>
      </div>
  
    );
};

export default SignUp;
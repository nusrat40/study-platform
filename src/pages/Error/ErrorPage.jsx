import React from 'react';
import { Helmet } from 'react-helmet-async';
import error from '../../assets/error.json'
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='text-center m-10'>
             <Helmet>
                    <title>iLearning | ErrorPage</title>
                  </Helmet>
        <h2 className='text-5xl'>Page not found</h2>
       <div className=' w-[400px] lg:w-[600px] container mx-auto'>
       <Lottie animationData={error}></Lottie>
       </div>
       <button className="btn bg-[#ad6cf5] text-white font-bold">
              <Link to="/">Back To Home</Link>
            </button>

    </div>

    );
};

export default ErrorPage;
import React from 'react';
import logo from '../assets/logo.svg'

const Footer = () => {
    return (
        <footer className="bg-purple-100 py-10">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Left Section - Logo and Socials */}
            <div>
              <div className="flex items-center space-x-2">
                <img src={logo} alt="iLearning Logo" />
               
              </div>
              <p className="text-gray-600 mt-2">
                iLearning is a registered trademark of ilearning.co
              </p>
              <div className="flex space-x-4 mt-4">
              <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
        </svg>
      </a>
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
        </svg>
      </a>
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
        </svg>
      </a>
              </div>
            </div>
  
            {/* Courses Category */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Courses Category</h3>
              <ul className="mt-3 space-y-2 text-gray-600">
                <li><a href="#">Design</a></li>
                <li><a href="#">Development</a></li>
                <li><a href="#">Sales Marketing</a></li>
                <li><a href="#">Data Science</a></li>
                <li><a href="#">Life Style</a></li>
                <li><a href="#">Photography</a></li>
              </ul>
            </div>
  
            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Resources</h3>
              <ul className="mt-3 space-y-2 text-gray-600">
                <li><a href="#">Learners</a></li>
                <li><a href="#">Instructor</a></li>
                <li><a href="#">My Account</a></li>
                <li><a href="#">Wishlist</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Event</a></li>
              </ul>
            </div>
  
            {/* Quick Links and More */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
                <ul className="mt-3 space-y-2 text-gray-600">
                  <li><a href="#">Course</a></li>
                  <li><a href="#">Courses</a></li>
                  <li><a href="#">Shop</a></li>
                  <li><a href="#">Testimonial</a></li>
                  <li><a href="#">Career</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">More</h3>
                <ul className="mt-3 space-y-2 text-gray-600">
                  <li><a href="#">Support</a></li>
                  <li><a href="#">Terms</a></li>
                  <li><a href="#">Privacy</a></li>
                  <li><a href="#">Help</a></li>
                  <li><a href="#">FAQ</a></li>
                  <li><a href="#">Contact</a></li>
                </ul>
              </div>
            </div>
  
          </div>
        </div>
      </footer>
    );
};

export default Footer;
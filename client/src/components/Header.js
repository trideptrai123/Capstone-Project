import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';

const Header = () => {
  const [click, setClick] = useState(false);

  return (
    <>
      <header className="bg-gradient-to-r from-gray-300 to-blue-200 shadow-lg fixed top-0 left-0 w-full z-50">
        
        <nav className="container mx-auto flex justify-between items-center p-4 lg:p-6">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-3xl font-bold text-gray-800 tracking-wide">RANKING SCHOOL</Link>
          </div>
          <ul className={`${click ? "flex" : "hidden"} lg:flex flex-col lg:flex-row lg:space-x-8 absolute lg:static bg-white lg:bg-transparent top-20 left-0 w-full lg:w-auto py-6 lg:py-0 transition-all duration-500 ease-in-out`}>
            <li>
              <Link to="/" className="block px-4 py-2 lg:px-6 lg:py-3 text-gray-800 hover:text-blue-500 transition-colors duration-300">Home</Link>
            </li>
            <li>
              <Link to="/about" className="block px-4 py-2 lg:px-6 lg:py-3 text-gray-800 hover:text-blue-500 transition-colors duration-300">Giới Thiệu</Link>
            </li>
            <li>
              <Link to="/team" className="block px-4 py-2 lg:px-6 lg:py-3 text-gray-800 hover:text-blue-500 transition-colors duration-300">Profile</Link>
            </li>
            <li>
              <Link to="/blog" className="block px-4 py-2 lg:px-6 lg:py-3 text-gray-800 hover:text-blue-500 transition-colors duration-300">New</Link>
            </li>
            <li>
              <Link to="/contact" className="block px-4 py-2 lg:px-6 lg:py-3 text-gray-800 hover:text-blue-500 transition-colors duration-300">Contact</Link>
            </li>
          </ul>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input type="text" placeholder="Search..." className="bg-white border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:border-blue-500" />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <FaSearch className="text-gray-500" />
              </div>
            </div>
          </div>
          <button className="text-3xl lg:hidden text-gray-800" onClick={() => setClick(!click)}>
            {click ? <FaTimes /> : <FaBars />}
          </button>
        </nav>
      </header>
      {/* Add margin-top to the content to prevent it from being hidden under the fixed header */}
      <div className="mt-20"></div>
    </>
  );
};

// export default Header;
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import logo from '../assets/img/logo512.png';

// export default function Header() {
//   const navigate = useNavigate();
//   const { isAuthenticated, logout, user } = useAuth();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <header>
//       <nav className='nav-bar'>
//         <p>
//           <img src={logo} alt='logo' />
//         </p>
//         <ul>
//           <li>
//             <a href='/'>Home</a>
//           </li>
//           <li>
//             <a href='/contact-us'>Contact US</a>
//           </li>
//           <li>
//             <a href='/contact-us'>New</a>
//           </li>
//           {isAuthenticated && (
//             <>
//               <li>
//                 <p>Hi, {user?.displayName || user?.email}</p>
//               </li>
//               <li>
//                 <button onClick={handleLogout}>Logout</button>
//               </li>
//             </>
//           )}
//         </ul>
//       </nav>
//     </header>
//   );
// }

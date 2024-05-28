import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-purple-800 to-indigo-800 text-white py-12">
      <div className='container mx-auto flex justify-between'>
        <div className='w-1/2'>
          <h3 className="text-2xl font-bold mb-4">Liên hệ</h3>
          <div className="flex items-center mb-4">
            <FaMapMarkerAlt className="mr-2 text-gray-300" />
            <p className="text-gray-300">123 Đường ABC, Thành phố XYZ</p>
          </div>
          <div className="flex items-center mb-4">
            <FaPhone className="mr-2 text-gray-300" />
            <p className="text-gray-300">(+84) 123 456 789</p>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="mr-2 text-gray-300" />
            <p className="text-gray-300">example@email.com</p>
          </div>
        </div>
        <div className='w-1/2'>
          <h3 className="text-2xl font-bold mb-4">Theo dõi chúng tôi</h3>
          <div className='flex space-x-4'>
            <a href="#" className="text-4xl text-gray-300 hover:text-white transition-colors duration-300">
              <i className='fab fa-facebook-f'></i>
            </a>
            <a href="#" className="text-4xl text-gray-300 hover:text-white transition-colors duration-300">
              <i className='fab fa-twitter'></i>
            </a>
            <a href="#" className="text-4xl text-gray-300 hover:text-white transition-colors duration-300">
              <i className='fab fa-instagram'></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className='footer-container'>
        <div className='footer-contact-info'>
          <h3>Liên hệ</h3>
          <div className="footer-flex">
            <FaMapMarkerAlt />
            <p>123 Đường ABC, Thành phố XYZ</p>
          </div>
          <div className="footer-flex">
            <FaPhone />
            <p>(+84) 123 456 789</p>
          </div>
          <div className="footer-flex">
            <FaEnvelope />
            <p>example@email.com</p>
          </div>
        </div>
        <div className='footer-social-media'>
          <h3>Theo dõi chúng tôi</h3>
          <div className='footer-flex'>
            <a href="#" className="fab fa-facebook-f"></a>
            <a href="#" className="fab fa-twitter"></a>
            <a href="#" className="fab fa-instagram"></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


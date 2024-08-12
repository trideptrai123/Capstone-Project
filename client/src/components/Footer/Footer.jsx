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
            <p style={{marginTop:16}}>06 Nguyễn Trung Trực TP Quy Nhơn </p>
          </div>
          <div className="footer-flex">
            <FaPhone />
            <p style={{marginTop:16}}>0706203379</p>
          </div>
          <div className="footer-flex">
            <FaEnvelope />
            <p style={{marginTop:16}}>Phamphuoctri@gmail.com </p>
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


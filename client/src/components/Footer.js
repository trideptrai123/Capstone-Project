import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className='footer-container'>
        <div className='contact-info'>
          <h3>Liên hệ</h3>
          <p>
            <i className='fas fa-map-marker-alt'></i> 123 Đường ABC, Thành phố
            XYZ
          </p>
          <p>
            <i className='fas fa-phone'></i> (+84) 123 456 789
          </p>
          <p>
            <i className='fas fa-envelope'></i> example@email.com
          </p>
        </div>
        <div className='social-icons'>
          <h3>Theo dõi chúng tôi</h3>
          <div className='icon'>
            <i className='fab fa-facebook-f'></i>
          </div>
          <div className='icon'>
            <i className='fab fa-twitter'></i>
          </div>
          <div className='icon'>
            <i className='fab fa-instagram'></i>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

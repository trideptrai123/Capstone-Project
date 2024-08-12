import React from "react";
import banner from './contact.png';

const ContactUs = () => {
  return (
    <div style={{ color: 'white', padding: '1rem 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem', position: 'relative' }}>
        <img src={banner} alt="Banner" style={{
          width: "100%",
          height: "400px",
          objectFit: "cover"
        }}/>
        <h1 style={{
          left: "40%",
          fontSize: "2.25rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          textAlign: "center",
          position: "absolute",
          top: "40%"
        }}>
          Liên hệ với chúng tôi
        </h1>
        <div style={{
          marginTop: "-80px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "2rem"
        }}>
          <div style={{
            backgroundColor: 'white',
            color: 'black',
            padding: '1.5rem',
            borderRadius: '0.375rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            width: '40%',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>📞</div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Nói chuyện với bộ phận nhân viên</h2>
            <p style={{ marginBottom: '1rem' }}>
              Bạn có quan tâm đến phần mềm của chúng tôi không? Chỉ cần nhấc điện thoại lên để trò chuyện với một thành viên trong nhóm của chúng tôi.
            </p>
          </div>
          <div style={{
            backgroundColor: 'white',
            color: 'black',
            padding: '1.5rem',
            borderRadius: '0.375rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            width: '40%',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>💬</div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Liên hệ với đội ngũ hỗ trợ</h2>
            <p style={{ marginBottom: '1rem' }}>
              Bạn cần trợ giúp? Hãy liên hệ với nhóm hỗ trợ của chúng tôi để được trợ giúp
            </p>
          </div>
        </div>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        marginTop: '4rem',
        marginBottom: '4rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '1.25rem'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flex: 1 }}>
          <img src="/address.svg" alt="Địa chỉ" style={{ width: '3rem', height: '3rem', marginBottom: '1rem' }} />
          <h3 style={{ color: 'red', fontSize: '1.125rem', fontWeight: 'bold' }}>ĐỊA CHỈ</h3>
          <p style={{ color: 'black' }}>
            06 Nguyễn Trung Trực TP Quy Nhơn
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flex: 1 }}>
          <img src="/phone.svg" alt="Điện thoại" style={{ width: '3rem', height: '3rem', marginBottom: '1rem' }} />
          <h3 style={{ color: 'red', fontSize: '1.125rem', fontWeight: 'bold' }}>ĐIỆN THOẠI</h3>
          <p style={{ color: 'black' }}>0706203379</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flex: 1 }}>
          <img src="/mail.svg" alt="Email" style={{ width: '3rem', height: '3rem', marginBottom: '1rem' }} />
          <h3 style={{ color: 'red', fontSize: '1.125rem', fontWeight: 'bold' }}>EMAIL</h3>
          <p style={{ color: 'black' }}>Phamphuoctri@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

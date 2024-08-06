import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaQuoteLeft } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Home.css';
const FeatureCard = ({ title, description, icon }) => {
    return (
      <div  data-aos="fade-up" className="bg-white p-6 rounded-lg text-center  flex flex-col justify-start items-center">
    <div className='p-1 border rounded-full'>
    <div style={{
        border:"4px solid white",
     }} className='w-20 h-20 rounded-full bg-gray-100 p-3 flex justify-center items-center'>
     <img  src={icon} alt={title} className="w-16 h-16" />
     </div>
    </div>
        <h3 className="text-xl font-semibold mb-2 mt-3">{title}</h3>
        <p className="text-gray-600 mb-4 text-sm">{description}</p>
      </div>
    );
  };
const Home = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);
    const features = [
        {
          title: "Xem bảng xếp hạng",
          description: "Có thể xem bảng xếp hạng các trường đại học qua các năm",
          icon: "/ranking5.svg",
        },
        {
          title: "Blog",
          description: "Xem những bài viết mới nhất và bình luận về nó",
          icon: "/blog5.svg",
        },
        {
          title: "Trò chuyện",
          description: "Tham gia vào phòng chat và trao đổi cùng mọi người",
          icon: "/chat5.svg",
        },
        {
          title: "Danh sách yêu thích",
          description: "Thêm các trường đại học vào danh sách yêu thích",
          icon: "/like5.svg",
        },
        {
          title: "Thông tin",
          description: "Xem thông tin mới nhất về các trường đại học",
          icon: "/info5.svg",
        },
      ];
      
    return (
        <div className="p-6 bg-white">
            <header className="header-background text-center text-white py-16" data-aos="fade-down">
                <h1 className="text-5xl font-bold mb-4">Chào mừng đến với chúng tôi</h1>
                <p className="text-xl mb-6">Khám phá các tính năng và cập nhật mới nhất</p>
                <Link to="/register" className="inline-block bg-white text-purple-500 hover:bg-gray-200 font-bold py-3 px-6 rounded-full transition-colors duration-300 get-started-btn">
                    Bắt đầu
                </Link>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6 pt-10  ">
          {features.map((feature, index) => (
            <FeatureCard key={index} title={feature.title} description={feature.description} icon={feature.icon} />
          ))} </div>
        </div>
    );
};

export default Home;

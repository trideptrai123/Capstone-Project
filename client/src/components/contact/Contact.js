import React from "react";
import "./ContactUs.css"
const ContactUs = () => {
  return (
    <div className=" text-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4 text-center contact-header">
          Liên hệ với chúng tôi
        </h1>
        {/* <p className="text-center mb-12">
          Bạn muốn liên lạc với chúng tôi? Chúng tôi rất mong được nghe từ bạn.
          Đây là cách bạn có thể liên hệ với chúng tôi
        </p> */}
        <div style={{
            marginTop:-80
        }} className="flex flex-wrap justify-center gap-8 ">
          <div className="bg-white text-black p-6 rounded shadow-md  w-[40%] text-center">
            <div className="text-4xl mb-4">📞</div>
            <h2 className="text-xl font-bold mb-2">Nói chuyện với bộ phận nhân viên</h2>
            <p className="mb-4">
            Bạn có quan tâm đến phần mềm của chúng tôi không? Chỉ cần nhấc điện thoại lên để trò chuyện với một thành viên trong nhóm của chúng tôi.
            </p>
           
          </div>
          <div className="bg-white text-black p-6 rounded shadow-md  w-[40%] text-center">
            <div className="text-4xl mb-4">💬</div>
            <h2 className="text-xl font-bold mb-2">Liên hệ với đội ngũ hỗ trợ</h2>
            <p className="mb-4">
            Bạn cần trợ giúp? Hãy liên hệ với nhóm hỗ trợ của chúng tôi để được trợ giúp
            </p>
            {/* <button className="bg-orange-500 text-white py-2 px-4 rounded">
              Contact Support
            </button> */}
          </div>
        </div>
      </div>
      <div className="flex justify-around items-start mt-16 mb-16 shadow-md p-5">
      <div className="flex flex-col items-center text-center flex-1 ">
        <img src={"/address.svg"} alt="Địa chỉ" className="w-12 h-12 mb-4" />
        <h3 className="text-red-500 text-lg font-bold">ĐỊA CHỈ</h3>
        <p className="text-black">
          TRường đại học FPT đà nẵng
        </p>
      </div>
      <div className="flex flex-col items-center text-center flex-1">
        <img src={"/phone.svg"} alt="Điện thoại" className="w-12 h-12 mb-4" />
        <h3 className="text-red-500 text-lg font-bold">ĐIỆN THOẠI</h3>
        <p className="text-black">0708 135 135</p>
      </div>
      <div className="flex flex-col items-center text-center flex-1 ">
        <img src={"/mail.svg"} alt="Email" className="w-12 h-12 mb-4" />
        <h3 className="text-red-500 text-lg font-bold">EMAIL</h3>
        <p className="text-black">fpt@danang.vn</p>
      </div>
    </div>
    </div>
  );
};

export default ContactUs;

import React from "react";
import { FaBook, FaChartLine, FaUniversity ,FaBars ,FaCocktail ,FaGripHorizontal } from "react-icons/fa";
const listLink = [
  "https://vnur.vn/",
  "https://www.webometrics.info/en/Asia/Vietnam",
  "https://dantri.com.vn/giao-duc/cong-bo-bang-xep-hang-dai-hoc-viet-nam-2024-16-don-vi-bay-khoi-top-100-20240119155934159.html",
  "http://hdgsnn.gov.vn/tin-tuc/xep-hang-cac-truong-dai-hoc-viet-nam-theo-webometrics_373",
  "https://www.zila.com.vn/bang-xep-hang-truong-dai-hoc-viet-nam.html",
];
const IntroductionPage = () => {
  return (
    <div className="p-6  min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg ">
        <h1 className="text-3xl font-bold text-center text-red-600 mb-8">
          GIỚI THIỆU VỀ BẢNG XẾP HẠNG CÁC TRƯỜNG ĐẠI HỌC VIỆT NAM RANKING SCHOOL
        </h1>
        <div className="text-lg text-gray-600 mb-6 leading-relaxed">
          <p>
            <FaUniversity className="inline-block text-blue-500 mr-5" />
            Đây là năm đầu tiên RANKING SCHOOL công bố BẢNG XẾP HẠNG CÁC TRƯỜNG
            ĐẠI HỌC VIỆT NAM: Ranking School. Tuy là bản đầu tiên nhưng các tiêu
            chí đánh giá vô cùng chính xác và đáng tin cậy.
          </p>
          <p>
            <FaBars style={{
              marginTop:-5
            }} className="inline-block text-red-500 mr-5" />
          
              TIÊU CHÍ DỰA TRÊN CÁC TRANG WEB UY TÍN MÀ ĐỘI NGŨ ĐÃ TÌM VÀ ĐÁNH
              GIÁ :{" "}
            <div>
              {listLink.map((i) => (
                <div>
                  <a href={i} target="_blank">
                    {" "}
                    {i}
                  </a>
                </div>
              ))}
            </div>
          </p>
          <p>
            <FaCocktail style={{
              color:"green",
              marginTop:-5
            }} className="inline-block  mr-5" />
            Phương thức xếp hạng dựa trên các tiêu chí :
            <div className="mt-1">
              <strong>1.Điểm ngành học : </strong>So sánh dựa trên điểm các
              ngành học của các trường đại học , điểm ngành học sẽ được staff
              đánh giá theo từng năm học.
            </div>
            <div className="mt-1">
              <strong>2.Chất lượng giảng viên : </strong>So sánh chất lượng
              giảng viên theo từng ngành học.Số sao của giảng viên để so sánh sẽ
              lấy giá trị trung bình sao của mỗi giảng viên được assign cho
              ngành học đó theo từng năm học.
            </div>
            <div className="mt-1">
              <strong>3.Đánh giá của giảng viên : </strong> Hằng năm giảng viên
              dạy tại từng trường sẽ được đánh giá chất lượng dịch vụ, cơ sở vật
              chất của trường
            </div>
          </p>
          <p>
            <FaGripHorizontal  style={{
              color:"violet",
              marginTop:-5
            }} className="inline-block text-green-500 mr-5" />
            Các loại xếp hạng và tìm kiếm các trường đại học : 
            <div className="mt-1">- Chọn năm xếp hạng</div>
            <div className="mt-1">- Tên trường</div>
            <div className="mt-1">- Tìm kiếm Tỉnh/Thành phố</div>
            <div className="mt-1">- Ngành học</div>
            <div className="mt-1">- Chất lượng giảng viên</div>
            <div className="mt-1">
              - Sắp xếp : Xếp hạng Toàn quốc , điểm cơ sở vật chất , điểm ngành
              học
            </div>
          </p>

          <p className="mt-4">
            <FaBook className="inline-block text-green-500 mr-5" />
            RANKING SCHOOL không chỉ cung cấp bảng xếp hạng các trường đại học
            với độ chính xác và tin cậy cao, mà còn mang đến nhiều tính năng
            vượt trội khác để đáp ứng nhu cầu đa dạng của người dùng. Bảng Xếp
            Hạng Đại Học RANKING SCHOOL cam kết mang lại bảng xếp hạng đại học
            Việt Nam chính xác và đáng tin cậy. Bộ Tiêu Chuẩn Và Tiêu Chí được
            điều chỉnh hàng năm nhằm đảm bảo tính công bằng và chính xác, giúp
            sinh viên và phụ huynh có cái nhìn toàn diện và sâu sắc hơn về các
            trường đại học. Trò Chuyện Trực Tuyến Tính năng trò chuyện trực
            tuyến của RANKING SCHOOL cho phép bạn kết nối và trao đổi trực tiếp
            với các chuyên gia giáo dục, nhân viên tư vấn và các bạn học khác.
            Đây là nơi bạn có thể nhận được những lời khuyên hữu ích và giải đáp
            thắc mắc ngay lập tức, tạo nên một cộng đồng hỗ trợ lẫn nhau trong
            hành trình giáo dục của bạn. Thêm Danh Sách Yêu Thích RANKING SCHOOL
            hiểu rằng mỗi sinh viên có những tiêu chí và sở thích riêng khi lựa
            chọn trường đại học. Tính năng danh sách yêu thích giúp bạn lưu trữ
            và quản lý các trường đại học mà bạn quan tâm. Điều này không chỉ
            giúp bạn dễ dàng so sánh mà còn tiết kiệm thời gian tìm kiếm và xem
            xét lại sau này. Xem Và Bình Luận Các Bài Blog RANKING SCHOOL còn là
            nơi cung cấp các bài viết blog chất lượng cao về giáo dục, kỹ năng
            sống, và kinh nghiệm học tập. Bạn có thể xem và tham gia bình luận
            dưới mỗi bài viết, chia sẻ ý kiến và học hỏi từ cộng đồng. Các bài
            viết blog không chỉ cung cấp thông tin mà còn truyền cảm hứng và
            động lực cho hành trình học tập của bạn.
          </p>
          <p className="mt-4">
            <FaChartLine className="inline-block text-red-500 mr-5" />
            Hy vọng BẢNG XẾP HẠNG CÁC TRƯỜNG ĐẠI HỌC VIỆT NAM: RANKING SCHOOL
            tiếp tục mang lại lợi ích cho người đọc và qua đó nhận được sự ủng
            hộ.
          </p>
          <p className="mt-4"></p>
        </div>
        <div className="text-right font-bold text-gray-800">
          <p>Trân trọng!</p>
          <p>Nhóm thực hiện RANKING SCHOOL</p>
        </div>
      </div>
    </div>
  );
};

export default IntroductionPage;

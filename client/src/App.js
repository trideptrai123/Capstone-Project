import React, { useEffect, useState } from 'react';
import axios from 'axios'; // import thư viện Axios
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
// function App() {
//   const [backendData, setBackendData] = useState([]);

//   useEffect(() => {
//     // Sử dụng Axios để gửi yêu cầu GET đến backend
//     axios
//       .get('/university')
//       .then((response) => {
//         setBackendData(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }, []); // useEffect được gọi một lần khi component được render

//   return (
//     <div>
//       <h1>University List</h1>
//       <ul>
//         {/* Hiển thị danh sách sản phẩm từ dữ liệu backend */}
//         {backendData.map((universityData) => (
//           <li key={universityData._id}>
//             {universityData.name},{universityData.city},{universityData.website}
//             ,{universityData.Address},{universityData.Chancellor}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
function App() {
  return (
    <>
      <Header />
      <h1>Homepage</h1>
      <p>This is the homepage</p>

      <Footer />
    </>
  );
}
export default App;

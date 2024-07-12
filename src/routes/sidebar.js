
const routes = [
  // {
  //   path: "/app/dashboard", // the url
  //   icon: "HomeIcon", // the component being exported from icons/index.js
  //   name: "Trang chủ", // name that appear in Sidebar
  // },
  // {
  //   path: "/app/orders",
  //   icon: "CartIcon",
  //   name: "Đơn hàng",
  // },
  {
    path: "/app/customers",
    icon: "GroupIcon",
    name: "Người dùng",
  },
  {
    roles:["staff"],
    icon: "TruckIcon",
    name: "Bài viết",
    routes: [
      {
        path: "/app/all-posts",
        name: "Danh sách bài viết",
        roles:["staff"]
      },

      {
        path: "/app/category",
        name: "Danh mục bài viết",
       roles:["staff"]
      },
    ],
  },
 
  {
    path: "/app/chats",
    icon: "ChatIcon",
    name: "Chats",
  },
  // {
  //   path: "/app/manage-profile",
  //   icon: "UserIcon",
  //   name: "Thông tin cá nhân",
  // },
];

export default routes;

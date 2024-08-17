
const routes = [
  {
    path: "/app/dashboard",
    icon: "HomeIcon",
    name: "Trang chủ",
    roles:["staff","admin"],
  },
  {
    path: "/app/customers",
    icon: "GroupIcon",
    name: "Người dùng",
    roles:["admin"],
  },
  {
    path: "/app/list-university",
    icon: "SchoolIcon",
    name: "Trường đại học",
    roles:["admin"],
  },
  {
    path: "/app/list-teacher",
    icon: "TeacherIcon",
    name: "Giảng viên",
    roles:["staff"],
  },
  {
    path: "/app/list-major",
    icon: "BookIcon",
    name: "Ngành học",
    roles:["staff","teacher"],
  },
  {
    path: "/app/list-request",
    icon: "RequestIcon",
    name: "Danh sách yêu cầu",
    roles:["staff"],
  },
  {
    path: "/app/my-request",
    icon: "RequestIcon",
    name: "Yêu cầu của tôi",
    roles:["teacher"],
  },
  {
    path: "/app/my-review",
    icon: "RequestIcon",
    name: "Đánh giá",
    roles:["teacher"],
  },
  {
    path: "/app/list-review",
    icon: "Review",
    name: "Danh sách đánh giá",
    roles:["staff"],
  },
  {
    roles:["staff"],
    icon: "PostIcon",
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
  {
    path: "/app/manage-profile",
    icon: "UserIcon",
    name: "Thông tin cá nhân",
  },
];

export default routes;

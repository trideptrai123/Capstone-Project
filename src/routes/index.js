import { lazy } from "react";
import CategoryList from "../pages/Category";
import AddPost from "../pages/AddPost";
import DetailPost from "../pages/DetailPost";
import UserDetail from "../pages/UserDetail";
import AddTeacherForm from "../pages/teacher/AddTeacher";
import TeacherList from "../pages/teacher/Teacher";
import TeacherDetail from "../pages/teacher/TeacherDetail";
import AddMajorForm from "../pages/major/AddMajor";
import MajorList from "../pages/major/ListMajor";
import MajorDetail from "../components/DetailMajor";
import CreateEditRequest from "../pages/request/AddRequest";
import ListRequests from "../pages/request/ListRequest";
import MyRequests from "../pages/request/MyRequest";
import AddUniversity from "../pages/university/AddUniversity";
import ListUniversities from "../pages/university/ListUnivercity";
import UniversityDetail from "../pages/university/DetailUniverCity";
import ChangePasswordScreen from "../pages/change-pass";
import ListReview from "../pages/review/ListReview";
import CreateEditReview from "../pages/review/AddReview";
import MyReview from "../pages/review/MyReview";

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Posts = lazy(() => import("../pages/Posts"));
const SingleProduct = lazy(() => import("../pages/SingleProduct"));
const AddProduct = lazy(() => import("../pages/AddProduct"));
const Customers = lazy(() => import("../pages/Customers"));
const Chats = lazy(() => import("../pages/Chats"));
const Profile = lazy(() => import("../pages/Profile"));
const Page404 = lazy(() => import("../pages/404"));
const Blank = lazy(() => import("../pages/Blank"));

const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard,
  },
  {
    path: "/change-pass", // the url
    component: ChangePasswordScreen,
  },
  {
    path: "/all-posts",
    component: Posts,
  },
  {
    path: "/add-product",
    component: AddProduct,
  },
  {
    path: "/product/:id",
    component: SingleProduct,
  },
  {
    path: "/customers",
    component: Customers,
  },
  {
    path: "/users/detail/:id",
    component: UserDetail,
  },
  {
    path: "/chats",
    component: Chats,
  },
  {
    path: "/manage-profile",
    component: Profile,
  },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/blank",
    component: Blank,
  },
  {
    path: "/category",
    component: CategoryList,
  },
  {
    path: "/posts/add",
    component: AddPost,
  },
  {
    path: "/posts/edit/:id",
    component: AddPost,
  },
  {
    path: "/posts/detait/:id",
    component: DetailPost,
  },
  {
    path: "/add-teacher",
    component: AddTeacherForm,
  },
  {
    path: "/list-teacher",
    component: TeacherList,
  },
  {
    path: "/edit-teacher/:id",
    component: AddTeacherForm,
  },
  {
    path: "/teacher-detail/:id",
    component: TeacherDetail,
  },
  {
    path: "/add-major",
    component: AddMajorForm,
  },
  {
    path: "/list-major",
    component: MajorList,
  },
  {
    path: "/major-detail/:id",
    component: MajorDetail,
  },
  {
    path: "/edit-major/:id",
    component: AddMajorForm,
  },
  {
    path: "/add-request",
    component: CreateEditRequest,
  },
  {
    path: "/edit-request/:id",
    component: CreateEditRequest,
  },
  {
    path: "/list-request",
    component: ListRequests,
  },
  {
    path: "/my-request",
    component: MyRequests,
  },
  {
    path: "/list-university",
    component: ListUniversities,
  },
  {
    path: "/add-university",
    component: AddUniversity,
  },
  {
    path: "/edit-university/:id",
    component: AddUniversity,
  
  },
  {
    path: "/detail-university/:id",
    component: UniversityDetail,
  },
  // review
  {
    path: "/my-review",
    component: MyReview,
  },
  {
    path: "/list-review",
    component: ListReview,
  },
  {
    path: "/add-review",
    component: CreateEditReview,
  },
  {
    path: "/edit-review/:id",
    component: CreateEditReview,
  },


];

export default routes;

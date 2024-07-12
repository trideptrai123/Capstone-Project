import { lazy } from "react";
import CategoryList from "../pages/Category";
import TagProduct from "../pages/TagProduct";
import AddPost from "../pages/AddPost";
import DetailPost from "../pages/DetailPost";
import UserDetail from "../pages/UserDetail";

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Orders = lazy(() => import("../pages/Orders"));
const Posts = lazy(() => import("../pages/Posts"));
const SingleProduct = lazy(() => import("../pages/SingleProduct"));
const AddProduct = lazy(() => import("../pages/AddProduct"));
const Customers = lazy(() => import("../pages/Customers"));
const Chats = lazy(() => import("../pages/Chats"));
const Profile = lazy(() => import("../pages/Profile"));
const Settings = lazy(() => import("../pages/Settings"));
const Page404 = lazy(() => import("../pages/404"));
const Blank = lazy(() => import("../pages/Blank"));

const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard,
  },
  {
    path: "/orders",
    component: Orders,
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
];

export default routes;

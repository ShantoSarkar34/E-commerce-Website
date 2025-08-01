import { createBrowserRouter } from "react-router";
import Root from "../Pages/root/Root";
import Login from "../Pages/login/Login";
import SignUp from "../Pages/signup/SignUp";
import Profile from "../Pages/profile/Profile";
import Home from "../Pages/home/Home";
import PrivateRoute from "../authProvider/PrivateRouter";
import PaymentInput from "../Pages/payment/PaymentInput";
import AddProduct from "../Pages/addProduct/AddProduct";
import MyProfile from "../Pages/profile/myProfile/MyProfile";
import AllCart from "../Pages/profile/allCarts/AllCart";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "",
        Component: Home,
      },
      {
        path: "/about",
        element: <p className="pt-20">About page</p>,
      },
      {
        path: "/add-product",
        element: (
          <PrivateRoute>
            <AddProduct></AddProduct>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/signup",
        Component: SignUp,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
        children: [
          {
            path: "my-profile",
            Component: MyProfile,
          },
          {
            path: "all-cart",
            Component: AllCart,
          },
          {
            path: "like-list",
            element: <p>this is my like list</p>,
          },
          {
            path: "pending-delevery",
            element: <p>pending items</p>,
          },
          {
            path: "payment-history",
            element: <p>payment history</p>,
          },
        ],
      },
      {
        path: "/payment/:id",
        element: (
          <PrivateRoute>
            <PaymentInput></PaymentInput>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

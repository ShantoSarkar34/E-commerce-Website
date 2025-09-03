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
import SingleProduct from "../Pages/singleProduct/SingleProduct";
import LikeList from "../Pages/profile/likeList/LikeList";
import SellerForm from "../Pages/becomeSeller/SellerForm";
import AdminRoute from "../authProvider/AdminRoute";
import Error from "../Pages/error/Error";
import SellerRequests from "../Pages/profile/admin/sellerReq/SellerRequests";
import AllSeller from "../Pages/profile/admin/allSeller/AllSeller";
import About from "../Pages/about/About";
import Privacy from "../Pages/privacy/Privacy";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <Error></Error>,
    children: [
      {
        path: "",
        Component: Home,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/privacy",
        Component: Privacy,
      },
      {
        path: "/apply-for-seller",
        element: (
          <PrivateRoute>
            <SellerForm></SellerForm>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-product",
        element: (
          <AdminRoute>
            <AddProduct></AddProduct>
          </AdminRoute>
        ),
      },
      {
        path: "/product/details/:id",
        element: (
          <PrivateRoute>
            <SingleProduct></SingleProduct>
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
            element: (
              <PrivateRoute>
                <MyProfile></MyProfile>
              </PrivateRoute>
            ),
          },
          {
            path: "all-cart",
            element: (
              <PrivateRoute>
                <AllCart></AllCart>
              </PrivateRoute>
            ),
          },
          {
            path: "like-list",
            element: (
              <PrivateRoute>
                <LikeList></LikeList>
              </PrivateRoute>
            ),
          },
          {
            path: "pending-delevery",
            element: <p>pending items</p>,
          },
          {
            path: "payment-history",
            element: <p>payment history</p>,
          },
          {
            path: "pending-seller-request",
            element: (
              <AdminRoute>
                <SellerRequests></SellerRequests>
              </AdminRoute>
            ),
          },
          {
            path: "all-sellers",
            element: (
              <AdminRoute>
                <AllSeller></AllSeller>
              </AdminRoute>
            ),
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

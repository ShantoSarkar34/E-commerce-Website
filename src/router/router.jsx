import { createBrowserRouter } from "react-router";
import Root from "../Pages/root/Root";
import Login from "../Pages/login/Login";
import SignUp from "../Pages/signup/SignUp";
import Profile from "../Pages/profile/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "/about",
        element: <p className="pt-20">About page</p>,
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
        Component: Profile,
      },
    ],
  },
]);

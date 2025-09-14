import React, { use } from "react";
import { useLocation } from "react-router";
import { AuthContext } from "./AuthProvider";
import AdminError from "../Pages/error/AdminError";

const SellerRoute = ({ children }) => {
  const { user, sellerRole, loading } = use(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center max-h-screen">
        <span className="loading loading-bars loading-xl text-gray-500"></span>
      </div>
    );
  }
  if (user?.email === sellerRole[0]?.email) {
    return children;
  } else {
    return <AdminError></AdminError>;
  }
};

export default SellerRoute;

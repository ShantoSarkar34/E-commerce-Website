import React, { use } from "react";
import { useLocation } from "react-router";
import { AuthContext } from "./AuthProvider";
import AdminError from "../Pages/error/AdminError";

const AdminRoute = ({ children }) => {
  const { user, adminRole, loading } = use(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center max-h-screen">
        <span className="loading loading-bars loading-xl text-gray-500"></span>
      </div>
    );
  }

  if (user?.email === adminRole[0]?.email) {
    return children;
  } else {
    return <AdminError></AdminError>;
  }
};

export default AdminRoute;

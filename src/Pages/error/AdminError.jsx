import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { NavLink } from "react-router";
import { FaHandPaper } from "react-icons/fa";

const AdminError = () => {
  return (
    <div>
      <Header></Header>
      <section className="flex items-center min-h-screen  dark:bg-gray-50 dark:text-gray-800 pt-16 lg:pt-20">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <div className="mb-8 font-extrabold text-9xl lg:text-[9rem] text-primary flex justify-center">
              <FaHandPaper />
            </div>
            <p className="text-2xl font-semibold ">
              Sorry, This page is only for Admin !
            </p>
            <p className="mt-4 mb-8 dark:text-gray-600">
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>
            <NavLink to="/" className="btn bg-gray-700 border-none ">
              Go to Home
            </NavLink>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
};

export default AdminError;

import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Outlet } from "react-router";
import Footer from "../../components/Footer";
import Lottie from "lottie-react";
import loadingAnimation from "../../../public/loading.json";

const Root = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://scica10.vercel.app/allitemspagination?size=60")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className=" min-h-screen w-full flex items-center justify-center">
        <Lottie animationData={loadingAnimation} loop={true} className="w-50" />
      </div>
    );
  }

  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;

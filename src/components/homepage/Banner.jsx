import React, { use } from "react";
import banner_1 from "../../assets/home/banner-1.png";
import banner_2 from "../../assets/home/banner-2.png";
import banner_3 from "../../assets/home/banner-3.png";
import { NavLink } from "react-router";
import { AuthContext } from "../../authProvider/AuthProvider";

const Banner = () => {
  const { theme } = use(AuthContext);
  return (
    <div
      className={`bg-[#ffffff] py-16 w-full transition-all duration-300 ${
        theme === "dark" && "bg-gray-700"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center flex-col lg:flex-row gap-6">
          <div className="lg:w-[65%]">
            <NavLink to="#">
              <img
                src={banner_1}
                alt="banner-img"
                className="w-full h-full object-cover"
              />
            </NavLink>
          </div>
          <div className="flex flex-col gap-6 w-full lg:w-[35%]">
            <NavLink to="#">
              <img
                src={banner_2}
                alt="banner_img"
                className="w-full shadow-sm object-cover"
              />
            </NavLink>
            <NavLink to="#">
              <img
                src={banner_3}
                alt="banner_img"
                className=" w-full shadow-sm object-cover"
              />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

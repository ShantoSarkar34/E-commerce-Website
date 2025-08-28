import React from "react";
import brand_1 from "../../assets/brand/brand-1.png";
import brand_2 from "../../assets/brand/brand-2.png";
import brand_3 from "../../assets/brand/brand-3.png";
import brand_4 from "../../assets/brand/brand-4.png";
import brand_5 from "../../assets/brand/brand-5.png";
import brand_6 from "../../assets/brand/brand-6.png";
import brand_7 from "../../assets/brand/brand-7.png";
import brand_8 from "../../assets/brand/brand-8.png";
import brand_9 from "../../assets/brand/brand-9.png";
import brand_10 from "../../assets/brand/brand-10.png";
import brand_11 from "../../assets/brand/brand-11.png";
import brand_12 from "../../assets/brand/brand-12.png";

const Brand = () => {
  const brand = [
    {
      id: 1,
      alt: "brand_image",
      image: brand_1,
    },
    {
      id: 1,
      alt: "brand_image",
      image: brand_2,
    },
    {
      id: 1,
      alt: "brand_image",
      image: brand_3,
    },
    {
      id: 1,
      alt: "brand_image",
      image: brand_4,
    },
    {
      id: 1,
      alt: "brand_image",
      image: brand_5,
    },
    {
      id: 1,
      alt: "brand_image",
      image: brand_6,
    },
    {
      id: 1,
      alt: "brand_image",
      image: brand_7,
    },
    {
      id: 1,
      alt: "brand_image",
      image: brand_8,
    },
    {
      id: 1,
      alt: "brand_image",
      image: brand_9,
    },
    {
      id: 1,
      alt: "brand_image",
      image: brand_10,
    },
    {
      id: 1,
      alt: "brand_image",
      image: brand_11,
    },
    {
      id: 1,
      alt: "brand_image",
      image: brand_12,
    },
  ];
  
  return (
    <div className="bg-white py-20 w-full">
      <div className="container mx-auto px-4">
        <h1 className=" font-semibold mb-10 lg:mb-14 text-3xl ">
          Shop by Brand
        </h1>
        {/* brand images  */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ">
          {brand.map((res) => (
            <div
              key={res.id}
              className="border border-gray-400 overflow-hidden flex justify-center cursor-pointer"
            >
              <img
                src={res.image}
                alt={res.alt}
                className="p-6 lg:p-10 bg-cover hover:scale-110 transition-all duration-200"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brand;

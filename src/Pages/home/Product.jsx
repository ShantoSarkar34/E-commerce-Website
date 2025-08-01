import React, { useEffect, useState } from "react";
import loadingAnimation from "../../../public/loading.json";
import Lottie from "lottie-react";
import { NavLink, useNavigate } from "react-router";

const Product = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/all-products")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
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
    <div className="bg-[#f8f8f8] w-full py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-center font-semibold mb-4 text-3xl ">
          Best Product
        </h1>
        <p className="mb-10 lg:mb-14 text-center text-secondary">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium
          accusamus pariatur accusantium rem saepe atque!
        </p>
        {/* single product grid start */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* single product start  */}

          {data.map((pro) => (
            <div
              key={pro._id}
              className="border border-secondary rounded-md overflow-hidden flex flex-col items-center lg:items-start"
            >
              <div className="relative overflow-hidden bg-cover bg-no-repeat">
                <img
                  src={pro.image}
                  alt="product"
                  className="hover:scale-110 ease-in-out transition-all duration-300 object-cover"
                />
              </div>
              <div className="text-center lg:text-start p-4 lg:p-5 w-full">
                <h2 className=" font-bold text-lg mb-2">{pro.name}</h2>
                <p className=" text-secondary">
                  Price : <span className="text-black">${pro.price}</span>
                </p>
                <p className=" text-secondary mb-1">
                  Brand Name : <span className="text-black">{pro.brand}</span>
                </p>
                <p className=" text-[#11111190] text-sm  mb-4 mx-auto w-[80%] lg:w-full">
                  {pro.description}
                </p>
                <div>
                  <button
                    
                    className="btn btn-primary border-none shadow-none w-full text-[#111111]"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;

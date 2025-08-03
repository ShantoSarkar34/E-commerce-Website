import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import loadingAnimation from "../../../../public/loading.json";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";

const SingleProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetch("https://online-shop9070-server.onrender.com/all-products")
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
      <div className="min-h-screen w-full flex items-center justify-center">
        <Lottie animationData={loadingAnimation} loop={true} className="w-50" />
      </div>
    );
  }

  const filterdProduct = data?.filter((res) => res._id === id);

  const toggleLike = () => setLiked(!liked);

  return (
    <div className="pt-16 lg:pt-19">
      <motion.div
        className="min-h-screen bg-[#f8f8f8] py-16 px-4 flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filterdProduct.map((product) => (
          <motion.div
            key={product._id}
            className="bg-white rounded-2xl shadow-lg max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 lg:p-10"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.img
              src={product.image}
              alt={product.name}
              className="rounded-xl w-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 150 }}
            />

            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-[#0F0F0F]">
                {product.name}
              </h1>
              <p className="text-[#11111190]">{product.description}</p>
              <p className="text-gray-600">
                Category:{" "}
                <span className="font-medium">{product.category}</span>
              </p>
              <p className="text-gray-600">
                Brand: <span className="font-medium">{product.brand}</span>
              </p>
              <p className="text-gray-600">
                Ratings:{" "}
                <span className="font-medium">{product.ratings} ⭐</span>
              </p>
              <p className="text-lg font-medium text-[#0F0F0F]">
                Price: <span className="text-[#ffbb38]">${product.price}</span>
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#ffbb38] cursor-pointer hover:bg-[#e6a92f] text-black font-semibold px-5 py-2 rounded-lg transition"
                >
                  Add to Cart
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="bg-black cursor-pointer hover:bg-gray-800 text-white font-semibold px-5 py-2 rounded-lg transition"
                >
                  Buy Now
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleLike}
                  className="text-2xl transition cursor-pointer"
                  title={liked ? "Unlike" : "Like"}
                >
                  <FaHeart
                    className={`transition duration-200 ${
                      liked ? "text-red-500" : "text-gray-400"
                    }`}
                  />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SingleProduct;

import Lottie from "lottie-react";
import React, { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import loadingAnimation from "../../../public/loading.json";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import RelativeProduct from "../relativeProduct/RelativeProduct";
import { AuthContext } from "../../authProvider/AuthProvider";
import { toast } from "react-toastify";

const SingleProduct = () => {
  const { id } = useParams();
  const { user } = use(AuthContext);
  const [data, setData] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    fetch("https://online-shop9070-server.onrender.com/liked-items")
      .then((res) => res.json())
      .then((data) => {
        setLikedItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const filterdProduct = data?.filter((res) => res._id === id);

  const filterdItems = likedItems?.filter(
    (res) =>
      res.productName === filterdProduct[0]?.name &&
      res.userEmail === user.email
  );

  const filterCategory = data?.filter(
    (val) => val.category === filterdProduct[0].category
  );

  const toggleLike = (product) => {
    if (filterdItems[0]?.likeStatus === "liked") {
      toast.warn("This product already added to your Like list");
      return;
    }
    const likeStatus = "liked";
    const productName = product.name;
    const productPrice = product.price;
    const productBrand = product.brand;
    const productCategory = product.category;
    const productImage = product.image;
    const productDescription = product.description;
    const paymentStatus = "pending";
    const userEmail = user.email;
    const today = new Date();
    const createdAt = `${String(today.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(today.getDate()).padStart(2, "0")}-${today.getFullYear()}`;

    const newItems = {
      productName,
      productPrice,
      productCategory,
      productImage,
      productBrand,
      productDescription,
      paymentStatus,
      likeStatus,
      userEmail,
      createdAt,
    };
    fetch("https://online-shop9070-server.onrender.com/liked-items", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newItems),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          navigate("/profile/like-list");
          toast.success(`${product.name} is added to your like list !`);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleAddToCart = (product) => {
    const productName = product.name;
    const productPrice = product.price;
    const productBrand = product.brand;
    const productCategory = product.category;
    const productDescription = product.description;
    const productImage = product.image;
    const paymentStatus = "pending";
    const likeStatus = "disliked";
    const userEmail = user.email;
    const today = new Date();
    const createdAt = `${String(today.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(today.getDate()).padStart(2, "0")}-${today.getFullYear()}`;

    const newCart = {
      productName,
      productPrice,
      productCategory,
      productDescription,
      productImage,
      productBrand,
      paymentStatus,
      likeStatus,
      userEmail,
      createdAt,
    };
    fetch("https://online-shop9070-server.onrender.com/all-carts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newCart),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          navigate("/profile/all-cart");
        }
      })
      .catch((err) => console.error(err));
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <Lottie animationData={loadingAnimation} loop={true} className="w-50" />
      </div>
    );
  }

  return (
    <div className="pt-16 lg:pt-19">
      <motion.div
        className="min-h-screen bg-[#eeeeee] py-16 px-4 flex justify-center items-center"
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
                  onClick={() => handleAddToCart(product)}
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

                {/* <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleLike(product)}
                  className="text-2xl transition cursor-pointer"
                  title={product.likeStatus ? "Unlike" : "Like"}
                >
                  <FaHeart
                    className={`transition duration-200 ${
                      product.likeStatus ? "text-red-500" : "text-gray-400"
                    }`}
                  />
                </motion.button> */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleLike(product)}
                  className="text-2xl transition cursor-pointer"
                  title={filterdItems[0]?.likeStatus ? "Unlike" : "Like"}
                >
                  <FaHeart
                    className={`transition duration-200 ${
                      filterdItems[0]?.likeStatus
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* relative product  */}

      <RelativeProduct filterCategory={filterCategory}></RelativeProduct>
    </div>
  );
};

export default SingleProduct;

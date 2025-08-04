import { useState } from "react";
import { motion } from "framer-motion";
import { FaThList, FaThLarge, FaTrash } from "react-icons/fa";

const initialLikedItems = [
  {
    _id: "6890c21fc08504b01e7b20a5",
    productName: "Digital Camera",
    productPrice: 249.99,
    productCategory: "Electronics",
    productDescription:
      "Compact digital camera with high-resolution image capture.",
    productImage: "https://i.ibb.co/MPCkM37/8.jpg",
    productBrand: "Canon",
    paymentStatus: "pending",
    likeStatus: "liked",
    userEmail: "shanto9070.me@gmail.com",
    createdAt: "08-04-2025",
  },
  {
    _id: "6890c21fc08504be7b20a5",
    productName: "Digital Camera",
    productPrice: 249.99,
    productCategory: "Electronics",
    productDescription:
      "Compact digital camera with high-resolution image capture.",
    productImage: "https://i.ibb.co/MPCkM37/8.jpg",
    productBrand: "Canon",
    paymentStatus: "pending",
    likeStatus: "liked",
    userEmail: "shanto9070.me@gmail.com",
    createdAt: "08-04-2025",
  },
];

const LikeList = () => {
  const [isGridView, setIsGridView] = useState(true);
  const [likedItems, setLikedItems] = useState(initialLikedItems);

  const handleRemove = (id) => {
    console.log("delete:", item.productName);
  };

  const handleBuyNow = (item) => {
    console.log("Buying:", item.productName);
    // Optional: Navigate to checkout or open modal
  };

  return (
    <motion.div
      className="w-full overflow-x-auto bg-white p-6 rounded-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#0F0F0F]">❤️ My Likes</h2>
        <button
          onClick={() => setIsGridView(!isGridView)}
          className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-[#ffbb38] hover:bg-[#e6a92f] text-black font-medium rounded shadow"
        >
          {isGridView ? <FaThList /> : <FaThLarge />}
          {isGridView ? "Table View" : "Grid View"}
        </button>
      </div>

      {isGridView ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  rounded-lg overflow-hidden">
          {likedItems.map((item, idx) => (
            <motion.div
              key={item._id}
              className="bg-white rounded-lg border border-primary/50 shadow-md p-4 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <img
                src={item.productImage}
                alt={item.productName}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="text-lg font-bold mt-5">{item.productName}</h3>
              <p className="text-sm text-gray-500 mb-1">
                Brand: <span className="text-black">{item.productBrand}</span>
              </p>
              <p className="text-sm text-gray-500 mb-1">
                Category:{" "}
                <span className="text-black">{item.productCategory}</span>
              </p>
              <p className="text-gray-700 my-2">{item.productDescription}</p>
              <div className="flex justify-between items-center mt-5 gap-2">
                <button
                  onClick={() => handleRemove(item._id)}
                  className="px-3 cursor-pointer py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition"
                >
                  Remove from Like
                </button>
                <button
                  onClick={() => handleBuyNow(item)}
                  className="px-4 cursor-pointer py-2 bg-[#dd9c23] text-white text-sm font-medium rounded hover:bg-primary transition"
                >
                  Buy Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden ">
            <thead className="bg-[#ffbb38] text-black">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium">
                  Image
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium">
                  Name
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium">
                  Brand
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium">
                  Category
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium">
                  Price
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium">
                  Date
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {likedItems.map((item, idx) => (
                <motion.tr
                  key={item._id}
                  className="border-t border-primary bg-[#ebebeb]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <td className="px-4 py-3">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-14 h-14 rounded object-cover"
                    />
                  </td>
                  <td className="px-4 py-3">{item.productName}</td>
                  <td className="px-4 py-3">{item.productBrand}</td>
                  <td className="px-4 py-3">{item.productCategory}</td>
                  <td className="px-4 py-3">${item.productPrice}</td>
                  <td className="px-4 py-3">{item.createdAt}</td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => handleBuyNow(item)}
                      className="px-3 cursor-pointer py-1 bg-[#dd9c23] text-white text-sm rounded hover:bg-primary transition"
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="px-3 py-1 cursor-pointer bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default LikeList;

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaThList, FaThLarge, FaTrash } from "react-icons/fa";
import loadingAnimation from "../../../../public/loading.json";
import Lottie from "lottie-react";
import { AuthContext } from "../../../authProvider/AuthProvider";
import Swal from "sweetalert2";

const LikeList = () => {
  const [isGridView, setIsGridView] = useState(true);
  const { user } = use(AuthContext);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://online-shop9070-server.onrender.com/liked-items")
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

  const filteredData = data?.filter(
    (res) => res.likeStatus === "liked" && res.userEmail === user.email
  );

  const handleRemove = (id) => {
    console.log("delete:", id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://online-shop9070-server.onrender.com/liked-items/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((dat) => {
            if (dat.deletedCount) {
              const remainingUser = data.filter((data) => data._id !== id);
              setData(remainingUser);
              Swal.fire({
                title: "Deleted!",
                text: "Your item has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  const handleBuyNow = (item) => {
    console.log("Buying:", item.productName);
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <Lottie animationData={loadingAnimation} loop={true} className="w-50" />
      </div>
    );
  }

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
      {filteredData.length === 0 ? (
        <p className="text-center py-8 text-gray-500 text-lg">
          No Cart You Have Added
        </p>
      ) : (
        <div>
          {isGridView ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  rounded-lg overflow-hidden">
              {filteredData.map((item, idx) => (
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
                    Brand:{" "}
                    <span className="text-black">{item.productBrand}</span>
                  </p>
                  <p className="text-sm text-gray-500 mb-1">
                    Category:{" "}
                    <span className="text-black">{item.productCategory}</span>
                  </p>
                  <p className="text-gray-700 my-2">
                    {item.productDescription}
                  </p>
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
                  {filteredData.map((item, idx) => (
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
                      <td className="px-4 py-3 text-sm">{item.productName}</td>
                      <td className="px-4 py-3 text-sm">{item.productBrand}</td>
                      <td className="px-4 py-3 text-sm">
                        {item.productCategory}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        ${item.productPrice}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {item.createdAt.slice(0, 10)}
                      </td>
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
        </div>
      )}
    </motion.div>
  );
};

export default LikeList;

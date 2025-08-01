import { useEffect, useState } from "react";
import { FaTrashAlt, FaCreditCard } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import loadingAnimation from "../../../../public/loading.json";
import Lottie from "lottie-react";

const AllCart = () => {
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

  const handleProduct = (id) => {
    navigate(`/payment/${id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="overflow-x-auto bg-white p-6 rounded-xl"
    >
      <h2 className="text-2xl font-semibold mb-6 text-primary">
        🛒 My Cart Items
      </h2>

      <table className="min-w-full rounded-lg overflow-hidden bg-white shadow-md">
        <thead className="bg-[#ffbb38] text-black">
          <tr>
            <th className="text-left px-6 py-3 text-sm font-medium">Product</th>
            <th className="text-left px-6 py-3 text-sm font-medium">Name</th>
            <th className="text-left px-6 py-3 text-sm font-medium">Price</th>
            <th className="text-left px-6 py-3 text-sm font-medium">Date</th>
            <th className="text-left px-6 py-3 text-sm font-medium">Status</th>
            <th className="text-left px-6 py-3 text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <motion.tr
              key={item._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="border-t border-primary bg-[#ebebeb]"
            >
              <td className="px-6 py-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded object-cover"
                />
              </td>
              <td className="px-6 py-4 font-medium text-[#0F0F0F]">
                {item.name}
              </td>
              <td className="px-6 py-4 text-gray-700">
                ${item.price.toFixed(2)}
              </td>
              <td className="px-6 py-4 text-gray-500">
                {/* {item.date} */}
                01/08/2025
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    item.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {/* {item.status} */} pending
                </span>
              </td>
              <td className="px-6 py-4 flex items-center gap-3">
                <button
                  title="Remove"
                  className="text-red-500 cursor-pointer hover:text-red-700 transition"
                >
                  <FaTrashAlt />
                </button>

                {/* condition button  */}
                <button
                  title="Pay Now"
                  onClick={() => {
                    handleProduct("685fdbb113618974edce63e6");
                  }}
                  className="flex cursor-pointer items-center gap-2 bg-[#ffbb38] hover:bg-[#e6a92f] text-black text-sm font-medium px-4 py-2 rounded shadow"
                >
                  <FaCreditCard /> Pay
                </button>
                {/* {item.status === 'Pending' && (
                  <button
                    title="Pay Now"
                    onClick={() => {
                      handleProduct("685fdbb113618974edce63e6");
                    }}
                    className="flex cursor-pointer items-center gap-2 bg-[#ffbb38] hover:bg-[#e6a92f] text-black text-sm font-medium px-4 py-2 rounded shadow"
                  >
                    <FaCreditCard /> Pay
                  </button>
                )} */}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default AllCart;

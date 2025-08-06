import { use, useEffect, useState } from "react";
import { FaTrashAlt, FaCreditCard } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import loadingAnimation from "../../../../public/loading.json";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../authProvider/AuthProvider";

const AllCart = () => {
  const { user } = use(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://online-shop9070-server.onrender.com/all-carts")
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

  const handlePayment = (id) => {
    navigate(`/payment/${id}`);
  };

  const handleDeleteCart = (id) => {
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
        fetch(`https://online-shop9070-server.onrender.com/all-carts/${id}`, {
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

  const filteredItems = data?.filter((res) => res.userEmail === user.email);

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
          {filteredItems.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                className="text-center py-8 text-gray-500 text-lg"
              >
                No Cart You Have Added
              </td>
            </tr>
          ) : (
            filteredItems.map((item, idx) => (
              <motion.tr
                key={item._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="border-t border-primary bg-[#ebebeb]"
              >
                <td className="px-6 py-4">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-14 h-14 rounded object-cover"
                  />
                </td>
                <td className="px-6 py-4 font-medium text-[#0F0F0F]">
                  {item.productName}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  ${item.productPrice.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-gray-500">{item.createdAt}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      item.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.paymentStatus}
                  </span>
                </td>
                <td className="px-6 py-4 flex items-center gap-3">
                  <button
                    title="Remove"
                    onClick={() => handleDeleteCart(item._id)}
                    className="text-red-500 cursor-pointer hover:text-red-700 transition"
                  >
                    <FaTrashAlt />
                  </button>

                  {item.paymentStatus === "pending" && (
                    <button
                      title="Pay Now"
                      onClick={() => handlePayment(item._id)}
                      className="flex cursor-pointer items-center gap-2 bg-[#ffbb38] hover:bg-[#e6a92f] text-black text-sm font-medium px-4 py-2 rounded shadow"
                    >
                      <FaCreditCard /> Pay
                    </button>
                  )}
                </td>
              </motion.tr>
            ))
          )}
        </tbody>
      </table>
    </motion.div>
  );
};

export default AllCart;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import loadingAnimation from "../../../../../public/loading.json";
import Lottie from "lottie-react";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const AllSeller = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://online-shop9070-server.onrender.com/all-seller")
      .then((res) => res.json())
      .then((data) => {
        const filterReq = data?.filter((res)=> res.sellerStatus === "approved")
        setData(filterReq);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleDeleteSeller = (id) => {
   console.log('Trying to remove this seller');
   
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="overflow-x-auto bg-white p-6 rounded-xl"
    >
      <h2 className="text-2xl font-semibold mb-6 text-primary">
        Total Seller : {data?.length}
      </h2>

      <table className="min-w-full rounded-lg overflow-hidden bg-white shadow-md">
        <thead className="bg-[#ffbb38] text-black">
          <tr>
            <th className="text-left px-6 py-3 text-sm font-medium">Photo</th>
            <th className="text-left px-6 py-3 text-sm font-medium">
              Seller Name
            </th>
            <th className="text-left px-6 py-3 text-sm font-medium">Become Date</th>
            <th className="text-left px-6 py-3 text-sm font-medium">Email</th>
            <th className="text-left px-6 py-3 text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                className="text-center py-16 text-gray-500 text-lg"
              >
                No Seller here now !
              </td>
            </tr>
          ) : (
            data?.map((seller, idx) => (
              <motion.tr
                key={seller._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="border-t border-primary bg-[#ebebeb]"
              >
                <td className="px-6 py-4">
                  <img
                    src={seller.profilePic}
                    alt={seller.firstName}
                    className="w-14 h-14 rounded object-cover"
                  />
                </td>
                <td className="px-6 py-4 font-medium text-[#0F0F0F]">
                  {seller.firstName}
                </td>
                <td className="px-6 py-4 text-gray-700">{seller.becomeSellerAt}</td>
                <td className="px-6 py-4 text-gray-500">{seller.email}</td>
                <td className="px-6 pt-7 flex items-center gap-4">
                  <button
                    title="Remove"
                    onClick={() => handleDeleteSeller(seller._id)}
                    className="text-red-500 cursor-pointer hover:text-red-700 transition border py-1 px-4 rounded-xl"
                  >
                    Delete Seller
                  </button>
                </td>
              </motion.tr>
            ))
          )}
        </tbody>
      </table>
    </motion.div>
  );
};

export default AllSeller;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import loadingAnimation from "../../../../../public/loading.json";
import Lottie from "lottie-react";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const SellerRequests = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const today = new Date();

  useEffect(() => {
    fetch("https://online-shop9070-server.onrender.com/all-seller")
      .then((res) => res.json())
      .then((data) => {
        const filterReq = data?.filter((res)=> res.sellerStatus === "pending")
        setData(filterReq);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleDeleteSeller = (id) => {
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
        fetch(`https://online-shop9070-server.onrender.com/all-seller/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((dat) => {
            if (dat.deletedCount) {
              const remainingUser = data.filter((data) => data._id !== id);
              setData(remainingUser);
              Swal.fire({
                title: "Deleted!",
                text: "This seller has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  const handleApprove = (id , name) => {
    const updateStatus = {
      sellerStatus: "approved",
      becomeSellerAt: `${String(today.getMonth() + 1).padStart(2, "0")}-${String(
      today.getDate()
    ).padStart(2, "0")}-${today.getFullYear()}`,
    }
    fetch(`https://online-shop9070-server.onrender.com/${id}`,{
      method: "PUT",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateStatus),
    })
    .then((res)=> res.json())
    .then((data)=> {
      if(data.modifiedCount> 0){
       toast.success(`${name} is become a seller now !`)
      }
    })
    .catch((error)=>{
      console.log(error);
    })
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
        All Seller Requests
      </h2>

      <table className="min-w-full rounded-lg overflow-hidden bg-white shadow-md">
        <thead className="bg-[#ffbb38] text-black">
          <tr>
            <th className="text-left px-6 py-3 text-sm font-medium">Photo</th>
            <th className="text-left px-6 py-3 text-sm font-medium">
              Seller Name
            </th>
            <th className="text-left px-6 py-3 text-sm font-medium">Date</th>
            <th className="text-left px-6 py-3 text-sm font-medium">Email</th>
            <th className="text-left px-6 py-3 text-sm font-medium">Status</th>
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
                No Seller Request here now !
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
                <td className="px-6 py-4 text-gray-700">{seller.createdAt}</td>
                <td className="px-6 py-4 text-gray-500">{seller.email}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700">
                    {seller.sellerStatus}
                  </span>
                </td>
                <td className="px-6 py-4 flex items-center gap-4">
                  <button
                    title="Remove"
                    onClick={() => handleDeleteSeller(seller._id)}
                    className="text-red-500 cursor-pointer hover:text-red-700 transition"
                  >
                    <FaTrashAlt className="text-lg" />
                  </button>

                  <button
                    title="Approve"
                    onClick={() => handleApprove(seller._id,seller.firstName)}
                    className="flex cursor-pointer items-center gap-2 bg-[#ffbb38] hover:bg-[#e6a92f] text-black text-sm font-medium px-4 py-2 rounded shadow"
                  >
                    Approve
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

export default SellerRequests;

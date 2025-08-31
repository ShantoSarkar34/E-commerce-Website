import { useContext, useState } from "react";
import {
  FaShoppingCart,
  FaHeart,
  FaStar,
  FaEdit,
  FaBoxOpen,
  FaUsers,
} from "react-icons/fa";
import Modal from "./Modal";
import loadingAnimation from "../../../../public/loading.json";
import Lottie from "lottie-react";
import { AuthContext } from "../../../authProvider/AuthProvider";
import { motion } from "framer-motion";

const MyProfile = () => {
  const { user, dark, currentRole, loading } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const role = currentRole[0]?.role;

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <Lottie animationData={loadingAnimation} loop={true} className="w-50" />
      </div>
    );
  }

  const handleUpdate = (updatedData) => {
    console.log("trying to update user info", updatedData);
    setIsModalOpen(false);
  };

  return (
    <motion.div
      className={`p-10 rounded-xl shadow-xl bg-[#ffffff] max-w-5xl mx-auto ${
        dark && "bg-gray-400"
      }`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Profile Header */}
      <motion.div
        className="flex flex-col items-center text-center"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div
          className={`border-4 border-[#ffbb38] rounded-full overflow-hidden p-3 ${
            dark && "border-white"
          }`}
        >
          <motion.img
            src={user.photoURL}
            alt="User Avatar"
            className="rounded-full object-cover w-36 h-36 shadow-md"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          />
        </div>

        <h2
          className={`text-3xl font-semibold mt-6 text-[#0F0F0F] ${
            dark && "text-primary"
          }`}
        >
          {user.displayName}
        </h2>
        <p className={`text-gray-500 mt-2 ${dark && "text-white"}`}>
          {user.email}
        </p>
        <p className={`text-gray-500 text-lg mt-1 ${dark && "text-white"}`}>
          Role: <span>{role}</span>
        </p>

        {/* Dynamic Stats Based on Role */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 w-full"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {/* Common Stats for User */}
          {role === "user" && (
            <>
              {[
                {
                  icon: <FaShoppingCart className="text-3xl mb-2 mx-auto" />,
                  value: 12,
                  label: "Products Bought",
                },
                {
                  icon: <FaStar className="text-3xl mb-2 mx-auto" />,
                  value: 5,
                  label: "Reviews Given",
                },
                {
                  icon: <FaHeart className="text-3xl mb-2 mx-auto" />,
                  value: 8,
                  label: "Items Liked",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className={`p-6 bg-gray-50 rounded-xl shadow-sm text-center ${
                    dark && "bg-gray-300"
                  }`}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <div
                    className={`mx-auto text-[#ffbb38] ${
                      dark && "text-orange-400"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <p className="text-2xl font-bold">{item.value}</p>
                  <p className="text-gray-500 text-sm">{item.label}</p>
                </motion.div>
              ))}
            </>
          )}

          {/* Seller Stats */}
          {role === "seller" && (
            <>
              {[
                {
                  icon: <FaBoxOpen className="text-3xl mb-2 mx-auto" />,
                  value: 34,
                  label: "Products Sold",
                },
                {
                  icon: <FaStar className="text-3xl mb-2 mx-auto" />,
                  value: 10,
                  label: "Positive Reviews",
                },
                {
                  icon: <FaHeart className="text-3xl mb-2 mx-auto" />,
                  value: 20,
                  label: "Followers",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className={`p-6 bg-gray-50 rounded-xl shadow-sm text-center ${
                    dark && "bg-gray-300"
                  }`}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <div
                    className={`mx-auto text-[#ffbb38] ${
                      dark && "text-orange-400"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <p className="text-2xl font-bold">{item.value}</p>
                  <p className="text-gray-500 text-sm">{item.label}</p>
                </motion.div>
              ))}
            </>
          )}

          {/* Admin Stats */}
          {role === "admin" && (
            <>
              {[
                {
                  icon: <FaUsers className="text-3xl mb-2 mx-auto" />,
                  value: 100,
                  label: "Total Users",
                },
                {
                  icon: <FaBoxOpen className="text-3xl mb-2 mx-auto" />,
                  value: 150,
                  label: "Products Listed",
                },
                {
                  icon: <FaStar className="text-3xl mb-2 mx-auto" />,
                  value: 50,
                  label: "Pending Reviews",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className={`p-6 bg-gray-50 rounded-xl shadow-sm text-center ${
                    dark && "bg-gray-300"
                  }`}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <div
                    className={`mx-auto text-[#ffbb38] ${
                      dark && "text-orange-400"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <p className="text-2xl font-bold">{item.value}</p>
                  <p className="text-gray-500 text-sm">{item.label}</p>
                </motion.div>
              ))}
            </>
          )}
        </motion.div>

        {/* Update Profile Button */}
        <motion.button
          onClick={() => setIsModalOpen(true)}
          className="mt-8 bg-primary text-black px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-[#e6a92f] transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaEdit /> Update Profile
        </motion.button>
      </motion.div>

      {isModalOpen && (
        <Modal
          user={user}
          onClose={() => setIsModalOpen(false)}
          onSave={handleUpdate}
        />
      )}
    </motion.div>
  );
};

export default MyProfile;

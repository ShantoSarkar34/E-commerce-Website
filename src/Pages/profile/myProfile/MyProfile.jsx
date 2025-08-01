import { useState } from "react";
import { FaShoppingCart, FaHeart, FaStar, FaEdit } from "react-icons/fa";
import Modal from "./Modal";

const MyProfile = () => {
  const [user, setUser] = useState({
    name: "Md Shanto Sarkar",
    email: "shanto@example.com",
    photo: "https://i.ibb.co/YhLmXQ8/default-avatar.png",
    bought: 12,
    reviews: 5,
    likes: 8,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdate = (updatedData) => {
    setUser(updatedData);
    setIsModalOpen(false);
  };

  return (
    <div className="p-10 rounded-xl shadow-xl bg-[#ffffff] max-w-5xl mx-auto">
      <div className="flex flex-col items-center text-center">
        <img
          src={user.photo}
          alt="User Avatar"
          className="rounded-full object-cover border-4 border-[#ffbb38] w-36 h-36 shadow-md"
        />
        <h2 className="text-3xl font-semibold mt-6 text-[#0F0F0F]">
          {user.name}
        </h2>
        <p className="text-gray-500 mt-1">{user.email}</p>

        <div className="grid grid-cols-3 gap-6 mt-8 w-full">
          <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
            <FaShoppingCart className="mx-auto text-[#ffbb38] text-3xl mb-2" />
            <p className="text-2xl font-bold">{user.bought}</p>
            <p className="text-gray-500 text-sm">Products Bought</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
            <FaStar className="mx-auto text-[#ffbb38] text-3xl mb-2" />
            <p className="text-2xl font-bold">{user.reviews}</p>
            <p className="text-gray-500 text-sm">Reviews Given</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
            <FaHeart className="mx-auto text-[#ffbb38] text-3xl mb-2" />
            <p className="text-2xl font-bold">{user.likes}</p>
            <p className="text-gray-500 text-sm">Items Liked</p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-8 bg-[#ffbb38] text-black px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-[#e6a92f] transition"
        >
          <FaEdit /> Update Profile
        </button>
      </div>

      {isModalOpen && (
        <Modal
          user={user}
          onClose={() => setIsModalOpen(false)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
};

export default MyProfile;

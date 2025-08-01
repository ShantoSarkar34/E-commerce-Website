import { useState } from "react";
import { toast } from "react-toastify";

const Modal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...user });
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formDataImg = new FormData();
    formDataImg.append("image", file);
    const apiKey = "YOUR_IMGBB_API_KEY";

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formDataImg,
    });
    const data = await res.json();
    if (data.success) {
      setFormData((prev) => ({ ...prev, photo: data.data.url }));
    }
    setUploading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    toast.success("Profile Updated !");
  };

  return (
    <div className="fixed inset-0 bg-[#141414da] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl w-full max-w-lg shadow-xl">
        <h3 className="text-2xl font-bold mb-6 text-[#0F0F0F]">
          Update Profile
        </h3>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-sm">
              Upload New Photo
            </label>

            {uploading && (
              <p className="text-xs text-gray-500 mt-1">Uploading...</p>
            )}
            {formData.photo && (
              <img
                src={formData.photo}
                alt="Preview"
                className="w-24 h-24 mt-2 rounded-full object-cover mb-2"
              />
            )}
            <div className="flex ">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-sm border border-primary p-2 rounded cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium text-sm">Name</label>
            <input
              type="text"
              name="name"
              defaultValue={user.displayName}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 border-primary"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-sm">Email</label>
            <input
              type="email"
              name="email"
              defaultValue={user.email}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 border-primary"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-[#ffbb38] cursor-pointer text-black px-6 py-2 rounded hover:bg-[#e6a92f]"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 cursor-pointer px-6 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;

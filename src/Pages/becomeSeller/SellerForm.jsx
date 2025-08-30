import { use, useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaMapMarkerAlt, FaUpload } from "react-icons/fa";
import { AuthContext } from "../../authProvider/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const SellerForm = () => {
  const { user } = use(AuthContext);
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
  const [passError, setPassError] = useState(null);
  const today = new Date();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    whatsapp: "",
    email: user?.email,
    country: "",
    address: "",
    shopName: "",
    shopAddress: "",
    createdAt: `${String(today.getMonth() + 1).padStart(2, "0")}-${String(
      today.getDate()
    ).padStart(2, "0")}-${today.getFullYear()}`,
  });
  const [profilePic, setProfilePic] = useState(null);
  const [shopLogo, setShopLogo] = useState(null);
  const [coverPic, setCoverPic] = useState(null);
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  // Universal input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Upload image file to ImgBB and return direct URL
  const uploadImageToImgBB = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (data.success) {
        return data.data.url; // ImgBB direct link
      } else {
        throw new Error("ImgBB upload failed");
      }
    } catch (error) {
      console.error("ImgBB upload error:", error);
      return null;
    }
  };

  // Handle image upload: upload file to ImgBB and save direct URL in state
  const handleImageUpload = async (e, setter) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File must be less than 5MB");
      return;
    }

    const uploadedUrl = await uploadImageToImgBB(file);
    if (uploadedUrl) {
      setter(uploadedUrl);
    } else {
      alert("Image upload failed. Please try again.");
    }
  };

  // Get current location and reverse geocode to address
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        // Use OpenStreetMap Nominatim reverse geocoding API
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const address = data.display_name || "";
          setFormData((prev) => ({
            ...prev,
            address,
          }));
        } catch (error) {
          alert("Failed to fetch address from location");
        }
      },
      () => {
        alert("Permission denied or unable to get location");
      }
    );
  };

  // On form submit, log all data including image URLs
  const handleFormInfo = async (e) => {
    e.preventDefault();
    const form = e.target;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    if (password !== confirmPassword) {
      setPassError("Password not matched!");
    }
    const sellerData = {
      ...formData,
      profilePic,
      shopLogo,
      coverPic,
      confirmPassword,
    };

    if (passError) {
      try {
        const response = await axios.post(
          "https://online-shop9070-server.onrender.com/all-seller",
          sellerData
        );
        if (response.data.insertedId) {
          toast.success("Congratulations, You become a seller !");
          navigate("/profile/my-profile");
        }
      } catch (error) {
        console.log("error submitting :", error);
      }
    } else {
      toast.warn("Fill this form correctly !");
    }
  };

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-[#F8F8F8] w-full py-40"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">
          Become a Seller
        </h2>

        <form
          onSubmit={handleFormInfo}
          className="grid grid-cols-1 lg:grid-cols-6 gap-10 bg-white p-10 shadow-md rounded-2xl"
        >
          {/* Left Form Section */}
          <div className="lg:col-span-4">
            {/* Seller Info */}
            <h3 className="text-xl font-semibold">Seller Information</h3>
            <p className="my-4 text-gray-500">
              {user?.email} <span className="text-red-600">*</span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="input-field placeholder:text-sm text-lg px-6 w-full font-normal bg-white border border-gray-300 rounded-lg h-[50px]"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="input-field placeholder:text-sm text-lg px-6 w-full font-normal bg-white border border-gray-300 rounded-lg h-[50px]"
              />
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="Contact Number"
                className="input-field placeholder:text-sm text-lg px-6 w-full font-normal bg-white border border-gray-300 rounded-lg h-[50px]"
              />
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="Business WhatsApp (Optional)"
                className="input-field placeholder:text-sm text-lg px-6 w-full font-normal bg-white border border-gray-300 rounded-lg h-[50px]"
              />
              <input
                type="email"
                name="email"
                value={user?.email}
                className="input-field placeholder:text-sm text-lg px-6 w-full font-normal bg-white border border-gray-300 rounded-lg h-[50px]"
              />
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                className="input-field placeholder:text-sm text-lg px-6 w-full font-normal bg-white border border-gray-300 rounded-lg h-[50px]"
              />
            </div>

            {/* Address */}
            <div className="mt-4">
              <label className="block font-medium mb-2">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Village/Town, Road(if any), Thana, District, Country"
                className="pt-3 input-field placeholder:text-sm text-lg px-6 w-full font-normal bg-white border border-gray-300 rounded-lg h-24"
              ></textarea>
              <button
                onClick={handleGetLocation}
                type="button"
                className="flex cursor-pointer items-center gap-2 mt-2 px-4 py-2 bg-primary text-black rounded hover:bg-yellow-500 transition"
              >
                <FaMapMarkerAlt /> Use Current Location
              </button>
            </div>

            {/* Shop Info */}
            <h3 className="text-xl font-semibold mt-8 mb-4">
              Shop Information
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="shopName"
                value={formData.shopName}
                onChange={handleChange}
                placeholder="Shop Name"
                className="input-field placeholder:text-sm text-lg px-6 w-full font-normal bg-white border border-gray-300 rounded-lg h-[50px]"
              />
              <input
                type="text"
                name="shopAddress"
                value={formData.shopAddress}
                onChange={handleChange}
                placeholder="Shop Address"
                className="input-field placeholder:text-sm text-lg px-6 w-full font-normal bg-white border border-gray-300 rounded-lg h-[50px]"
              />
              <div className="relative">
                <button
                  type="button"
                  onClick={handleShow}
                  className="cursor-pointer absolute top-4 right-4"
                >
                  {show ? (
                    <FaEye className="text-xl text-gray-600" />
                  ) : (
                    <FaEyeSlash className="text-xl text-gray-600" />
                  )}
                </button>
                <input
                  type={show ? "password" : "text"}
                  name="password"
                  placeholder="Password"
                  className="input-field placeholder:text-sm text-lg px-6 w-full font-normal bg-white border border-gray-300 rounded-lg h-[50px]"
                />
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={handleShow}
                  className="cursor-pointer absolute top-4 right-4"
                >
                  {show ? (
                    <FaEye className="text-xl text-gray-600" />
                  ) : (
                    <FaEyeSlash className="text-xl text-gray-600" />
                  )}
                </button>

                <input
                  type={show ? "password" : "text"}
                  name="confirmPassword"
                  placeholder="Retype Password"
                  className="input-field placeholder:text-sm text-lg px-6 w-full font-normal bg-white border border-gray-300 rounded-lg h-[50px]"
                />
                {passError && (
                  <p className="text-red-500 text-sm pt-2">{passError}</p>
                )}
              </div>
              <button
                type="submit"
                className="cursor-pointer px-4 py-2 bg-primary text-black rounded font-semibold hover:bg-yellow-500 transition"
              >
                Create Seller Account
              </button>
            </div>
          </div>

          {/* Right Upload Section */}
          <div className="space-y-6 lg:col-span-2">
            {/* Profile Pic */}
            <div className="upload-section">
              <p className="font-medium mb-2">Profile Picture (Max 5MB)</p>
              <div className="flex justify-center">
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-[220px] h-[220px] object-cover rounded-full mb-2 border-[3px] p-2 border-primary"
                  />
                ) : (
                  <div className="w-[220px] h-[220px] bg-gray-200 rounded-full mb-2 border flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              <label className="upload-btn flex items-center gap-2 cursor-pointer bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
                <FaUpload /> Upload Profile Picture
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => handleImageUpload(e, setProfilePic)}
                />
              </label>
            </div>

            {/* Shop Logo */}
            <div className="upload-section">
              <p className="font-medium mb-2">Shop Logo (Max 5MB)</p>
              <div className="flex justify-center">
                {shopLogo ? (
                  <img
                    src={shopLogo}
                    alt="Shop Logo"
                    className="w-full h-[120px] rounded-lg object-cover mb-2 border "
                  />
                ) : (
                  <div className="w-full h-[120px] bg-gray-200 rounded-lg mb-2 border flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              <label className="upload-btn flex items-center gap-2 cursor-pointer bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
                <FaUpload /> Upload Shop Logo
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => handleImageUpload(e, setShopLogo)}
                />
              </label>
            </div>

            {/* Cover Pic */}
            <div className="upload-section">
              <p className="font-medium mb-2">Shop Cover (Max 5MB)</p>
              <div className="flex justify-center">
                {coverPic ? (
                  <img
                    src={coverPic}
                    alt="Cover"
                    className="w-full rounded-lg h-[200px] object-cover mb-2 border "
                  />
                ) : (
                  <div className="w-full h-[200px] bg-gray-200 rounded-lg mb-2 border flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              <label className="upload-btn flex items-center gap-2 cursor-pointer bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
                <FaUpload /> Upload Cover
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => handleImageUpload(e, setCoverPic)}
                />
              </label>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default SellerForm;

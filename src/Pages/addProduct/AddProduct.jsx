import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


const AddProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const productData = {
      ...data,
      price: parseFloat(data.price),
      ratings: parseFloat(data.ratings),
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await axios.post(
        "https://online-shop9070-server.onrender.com/all-products",
        productData
      );
      console.log( response.data.insertedId);
      reset();
      if(response.data.insertedId){
        toast.success('Product Upload successfull !')
      }
    } catch (error) {
      console.log("error submitting :", error);
    }
  };


  return (
    <div className="pt-16 lg:pt-20">
      <div className="py-20">
        <div className="max-w-xl mx-auto p-6 lg:p-10 bg-white border border-primary rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Add New Product
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                {...register("name", { required: "Product name is required" })}
                className="w-full mt-1 p-2 border rounded-md"
                placeholder="Enter product name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                {...register("image", { required: "Image URL is required" })}
                className="w-full mt-1 p-2 border rounded-md"
                placeholder="Paste image URL (e.g., from imgbb or CDN)"
              />
              {errors.image && (
                <p className="text-red-500 text-sm">{errors.image.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                className="w-full mt-1 p-2 border rounded-md"
                placeholder="Write a short product description"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                {...register("price", { required: "Price is required" })}
                className="w-full mt-1 p-2 border rounded-md"
                placeholder="Enter price in USD (e.g., 49.99)"
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                {...register("category", { required: "Category is required" })}
                className="w-full mt-1 p-2 border rounded-md"
                placeholder="Enter category (e.g., Electronics, Health)"
              />
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Brand */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Brand
              </label>
              <input
                {...register("brand", { required: "Brand is required" })}
                className="w-full mt-1 p-2 border rounded-md"
                placeholder="Enter brand name (e.g., Sony, Oral-B)"
              />
              {errors.brand && (
                <p className="text-red-500 text-sm">{errors.brand.message}</p>
              )}
            </div>

            {/* Ratings */}
            <div className="mb-10">
              <label className="block text-sm font-medium text-gray-700">
                Ratings (1–5)
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                {...register("ratings", { required: "Ratings are required" })}
                className="w-full mt-1 p-2 border rounded-md"
                placeholder="Enter rating out of 5 (e.g., 4.5)"
              />
              {errors.ratings && (
                <p className="text-red-500 text-sm">{errors.ratings.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full bg-primary text-gray-700 cursor-pointer font-semibold py-2 px-4 rounded-md hover:bg-white border-primary border transition"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

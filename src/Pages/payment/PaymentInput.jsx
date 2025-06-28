import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import loadingAnimation from "../../../public/loading.json";
import { RxCross1 } from "react-icons/rx";

const PaymentInput = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/all-products")
      .then((res) => res.json())
      .then((data) => {
        const filterData = data.filter((pro) => pro._id === id);
        setData(filterData);
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

  const validate = () => {
    const newErrors = {};
    const cardRegex = /^\d{16}$/;
    const cvcRegex = /^\d{3}$/;

    if (!formData.name.trim()) newErrors.name = "Cardholder name is required";
    if (!cardRegex.test(formData.cardNumber))
      newErrors.cardNumber = "Invalid card number";
    if (!formData.expiry) newErrors.expiry = "Expiry date is required";
    if (!cvcRegex.test(formData.cvc)) newErrors.cvc = "Invalid CVC";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundErrors = validate();
    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);

    // Simulate sending data
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="pt-16 lg:pt-20">
      <div className="py-20">
        {data.map((res) => (
          <form
            key={res._id}
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200 space-y-4 relative"
          >
            <h1 className="text-2xl text-center font-bold text-gray-500 mb-4 lg:mb-8">
              {res.name}
            </h1>
            <h2 className="text-xl font-bold text-gray-800">
              Total Price : ${res.price}
            </h2>
            <div className=" absolute top-2 lg:top-3 right-2 lg:right-3">
              <NavLink to="/">
                <RxCross1 className="text-gray-500" />
              </NavLink>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name on Card
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                maxLength={16}
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="1234567812345678"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
              )}
            </div>

            <div className="flex space-x-4 mb-10">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Expiry Date
                </label>
                <input
                  type="month"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
                {errors.expiry && (
                  <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
                )}
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  CVC
                </label>
                <input
                  type="text"
                  name="cvc"
                  maxLength={3}
                  value={formData.cvc}
                  onChange={handleChange}
                  placeholder="123"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
                {errors.cvc && (
                  <p className="text-red-500 text-sm mt-1">{errors.cvc}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-gray-700 cursor-pointer font-semibold py-2 px-4 rounded-md hover:bg-white border-primary border transition"
            >
              Submit Payment
            </button>

            {submitted && (
              <p className="text-green-600 text-sm mt-3">
                ✅ Payment form submitted (simulated)
              </p>
            )}
          </form>
        ))}
      </div>
    </div>
  );
};

export default PaymentInput;

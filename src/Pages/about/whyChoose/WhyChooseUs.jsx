import { motion } from "framer-motion";
import { FaShieldAlt, FaShippingFast, FaHeadset, FaTags } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaShippingFast size={40} className="text-yellow-500" />,
      title: "Fast Shipping",
      desc: "Get your orders delivered quickly and reliably.",
    },
    {
      icon: <FaShieldAlt size={40} className="text-orange-500" />,
      title: "Secure Payments",
      desc: "Shop with confidence with our secure payment system.",
    },
    {
      icon: <FaHeadset size={40} className="text-green-500" />,
      title: "24/7 Support",
      desc: "Our support team is always here to assist you.",
    },
    {
      icon: <FaTags size={40} className="text-blue-500" />,
      title: "Best Prices",
      desc: "Enjoy competitive pricing on all products.",
    },
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-primary">Why Choose Us?</h2>
        <p className="text-gray-600 mt-3">
          We provide unmatched value and service for our customers.
        </p>
      </div>
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 px-6">
        {features.map((item, idx) => (
          <motion.div
            key={idx}
            className="p-8 bg-white rounded-lg shadow-md text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 flex justify-center">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;

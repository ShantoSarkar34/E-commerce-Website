import { motion } from "framer-motion";

const StatsSection = () => {
  const stats = [
    { number: "500K+", text: "Happy Customers" },
    { number: "100K+", text: "Products Sold" },
    { number: "10+", text: "Years of Experience" },
    { number: "50+", text: "Trusted Brands" },
  ];

  return (
    <section className="bg-gray-200 py-16 lg:py-26 text-center">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            className="px-6 py-10 bg-white rounded-2xl shadow"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-extrabold text-yellow-500">
              {stat.number}
            </h3>
            <p className="text-gray-600">{stat.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;

import { motion } from "framer-motion";

const MissionVision = () => {
  const data = [
    {
      title: "Our Mission",
      text: "To deliver premium products at unbeatable prices with unmatched customer service.",
    },
    {
      title: "Our Vision",
      text: "To be the world's most trusted online marketplace for quality and value.",
    },
    {
      title: "Our Values",
      text: "Integrity, customer-first approach, and relentless innovation in everything we do.",
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6 text-center">
        {data.map((item, idx) => (
          <motion.div
            key={idx}
            className="p-8 rounded-lg shadow-lg bg-gray-50"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-2 text-primary">
              {item.title}
            </h3>
            <p className="text-gray-600">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MissionVision;

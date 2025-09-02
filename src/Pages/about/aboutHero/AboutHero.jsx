import { motion } from "framer-motion";

const AboutHero = () => {
  return (
    <section className="relative bg-gray-200 text-black py-24 lg:py-40 text-center">
      <motion.h1
        className="text-5xl font-bold mb-4 text-primary"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        About Us
      </motion.h1>
      <motion.p
        className="text-lg max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        We are passionate about delivering quality products and amazing experiences.
      </motion.p>
      <motion.button
        className="mt-6 cursor-pointer bg-white text-black px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-100"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Learn More
      </motion.button>
    </section>
  );
};

export default AboutHero;

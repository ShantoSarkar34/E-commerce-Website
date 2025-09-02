import { motion } from "framer-motion";

const AboutHero = () => {
  return (
    <section className="relative bg-white text-black py-24 text-center">
      <motion.h1
        className="text-5xl font-bold mb-4 text-primary"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        About Us
      </motion.h1>
      <motion.p
        className="text-lg max-w-2xl mx-auto text-gray-600 lg:py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        We are passionate about delivering quality products and amazing
        experiences.
      </motion.p>
      <motion.button className="mt-6 cursor-pointer border border-primary bg-white text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
        Learn More
      </motion.button>
    </section>
  );
};

export default AboutHero;

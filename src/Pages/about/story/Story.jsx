import { motion } from "framer-motion";

const OurStory = () => {
  return (
    <section className="max-w-6xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-10 items-center">
      <motion.img
        src="https://images.unsplash.com/photo-1592503253391-8d1c77fa9f6d"
        alt="Our Story"
        className="rounded-lg shadow-lg w-full h-[400px] object-cover"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      />
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-4">Our Story</h2>
        <p className="text-gray-600 mb-4 leading-relaxed">
          Established in 2015, we began as a small online store with a big vision: to make quality products accessible to everyone at affordable prices. Over the years, we've grown into a trusted global brand, serving thousands of happy customers worldwide.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Our commitment to quality, innovation, and customer satisfaction drives everything we do. From our carefully curated collections to our 24/7 customer support, we strive to make your shopping experience seamless and enjoyable.
        </p>
      </motion.div>
    </section>
  );
};

export default OurStory;

import { motion } from "framer-motion";
import about from "../../../assets/about/about.jpg";

const OurStory = () => {
  return (
    <section className="py-20  bg-gray-50">
      <div className=" container mx-auto px-4 md:grid-cols-2 grid  gap-10 items-center">
        <motion.img
          src={about}
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
          <h2 className="text-4xl font-bold mb-4 text-primary">Our Story</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Established in 2015, we began as a small online store with a big
            vision: to make quality products accessible to everyone at
            affordable prices. Over the years, we've grown into a trusted global
            brand, serving thousands of happy customers worldwide.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our commitment to quality, innovation, and customer satisfaction
            drives everything we do. From our carefully curated collections to
            our 24/7 customer support, we strive to make your shopping
            experience seamless and enjoyable.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default OurStory;

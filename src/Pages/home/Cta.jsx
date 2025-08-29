import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";

export default function Cta() {
  return (
    <section className="relative w-full cta_bg py-20 overflow-hidden">
      {/* Background decorative shapes */}
      <motion.div
        className="absolute top-0 left-0 w-72 h-72 bg-white/20 rounded-full -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-72 h-72 bg-white/20 rounded-full translate-x-1/3 translate-y-1/3"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
      />

      <div className="relative max-w-4xl mx-auto px-6 text-center text-white lg:pl-30">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg text-[#222222]"
        >
          Get <span className="text-primary "> 20%</span> Off Discount Coupon
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md text-[#222222]"
        >
          by Subscribe our Newsletter
        </motion.p>

        {/* Subscription Form */}
        <motion.form
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-0"
        >
          <div className="relative w-full md:w-auto flex-1">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-white placeholder:text-[#222222] px-6 py-4 md:rounded-l-full  text-gray-800 focus:outline-none  pl-10 lg:pl-14 transition"
            />
            <FaEnvelope className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
          </div>
          <button
            type="submit"
            className="md:px-8 px-16 cursor-pointer py-4 bg-primary  text-white  font-bold md:rounded-r-full rounded-lg hover:text-slate-100 transition-all duration-200"
          >
            Subscribe
          </button>
        </motion.form>

        {/* Optional CTA note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-4 lg:mt-6 text-[#222222be] text-sm"
        >
          We respect your privacy. Unsubscribe at any time.
        </motion.p>
      </div>
    </section>
  );
}

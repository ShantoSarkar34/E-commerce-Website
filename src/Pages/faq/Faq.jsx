import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Faq = () => {
  const faqs = [
    {
      question: "How can I track my order?",
      answer:
        "You can track your order by logging into your account and navigating to the 'My Orders' section. There, you will find real-time tracking details for your purchases.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit/debit cards, PayPal, bank transfers, and popular digital wallets. Cash on delivery is also available in select regions.",
    },
    {
      question: "Can I return or exchange an item?",
      answer:
        "Yes! We offer a 7-day return or exchange policy on most items. The product must be unused, in its original packaging, and accompanied by the receipt.",
    },
    {
      question: "Is my payment information secure?",
      answer:
        "Absolutely. We use industry-standard SSL encryption and secure payment gateways to ensure your financial information remains protected.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship worldwide. Shipping costs and delivery times may vary depending on the destination country.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach our support team via email at support@example.com or use the live chat feature available on our website.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="pt-16 lg:pt-20">
        <div className="bg-gray-50 py-16 px-6">

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-10">
        <motion.h1
          className="text-4xl font-extrabold text-center text-yellow-500 mb-6"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Frequently Asked Questions
        </motion.h1>
        <motion.p
          className="text-center text-gray-600 mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Have questions? We have answers! Find solutions to common queries
          below.
        </motion.p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1* 0.1 }}
              viewport={{ once: true }}
            >
              <button
                className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-medium bg-gray-100 hover:bg-gray-200"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                {openIndex === index ? (
                  <FaChevronUp className="text-yellow-500" />
                ) : (
                  <FaChevronDown className="text-yellow-500" />
                )}
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    className="px-6 py-4 text-gray-600 bg-white"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 shadow-lg transition-all">
            Contact Support
          </button>
        </motion.div>
      </div>
        </div>
    </section>
  );
};

export default Faq;

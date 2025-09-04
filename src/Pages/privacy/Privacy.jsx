import { motion } from "framer-motion";

const Privacy = () => {
  const sections = [
    {
      title: "1. Information We Collect",
      content: `
        We collect personal information you provide, such as your name, email address, shipping address, and payment details when you purchase from our website. 
        Additionally, we automatically collect certain technical information, including IP address, browser type, and cookies for analytics and security purposes.
      `,
    },
    {
      title: "2. How We Use Your Information",
      content: `
        Your information helps us process transactions, deliver your orders, and improve your shopping experience. 
        We may also use it to send you promotional offers, updates, and personalized recommendations.
      `,
    },
    {
      title: "3. Sharing of Information",
      content: `
        We do not sell your personal data. We may share your information with trusted partners like payment processors, shipping carriers, and analytics providers, 
        strictly for business purposes and under confidentiality agreements.
      `,
    },
    {
      title: "4. Data Security",
      content: `
        We implement robust security measures to protect your data from unauthorized access, alteration, or disclosure. 
        However, no method of online transmission is 100% secure, so we cannot guarantee absolute security.
      `,
    },
    {
      title: "5. Your Rights",
      content: `
        You have the right to access, update, or delete your personal data. You can also opt out of marketing emails at any time by clicking the unsubscribe link.
      `,
    },
    {
      title: "6. Changes to This Policy",
      content: `
        We may update this Privacy Policy periodically. Any changes will be posted here with an updated revision date.
      `,
    },
    {
      title: "7. Contact Us",
      content: `
        If you have any questions or concerns about this Privacy Policy, feel free to contact us at support@example.com.
      `,
    },
  ];

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
            Privacy & Policy
          </motion.h1>
          <motion.p
            className="text-center text-gray-600 mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Your privacy is our top priority. We value your trust and are
            committed to safeguarding your personal information with the highest
            level of security.
          </motion.p>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                className="p-6 bg-gray-100 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 * 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  {section.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {section.content}
                </p>
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
              Back to Home
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Privacy;

import { motion } from "framer-motion";
import { fadeInUp } from "../utils/motionVariants";

export default function Hero() {
  return (
    <section id="home" className="pt-24 bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-28 flex flex-col-reverse md:flex-row items-center gap-10">
        <div className="w-full md:w-1/2">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight"
          >
            Your Trusted Foundation for Compassionate In-Home Care for Your
            Loved Ones
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-4 text-gray-300 max-w-lg"
          >
            Professional caregivers, nursing and specialised support — delivered
            in the comfort of home. Trusted, local, and available 24/7.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-8 flex items-center gap-3"
          >
            <a
              href="#contact"
              className="px-6 py-3 bg-blue-600 text-white rounded-md font-semibold shadow hover:bg-blue-700"
            >
              Get a Caregiver
            </a>
            <a
              href="#services"
              className="px-4 py-2 border rounded-md text-gray-200 hover:text-white"
            >
              Our Services
            </a>
          </motion.div>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-400">
            <div>✓ 2000+ Clients</div>
            <div>✓ Trained Nurses & Caregivers</div>
            <div>✓ Coverage across multiple states</div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <motion.img
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            src="/assets/hero-caregiver.png"
            alt="Caregiver assisting an older person"
            className="rounded-xl shadow-xl w-full max-w-md object-cover h-72 md:h-96"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { fadeInUp, stagger } from "../utils/motionVariants";

const SERVICES = [
  {
    title: "Personal Care",
    desc: "Bathing, dressing, feeding, mobility support.",
  },
  {
    title: "Nursing Care",
    desc: "Registered nurses for clinical needs at home.",
  },
  { title: "Dementia Care", desc: "Compassionate, specialist memory care." },
  { title: "Palliative Care", desc: "Comfort-focused end-of-life support." },
];

export default function ServicesGrid() {
  return (
    <section id="services" className="py-12 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-2xl font-bold"
        >
          Our Services
        </motion.h2>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.title}
              variants={fadeInUp}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="bg-slate-800 p-6 rounded-lg shadow-sm hover:shadow-md"
            >
              <h3 className="font-semibold text-lg">{s.title}</h3>
              <p className="mt-2 text-sm text-gray-300">{s.desc}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

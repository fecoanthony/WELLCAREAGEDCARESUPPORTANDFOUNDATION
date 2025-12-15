// src/pages/AboutUs.jsx
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HashLink } from "react-router-hash-link";

/**
 * AboutUs page
 * - Uses Tailwind utility classes
 * - Uses framer-motion with reduced-motion fallback
 * - Replace images in /public/assets/ as needed
 */

const container = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

const heroVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function AboutUs() {
  const reduce = useReducedMotion();

  // Replace these stats with your real figures
  const stats = [
    { label: "Served clients", value: "1,000+" },
    { label: "Caregivers trained", value: "2,000+" },
    { label: "Founded", value: "2005" },
    { label: "States covered", value: "12+" },
  ];

  const values = [
    {
      title: "Person-centred care",
      desc: "We design care plans around the individual — dignity, choice and comfort guide every decision.",
    },
    {
      title: "Clinically strong",
      desc: "Clinical oversight and trained nurses ensure quality, safety and measurable outcomes.",
    },
    {
      title: "Locally trusted",
      desc: "We recruit and train locally so our teams understand community context and cultural needs.",
    },
  ];

  const team = [
    {
      name: "Dr. Jumoke Odunsi",
      role: "Founder & Clinical Lead",
      image: "/assets/team-1.jpg",
    },
    {
      name: "Aisha Bello",
      role: "Operations Manager",
      image: "/assets/team-2.png",
    },
    { name: "Samuel Ade", role: "Training Lead", image: "/assets/team-3.png" },
  ];

  // Reduced-motion: render static layout without framer wrappers
  if (reduce) {
    return (
      <main className="bg-slate-950 text-white min-h-screen">
        <header className="py-16">
          <div className={container}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl font-bold">About Wellcare Aged Care</h1>
                <p className="mt-4 text-gray-300 max-w-2xl">
                  Founded to bring professional, compassionate in-home care to
                  families. We combine clinical excellence with respect for
                  dignity.
                </p>
              </div>
              <div>
                <img
                  src="/assets/about-hero.jpg"
                  alt="Caregiver assisting client"
                  className="rounded-lg shadow-lg w-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        <section className="py-8 border-t border-slate-800">
          <div className={container}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-bold">{s.value}</div>
                  <div className="text-sm text-gray-400 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className={container}>
            <h2 className="text-2xl font-semibold mb-4">
              Our Mission & Vision
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/60 p-6 rounded-lg">
                <h3 className="font-semibold">Mission</h3>
                <p className="text-gray-300 mt-2">
                  To deliver personalized healthcare at home that restores
                  quality of life and preserves dignity.
                </p>
              </div>
              <div className="bg-slate-900/60 p-6 rounded-lg">
                <h3 className="font-semibold">Vision</h3>
                <p className="text-gray-300 mt-2">
                  To be the undisputed leader in home healthcare — ensuring
                  families can live well.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 border-t border-slate-800">
          <div className={container}>
            <h2 className="text-2xl font-semibold mb-6">What we stand for</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((v) => (
                <div key={v.title} className="bg-slate-900/60 p-6 rounded-lg">
                  <h4 className="font-semibold">{v.title}</h4>
                  <p className="text-gray-300 mt-2">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className={container}>
            <h2 className="text-2xl font-semibold mb-6">Leadership</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {team.map((t) => (
                <div
                  key={t.name}
                  className="bg-slate-900/60 p-4 rounded-lg text-center"
                >
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-28 h-28 rounded-full mx-auto object-cover"
                  />
                  <div className="mt-3 font-semibold">{t.name}</div>
                  <div className="text-sm text-gray-400">{t.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 border-t border-slate-800">
          <div className={container}>
            <h2 className="text-2xl font-semibold mb-4">Need our services?</h2>
            <p className="text-gray-300">
              Schedule an assessment — our team will contact you within one
              business day.
            </p>
            <div className="mt-6">
              <a
                href="#contact"
                className="inline-block px-6 py-3 bg-blue-600 rounded text-white font-semibold"
              >
                Get an assessment
              </a>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // Animated version
  return (
    <main className="bg-slate-950 text-white min-h-screen pt-10">
      <header className="py-16">
        <div className={container}>
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div variants={heroVariants}>
              <h1 className="text-4xl font-bold">About Wellcare Aged Care</h1>
              <p className="mt-4 text-gray-300 max-w-2xl">
                Founded to bring professional, compassionate in-home care to
                families. We combine clinical excellence with respect for
                dignity.
              </p>
              <motion.div variants={fadeUp} className="mt-6">
                <HashLink
                  to="/#contact"
                  className="inline-block px-6 py-3 bg-blue-600 rounded text-white font-semibold"
                >
                  Get an assessment
                </HashLink>
              </motion.div>
            </motion.div>

            <motion.div variants={heroVariants}>
              <img
                src="/assets/about-hero.jpg"
                alt="Caregiver assisting client"
                className="rounded-lg shadow-lg w-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </header>

      <section className="py-8 border-t border-slate-800">
        <div className={container}>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                className="text-center"
              >
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-sm text-gray-400 mt-1">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className={container}>
          <motion.h2
            className="text-2xl font-semibold mb-4"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
          >
            Our Mission & Vision
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            variants={stagger}
            viewport={{ once: true }}
          >
            <motion.div
              variants={fadeUp}
              className="bg-slate-900/60 p-6 rounded-lg"
            >
              <h3 className="font-semibold">Mission</h3>
              <p className="text-gray-300 mt-2">
                To deliver personalized healthcare at home that restores quality
                of life and preserves dignity.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="bg-slate-900/60 p-6 rounded-lg"
            >
              <h3 className="font-semibold">Vision</h3>
              <p className="text-gray-300 mt-2">
                To be the undisputed leader in home healthcare — ensuring
                families can live well.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 border-t border-slate-800">
        <div className={container}>
          <motion.h2
            className="text-2xl font-semibold mb-6"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
          >
            What we stand for
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            variants={stagger}
            viewport={{ once: true }}
          >
            {values.map((v) => (
              <motion.div
                key={v.title}
                variants={fadeUp}
                className="bg-slate-900/60 p-6 rounded-lg hover:shadow-md transition"
              >
                <h4 className="font-semibold">{v.title}</h4>
                <p className="text-gray-300 mt-2">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className={container}>
          <motion.h2
            className="text-2xl font-semibold mb-6"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
          >
            Leadership
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            variants={stagger}
            viewport={{ once: true }}
          >
            {team.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                className="bg-slate-900/60 p-4 rounded-lg text-center hover:scale-[1.02] transition-transform"
              >
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-28 h-28 rounded-full mx-auto object-cover"
                />
                <div className="mt-3 font-semibold">{t.name}</div>
                <div className="text-sm text-gray-400">{t.role}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-12 border-t border-slate-800">
        <div className={container}>
          <motion.h2
            className="text-2xl font-semibold mb-4"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
          >
            Need our services?
          </motion.h2>
          <motion.p
            className="text-gray-300 mb-6"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
          >
            Schedule an assessment — our team will contact you within one
            business day.
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
          >
            <HashLink
              href="/#contact"
              className="inline-block px-6 py-3 bg-blue-600 rounded text-white font-semibold"
            >
              Get an assessment
            </HashLink>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

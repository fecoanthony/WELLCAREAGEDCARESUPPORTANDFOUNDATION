// src/pages/FAQ.jsx
import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * FAQ page - animated, accessible.
 *
 * Usage:
 *  - Add a route: <Route path="/faq" element={<FAQ />} />
 *  - This component expects TailwindCSS to be available.
 */

const container = "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16";

const pageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.36 } },
};

// Simple inline plus/minus SVGs
function IconChevron({ open = false }) {
  return (
    <svg
      className={`w-5 h-5 transform ${
        open ? "rotate-180" : "rotate-0"
      } transition-transform`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path
        d="M6 9l6 6 6-6"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}

function FAQItem({ id, q, a, open, onToggle }) {
  const contentId = `faq-content-${id}`;
  const buttonId = `faq-button-${id}`;

  return (
    <motion.div variants={itemVariants} layout>
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg overflow-hidden">
        <button
          id={buttonId}
          aria-controls={contentId}
          aria-expanded={open}
          onClick={onToggle}
          className="w-full flex items-center justify-between p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        >
          <div className="text-left">
            <div className="text-base font-semibold text-white">{q}</div>
          </div>

          <div className="ml-4 text-slate-300">
            <IconChevron open={open} />
          </div>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key={contentId}
              id={contentId}
              role="region"
              aria-labelledby={buttonId}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28 }}
              className="px-4 pb-4 text-sm text-gray-300"
            >
              <div className="pt-2">
                {/* paragraph content */}
                <div dangerouslySetInnerHTML={{ __html: a }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function FAQ() {
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const searchRef = useRef(null);

  // Example FAQ data: replace with real content
  const FAQQ = useMemo(
    () => [
      {
        id: "q1",
        q: "What services do you offer at home?",
        a: "<p>We provide personal care, nursing visits, dementia support, medication assistance, and respite care. We tailor each care plan to the client's clinical needs and personal preferences.</p>",
      },
      {
        id: "q2",
        q: "How do I arrange an assessment?",
        a: "<p>Use the 'Get an assessment' button or call our office. After you contact us we will schedule a home assessment to understand care needs and recommend a plan.</p>",
      },
      {
        id: "q3",
        q: "Are your caregivers medically trained?",
        a: "<p>Yes — we employ trained carers and registered nurses. Clinical oversight is provided by our senior nursing team and training is continuous.</p>",
      },
      {
        id: "q4",
        q: "How do you handle medication administration?",
        a: "<p>Medication administration is performed by trained staff under nurse supervision. We keep accurate medication records and communicate changes to families and GPs.</p>",
      },
      {
        id: "q5",
        q: "What areas do you cover?",
        a: "<p>We currently provide services across multiple regions. Contact our office to confirm coverage for your postcode.</p>",
      },
      {
        id: "q6",
        q: "How is billing handled?",
        a: "<p>Billing depends on the care package. We provide clear fee schedules before services begin and support private and insured arrangements where applicable.</p>",
      },
    ],
    []
  );

  // Filtered list
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQQ;
    return FAQQ.filter(
      (f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
    );
  }, [query, FAQQ]);

  // reset openIndex if filtered list changes
  useEffect(() => {
    setOpenIndex(null);
  }, [query]);

  // keyboard: close on Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpenIndex(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // If reduced motion, render a non-animated version
  if (reduce) {
    return (
      <main className="bg-slate-950 text-white min-h-screen">
        <div className={container}>
          <h1 className="text-3xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-300 mb-6">
            Find quick answers to the questions people ask most.
          </p>

          <div className="mb-6">
            <label htmlFor="faq-search" className="sr-only">
              Search FAQs
            </label>
            <input
              id="faq-search"
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-3 rounded bg-slate-900 border border-slate-800"
              placeholder="Search FAQs (e.g. 'assessment', 'billing')"
            />
          </div>

          <div className="space-y-3">
            {filtered.length ? (
              filtered.map((f, idx) => (
                <div
                  key={f.id}
                  className="bg-slate-900/60 border border-slate-800 rounded-lg p-4"
                >
                  <div className="font-semibold">{f.q}</div>
                  <div
                    className="mt-2 text-sm text-gray-300"
                    dangerouslySetInnerHTML={{ __html: f.a }}
                  />
                </div>
              ))
            ) : (
              <div className="text-gray-400">No results found.</div>
            )}
          </div>
        </div>
      </main>
    );
  }

  // Animated version
  return (
    <main className="bg-slate-950 text-white min-h-screen pt-10">
      <motion.div
        className={container}
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        <motion.header className="mb-8" variants={pageVariants}>
          <h1 className="text-3xl font-bold mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-300">
            Find quick answers to the questions people ask most.
          </p>
        </motion.header>

        <motion.div
          className="mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={listVariants}
        >
          <label htmlFor="faq-search" className="sr-only">
            Search FAQs
          </label>
          <input
            id="faq-search"
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-3 rounded bg-slate-900 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search FAQs (e.g. 'assessment', 'billing')"
            aria-label="Search frequently asked questions"
          />
        </motion.div>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={listVariants}
          className="space-y-3"
        >
          {filtered.length ? (
            filtered.map((f, idx) => {
              const isOpen = openIndex === idx;
              return (
                <FAQItem
                  key={f.id}
                  id={f.id}
                  q={f.q}
                  a={f.a}
                  open={isOpen}
                  onToggle={() => setOpenIndex(isOpen ? null : idx)}
                />
              );
            })
          ) : (
            <motion.div variants={itemVariants} className="text-gray-400">
              No results found.
            </motion.div>
          )}
        </motion.section>
      </motion.div>
    </main>
  );
}

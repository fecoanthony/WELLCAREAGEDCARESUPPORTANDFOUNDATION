// src/components/BlogSection.jsx
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // safe to import even if you don't use routing

const containerClass = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12";

/* Animation variants */
const columnContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      when: "beforeChildren",
    },
  },
};

const columnVariants = (direction = "left") => ({
  hidden: { x: direction === "left" ? "-30vw" : "30vw", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 18,
      duration: 0.7,
      delay: direction === "right" ? 0.2 : 0,
    },
  },
});

const itemVariant = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

function PostCard({ post }) {
  return (
    <article className="flex flex-col md:flex-row gap-4 bg-slate-900/60 border border-slate-800 rounded-lg p-4 hover:shadow-lg transition">
      {post.image ? (
        <img
          src={post.image}
          alt={post.title}
          className="w-full md:w-36 h-28 object-cover rounded-md shrink-0"
          loading="lazy"
        />
      ) : (
        <div className="w-full md:w-36 h-28 bg-slate-800 rounded-md shrink-0" />
      )}

      <div className="flex-1">
        <h3 className="text-lg font-semibold leading-snug">{post.title}</h3>
        <p className="mt-2 text-sm text-gray-300 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="mt-3 text-xs text-slate-400">{post.date}</div>
      </div>
    </article>
  );
}

/**
 * Export sample posts array so App can import allPosts for routed detail page
 * (This keeps demo wiring simple — you can replace with real data later.)
 */
export const allPosts = [
  {
    id: "l1",
    title: "How to choose the right caregiver",
    excerpt:
      "Choosing a caregiver is deeply personal. Here are 6 practical questions to ask during your first call.",
    date: "Nov 18, 2025",
    image: "/assets/blog-1.png",
    content: `<p>Choosing the right caregiver requires assessing needs, asking about experience, and checking references. Start by writing down the daily tasks the caregiver will perform, the level of medical training required, and any personality fit considerations. When interviewing, ask for specific examples of past clients and situations. Finally, agree on a trial period and put responsibilities in writing.</p>
       <h3>Checklist</h3>
       <ul>
         <li>Daily tasks & schedule</li>
         <li>Medical requirements</li>
         <li>Experience & references</li>
       </ul>
       <p>These steps will reduce risk and improve the match for your loved one.</p>`,
  },
  {
    id: "l2",
    title: "Preparing your home for a nurse visit",
    excerpt:
      "Small changes at home can make nursing visits more effective and safer for everyone.",
    date: "Oct 02, 2025",
    image: "/assets/blog-3.png",
    content: `<p>Preparing for a nurse visit means clearing a working space, gathering medications and recent vitals, and ensuring lighting and access to the patient are unobstructed. Keep a notepad for questions and a list of allergies. Consider where to place supplies and how the nurse will dispose of sharps or bio-waste.</p>`,
  },
  {
    id: "r1",
    title: "Understanding dementia: A caregiver guide",
    excerpt:
      "Dementia care requires patience and structure. Learn simple routines that support memory and dignity.",
    date: "Sep 10, 2025",
    image: "/assets/blog-2.png",
    content: `<p>Dementia is a progressive condition that affects memory, thinking and behaviour. Care routines that emphasize familiarity, simple instructions and reduced sensory overload help patients remain calm and engaged. Use clear labels, maintain consistent mealtimes, and ensure safe walking paths.</p>`,
  },
  {
    id: "r2",
    title: "Top 5 mobility aids for senior safety",
    excerpt:
      "From grab rails to transfer belts — practical aids that reduce falls and increase independence.",
    date: "Aug 22, 2025",
    image: "/assets/blog-4.png",
    content: `<p>Mobility aids should be chosen based on the user's stability, strength and specific activity. Grab rails in bathrooms, non-slip mats, raised toilet seats, transfer belts and rollators provide different support levels. Consult a physiotherapist to match the aid to the patient's needs.</p>`,
  },
];

export default function BlogSection({ postsLeft = [], postsRight = [] }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.12 });
  const navigate = useNavigate();

  const [selectedPost, setSelectedPost] = useState(null);
  const closeButtonRef = useRef(null);

  // Build left/right lists from allPosts if none provided (keeps simple)
  const left = postsLeft.length ? postsLeft : [allPosts[0], allPosts[1]];
  const right = postsRight.length ? postsRight : [allPosts[2], allPosts[3]];

  useEffect(() => {
    if (selectedPost) {
      setTimeout(() => closeButtonRef.current?.focus(), 40);
    }
  }, [selectedPost]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setSelectedPost(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // render static for reduced motion
  if (reduceMotion) {
    return (
      <section id="blog" className="bg-slate-950 text-white">
        <div className={containerClass}>
          <h2 className="text-2xl font-bold mb-6">From our blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {left.map((p) => (
                <div
                  key={p.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedPost(p)}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedPost(p)}
                  className="cursor-pointer"
                >
                  <PostCard post={p} />
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {right.map((p) => (
                <div
                  key={p.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedPost(p)}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedPost(p)}
                  className="cursor-pointer"
                >
                  <PostCard post={p} />
                </div>
              ))}
            </div>
          </div>

          {/* Modal (static) */}
          {selectedPost && (
            <div
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
              aria-modal="true"
              role="dialog"
            >
              <div
                className="absolute inset-0 bg-black/60"
                onClick={() => setSelectedPost(null)}
              />
              <div className="relative bg-slate-900 max-w-3xl w-full p-6 rounded-lg border border-slate-700 z-10 overflow-auto max-h-[80vh]">
                <h2 className="text-xl font-bold mb-4">{selectedPost.title}</h2>
                {selectedPost.image && (
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    className="rounded mb-4 w-full object-cover"
                  />
                )}
                <div
                  className="prose max-w-none text-gray-300 mb-4"
                  dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                />
                <div className="flex justify-between items-center gap-4">
                  <div className="text-xs text-slate-400">
                    Published: {selectedPost.date}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      ref={closeButtonRef}
                      onClick={() => setSelectedPost(null)}
                      className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded"
                    >
                      Close
                    </button>

                    {/* Read full article: navigate if router is present */}
                    <button
                      onClick={() => {
                        setSelectedPost(null);
                        navigate(`/blog/${selectedPost.id}`);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
                    >
                      Read full article
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  // Animated path
  return (
    <section id="blog" className="bg-slate-950 text-white">
      <div ref={ref} className={containerClass}>
        <h2 className="text-2xl font-bold mb-6">From our blog</h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={columnContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="space-y-4" variants={columnVariants("left")}>
            {left.map((p) => (
              <motion.div key={p.id} variants={itemVariant}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedPost(p)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setSelectedPost(p);
                  }}
                  className="cursor-pointer"
                >
                  <PostCard post={p} />
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="space-y-4" variants={columnVariants("right")}>
            {right.map((p) => (
              <motion.div key={p.id} variants={itemVariant}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedPost(p)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setSelectedPost(p);
                  }}
                  className="cursor-pointer"
                >
                  <PostCard post={p} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Modal: fixed overlay so it sits above everything */}
      {selectedPost && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setSelectedPost(null)}
          />

          {/* Modal panel */}
          <motion.div
            initial={{ y: 12, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 8, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="relative bg-slate-900 max-w-3xl w-full p-6 rounded-lg border border-slate-700 z-10 overflow-auto max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">{selectedPost.title}</h2>

            {selectedPost.image && (
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="rounded mb-4 w-full object-cover"
              />
            )}

            {/* Rich content (HTML string from sample content) */}
            <div
              className="prose max-w-none text-gray-300 mb-4"
              dangerouslySetInnerHTML={{ __html: selectedPost.content }}
            />

            <div className="flex justify-between items-center gap-4">
              <div className="text-xs text-slate-400">
                Published: {selectedPost.date}
              </div>

              <div className="flex items-center gap-3">
                <button
                  ref={closeButtonRef}
                  onClick={() => setSelectedPost(null)}
                  className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded"
                >
                  Close
                </button>

                <button
                  onClick={() => {
                    setSelectedPost(null);
                    navigate(`/blog/${selectedPost.id}`);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
                >
                  Read full article
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

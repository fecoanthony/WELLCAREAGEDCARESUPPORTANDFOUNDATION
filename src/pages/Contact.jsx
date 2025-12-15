// src/pages/Contact.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Contact page
 * - Tailwind classes (assumes Tailwind configured)
 * - Posts JSON to /api/leads (adjust endpoint as needed)
 * - Accessible and keyboard-friendly
 */

const container = "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16";

const pageVariant = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Contact() {
  const reduce = useReducedMotion();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    service: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | "loading" | "success" | "error"
  const [serverMessage, setServerMessage] = useState("");
  const firstInvalidRef = useRef(null);

  useEffect(() => {
    // focus first invalid when validation fails
    if (firstInvalidRef.current) {
      firstInvalidRef.current.focus();
    }
  }, [firstInvalidRef.current, errors]);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.phone.trim() && !form.email.trim())
      e.phone = "Provide phone or email";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.service) e.service = "Please select a service";
    if (form.message && form.message.length > 1000)
      e.message = "Message should be under 1000 characters";
    return e;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setServerMessage("");
    const validation = validate();
    setErrors(validation);
    // set first invalid ref for focus
    if (Object.keys(validation).length > 0) {
      // find first key in order
      const order = ["name", "phone", "email", "service", "message"];
      for (const k of order) {
        if (validation[k]) {
          firstInvalidRef.current = document.getElementById(`contact-${k}`);
          break;
        }
      }
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "contact_page" }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Server returned an error");
      }

      setStatus("success");
      setServerMessage(
        "Thanks — we received your enquiry. We will contact you within one business day."
      );
      setForm({
        name: "",
        phone: "",
        email: "",
        location: "",
        service: "",
        message: "",
      });
      setErrors({});
    } catch (err) {
      console.error("contact submit error:", err);
      setStatus("error");
      setServerMessage(
        "Sorry — we could not send your message. Please try again or call us."
      );
    } finally {
      // allow animations to show
      setTimeout(() => {
        if (status !== "loading") setStatus(null);
      }, 3000);
    }
  }

  const root = (
    <div className="bg-slate-950 text-white min-h-screen mt-20">
      <div className={container}>
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Contact us</h1>
          <p className="text-gray-300 mt-2">
            Tell us a little about your needs and we’ll get back to you to
            arrange an assessment.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* left: contact details & hours */}
          <aside className="md:col-span-1">
            <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-6 space-y-4">
              <h2 className="font-semibold text-lg">Contact details</h2>
              <div className="text-sm text-gray-300">
                <div>
                  <strong>Phone:</strong>{" "}
                  <a href="tel:+1234567890" className="text-blue-400">
                    0802-385-2698 
                  </a>
                </div>
                <div>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:info@yourdomain.com"
                    className="text-blue-400"
                  >
                    info@yourdomain.com
                  </a>
                </div>
                <div className="mt-3">
                  <strong>Office:</strong> 90, Marine Road, Apapa GRA, Lagos.
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 text-sm text-gray-300">
                <div className="font-semibold">Office hours</div>
                <div>Mon–Fri: 9:00 – 17:00</div>
                <div>Sat: Closed</div>
                <div>Sun: Closed</div>
              </div>

              <div className="pt-4 border-t border-slate-800 text-sm">
                <div className="font-semibold mb-2">Emergency contact</div>
                <a
                  href="tel:+19998887777"
                  className="inline-block px-3 py-2 bg-rose-600 rounded text-white text-sm"
                >
                  Call emergency line
                </a>
              </div>
            </div>
          </aside>

          {/* right: form */}
          <div className="md:col-span-2">
            <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-6">
              <form onSubmit={onSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-sm text-gray-300">Full name</span>
                    <input
                      id="contact-name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, name: e.target.value }))
                      }
                      className={`mt-1 p-3 rounded bg-slate-800 border ${
                        errors.name ? "border-rose-500" : "border-slate-800"
                      } w-full`}
                      type="text"
                      placeholder="Jane Doe"
                      aria-invalid={!!errors.name}
                      aria-describedby={
                        errors.name ? "contact-name-error" : undefined
                      }
                    />
                    {errors.name && (
                      <div
                        id="contact-name-error"
                        className="text-rose-400 text-sm mt-1"
                      >
                        {errors.name}
                      </div>
                    )}
                  </label>

                  <label className="block">
                    <span className="text-sm text-gray-300">Phone</span>
                    <input
                      id="contact-phone"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, phone: e.target.value }))
                      }
                      className={`mt-1 p-3 rounded bg-slate-800 border ${
                        errors.phone ? "border-rose-500" : "border-slate-800"
                      } w-full`}
                      type="tel"
                      placeholder="+234 801 234 5678"
                      aria-invalid={!!errors.phone}
                      aria-describedby={
                        errors.phone ? "contact-phone-error" : undefined
                      }
                    />
                    {errors.phone && (
                      <div
                        id="contact-phone-error"
                        className="text-rose-400 text-sm mt-1"
                      >
                        {errors.phone}
                      </div>
                    )}
                  </label>

                  <label className="block md:col-span-2">
                    <span className="text-sm text-gray-300">Email</span>
                    <input
                      id="contact-email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, email: e.target.value }))
                      }
                      className={`mt-1 p-3 rounded bg-slate-800 border ${
                        errors.email ? "border-rose-500" : "border-slate-800"
                      } w-full`}
                      type="email"
                      placeholder="name@example.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? "contact-email-error" : undefined
                      }
                    />
                    {errors.email && (
                      <div
                        id="contact-email-error"
                        className="text-rose-400 text-sm mt-1"
                      >
                        {errors.email}
                      </div>
                    )}
                  </label>

                  <label className="block md:col-span-2">
                    <span className="text-sm text-gray-300">
                      Location (city / state)
                    </span>
                    <input
                      id="contact-location"
                      value={form.location}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, location: e.target.value }))
                      }
                      className="mt-1 p-3 rounded bg-slate-800 border border-slate-800 w-full"
                      type="text"
                      placeholder="Lagos, Nigeria"
                    />
                  </label>

                  <label className="block md:col-span-2">
                    <span className="text-sm text-gray-300">
                      Service required
                    </span>
                    <select
                      id="contact-service"
                      value={form.service}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, service: e.target.value }))
                      }
                      className={`mt-1 p-3 rounded bg-slate-800 border ${
                        errors.service ? "border-rose-500" : "border-slate-800"
                      } w-full`}
                      aria-invalid={!!errors.service}
                      aria-describedby={
                        errors.service ? "contact-service-error" : undefined
                      }
                    >
                      <option value="">Select a service</option>
                      <option value="personal">Personal Care</option>
                      <option value="nursing">Nursing Visit</option>
                      <option value="dementia">Dementia Care</option>
                      <option value="respite">Respite Care</option>
                    </select>
                    {errors.service && (
                      <div
                        id="contact-service-error"
                        className="text-rose-400 text-sm mt-1"
                      >
                        {errors.service}
                      </div>
                    )}
                  </label>

                  <label className="block md:col-span-2">
                    <span className="text-sm text-gray-300">
                      Message / notes (optional)
                    </span>
                    <textarea
                      id="contact-message"
                      value={form.message}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, message: e.target.value }))
                      }
                      className="mt-1 p-3 rounded bg-slate-800 border border-slate-800 w-full min-h-[120px]"
                      placeholder="Tell us anything useful about care needs, preferred times, mobility, allergies..."
                      maxLength={1000}
                    />
                    {errors.message && (
                      <div className="text-rose-400 text-sm mt-1">
                        {errors.message}
                      </div>
                    )}
                    <div className="text-xs text-slate-400 mt-1">
                      {form.message.length}/1000
                    </div>
                  </label>
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded font-semibold disabled:opacity-60"
                    aria-live="polite"
                  >
                    {status === "loading" ? (
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          className="opacity-25"
                          fill="none"
                        />
                        <path
                          d="M4 12a8 8 0 018-8"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                          fill="none"
                          className="opacity-75"
                        />
                      </svg>
                    ) : null}
                    {status === "loading" ? "Sending..." : "Request assessment"}
                  </button>

                  <div aria-live="polite" className="sr-only">
                    {status === "success"
                      ? "Submission successful"
                      : status === "error"
                      ? "Submission failed"
                      : ""}
                  </div>

                  {status === "success" && (
                    <div className="text-green-400 text-sm">
                      {serverMessage}
                    </div>
                  )}

                  {status === "error" && (
                    <div className="text-rose-400 text-sm">{serverMessage}</div>
                  )}
                </div>

                <div className="mt-6 text-xs text-slate-400">
                  We respect your privacy — we will only use your contact
                  information to respond to this enquiry.
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // wrap with motion or not depending on reduced motion preference
  if (reduce) {
    return root;
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={pageVariant}>
      {root}
    </motion.div>
  );
}

"use client";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-blue-600 rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Copy */}
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
              Stay in the loop with new arrivals.
            </h2>
            <p className="text-blue-200 text-sm">
              Subscribe to receive updates on new pets, helpful care guides, and exclusive
              offers — straight to your inbox.
            </p>
          </div>

          {/* Form */}
          {submitted ? (
            <div className="text-white font-semibold text-sm bg-blue-500/50 rounded-2xl px-6 py-4 text-center">
              🎉 Thanks! We'll keep you posted.
            </div>
          ) : (
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="flex-1 md:w-64 rounded-xl px-4 py-3 text-sm outline-none border-0 focus:ring-2 focus:ring-white/40"
              />
              <button
                onClick={handleSubmit}
                className="bg-white text-blue-600 font-bold text-sm rounded-xl px-5 py-3 hover:bg-blue-50 active:scale-95 transition-all whitespace-nowrap shadow-lg"
              >
                Subscribe
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
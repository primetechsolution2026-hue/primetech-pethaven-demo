// C:\xampp\htdocs\PrimeTech Solutions\mypets\app\pages\Categories.jsx
"use client";
import { useState } from "react";
import { CATEGORIES, TAB_FILTER } from "../components/Data";
import CategoryPreview from "./../components/CategoryPreview";

const TABS = Object.keys(TAB_FILTER); // ["All pets", "Puppies", "Kittens", "Small pets"]

export default function Categories() {
  const [active, setActive] = useState("All pets");
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Filter which categories to show based on active tab
  const visibleNames = TAB_FILTER[active];
  const visibleCategories = CATEGORIES.filter((c) =>
    visibleNames.includes(c.name)
  );

  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          {/* ── Header row ── */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mb-2">
                Browse by type
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                All kinds of pets<br />under one roof.
              </h2>
              <p className="text-slate-400 text-sm mt-2">
                Quickly jump into the category you love.
              </p>
            </div>

            {/* ── Tab filter pills ── */}
            <div className="flex flex-wrap gap-2">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActive(tab)}
                  className={`text-xs font-semibold rounded-full px-4 py-2 transition-all ${
                    active === tab
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* ── Category grid ── */}
          <div
            key={active}                          // re-mounts on tab change → triggers animation
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4"
          >
            {visibleCategories.map(({ name, count, ProfileImage, bg }, i) => (
              <button
                key={name}
                onClick={() => setSelectedCategory(
                  CATEGORIES.find((c) => c.name === name)
                )}
                className={`
                  ${bg} rounded-2xl p-4 flex flex-col items-center gap-2
                  hover:scale-105 hover:shadow-md active:scale-95
                  transition-all duration-200 group
                  opacity-0 animate-[fadeUp_0.35s_ease_forwards]
                `}
                style={{ animationDelay: `${i * 55}ms` }}
              >
                <div className="w-14 h-14 rounded-full overflow-hidden bg-white shadow-sm flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  <img src={ProfileImage} className="w-full h-full object-cover" width={200} alt="Dogs" />
                </div>
                <span className="text-sm font-bold text-slate-800">{name}</span>
                <span className="text-xs text-slate-400">{count} available</span>

                {/* Subtle "tap to explore" hint */}
                <span className="text-[9px] text-blue-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity -mt-1">
                  Explore →
                </span>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* ── Keyframe for card entrance ── */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>

      {/* ── Preview panel (portal-like overlay) ── */}
      {selectedCategory && (
        <CategoryPreview
          category={selectedCategory}
          onClose={() => setSelectedCategory(null)}
        />
      )}
    </>
  );
}
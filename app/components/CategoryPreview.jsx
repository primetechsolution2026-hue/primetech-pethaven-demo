"use client";
import { useState, useEffect } from "react";
import { ArrowRight, HeartIcon } from "./Icons";

// ─── Close / Back icon ───────────────────────────────────────────────────────
function BackIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

// ─── Individual Pet Card (inside preview) ────────────────────────────────────
function PetCard({ pet, index }) {
  const [liked, setLiked] = useState(pet.liked);

  return (
    <div
      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Image area */}
      <div className={`bg-gradient-to-br from-stone-100 to-amber-50 h-40 flex items-center justify-center text-6xl relative`}>
        {pet.badge && (
          <span className={`absolute top-3 left-3 bg-blue-500 text-white text-[10px] font-bold rounded-full px-2.5 py-1`}>
            {pet.badge}
          </span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        >
          <HeartIcon filled={liked} />
        </button>
        <img src={pet.images} className="w-full h-full object-cover" alt="Dogs" />
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h3 className="font-bold text-slate-800">{pet.name}</h3>
            <p className="text-xs text-slate-400">{pet.breed} · {pet.sex}</p>
          </div>
          <span className="text-blue-600 font-extrabold text-sm">${pet.price.toLocaleString()}</span>
        </div>

        <p className="text-xs text-slate-400 mb-3">{pet.age}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {pet.tags.map((tag) => (
            <span key={tag} className="text-[10px] font-semibold bg-slate-100 text-slate-600 rounded-full px-2.5 py-0.5">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <button className="flex-1 text-xs font-bold text-blue-600 border border-blue-200 rounded-full py-2 hover:bg-blue-50 transition-colors flex items-center justify-center gap-1">
            View details <ArrowRight />
          </button>
          <button className="text-xs font-bold bg-blue-600 text-white rounded-full py-2 px-3 hover:bg-blue-700 transition-colors whitespace-nowrap">
            Adopt
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main CategoryPreview component ──────────────────────────────────────────
export default function CategoryPreview({ category, onClose }) {
  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  if (!category) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Slide-in panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-full md:w-[680px] lg:w-[780px] bg-white shadow-2xl flex flex-col
        animate-[slideIn_0.3s_cubic-bezier(0.16,1,0.3,1)]">

        <style>{`
          @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to   { transform: translateX(0);    opacity: 1; }
          }
          @keyframes fadeUp {
            from { transform: translateY(16px); opacity: 0; }
            to   { transform: translateY(0);    opacity: 1; }
          }
          .fade-up { animation: fadeUp 0.4s ease both; }
        `}</style>

        {/* ── Hero banner ── */}
        <div className={`bg-gradient-to-br ${category.accent} px-8 pt-8 pb-10 relative shrink-0`}>
          {/* Back button */}
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-white/80 hover:text-white font-semibold text-sm mb-6 transition-colors group"
          >
            <BackIcon />
            Back to categories
          </button>

          {/* Close ✕ */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-9 h-9 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <CloseIcon />
          </button>

          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-white/30 overflow-hidden backdrop-blur rounded-2xl flex items-center justify-center text-5xl shadow-lg">
              <img src={category.ProfileImage} className="w-full h-full object-cover" alt="Dogs" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-white">{category.name}</h2>
              <p className="text-white/80 text-sm mt-1">{category.description}</p>
              <div className="flex items-center gap-3 mt-3">
                <span className="bg-white/20 text-white text-xs font-semibold rounded-full px-3 py-1">
                  {category.count} available
                </span>
                <span className="bg-white/20 text-white text-xs font-semibold rounded-full px-3 py-1">
                  ✓ Vet certified
                </span>
                <span className="bg-white/20 text-white text-xs font-semibold rounded-full px-3 py-1">
                  ✓ Vaccinated
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Pets grid ── */}
        <div className="flex-1 overflow-y-auto px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-extrabold text-slate-800 text-lg">
              Available {category.name}
              <span className="ml-2 text-sm font-medium text-slate-400">({category.pets.length} shown)</span>
            </h3>
            <button className="text-xs font-semibold border border-slate-200 rounded-lg px-3 py-1.5 hover:border-blue-400 transition-colors text-slate-500">
              Filter &amp; sort
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {category.pets.map((pet, i) => (
              <div key={`${pet.breed}-${pet.name}-${i}`} className="fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                <PetCard pet={pet} index={i} />
              </div>
            ))}
          </div>

          {/* Load more hint */}
          <div className="mt-8 flex justify-center">
            <button className="border-2 border-slate-200 hover:border-blue-400 text-slate-600 hover:text-blue-600 font-semibold text-sm rounded-full px-8 py-3 transition-all flex items-center gap-2">
              View all {category.count} {category.name.toLowerCase()} <ArrowRight />
            </button>
          </div>
        </div>

      </div>
    </>
  );
}
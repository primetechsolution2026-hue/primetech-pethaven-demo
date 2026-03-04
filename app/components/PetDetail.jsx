// C:\xampp\htdocs\PrimeTech Solutions\mypets\app\components\PetDetail.jsx
"use client";
import { useState, useEffect } from "react";
import { HeartIcon } from "./Icons";

// ── Helper ────────────────────────────────────────────────────────────────────
function optimizeImg(url, width = 400) {
  if (!url) return url;
  if (url.includes("pexels.com")) {
    return `${url}?auto=compress&cs=tinysrgb&w=${width}&fit=crop`;
  }
  return url;
}

function BackIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  );
}

function CheckCircle() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
      className="text-emerald-500 shrink-0">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function StarIcon({ filled }) {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24"
      fill={filled ? "#F59E0B" : "none"} stroke="#F59E0B" strokeWidth={1.5}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

const HEALTH_ITEMS = [
  "Up-to-date vaccinations",
  "Vet health certificate",
  "Deworming completed",
  "Microchipped & registered",
];

const CARE_TIPS = {
  Dogs:     ["Daily walks & exercise", "Regular grooming every 6–8 weeks", "Balanced diet & fresh water", "Annual vet checkups"],
  Cats:     ["Indoor environment recommended", "Litter box cleaned daily", "Scratch post & enrichment toys", "Annual dental check"],
  Birds:    ["Spacious cage with perches", "Fresh fruit & pellets daily", "Social interaction daily", "Avoid drafts & fumes"],
  Rabbit:   ["Hay-based diet (80%)", "Daily free-roam time", "Weekly cage cleaning", "Spay/neuter recommended"],
  Fishes:   ["Filtered tank with heater", "Partial water change weekly", "Species-appropriate diet", "Monitor water pH & temp"],
  Reptiles: ["UVB lighting required", "Temperature gradient in tank", "Live or frozen prey diet", "Humidity & shedding care"],
};

export default function PetDetail({ pet, categoryName, categoryAccent, onBack, onAdopt }) {
  const [liked, setLiked]         = useState(pet.liked);
  const [activeImg, setActiveImg] = useState(0);
  const tips = CARE_TIPS[categoryName] || CARE_TIPS["Dogs"];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Single real image shown three times — at different sizes for the dots UX
  // In production, swap these for actual alternate image URLs from pet data
  const gallery = [
    optimizeImg(pet.images, 780),
    optimizeImg(pet.images, 780),
    optimizeImg(pet.images, 780),
  ];

  return (
    <>
      {/* Animation defined in globals.css as .anim-slide-in-detail */}
      <div className="anim-slide-in-detail fixed inset-y-0 right-0 z-[60] w-full md:w-[680px] lg:w-[780px] bg-white shadow-2xl flex flex-col overflow-hidden">

        {/* Gradient header */}
        <div className={`bg-gradient-to-br ${categoryAccent} px-6 pt-6 pb-5 shrink-0 relative`}>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/80 hover:text-white font-semibold text-sm transition-colors"
          >
            <BackIcon /> Back to list
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">

          {/* Hero image */}
          <div className="relative w-full h-72 bg-slate-100">
            <img
              src={gallery[activeImg]}
              alt={pet.name}
              loading="lazy"
              decoding="async"
              width={780}
              height={288}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setLiked(!liked)}
              className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
              aria-label={liked ? "Unlike" : "Like"}
            >
              <HeartIcon filled={liked} />
            </button>
            {pet.badge && (
              <span className={`absolute top-4 left-4 ${pet.badgeColor || "bg-blue-500"} text-white text-[11px] font-bold rounded-full px-3 py-1`}>
                {pet.badge}
              </span>
            )}
            {/* Dot navigation */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
              {gallery.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  aria-label={`Image ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${activeImg === i ? "bg-white w-5" : "bg-white/50 w-2"}`}
                />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="px-6 py-6">

            <div className="flex items-start justify-between mb-1">
              <h1 className="text-2xl font-extrabold text-slate-900 leading-tight">{pet.name}</h1>
              <div className="text-right ml-4 shrink-0">
                <div className="text-2xl font-extrabold text-blue-600">${pet.price.toLocaleString()}</div>
                <div className="text-[10px] text-slate-400">Adoption fee</div>
              </div>
            </div>

            <p className="text-slate-500 text-sm mb-2">{pet.breed} · {categoryName}</p>
            <div className="flex items-center gap-1 mb-4">
              {[1,2,3,4,5].map(s => <StarIcon key={s} filled={s <= 4} />)}
              <span className="text-xs text-slate-400 ml-1">4.0 · 12 reviews</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {pet.tags.map((tag, ti) => (
                <span key={`${tag}-${ti}`} className="text-xs font-semibold bg-blue-50 text-blue-600 rounded-full px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {[["🎂","Age",pet.age],["⚧","Sex",pet.sex],["🏷️","Breed",pet.breed]].map(([icon, label, val]) => (
                <div key={label} className="bg-slate-50 rounded-2xl p-3 text-center">
                  <div className="text-xl mb-1">{icon}</div>
                  <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">{label}</div>
                  <div className="text-sm font-bold text-slate-700 mt-0.5 truncate">{val}</div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 my-5" />

            <h3 className="font-extrabold text-slate-800 text-base mb-3">Health &amp; Documentation</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
              {HEALTH_ITEMS.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle /> {item}
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 my-5" />

            <h3 className="font-extrabold text-slate-800 text-base mb-3">Care Guide</h3>
            <div className="space-y-2 mb-6">
              {tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-3 bg-slate-50 rounded-xl px-4 py-3">
                  <span className="text-blue-500 font-extrabold text-sm mt-0.5 shrink-0">{i + 1}</span>
                  <span className="text-sm text-slate-600">{tip}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 my-5" />

            <h3 className="font-extrabold text-slate-800 text-base mb-2">About {pet.name}</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-8">
              {pet.name} is a beautiful {pet.age}-old {pet.breed} looking for a loving forever home.
              {pet.sex === "Male" ? " He" : " She"} is {pet.tags.join(", ").toLowerCase()} and has been
              raised in a caring environment.{" "}
              {pet.sex === "Male" ? " He" : " She"} loves attention and will thrive with a family that gives{" "}
              {pet.sex === "Male" ? "him" : "her"} the love and care {pet.sex === "Male" ? "he" : "she"} deserves.
            </p>
          </div>
        </div>

        {/* Sticky bottom CTA */}
        <div className="shrink-0 border-t border-slate-100 bg-white px-6 py-4 flex gap-3">
          <button
            onClick={() => setLiked(!liked)}
            className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all shrink-0 ${
              liked ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-slate-300"
            }`}
            aria-label={liked ? "Unlike" : "Like"}
          >
            <HeartIcon filled={liked} />
          </button>

          <button
            onClick={() => onAdopt && onAdopt(pet)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold rounded-2xl py-3 transition-all shadow-lg shadow-blue-200 text-sm"
          >
            Adopt {pet.name} · ${pet.price.toLocaleString()}
          </button>
        </div>

      </div>
    </>
  );
}
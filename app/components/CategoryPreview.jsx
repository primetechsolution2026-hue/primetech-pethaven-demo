// C:\xampp\htdocs\PrimeTech Solutions\mypets\app\components\CategoryPreview.jsx
"use client";
import { useState, useEffect, memo } from "react";
import { HeartIcon } from "./Icons";
import PetDetail from "./PetDetail";
import Checkout from "./Checkout";

// ── Helpers ───────────────────────────────────────────────────────────────────
/** Append Pexels compression params so we never download a 4 K image */
function optimizeImg(url, width = 400) {
  if (!url) return url;
  if (url.includes("pexels.com")) {
    return `${url}?auto=compress&cs=tinysrgb&w=${width}&fit=crop`;
  }
  return url;
}

// ── Icons ────────────────────────────────────────────────────────────────────
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
function ArrowRight() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

// ── Pet Card — memoised so it never re-renders when siblings change ────────────
const PetCard = memo(function PetCard({ pet, onViewDetails, onAdopt }) {
  const [liked, setLiked] = useState(pet.liked);

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">

      {/* Image */}
      <div className="relative h-44 bg-slate-100 overflow-hidden">
        <img
          src={optimizeImg(pet.images, 400)}
          alt={pet.name}
          loading="lazy"
          decoding="async"
          width={400}
          height={176}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badge */}
        {pet.badge && (
          <span className={`absolute top-3 left-3 ${pet.badgeColor || "bg-blue-500"} text-white text-[10px] font-bold rounded-full px-2.5 py-1`}>
            {pet.badge}
          </span>
        )}
        {/* Like */}
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
          aria-label={liked ? "Unlike" : "Like"}
        >
          <HeartIcon filled={liked} />
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h3 className="font-bold text-slate-800 truncate max-w-[120px]">{pet.name}</h3>
            <p className="text-xs text-slate-400">{pet.breed} · {pet.sex}</p>
          </div>
          <span className="text-blue-600 font-extrabold text-sm whitespace-nowrap">${pet.price.toLocaleString()}</span>
        </div>

        <p className="text-xs text-slate-400 mb-3">{pet.age}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {pet.tags.map((tag, ti) => (
            <span key={`${tag}-${ti}`} className="text-[10px] font-semibold bg-slate-100 text-slate-600 rounded-full px-2.5 py-0.5">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onViewDetails(pet)}
            className="flex-1 text-xs font-bold text-blue-600 border border-blue-200 rounded-full py-2 hover:bg-blue-50 transition-colors flex items-center justify-center gap-1"
          >
            View details <ArrowRight />
          </button>
          <button
            onClick={() => onAdopt(pet)}
            className="text-xs font-bold bg-blue-600 text-white rounded-full py-2 px-3 hover:bg-blue-700 active:scale-95 transition-all whitespace-nowrap"
          >
            Adopt
          </button>
        </div>
      </div>
    </div>
  );
});

// ── Main CategoryPreview ──────────────────────────────────────────────────────
export default function CategoryPreview({ category, onClose }) {
  const [selectedPet, setSelectedPet] = useState(null);
  const [checkoutPet, setCheckoutPet] = useState(null);

  // Lock scroll when panel is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  if (!category) return null;

  return (
    <>
      {/* Backdrop — no backdrop-blur to avoid GPU cost */}
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
      />

      {/* Slide-in panel — animation defined in globals.css */}
      <div className="anim-slide-in fixed inset-y-0 right-0 z-50 w-full md:w-[680px] lg:w-[780px] bg-white shadow-2xl flex flex-col">

        {/* ── Header banner ── */}
        <div className={`bg-gradient-to-br ${category.accent} px-8 pt-8 pb-10 relative shrink-0`}>
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-white/80 hover:text-white font-semibold text-sm mb-6 transition-colors"
          >
            <BackIcon /> Back to categories
          </button>

          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-9 h-9 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <CloseIcon />
          </button>

          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg ring-4 ring-white/30 shrink-0">
              <img
                src={optimizeImg(category.ProfileImage, 160)}
                alt={category.name}
                loading="eager"
                decoding="async"
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-white">{category.name}</h2>
              <p className="text-white/80 text-sm mt-1">{category.description}</p>
              <div className="flex flex-wrap items-center gap-2 mt-3">
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

        {/* ── Pet grid ── */}
        <div className="flex-1 overflow-y-auto px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-extrabold text-slate-800 text-lg">
              Available {category.name}
              <span className="ml-2 text-sm font-medium text-slate-400">
                ({category.pets.length} shown)
              </span>
            </h3>
            <button className="text-xs font-semibold border border-slate-200 rounded-lg px-3 py-1.5 hover:border-blue-400 transition-colors text-slate-500">
              Filter &amp; sort
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {category.pets.map((pet, i) => (
              <div
                key={`${pet.breed}-${pet.name}-${i}`}
                className="anim-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <PetCard
                  pet={pet}
                  onViewDetails={p => setSelectedPet(p)}
                  onAdopt={p => setCheckoutPet(p)}
                />
              </div>
            ))}
          </div>

          {/* View all */}
          <div className="mt-8 flex justify-center">
            <button className="border-2 border-slate-200 hover:border-blue-400 text-slate-600 hover:text-blue-600 font-semibold text-sm rounded-full px-8 py-3 transition-all flex items-center gap-2">
              View all {category.count} {category.name.toLowerCase()} <ArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* PetDetail slides in on top */}
      {selectedPet && (
        <PetDetail
          pet={selectedPet}
          categoryName={category.name}
          categoryAccent={category.accent}
          onBack={() => setSelectedPet(null)}
          onAdopt={p => { setSelectedPet(null); setCheckoutPet(p); }}
        />
      )}

      {checkoutPet && (
        <Checkout pet={checkoutPet} onClose={() => setCheckoutPet(null)} />
      )}
    </>
  );
}
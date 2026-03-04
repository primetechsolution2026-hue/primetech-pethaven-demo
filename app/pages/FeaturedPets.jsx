// C:\xampp\htdocs\PrimeTech Solutions\mypets\app\pages\FeaturedPets.jsx
"use client";
import { useState, useMemo } from "react";
import { PETS, CATEGORIES } from "../components/Data";
import { HeartIcon, ArrowRight, MapPinIcon } from "../components/Icons";
import PetDetail from "../components/PetDetail";
import Checkout from "../components/Checkout";

// ── Helper ────────────────────────────────────────────────────────────────────
function optimizeImg(url, width = 400) {
  if (!url) return url;
  if (url.includes("pexels.com")) {
    return `${url}?auto=compress&cs=tinysrgb&w=${width}&fit=crop`;
  }
  return url;
}

const FEATURED = PETS.slice(0, 4);

// Build a lookup map once at module level — O(1) per pet instead of O(n²)
const petCategoryMap = new Map();
CATEGORIES.forEach((cat) => {
  cat.pets.forEach((p) => {
    petCategoryMap.set(`${p.name}__${p.breed}`, cat);
  });
});

function getCategoryForPet(pet) {
  return petCategoryMap.get(`${pet.name}__${pet.breed}`) ?? CATEGORIES[0];
}

export default function FeaturedPets() {
  const [liked, setLiked]             = useState(FEATURED.map((p) => p.liked));
  const [detailPet, setDetailPet]     = useState(null);
  const [checkoutPet, setCheckoutPet] = useState(null);

  const toggleLike = (i) =>
    setLiked((prev) => prev.map((v, j) => (j === i ? !v : v)));

  // useMemo so we don't recompute on every keystroke / state change
  const detailCat = useMemo(
    () => (detailPet ? getCategoryForPet(detailPet) : null),
    [detailPet]
  );

  return (
    <>
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs text-blue-500 font-bold uppercase tracking-widest mb-2">Featured Friends</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Pets ready to go home now.</h2>
              <p className="text-slate-400 text-sm mt-2">Handpicked, fully vaccinated, and health-checked pets ready for your family.</p>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1"><MapPinIcon /> Near you · 5 km</span>
              <button className="border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold hover:border-blue-400 transition-colors">
                Filter &amp; sort
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURED.map((pet, i) => (
              <div
                key={`${pet.breed}-${pet.name}-${i}`}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                {/* Photo */}
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <img
                    src={optimizeImg(pet.images, 400)}
                    alt={pet.name}
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={192}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {pet.badge && (
                    <span className={`absolute top-3 left-3 ${pet.badgeColor || "bg-emerald-500"} text-white text-[10px] font-bold rounded-full px-2.5 py-1`}>
                      {pet.badge}
                    </span>
                  )}
                  <button
                    onClick={() => toggleLike(i)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                    aria-label={liked[i] ? "Unlike" : "Like"}
                  >
                    <HeartIcon filled={liked[i]} />
                  </button>
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <div className="min-w-0">
                      <h3 className="font-bold text-slate-800 truncate">{pet.name}</h3>
                      <p className="text-xs text-slate-400">{pet.breed} · {pet.sex}</p>
                    </div>
                    <span className="text-blue-600 font-extrabold text-sm whitespace-nowrap ml-2">
                      ${pet.price.toLocaleString()}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mb-3">{pet.age}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {pet.tags.map((tag, ti) => (
                      <span
                        key={`${tag}-${ti}`}
                        className="text-[10px] font-semibold bg-slate-100 text-slate-600 rounded-full px-2.5 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setDetailPet(pet)}
                      className="flex-1 text-xs font-bold text-blue-600 border border-blue-200 rounded-full py-2 hover:bg-blue-50 transition-colors flex items-center justify-center gap-1"
                    >
                      View details <ArrowRight />
                    </button>
                    <button
                      onClick={() => setCheckoutPet(pet)}
                      className="text-xs font-bold bg-blue-600 text-white rounded-full py-2 px-3 hover:bg-blue-700 active:scale-95 transition-all whitespace-nowrap"
                    >
                      Adopt
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View all */}
          <div className="flex justify-center mt-10">
            <button className="border-2 border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-600 font-semibold text-sm rounded-full px-8 py-3 transition-all flex items-center gap-2">
              View all 120+ pets <ArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* PetDetail slide-in overlay */}
      {detailPet && detailCat && (
        <>
          {/* No backdrop-blur — solid overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setDetailPet(null)}
          />
          <PetDetail
            pet={detailPet}
            categoryName={detailCat.name}
            categoryAccent={detailCat.accent}
            onBack={() => setDetailPet(null)}
            onAdopt={(p) => { setDetailPet(null); setCheckoutPet(p); }}
          />
        </>
      )}

      {/* Checkout slide-in overlay */}
      {checkoutPet && (
        <Checkout
          pet={checkoutPet}
          onClose={() => setCheckoutPet(null)}
        />
      )}
    </>
  );
}
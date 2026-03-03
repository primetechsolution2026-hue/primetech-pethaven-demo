"use client";
import { useState } from "react";
import { PETS } from "../components/Data";
import { HeartIcon, ArrowRight, MapPinIcon } from "./../components/Icons";

export default function FeaturedPets() {
  const [liked, setLiked] = useState(PETS.map((p) => p.liked));

  const toggleLike = (index) => {
    setLiked((prev) => prev.map((val, i) => (i === index ? !val : val)));
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs text-blue-500 font-bold uppercase tracking-widest mb-2">
              Featured Friends
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              Pets ready to go home now.
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Handpicked, fully vaccinated, and health-checked pets ready for your family.
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <MapPinIcon /> Near you · 5 km
            </span>
            <button className="border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold hover:border-blue-400 transition-colors">
              Filter &amp; sort
            </button>
          </div>
        </div>

        {/* Pet cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PETS.map((pet, i) => (
            <div
              key={pet.name}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              {/* Image area */}
              <div className={`bg-gradient-to-br ${pet.bg} h-44 flex items-center justify-center text-7xl relative`}>
                {pet.badge && (
                  <span className={`absolute top-3 left-3 ${pet.badgeColor} text-white text-[10px] font-bold rounded-full px-2.5 py-1`}>
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
                 <img src={pet.images} className="w-full h-full object-cover" alt="Dogs" />
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className="font-bold text-slate-800">{pet.name}</h3>
                    <p className="text-xs text-slate-400">{pet.breed} · {pet.sex}</p>
                  </div>
                  <span className="text-blue-600 font-extrabold text-sm">
                    ${pet.price.toLocaleString()}
                  </span>
                </div>

                <p className="text-xs text-slate-400 mb-3">{pet.age}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {pet.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold bg-slate-100 text-slate-600 rounded-full px-2.5 py-0.5"
                    >
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
          ))}
        </div>

        {/* View all CTA */}
        <div className="flex justify-center mt-10">
          <button className="border-2 border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-600 font-semibold text-sm rounded-full px-8 py-3 transition-all flex items-center gap-2">
            View all 120+ pets <ArrowRight />
          </button>
        </div>

      </div>
    </section>
  );
}
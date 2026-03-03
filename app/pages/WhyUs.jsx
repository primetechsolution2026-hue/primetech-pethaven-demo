import { WHY_FEATURES } from "../components/Data";
import { CheckIcon, ArrowRight } from "./../components/Icons";

const IMAGE_COLLAGE = [
  { emoji: "🏡", bg: "from-amber-100 to-orange-50", label: "Happy homes", offset: "" },
  { emoji: "🐕‍🦺", bg: "from-blue-100 to-sky-50", label: "Trained pets", offset: "mt-6" },
  { emoji: "👨‍👩‍👧‍👦", bg: "from-emerald-100 to-teal-50", label: "Loving families", offset: "" },
  { emoji: "🩺", bg: "from-violet-100 to-purple-50", label: "Vet approved", offset: "-mt-6" },
];

export default function WhyUs() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* Image collage */}
        <div className="grid grid-cols-2 gap-3">
          {IMAGE_COLLAGE.map(({ emoji, bg, label, offset }) => (
            <div
              key={label}
              className={`bg-gradient-to-br ${bg} rounded-2xl ${offset} h-36 flex flex-col items-center justify-center gap-2 text-4xl shadow-sm`}
            >
              {emoji}
              <span className="text-xs font-semibold text-slate-600">{label}</span>
            </div>
          ))}
        </div>

        {/* Content */}
        <div>
          <p className="text-xs text-blue-500 font-bold uppercase tracking-widest mb-3">
            Why families choose PetHaven
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            We care for every paw, fin, and feather.
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            For over a decade, we've matched loving families with healthy, well-socialised
            pets. Every adoption includes full medical records, expert guidance, and
            lifetime support.
          </p>

          {/* Trust pills */}
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <CheckIcon /> 100k+ happy adoptions
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <CheckIcon /> Certified breeders &amp; rescues
            </div>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {WHY_FEATURES.map(({ icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-xl mb-2">{icon}</div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">{title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-full px-6 py-3 transition-colors">
              Learn about our process
            </button>
            <button className="text-slate-700 font-semibold text-sm hover:text-blue-600 transition-colors flex items-center gap-1 px-4 py-3">
              Meet our vets <ArrowRight />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
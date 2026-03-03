import { SERVICES } from "../components/Data";
import { ArrowRight } from "./../components/Icons";

export default function Services() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs text-blue-500 font-bold uppercase tracking-widest mb-3">
            More than a pet shop
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
            Everything your new friend needs.
          </h2>
          <p className="text-slate-400 text-sm">
            From grooming and vet visits to training, we take care of every step after adoption.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map(({ icon, title, desc, cta, meta }) => (
            <div
              key={title}
              className="border border-slate-100 rounded-3xl p-7 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                {icon}
              </div>

              <h3 className="font-extrabold text-slate-800 text-lg mb-2">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{desc}</p>

              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">✓ {meta}</span>
                <button className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:gap-2 transition-all">
                  {cta} <ArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
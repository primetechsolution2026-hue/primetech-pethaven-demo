import { StarIcon, ArrowRight } from "./../components/Icons";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-white pt-16 pb-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* Left — copy */}
        <div>
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full px-3 py-1 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse inline-block" />
            All pets in one place · Vet-Certified &amp; Healthy
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-5">
            Find your perfect<br />companion today.
          </h1>

          <p className="text-slate-500 text-base leading-relaxed mb-8 max-w-md">
            Browse healthy, happy pets from trusted breeders and rescues. From playful
            puppies to exotic reptiles, PetHaven helps you find the right match for
            your lifestyle.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <button className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white font-semibold text-sm rounded-full px-6 py-3 shadow-md shadow-blue-200">
              Browse all pets
            </button>
            <button className="flex items-center gap-2 text-slate-700 font-semibold text-sm hover:text-blue-600 transition-colors px-4 py-3">
              Visit our store
              <span className="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center text-xs">
                →
              </span>
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-8">
            {[
              ["5,400+", "Pets assisted"],
              ["120+ pets", "Available today"],
              ["4.9 / 5", "Customer rating"],
            ].map(([val, label]) => (
              <div key={label}>
                <div className="text-xl font-extrabold text-slate-800">{val}</div>
                <div className="text-xs text-slate-400 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — visual card */}
        <div className="relative flex justify-center">
          <div className="relative w-full">
            {/* Main image placeholder */}
            <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-blue-100 to-amber-100 aspect-[4/3] flex items-end justify-center text-8xl shadow-xl shadow-blue-100">
              <img src="https://images.pexels.com/photos/4422098/pexels-photo-4422098.jpeg" className="w-full h-full object-cover" alt="" />
            </div>

            {/* Featured pet badge */}
            <div className="absolute bottom-4 left-4 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center text-base">🐕</div>
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-base">🐈</div>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">Buddy &amp; Luna</div>
                <div className="text-[10px] text-slate-400">
                  Puppy · 2 months &nbsp; Kitten · 3 months
                </div>
              </div>
              <span className="text-[10px] bg-blue-50 text-blue-600 font-semibold rounded-full px-2 py-0.5 ml-1">
                Featured ✦
              </span>
            </div>

            {/* Trust badge */}
            <div className="absolute top-4 right-4 bg-white rounded-2xl shadow-lg px-3 py-2 text-center">
              <div className="flex justify-center gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
              </div>
              <div className="text-[10px] font-semibold text-slate-700">Trusted by pet lovers</div>
              <div className="text-[9px] text-slate-400">10k+ families found their best friend</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
// C:\xampp\htdocs\PrimeTech Solutions\mypets\app\page.jsx  (or layout root)
import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import Categories from "./pages/Categories";
import FeaturedPets from "./pages/FeaturedPets";
import Services from "./pages/Services";
import WhyUs from "./pages/WhyUs";
import Newsletter from "./pages/Newsletter";
import Footer from "./components/Footer";

export default function PetHavenPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`}</style>

      <Navbar />

      <main>
        {/*
          Each wrapper div carries the ID that Navbar's NAV_TARGETS map points to.
          scroll-mt-16 offsets the scroll position by the navbar height (h-16 = 64px)
          so the section heading is never hidden behind the sticky nav.
        */}
        <div id="section-hero">
          <Hero />
        </div>

        <div id="section-categories" className="scroll-mt-16">
          <Categories />
        </div>

        <div id="section-featured" className="scroll-mt-16">
          <FeaturedPets />
        </div>

        <div id="section-services" className="scroll-mt-16">
          <Services />
        </div>

        <div id="section-why" className="scroll-mt-16">
          <WhyUs />
        </div>

        <div id="section-newsletter" className="scroll-mt-16">
          <Newsletter />
        </div>
      </main>

      <Footer />
    </div>
  );
}
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
        <Hero />
        <Categories />
        <FeaturedPets />
        <Services />
        <WhyUs />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
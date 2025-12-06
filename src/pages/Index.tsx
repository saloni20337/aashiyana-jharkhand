import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DestinationsShowcase from "@/components/DestinationsShowcase";
import FeaturesGrid from "@/components/FeaturesGrid";
import CulturalHighlight from "@/components/CulturalHighlight";
import Footer from "@/components/Footer";
import AIRecommendations from "@/components/AIRecommendations";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section id="home">
        <Hero />
      </section>
      <section id="destinations">
        <DestinationsShowcase />
      </section>
      <section id="features">
        <FeaturesGrid />
      </section>
      <section id="culture">
        <CulturalHighlight />
      </section>
      <Footer />
      <AIRecommendations />
    </div>
  );
};

export default Index;

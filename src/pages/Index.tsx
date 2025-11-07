import Hero from "@/components/Hero";
import DestinationsShowcase from "@/components/DestinationsShowcase";
import FeaturesGrid from "@/components/FeaturesGrid";
import CulturalHighlight from "@/components/CulturalHighlight";
import Footer from "@/components/Footer";
import AIRecommendations from "@/components/AIRecommendations";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <DestinationsShowcase />
      <FeaturesGrid />
      <CulturalHighlight />
      <Footer />
      <AIRecommendations />
    </div>
  );
};

export default Index;

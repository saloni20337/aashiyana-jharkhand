import Navbar from "@/components/Navbar";
import LanguageHelp from "@/components/LanguageHelp";
import Footer from "@/components/Footer";

const Language = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <LanguageHelp />
      </div>
      <Footer />
    </div>
  );
};

export default Language;

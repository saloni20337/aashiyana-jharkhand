import { Button } from "@/components/ui/button";
import { MapPin, Sparkles, MessageCircle, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-jharkhand.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-background/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-2 mb-4">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-foreground">AI-Powered Tourism Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Discover the Magic of
            <span className="block mt-2 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              Jharkhand
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Explore pristine waterfalls, ancient temples, wildlife sanctuaries, and rich tribal heritage with personalized AI guidance
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-8 py-6"
            >
              <MapPin className="mr-2 h-5 w-5" />
              Explore Destinations
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:text-white text-lg px-8 py-6"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              AI Travel Assistant
            </Button>
            <Link to="/auth">
              <Button 
                size="lg" 
                variant="outline"
                className="bg-secondary/10 backdrop-blur-sm border-secondary/30 text-white hover:bg-secondary/20 hover:text-white text-lg px-8 py-6"
              >
                <Calendar className="mr-2 h-5 w-5" />
                My Calendar
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 max-w-3xl mx-auto">
            {[
              { value: "50+", label: "Destinations" },
              { value: "1000+", label: "Local Guides" },
              { value: "5000+", label: "Happy Travelers" },
              { value: "24/7", label: "AI Support" },
            ].map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-3xl md:text-4xl font-bold text-secondary">{stat.value}</div>
                <div className="text-sm text-white/80 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

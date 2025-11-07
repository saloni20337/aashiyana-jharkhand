import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const footerLinks = {
    destinations: ["Netarhat", "Betla National Park", "Deoghar", "Hundru Falls", "Patratu Valley"],
    features: ["AI Assistant", "Itinerary Planner", "Local Marketplace", "Interactive Maps", "Travel Guides"],
    company: ["About Us", "Contact", "Careers", "Press", "Partners"],
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Jharkhand Tourism</h3>
            <p className="text-primary-foreground/80 text-sm">
              Discover the natural beauty and rich cultural heritage of Jharkhand with AI-powered guidance.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Mail].map((Icon, index) => (
                <Button
                  key={index}
                  size="icon"
                  variant="ghost"
                  className="hover:bg-primary-foreground/10 text-primary-foreground"
                >
                  <Icon className="w-5 h-5" />
                </Button>
              ))}
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Popular Destinations</h4>
            <ul className="space-y-2">
              {footerLinks.destinations.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Features</h4>
            <ul className="space-y-2">
              {footerLinks.features.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © 2025 Jharkhand Tourism Platform. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

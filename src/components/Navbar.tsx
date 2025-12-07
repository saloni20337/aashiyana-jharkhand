import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Calendar, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import FeedbackDialog from "./FeedbackDialog";
import JharkhandIcon from "./icons/JharkhandIcon";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Destinations", href: "#destinations" },
  { name: "Features", href: "#features" },
  { name: "Culture", href: "#culture" },
  { name: "Language", href: "#language" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <JharkhandIcon
              className={`w-7 h-8 md:w-8 md:h-9 transition-colors ${
                isScrolled ? "text-primary" : "text-white"
              }`}
            />
            <span
              className={`text-xl md:text-2xl font-bold transition-colors ${
                isScrolled ? "text-primary" : "text-white"
              }`}
            >
              जोहार झारखण्ड
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isScrolled ? "text-foreground" : "text-white"
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <FeedbackDialog variant={isScrolled ? "outline" : "ghost"} className={isScrolled ? "" : "text-white border-white/30 hover:bg-white/10"} />
            {user ? (
              <Button
                onClick={() => navigate("/calendar")}
                variant={isScrolled ? "default" : "secondary"}
                className="gap-2"
              >
                <Calendar className="w-4 h-4" />
                My Calendar
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/auth")}
                variant={isScrolled ? "default" : "secondary"}
                className="gap-2"
              >
                <User className="w-4 h-4" />
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 transition-colors ${
              isScrolled ? "text-foreground" : "text-white"
            }`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md rounded-lg shadow-lg mb-4 overflow-hidden">
            <div className="py-4 px-2 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="block w-full text-left px-4 py-3 text-foreground hover:bg-muted rounded-md transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-2 px-4 space-y-2">
                <FeedbackDialog variant="outline" className="w-full" />
                {user ? (
                  <Button
                    onClick={() => navigate("/calendar")}
                    className="w-full gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    My Calendar
                  </Button>
                ) : (
                  <Button
                    onClick={() => navigate("/auth")}
                    className="w-full gap-2"
                  >
                    <User className="w-4 h-4" />
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
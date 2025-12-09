import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { destinations } from "@/data/destinations";

const DestinationsShowcase = () => {
  return (
    <section id="destinations" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-4">Popular Destinations</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Explore Jharkhand's Treasures
          </h2>
          <p className="text-lg text-muted-foreground">
            From wildlife sanctuaries to spiritual sites and scenic hill stations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {destinations.map((destination) => (
            <Link key={destination.id} to={`/destination/${destination.id}`}>
              <Card 
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-border h-full"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary/90 text-primary-foreground">
                      {destination.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="w-4 h-4 fill-secondary text-secondary" />
                    <span className="text-sm font-semibold text-foreground">{destination.rating}</span>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-start gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <h3 className="text-xl font-bold text-foreground">{destination.name}</h3>
                  </div>
                  <p className="text-muted-foreground">{destination.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsShowcase;

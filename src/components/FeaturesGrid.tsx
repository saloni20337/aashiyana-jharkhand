import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Route, 
  ShoppingBag, 
  Shield, 
  Map, 
  TrendingUp 
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Travel Assistant",
    description: "Get personalized recommendations and instant answers in multiple languages",
    color: "text-primary",
  },
  {
    icon: Route,
    title: "Smart Itineraries",
    description: "AI-powered trip planning based on your interests, budget, and schedule",
    color: "text-secondary",
  },
  {
    icon: ShoppingBag,
    title: "Local Marketplace",
    description: "Support tribal artisans by purchasing authentic handicrafts and souvenirs",
    color: "text-accent",
  },
  {
    icon: Shield,
    title: "Secure Bookings",
    description: "Blockchain-verified guides and transparent, safe transactions",
    color: "text-primary",
  },
  {
    icon: Map,
    title: "Interactive Maps",
    description: "Real-time navigation with AR previews of cultural and natural sites",
    color: "text-secondary",
  },
  {
    icon: TrendingUp,
    title: "Live Analytics",
    description: "Tourism insights and trends for officials to enhance visitor experience",
    color: "text-accent",
  },
];

const FeaturesGrid = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-4">Platform Features</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Everything You Need for the Perfect Journey
          </h2>
          <p className="text-lg text-muted-foreground">
            Cutting-edge technology meets authentic local experiences
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-border bg-card"
              >
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-7 h-7 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;

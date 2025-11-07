import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Palette, Users, Music } from "lucide-react";
import tribalCrafts from "@/assets/tribal-crafts.jpg";

const CulturalHighlight = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-2xl" />
            <img
              src={tribalCrafts}
              alt="Tribal Handicrafts"
              className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover"
            />
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="mb-2">Cultural Heritage</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Support Local Artisans & Communities
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Connect directly with tribal communities and artisans. Every purchase supports traditional crafts and helps preserve centuries-old cultural heritage.
            </p>

            <div className="space-y-4">
              {[
                {
                  icon: Palette,
                  title: "Authentic Handicrafts",
                  description: "Dokra art, handwoven textiles, and traditional jewelry"
                },
                {
                  icon: Users,
                  title: "Community Homestays",
                  description: "Experience tribal life and hospitality firsthand"
                },
                {
                  icon: Music,
                  title: "Cultural Events",
                  description: "Traditional dance, music festivals, and celebrations"
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button 
              size="lg"
              className="bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-white mt-6"
            >
              Visit Marketplace
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CulturalHighlight;

import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Clock, Users, Sparkles, ChevronRight, IndianRupee } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const presetItineraries = [
  {
    id: 1,
    title: "Spiritual Jharkhand",
    duration: "5 Days",
    type: "Pilgrimage",
    budget: "₹15,000 - ₹25,000",
    places: ["Deoghar", "Rajrappa", "Parasnath"],
    highlights: ["Baidyanath Jyotirlinga", "Chinnamasta Temple", "Jain Temples"],
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600",
  },
  {
    id: 2,
    title: "Wildlife Adventure",
    duration: "4 Days",
    type: "Adventure",
    budget: "₹20,000 - ₹30,000",
    places: ["Betla", "Palamau", "Hazaribagh"],
    highlights: ["Tiger Safari", "Elephant Rides", "Bird Watching"],
    image: "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=600",
  },
  {
    id: 3,
    title: "Hill Station Retreat",
    duration: "3 Days",
    type: "Leisure",
    budget: "₹12,000 - ₹18,000",
    places: ["Netarhat", "McCluskieganj", "Ranchi"],
    highlights: ["Sunrise Points", "Colonial Architecture", "Nature Walks"],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
  },
  {
    id: 4,
    title: "Waterfall Circuit",
    duration: "3 Days",
    type: "Nature",
    budget: "₹10,000 - ₹15,000",
    places: ["Hundru", "Jonha", "Dassam"],
    highlights: ["Photography", "Trekking", "Picnic Spots"],
    image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600",
  },
];

const Itineraries = () => {
  const [days, setDays] = useState("");
  const [interest, setInterest] = useState("");
  const [budget, setBudget] = useState("");
  const [generatedItinerary, setGeneratedItinerary] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateItinerary = async () => {
    if (!days || !interest) {
      toast({
        title: "Missing information",
        description: "Please select duration and interests",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-recommendations", {
        body: {
          message: `Create a detailed ${days}-day itinerary for Jharkhand focusing on ${interest}. Budget preference: ${budget || "flexible"}. Include day-by-day activities, recommended places to stay, estimated costs, and travel tips.`,
        },
      });

      if (error) throw error;
      setGeneratedItinerary(data.recommendation);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to generate itinerary",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Smart Itineraries - Jharkhand Tourism</title>
        <meta name="description" content="Plan your perfect Jharkhand trip with AI-powered smart itineraries" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Hero */}
        <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="secondary" className="mb-4">AI-Powered Planning</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Smart Itineraries
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Let AI create your perfect Jharkhand travel plan based on your interests, duration, and budget
            </p>
          </div>
        </section>

        {/* AI Itinerary Generator */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Card className="max-w-3xl mx-auto border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Create Your Custom Itinerary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Select value={days} onValueChange={setDays}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select days" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 Days</SelectItem>
                        <SelectItem value="3">3 Days</SelectItem>
                        <SelectItem value="5">5 Days</SelectItem>
                        <SelectItem value="7">7 Days</SelectItem>
                        <SelectItem value="10">10 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Interest</Label>
                    <Select value={interest} onValueChange={setInterest}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select interest" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spiritual">Spiritual & Temples</SelectItem>
                        <SelectItem value="wildlife">Wildlife & Nature</SelectItem>
                        <SelectItem value="adventure">Adventure & Trekking</SelectItem>
                        <SelectItem value="culture">Culture & Heritage</SelectItem>
                        <SelectItem value="waterfalls">Waterfalls & Scenic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Budget (per person)</Label>
                    <Select value={budget} onValueChange={setBudget}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="budget">Budget (₹5k-10k)</SelectItem>
                        <SelectItem value="moderate">Moderate (₹10k-20k)</SelectItem>
                        <SelectItem value="premium">Premium (₹20k+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={generateItinerary} disabled={isGenerating} className="w-full">
                  {isGenerating ? (
                    <>Generating Your Perfect Itinerary...</>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Smart Itinerary
                    </>
                  )}
                </Button>

                {generatedItinerary && (
                  <div className="mt-6 p-6 bg-muted rounded-lg">
                    <h3 className="font-bold text-lg mb-4">Your Custom Itinerary</h3>
                    <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
                      {generatedItinerary}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Preset Itineraries */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground text-center mb-8">
              Popular Itineraries
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {presetItineraries.map((itinerary) => (
                <Card key={itinerary.id} className="group overflow-hidden hover:shadow-xl transition-all">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={itinerary.image}
                      alt={itinerary.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-3 left-3 bg-primary">{itinerary.type}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg text-foreground mb-2">{itinerary.title}</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {itinerary.duration}
                      </div>
                      <div className="flex items-center gap-2">
                        <IndianRupee className="w-4 h-4" />
                        {itinerary.budget}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {itinerary.places.join(" → ")}
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4" size="sm">
                      View Details <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Itineraries;

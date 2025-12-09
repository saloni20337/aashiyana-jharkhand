import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation, Star, Clock, Info, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const destinations = [
  { id: "betla-national-park", name: "Betla National Park", lat: 23.8728, lng: 84.1567, category: "Wildlife", rating: 4.8 },
  { id: "baidyanath-temple-deoghar", name: "Baidyanath Temple", lat: 24.4848, lng: 86.6949, category: "Spiritual", rating: 4.9 },
  { id: "netarhat", name: "Netarhat", lat: 23.4833, lng: 84.2667, category: "Hill Station", rating: 4.7 },
  { id: "rajrappa-mandir-ramgarh", name: "Rajrappa Mandir", lat: 23.6383, lng: 85.7833, category: "Spiritual", rating: 4.8 },
  { name: "Hundru Falls", lat: 23.4467, lng: 85.5425, category: "Waterfall", rating: 4.6 },
  { name: "Ranchi", lat: 23.3441, lng: 85.3096, category: "City", rating: 4.5 },
  { name: "Jonha Falls", lat: 23.3833, lng: 85.5333, category: "Waterfall", rating: 4.5 },
  { name: "Parasnath Hill", lat: 23.9625, lng: 86.1361, category: "Spiritual", rating: 4.9 },
  { name: "Patratu Valley", lat: 23.6706, lng: 85.2847, category: "Scenic", rating: 4.6 },
  { name: "Hazaribagh", lat: 23.9925, lng: 85.3637, category: "Wildlife", rating: 4.4 },
];

const categoryColors: Record<string, string> = {
  Wildlife: "bg-green-500",
  Spiritual: "bg-orange-500",
  "Hill Station": "bg-blue-500",
  Waterfall: "bg-cyan-500",
  City: "bg-purple-500",
  Scenic: "bg-pink-500",
};

const Maps = () => {
  const [selectedDestination, setSelectedDestination] = useState<typeof destinations[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mapboxToken, setMapboxToken] = useState("");
  const [isMapReady, setIsMapReady] = useState(false);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);

  const filteredDestinations = destinations.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    // Check for token in localStorage
    const savedToken = localStorage.getItem("mapbox_token");
    if (savedToken) {
      setMapboxToken(savedToken);
      initializeMap(savedToken);
    }
  }, []);

  const initializeMap = async (token: string) => {
    if (!mapContainer.current || map.current) return;

    try {
      const mapboxgl = await import("mapbox-gl");
      await import("mapbox-gl/dist/mapbox-gl.css");

      mapboxgl.default.accessToken = token;

      map.current = new mapboxgl.default.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/outdoors-v12",
        center: [85.3096, 23.6102], // Jharkhand center
        zoom: 7,
        pitch: 30,
      });

      map.current.addControl(new mapboxgl.default.NavigationControl(), "top-right");

      // Add markers for destinations
      destinations.forEach((dest) => {
        const el = document.createElement("div");
        el.className = "w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transform hover:scale-110 transition-transform";
        el.style.backgroundColor = getCategoryColor(dest.category);
        el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;

        el.addEventListener("click", () => {
          setSelectedDestination(dest);
          map.current?.flyTo({ center: [dest.lng, dest.lat], zoom: 12 });
        });

        new mapboxgl.default.Marker(el)
          .setLngLat([dest.lng, dest.lat])
          .addTo(map.current);
      });

      setIsMapReady(true);
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  };

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      Wildlife: "#22c55e",
      Spiritual: "#f97316",
      "Hill Station": "#3b82f6",
      Waterfall: "#06b6d4",
      City: "#a855f7",
      Scenic: "#ec4899",
    };
    return colors[category] || "#6b7280";
  };

  const handleTokenSubmit = () => {
    if (mapboxToken) {
      localStorage.setItem("mapbox_token", mapboxToken);
      initializeMap(mapboxToken);
    }
  };

  const flyToDestination = (dest: typeof destinations[0]) => {
    setSelectedDestination(dest);
    if (map.current) {
      map.current.flyTo({ center: [dest.lng, dest.lat], zoom: 12 });
    }
  };

  return (
    <>
      <Helmet>
        <title>Interactive Maps - Jharkhand Tourism</title>
        <meta name="description" content="Explore Jharkhand destinations on an interactive map" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Hero */}
        <section className="pt-24 pb-6 bg-gradient-to-br from-blue-500/10 via-background to-green-500/10">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="secondary" className="mb-4">Explore Locations</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Interactive Maps
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover and navigate to Jharkhand's top tourist destinations
            </p>
          </div>
        </section>

        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Destinations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Input
                      placeholder="Search destinations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="max-h-96 overflow-y-auto space-y-2">
                      {filteredDestinations.map((dest) => (
                        <button
                          key={dest.name}
                          onClick={() => flyToDestination(dest)}
                          className={`w-full text-left p-3 rounded-lg transition-colors ${
                            selectedDestination?.name === dest.name
                              ? "bg-primary/10 border border-primary"
                              : "hover:bg-muted"
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <div className={`w-3 h-3 rounded-full mt-1.5 ${categoryColors[dest.category]}`} />
                            <div>
                              <p className="font-medium text-foreground text-sm">{dest.name}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{dest.category}</span>
                                <span className="flex items-center">
                                  <Star className="w-3 h-3 fill-secondary text-secondary mr-0.5" />
                                  {dest.rating}
                                </span>
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Legend */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Categories</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {Object.entries(categoryColors).map(([category, color]) => (
                      <div key={category} className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${color}`} />
                        <span className="text-sm text-foreground">{category}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Map */}
              <div className="lg:col-span-3">
                {!isMapReady && !mapboxToken ? (
                  <Card className="h-[600px] flex items-center justify-center">
                    <CardContent className="text-center max-w-md">
                      <MapPin className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-xl font-bold mb-2">Setup Interactive Map</h3>
                      <p className="text-muted-foreground mb-4">
                        Enter your Mapbox public token to enable the interactive map. Get one free at{" "}
                        <a
                          href="https://mapbox.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          mapbox.com
                        </a>
                      </p>
                      <div className="space-y-3">
                        <Input
                          placeholder="pk.your_mapbox_public_token"
                          value={mapboxToken}
                          onChange={(e) => setMapboxToken(e.target.value)}
                        />
                        <Button onClick={handleTokenSubmit} className="w-full">
                          Enable Map
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : !isMapReady ? (
                  <Card className="h-[600px] flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-muted-foreground">Loading map...</p>
                    </div>
                  </Card>
                ) : (
                  <div className="relative">
                    <div ref={mapContainer} className="h-[600px] rounded-lg overflow-hidden shadow-lg" />
                    
                    {/* Selected destination info */}
                    {selectedDestination && (
                      <Card className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <Badge className={categoryColors[selectedDestination.category]}>
                                {selectedDestination.category}
                              </Badge>
                              <h3 className="font-bold text-lg mt-2">{selectedDestination.name}</h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                <Star className="w-4 h-4 fill-secondary text-secondary" />
                                {selectedDestination.rating} Rating
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setSelectedDestination(null)}
                            >
                              ×
                            </Button>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() =>
                                window.open(
                                  `https://www.google.com/maps/dir/?api=1&destination=${selectedDestination.lat},${selectedDestination.lng}`,
                                  "_blank"
                                )
                              }
                            >
                              <Navigation className="w-4 h-4 mr-1" />
                              Directions
                            </Button>
                            {selectedDestination.id && (
                              <Button size="sm" className="flex-1" asChild>
                                <Link to={`/destination/${selectedDestination.id}`}>
                                  <Info className="w-4 h-4 mr-1" />
                                  Details
                                </Link>
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Maps;

import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Star, MapPin, ShoppingBag, Users, Heart, Filter } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Dokra Metal Art - Elephant",
    category: "Handicrafts",
    price: 2500,
    rating: 4.8,
    seller: "Tribal Art Collective",
    location: "Dumka",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
    isFeatured: true,
  },
  {
    id: 2,
    name: "Handwoven Tussar Silk Saree",
    category: "Textiles",
    price: 4500,
    rating: 4.9,
    seller: "Sericulture Women's Group",
    location: "Bhagalpur",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400",
    isFeatured: true,
  },
  {
    id: 3,
    name: "Bamboo Craft Basket Set",
    category: "Handicrafts",
    price: 800,
    rating: 4.6,
    seller: "Forest Dwellers Cooperative",
    location: "Khunti",
    image: "https://images.unsplash.com/photo-1595356700395-6f14b5c1f33f?w=400",
    isFeatured: false,
  },
  {
    id: 4,
    name: "Tribal Wall Painting",
    category: "Art",
    price: 3500,
    rating: 4.7,
    seller: "Santal Art Academy",
    location: "Ranchi",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400",
    isFeatured: true,
  },
  {
    id: 5,
    name: "Stone Carved Deity Statue",
    category: "Handicrafts",
    price: 5000,
    rating: 4.9,
    seller: "Heritage Stone Works",
    location: "Deoghar",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400",
    isFeatured: false,
  },
  {
    id: 6,
    name: "Lac Bangle Set",
    category: "Jewelry",
    price: 600,
    rating: 4.5,
    seller: "Traditional Lac Artists",
    location: "Ranchi",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
    isFeatured: false,
  },
];

const services = [
  {
    id: 1,
    name: "Authentic Tribal Homestay",
    category: "Accommodation",
    price: 1500,
    rating: 4.9,
    provider: "Oraon Family",
    location: "Netarhat",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
    perNight: true,
  },
  {
    id: 2,
    name: "Wildlife Safari Guide",
    category: "Tours",
    price: 2000,
    rating: 4.8,
    provider: "Forest Expert Guides",
    location: "Betla",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400",
    perDay: true,
  },
  {
    id: 3,
    name: "Traditional Cooking Class",
    category: "Experience",
    price: 1200,
    rating: 4.7,
    provider: "Local Chef Network",
    location: "Ranchi",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400",
    perPerson: true,
  },
  {
    id: 4,
    name: "Temple Pilgrimage Tour",
    category: "Tours",
    price: 3500,
    rating: 4.9,
    provider: "Sacred Journeys",
    location: "Deoghar",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=400",
    perPerson: true,
  },
];

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "all" || p.category.toLowerCase() === selectedCategory)
  );

  return (
    <>
      <Helmet>
        <title>Local Marketplace - Jharkhand Tourism</title>
        <meta name="description" content="Shop authentic tribal handicrafts and book local services from Jharkhand artisans" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Hero */}
        <section className="pt-24 pb-12 bg-gradient-to-br from-secondary/10 via-background to-primary/10">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="secondary" className="mb-4">Support Local Communities</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Local Marketplace
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover authentic tribal handicrafts, book local guides, and support Jharkhand's artisan communities
            </p>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="py-6 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search products and services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {["all", "handicrafts", "textiles", "art", "jewelry"].map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                    className="capitalize"
                  >
                    {cat === "all" ? "All Products" : cat}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Content Tabs */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="products" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="products" className="gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  Products
                </TabsTrigger>
                <TabsTrigger value="services" className="gap-2">
                  <Users className="w-4 h-4" />
                  Services
                </TabsTrigger>
              </TabsList>

              <TabsContent value="products">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all">
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {product.isFeatured && (
                          <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">
                            Featured
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                      <CardContent className="p-4">
                        <Badge variant="outline" className="mb-2">{product.category}</Badge>
                        <h3 className="font-bold text-lg text-foreground">{product.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <MapPin className="w-3 h-3" />
                          {product.seller}, {product.location}
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-xl font-bold text-primary">₹{product.price.toLocaleString()}</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-secondary text-secondary" />
                            <span className="text-sm font-medium">{product.rating}</span>
                          </div>
                        </div>
                        <Button className="w-full mt-4">Add to Cart</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="services">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {services.map((service) => (
                    <Card key={service.id} className="group overflow-hidden hover:shadow-xl transition-all">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <Badge className="absolute top-3 left-3 bg-primary">{service.category}</Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-foreground">{service.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <MapPin className="w-3 h-3" />
                          {service.provider}, {service.location}
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div>
                            <span className="text-lg font-bold text-primary">₹{service.price.toLocaleString()}</span>
                            <span className="text-xs text-muted-foreground">
                              {service.perNight && "/night"}
                              {service.perDay && "/day"}
                              {service.perPerson && "/person"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-secondary text-secondary" />
                            <span className="text-sm font-medium">{service.rating}</span>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full mt-4">Book Now</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Community Impact */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-8">Community Impact</h2>
            <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <p className="text-muted-foreground">Artisans Empowered</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <p className="text-muted-foreground">Villages Connected</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">₹10L+</div>
                <p className="text-muted-foreground">Revenue Generated</p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Marketplace;

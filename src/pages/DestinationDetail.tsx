import { useParams, Link } from "react-router-dom";
import { getDestinationById, destinations } from "@/data/destinations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin, Star, Clock, CheckCircle, Play } from "lucide-react";
import { Helmet } from "react-helmet-async";

const DestinationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const destination = id ? getDestinationById(id) : undefined;

  if (!destination) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Destination Not Found</h1>
          <p className="text-muted-foreground mb-6">The destination you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{destination.name} - Jharkhand Tourism</title>
        <meta name="description" content={destination.description} />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        {/* Hero Section */}
        <div className="relative h-[50vh] md:h-[60vh]">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container mx-auto">
              <Button variant="ghost" asChild className="mb-4 text-white hover:bg-white/20">
                <Link to="/#destinations">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Destinations
                </Link>
              </Button>
              
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <Badge className="bg-primary text-primary-foreground">{destination.category}</Badge>
                <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <Star className="w-4 h-4 fill-secondary text-secondary" />
                  <span className="text-sm font-semibold">{destination.rating}</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{destination.name}</h1>
              <div className="flex items-center gap-2 text-white/90">
                <MapPin className="w-5 h-5" />
                <span>{destination.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">About {destination.name}</h2>
                <p className="text-muted-foreground leading-relaxed">{destination.fullDescription}</p>
              </section>

              {/* Highlights */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Highlights</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {destination.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{highlight}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Videos */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  <Play className="inline w-6 h-6 mr-2 text-primary" />
                  Videos of {destination.name}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {destination.videos.map((video, index) => (
                    <Card key={index} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                      <a 
                        href={`https://www.youtube.com/watch?v=${video.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="relative aspect-video">
                          <img
                            src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                            <div className="w-14 h-14 bg-primary/90 rounded-full flex items-center justify-center">
                              <Play className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" />
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-3">
                          <h3 className="font-medium text-foreground line-clamp-2 text-sm">{video.title}</h3>
                        </CardContent>
                      </a>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Recommended Videos */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Recommended Videos</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {destination.recommendedVideos.map((video, index) => (
                    <Card key={index} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                      <a 
                        href={`https://www.youtube.com/watch?v=${video.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex"
                      >
                        <div className="relative w-40 flex-shrink-0">
                          <img
                            src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <div className="w-10 h-10 bg-primary/90 rounded-full flex items-center justify-center">
                              <Play className="w-4 h-4 text-primary-foreground ml-0.5" fill="currentColor" />
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-3 flex flex-col justify-center">
                          <Badge variant="outline" className="w-fit mb-1 text-xs">{video.destination}</Badge>
                          <h3 className="font-medium text-foreground line-clamp-2 text-sm">{video.title}</h3>
                        </CardContent>
                      </a>
                    </Card>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info Card */}
              <Card className="sticky top-24">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-bold text-foreground">Quick Info</h3>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Best Time to Visit</p>
                      <p className="text-sm text-muted-foreground">{destination.bestTimeToVisit}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Location</p>
                      <p className="text-sm text-muted-foreground">{destination.location}</p>
                    </div>
                  </div>

                  <hr className="border-border" />

                  <h3 className="text-lg font-bold text-foreground">More Destinations</h3>
                  <div className="space-y-3">
                    {destinations
                      .filter(d => d.id !== destination.id)
                      .slice(0, 3)
                      .map((d) => (
                        <Link
                          key={d.id}
                          to={`/destination/${d.id}`}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                        >
                          <img
                            src={d.image}
                            alt={d.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-foreground text-sm line-clamp-1">{d.name}</p>
                            <Badge variant="secondary" className="text-xs">{d.category}</Badge>
                          </div>
                        </Link>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default DestinationDetail;

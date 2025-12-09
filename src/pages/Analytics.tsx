import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Users, MapPin, Calendar, Eye, Clock, Star, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const visitorData = [
  { month: "Jan", visitors: 12500, domestic: 10000, international: 2500 },
  { month: "Feb", visitors: 15000, domestic: 12000, international: 3000 },
  { month: "Mar", visitors: 18500, domestic: 15000, international: 3500 },
  { month: "Apr", visitors: 14000, domestic: 11500, international: 2500 },
  { month: "May", visitors: 11000, domestic: 9000, international: 2000 },
  { month: "Jun", visitors: 9500, domestic: 8000, international: 1500 },
  { month: "Jul", visitors: 22000, domestic: 18000, international: 4000 },
  { month: "Aug", visitors: 28500, domestic: 24000, international: 4500 },
  { month: "Sep", visitors: 19000, domestic: 15500, international: 3500 },
  { month: "Oct", visitors: 25000, domestic: 20000, international: 5000 },
  { month: "Nov", visitors: 21000, domestic: 17000, international: 4000 },
  { month: "Dec", visitors: 23000, domestic: 18500, international: 4500 },
];

const destinationData = [
  { name: "Deoghar", visitors: 85000, rating: 4.9 },
  { name: "Betla", visitors: 42000, rating: 4.8 },
  { name: "Netarhat", visitors: 35000, rating: 4.7 },
  { name: "Rajrappa", visitors: 28000, rating: 4.8 },
  { name: "Hundru Falls", visitors: 25000, rating: 4.6 },
  { name: "Parasnath", visitors: 22000, rating: 4.9 },
];

const categoryData = [
  { name: "Spiritual", value: 45, color: "#FF6B35" },
  { name: "Wildlife", value: 25, color: "#4CAF50" },
  { name: "Hill Stations", value: 15, color: "#2196F3" },
  { name: "Waterfalls", value: 10, color: "#9C27B0" },
  { name: "Culture", value: 5, color: "#FFC107" },
];

const liveStats = [
  { label: "Active Visitors Today", value: "2,847", change: "+12%", icon: Users },
  { label: "Most Visited Now", value: "Deoghar", subtext: "423 visitors", icon: MapPin },
  { label: "Avg. Stay Duration", value: "2.3 Days", change: "+0.2", icon: Clock },
  { label: "Satisfaction Score", value: "4.7/5", change: "+0.1", icon: Star },
];

const Analytics = () => {
  return (
    <>
      <Helmet>
        <title>Live Analytics - Jharkhand Tourism</title>
        <meta name="description" content="Real-time tourism analytics and insights for Jharkhand" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Hero */}
        <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="secondary" className="mb-4">Real-Time Data</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Live Tourism Analytics
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Track visitor trends, popular destinations, and tourism insights across Jharkhand
            </p>
          </div>
        </section>

        {/* Live Stats */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {liveStats.map((stat, index) => (
                <Card key={index} className="border-l-4 border-l-primary">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                        {stat.change && (
                          <Badge variant="secondary" className="mt-2 text-xs">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {stat.change}
                          </Badge>
                        )}
                        {stat.subtext && (
                          <p className="text-xs text-muted-foreground mt-2">{stat.subtext}</p>
                        )}
                      </div>
                      <stat.icon className="w-8 h-8 text-primary/50" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Charts */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="visitors" className="w-full">
              <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 mb-8">
                <TabsTrigger value="visitors">Visitors</TabsTrigger>
                <TabsTrigger value="destinations">Destinations</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
              </TabsList>

              <TabsContent value="visitors">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Monthly Visitor Trends (2024)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={visitorData}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis dataKey="month" className="text-xs" />
                          <YAxis className="text-xs" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="visitors"
                            stroke="hsl(var(--primary))"
                            strokeWidth={3}
                            dot={{ fill: "hsl(var(--primary))" }}
                          />
                          <Line
                            type="monotone"
                            dataKey="domestic"
                            stroke="hsl(var(--secondary))"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex gap-6 justify-center mt-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary rounded-full" />
                        <span>Total Visitors</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-secondary rounded-full" />
                        <span>Domestic</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="destinations">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Top Destinations by Visitors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={destinationData} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis type="number" className="text-xs" />
                          <YAxis dataKey="name" type="category" width={100} className="text-xs" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                            }}
                          />
                          <Bar dataKey="visitors" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="categories">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Tourism Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={categoryData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Category Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {categoryData.map((cat) => (
                        <div key={cat.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: cat.color }}
                            />
                            <span className="font-medium">{cat.name}</span>
                          </div>
                          <span className="text-muted-foreground">{cat.value}%</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Insights */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">Key Insights</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="text-center p-6">
                <Eye className="w-10 h-10 mx-auto text-primary mb-4" />
                <h3 className="font-bold text-lg">Peak Season</h3>
                <p className="text-muted-foreground text-sm mt-2">
                  July-August sees highest footfall due to Shravan and monsoon beauty
                </p>
              </Card>
              <Card className="text-center p-6">
                <TrendingUp className="w-10 h-10 mx-auto text-primary mb-4" />
                <h3 className="font-bold text-lg">Growing Interest</h3>
                <p className="text-muted-foreground text-sm mt-2">
                  Wildlife tourism up 35% YoY with Betla gaining popularity
                </p>
              </Card>
              <Card className="text-center p-6">
                <Calendar className="w-10 h-10 mx-auto text-primary mb-4" />
                <h3 className="font-bold text-lg">Best Time</h3>
                <p className="text-muted-foreground text-sm mt-2">
                  October-March ideal for most destinations with pleasant weather
                </p>
              </Card>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Analytics;

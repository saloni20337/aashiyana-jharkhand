import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Plus, Trash2, LogOut, MapPin, Calendar as CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Reminder {
  id: string;
  title: string;
  description: string | null;
  reminder_date: string;
  location: string | null;
}

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: "",
    description: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    } else {
      fetchReminders();
    }
  }, [user, navigate]);

  const fetchReminders = async () => {
    const { data, error } = await supabase
      .from("reminders")
      .select("*")
      .order("reminder_date", { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch reminders",
        variant: "destructive",
      });
    } else {
      setReminders(data || []);
    }
  };

  const handleAddReminder = async () => {
    if (!newReminder.title || !selectedDate) return;

    setLoading(true);
    const { error } = await supabase.from("reminders").insert({
      user_id: user!.id,
      title: newReminder.title,
      description: newReminder.description || null,
      location: newReminder.location || null,
      reminder_date: selectedDate.toISOString(),
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Reminder added successfully",
      });
      setNewReminder({ title: "", description: "", location: "" });
      setIsDialogOpen(false);
      fetchReminders();
    }
    setLoading(false);
  };

  const handleDeleteReminder = async (id: string) => {
    const { error } = await supabase.from("reminders").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete reminder",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Reminder deleted",
      });
      fetchReminders();
    }
  };

  const getRemindersForDate = (date: Date) => {
    return reminders.filter(
      (r) => format(new Date(r.reminder_date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
  };

  const selectedDateReminders = selectedDate ? getRemindersForDate(selectedDate) : [];

  const datesWithReminders = reminders.map((r) => format(new Date(r.reminder_date), "yyyy-MM-dd"));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <div className="pt-24 pb-8 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Travel Calendar</h1>
              <p className="text-muted-foreground mt-1">Plan and track your Jharkhand adventures</p>
            </div>
            <Button variant="outline" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Calendar Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                Select Date
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                modifiers={{
                  hasReminder: (date) => datesWithReminders.includes(format(date, "yyyy-MM-dd")),
                }}
                modifiersStyles={{
                  hasReminder: {
                    fontWeight: "bold",
                    textDecoration: "underline",
                    color: "hsl(var(--primary))",
                  },
                }}
                className={cn("p-3 pointer-events-auto")}
              />
            </CardContent>
          </Card>

          {/* Reminders Card */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>
                  {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
                </CardTitle>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Reminder
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Travel Reminder</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div>
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          value={newReminder.title}
                          onChange={(e) =>
                            setNewReminder({ ...newReminder, title: e.target.value })
                          }
                          placeholder="e.g., Visit Hundru Falls"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={newReminder.location}
                          onChange={(e) =>
                            setNewReminder({ ...newReminder, location: e.target.value })
                          }
                          placeholder="e.g., Hundru Falls, Ranchi"
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Notes</Label>
                        <Textarea
                          id="description"
                          value={newReminder.description}
                          onChange={(e) =>
                            setNewReminder({ ...newReminder, description: e.target.value })
                          }
                          placeholder="Add details about your plans..."
                          rows={3}
                        />
                      </div>
                      <Button onClick={handleAddReminder} className="w-full" disabled={loading}>
                        {loading ? "Adding..." : "Add Reminder"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {selectedDateReminders.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No reminders for this date
                </p>
              ) : (
                <div className="space-y-3">
                  {selectedDateReminders.map((reminder) => (
                    <Card key={reminder.id} className="border-l-4 border-l-primary">
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{reminder.title}</h3>
                            {reminder.location && (
                              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                                <MapPin className="w-4 h-4" />
                                {reminder.location}
                              </div>
                            )}
                            {reminder.description && (
                              <p className="text-sm text-muted-foreground mt-2">
                                {reminder.description}
                              </p>
                            )}
                            <Badge variant="secondary" className="mt-2">
                              {format(new Date(reminder.reminder_date), "h:mm a")}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteReminder(reminder.id)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Calendar;

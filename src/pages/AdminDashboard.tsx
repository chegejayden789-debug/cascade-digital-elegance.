import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LogOut, RefreshCw, CalendarDays, Users, Clock } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Reservation = Tables<"reservations">;

const statusColors: Record<string, string> = {
  pending: "bg-yellow-600/20 text-yellow-400 border-yellow-600/30",
  confirmed: "bg-emerald-600/20 text-emerald-400 border-emerald-600/30",
  completed: "bg-primary/20 text-primary border-primary/30",
  cancelled: "bg-destructive/20 text-destructive border-destructive/30",
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchReservations = async () => {
    setLoading(true);
    let query = supabase
      .from("reservations")
      .select("*")
      .order("reservation_date", { ascending: false });

    if (filter !== "all") {
      query = query.eq("status", filter);
    }

    const { data } = await query;
    setReservations(data || []);
    setLoading(false);
  };

  useEffect(() => {
    // Check auth
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/admin/login");
        return;
      }
      fetchReservations();
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) navigate("/admin/login");
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    fetchReservations();
  }, [filter]);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("reservations").update({ status }).eq("id", id);
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const counts = {
    total: reservations.length,
    pending: reservations.filter((r) => r.status === "pending").length,
    confirmed: reservations.filter((r) => r.status === "confirmed").length,
    completed: reservations.filter((r) => r.status === "completed").length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">
              CASCADE <span className="text-gold-gradient">Admin</span>
            </h1>
            <p className="font-body text-xs text-muted-foreground">
              Reservation Management
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={fetchReservations}
              className="text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Total", value: counts.total, icon: CalendarDays },
            { label: "Pending", value: counts.pending, icon: Clock },
            { label: "Confirmed", value: counts.confirmed, icon: Users },
            { label: "Completed", value: counts.completed, icon: CalendarDays },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-sm border border-border bg-card p-4"
            >
              <div className="flex items-center gap-2">
                <stat.icon className="h-4 w-4 text-primary" />
                <span className="font-body text-xs uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </span>
              </div>
              <p className="mt-2 font-display text-2xl font-bold text-foreground">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="mb-6 flex items-center gap-4">
          <span className="font-body text-xs uppercase tracking-widest text-muted-foreground">
            Filter:
          </span>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40 border-border bg-card">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-sm border border-border bg-card">
          {loading ? (
            <div className="flex items-center justify-center p-12">
              <RefreshCw className="h-5 w-5 animate-spin text-primary" />
            </div>
          ) : reservations.length === 0 ? (
            <div className="p-12 text-center">
              <p className="font-body text-muted-foreground">
                No reservations found.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="font-body text-xs uppercase tracking-widest">
                    Guest
                  </TableHead>
                  <TableHead className="font-body text-xs uppercase tracking-widest">
                    Date & Time
                  </TableHead>
                  <TableHead className="font-body text-xs uppercase tracking-widest">
                    Guests
                  </TableHead>
                  <TableHead className="font-body text-xs uppercase tracking-widest">
                    Occasion
                  </TableHead>
                  <TableHead className="font-body text-xs uppercase tracking-widest">
                    Status
                  </TableHead>
                  <TableHead className="font-body text-xs uppercase tracking-widest">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reservations.map((r) => (
                  <TableRow key={r.id} className="border-border">
                    <TableCell>
                      <p className="font-body font-medium text-foreground">
                        {r.full_name}
                      </p>
                      <p className="font-body text-xs text-muted-foreground">
                        {r.phone}
                      </p>
                    </TableCell>
                    <TableCell className="font-body text-sm text-foreground">
                      {new Date(r.reservation_date + "T00:00:00").toLocaleDateString("en-KE", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                      <br />
                      <span className="text-xs text-muted-foreground">
                        {r.reservation_time}
                      </span>
                    </TableCell>
                    <TableCell className="font-body text-sm text-foreground">
                      {r.guests}
                    </TableCell>
                    <TableCell className="font-body text-sm capitalize text-foreground">
                      {r.occasion || "—"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`capitalize ${statusColors[r.status] || ""}`}
                      >
                        {r.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={r.status}
                        onValueChange={(val) => updateStatus(r.id, val)}
                      >
                        <SelectTrigger className="h-8 w-32 border-border bg-transparent text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {/* Special requests detail */}
        {reservations.some((r) => r.special_requests) && (
          <div className="mt-8">
            <h2 className="mb-4 font-display text-lg font-bold text-foreground">
              Special Requests
            </h2>
            <div className="space-y-3">
              {reservations
                .filter((r) => r.special_requests)
                .map((r) => (
                  <div
                    key={r.id}
                    className="rounded-sm border border-border bg-card p-4"
                  >
                    <p className="font-body text-sm font-medium text-foreground">
                      {r.full_name}{" "}
                      <span className="text-xs text-muted-foreground">
                        — {r.reservation_date}
                      </span>
                    </p>
                    <p className="mt-1 font-body text-sm text-muted-foreground">
                      {r.special_requests}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

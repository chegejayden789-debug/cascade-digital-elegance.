import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RefreshCw, Search, Pencil, Check, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/types";

type Reservation = Tables<"reservations"> & { revenue_amount?: number; table_id?: string };

const statusColors: Record<string, string> = {
  pending: "bg-yellow-600/20 text-yellow-400 border-yellow-600/30",
  confirmed: "bg-emerald-600/20 text-emerald-400 border-emerald-600/30",
  completed: "bg-primary/20 text-primary border-primary/30",
  cancelled: "bg-destructive/20 text-destructive border-destructive/30",
};

const ReservationManagement = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [tables, setTables] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [search, setSearch] = useState("");
  const [editRes, setEditRes] = useState<Reservation | null>(null);
  const [editForm, setEditForm] = useState({
    full_name: "",
    phone: "",
    guests: "",
    reservation_date: "",
    reservation_time: "",
    occasion: "",
    special_requests: "",
    revenue_amount: "",
    table_id: "",
  });

  const fetchData = async () => {
    setLoading(true);
    const [resResult, tablesResult] = await Promise.all([
      supabase.from("reservations").select("*").order("reservation_date", { ascending: false }),
      supabase.from("restaurant_tables").select("*").order("table_number"),
    ]);
    setReservations((resResult.data || []) as Reservation[]);
    setTables(tablesResult.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    let list = reservations;
    if (filter !== "all") list = list.filter((r) => r.status === filter);
    if (dateFilter) list = list.filter((r) => r.reservation_date === dateFilter);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (r) =>
          r.full_name.toLowerCase().includes(q) ||
          r.phone.includes(q)
      );
    }
    return list;
  }, [reservations, filter, dateFilter, search]);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("reservations").update({ status }).eq("id", id);
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    // Log activity
    await supabase.from("activity_logs").insert({
      action: "status_update",
      description: `Reservation status changed to ${status}`,
      entity_type: "reservation",
      entity_id: id,
    });
    toast({ title: `Status updated to ${status}` });
  };

  const openEdit = (r: Reservation) => {
    setEditRes(r);
    setEditForm({
      full_name: r.full_name,
      phone: r.phone,
      guests: r.guests,
      reservation_date: r.reservation_date,
      reservation_time: r.reservation_time,
      occasion: r.occasion || "",
      special_requests: r.special_requests || "",
      revenue_amount: String(r.revenue_amount || ""),
      table_id: r.table_id || "",
    });
  };

  const saveEdit = async () => {
    if (!editRes) return;
    const updates: any = {
      full_name: editForm.full_name,
      phone: editForm.phone,
      guests: editForm.guests,
      reservation_date: editForm.reservation_date,
      reservation_time: editForm.reservation_time,
      occasion: editForm.occasion || null,
      special_requests: editForm.special_requests || null,
      revenue_amount: editForm.revenue_amount ? Number(editForm.revenue_amount) : null,
      table_id: editForm.table_id || null,
    };
    await supabase.from("reservations").update(updates).eq("id", editRes.id);
    setReservations((prev) =>
      prev.map((r) => (r.id === editRes.id ? { ...r, ...updates } : r))
    );
    await supabase.from("activity_logs").insert({
      action: "reservation_edited",
      description: `Reservation for ${editForm.full_name} was edited`,
      entity_type: "reservation",
      entity_id: editRes.id,
    });
    setEditRes(null);
    toast({ title: "Reservation updated" });
  };

  const getTableName = (tableId: string | null | undefined) => {
    if (!tableId) return "—";
    const t = tables.find((t) => t.id === tableId);
    return t ? `${t.table_number} (${t.capacity}p)` : "—";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Reservations</h1>
        <p className="font-body text-sm text-muted-foreground">
          Manage all bookings • {filtered.length} results
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 border-border bg-card"
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-36 border-border bg-card">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-40 border-border bg-card"
        />
        {dateFilter && (
          <Button variant="ghost" size="sm" onClick={() => setDateFilter("")}>
            <X className="h-3 w-3 mr-1" /> Clear date
          </Button>
        )}
        <Button variant="ghost" size="icon" onClick={fetchData} className="text-muted-foreground hover:text-foreground">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card overflow-x-auto">
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <RefreshCw className="h-5 w-5 animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <p className="font-body text-muted-foreground">No reservations found.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                {["Guest", "Date & Time", "Guests", "Table", "Occasion", "Status", "Revenue", "Actions"].map((h) => (
                  <TableHead key={h} className="font-body text-[10px] uppercase tracking-widest whitespace-nowrap">
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow key={r.id} className="border-border">
                  <TableCell>
                    <p className="font-body text-sm font-medium text-foreground">{r.full_name}</p>
                    <p className="font-body text-xs text-muted-foreground">{r.phone}</p>
                  </TableCell>
                  <TableCell className="font-body text-sm text-foreground whitespace-nowrap">
                    {new Date(r.reservation_date + "T00:00:00").toLocaleDateString("en-KE", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                    <br />
                    <span className="text-xs text-muted-foreground">{r.reservation_time}</span>
                  </TableCell>
                  <TableCell className="font-body text-sm text-foreground">{r.guests}</TableCell>
                  <TableCell className="font-body text-xs text-muted-foreground">
                    {getTableName(r.table_id)}
                  </TableCell>
                  <TableCell className="font-body text-sm capitalize text-foreground">
                    {r.occasion || "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`capitalize ${statusColors[r.status] || ""}`}>
                      {r.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-body text-sm text-foreground">
                    {r.revenue_amount ? `KES ${Number(r.revenue_amount).toLocaleString()}` : "—"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(r)}>
                        <Pencil className="h-3 w-3" />
                      </Button>
                      {r.status === "pending" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-emerald-400"
                          onClick={() => updateStatus(r.id, "confirmed")}
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                      )}
                      {(r.status === "pending" || r.status === "confirmed") && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive"
                          onClick={() => updateStatus(r.id, "cancelled")}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editRes} onOpenChange={(open) => !open && setEditRes(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Edit Reservation</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="font-body text-xs">Full Name</Label>
                <Input
                  value={editForm.full_name}
                  onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                />
              </div>
              <div>
                <Label className="font-body text-xs">Phone</Label>
                <Input
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label className="font-body text-xs">Date</Label>
                <Input
                  type="date"
                  value={editForm.reservation_date}
                  onChange={(e) => setEditForm({ ...editForm, reservation_date: e.target.value })}
                />
              </div>
              <div>
                <Label className="font-body text-xs">Time</Label>
                <Input
                  value={editForm.reservation_time}
                  onChange={(e) => setEditForm({ ...editForm, reservation_time: e.target.value })}
                />
              </div>
              <div>
                <Label className="font-body text-xs">Guests</Label>
                <Input
                  value={editForm.guests}
                  onChange={(e) => setEditForm({ ...editForm, guests: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="font-body text-xs">Table</Label>
                <Select value={editForm.table_id} onValueChange={(v) => setEditForm({ ...editForm, table_id: v })}>
                  <SelectTrigger className="border-border">
                    <SelectValue placeholder="No table" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {tables.map((t) => (
                      <SelectItem key={t.id} value={t.id}>
                        {t.table_number} ({t.capacity}p) — {t.location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="font-body text-xs">Revenue (KES)</Label>
                <Input
                  type="number"
                  value={editForm.revenue_amount}
                  onChange={(e) => setEditForm({ ...editForm, revenue_amount: e.target.value })}
                  placeholder="0"
                />
              </div>
            </div>
            <div>
              <Label className="font-body text-xs">Occasion</Label>
              <Input
                value={editForm.occasion}
                onChange={(e) => setEditForm({ ...editForm, occasion: e.target.value })}
              />
            </div>
            <div>
              <Label className="font-body text-xs">Special Requests</Label>
              <Textarea
                value={editForm.special_requests}
                onChange={(e) => setEditForm({ ...editForm, special_requests: e.target.value })}
                rows={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditRes(null)}>Cancel</Button>
            <Button onClick={saveEdit} className="bg-gold-gradient text-primary-foreground">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReservationManagement;

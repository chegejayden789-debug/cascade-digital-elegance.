import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface RestaurantTable {
  id: string;
  table_number: string;
  capacity: number;
  status: string;
  location: string;
  created_at: string;
}

const statusMap: Record<string, { bg: string; label: string }> = {
  available: { bg: "bg-emerald-500", label: "Available" },
  reserved: { bg: "bg-yellow-500", label: "Reserved" },
  occupied: { bg: "bg-red-500", label: "Occupied" },
};

const TableManagement = () => {
  const [tables, setTables] = useState<RestaurantTable[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<RestaurantTable | null>(null);
  const [form, setForm] = useState({
    table_number: "",
    capacity: "2",
    status: "available",
    location: "main",
  });

  const fetchTables = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("restaurant_tables")
      .select("*")
      .order("table_number");
    setTables((data || []) as RestaurantTable[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchTables();

    const channel = supabase
      .channel("tables-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "restaurant_tables" }, () => {
        fetchTables();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ table_number: "", capacity: "2", status: "available", location: "main" });
    setDialogOpen(true);
  };

  const openEdit = (t: RestaurantTable) => {
    setEditing(t);
    setForm({
      table_number: t.table_number,
      capacity: String(t.capacity),
      status: t.status,
      location: t.location,
    });
    setDialogOpen(true);
  };

  const save = async () => {
    const payload = {
      table_number: form.table_number,
      capacity: Number(form.capacity),
      status: form.status,
      location: form.location,
    };

    if (editing) {
      await supabase.from("restaurant_tables").update(payload).eq("id", editing.id);
      toast({ title: "Table updated" });
    } else {
      await supabase.from("restaurant_tables").insert(payload);
      toast({ title: "Table created" });
    }
    setDialogOpen(false);
    fetchTables();
  };

  const deleteTable = async (id: string) => {
    await supabase.from("restaurant_tables").delete().eq("id", id);
    toast({ title: "Table deleted" });
    fetchTables();
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("restaurant_tables").update({ status }).eq("id", id);
    setTables((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Tables</h1>
          <p className="font-body text-sm text-muted-foreground">
            Manage restaurant seating • {tables.length} tables
          </p>
        </div>
        <Button onClick={openCreate} className="bg-gold-gradient text-primary-foreground gap-2">
          <Plus className="h-4 w-4" /> Add Table
        </Button>
      </div>

      {/* Floor Plan Grid */}
      <div>
        <h3 className="mb-3 font-display text-sm font-bold text-foreground">Floor Plan</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {tables.map((t) => (
            <div
              key={t.id}
              className="group relative rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/30 cursor-pointer"
              onClick={() => openEdit(t)}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-bold text-foreground">{t.table_number}</span>
                <div className={`h-3 w-3 rounded-full ${statusMap[t.status]?.bg || "bg-muted"}`} />
              </div>
              <p className="font-body text-xs text-muted-foreground mt-1">{t.capacity} seats • {t.location}</p>
              <p className="font-body text-[10px] text-muted-foreground capitalize">{statusMap[t.status]?.label}</p>

              {/* Quick status buttons */}
              <div className="mt-2 flex gap-1">
                {["available", "reserved", "occupied"].map((s) => (
                  <button
                    key={s}
                    onClick={(e) => { e.stopPropagation(); updateStatus(t.id, s); }}
                    className={`h-5 w-5 rounded-full border transition-all ${
                      t.status === s ? "ring-2 ring-offset-1 ring-offset-card" : "opacity-40 hover:opacity-100"
                    } ${statusMap[s].bg}`}
                    title={statusMap[s].label}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display">{editing ? "Edit Table" : "Add Table"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div>
              <Label className="font-body text-xs">Table Number</Label>
              <Input value={form.table_number} onChange={(e) => setForm({ ...form, table_number: e.target.value })} placeholder="T11" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="font-body text-xs">Capacity</Label>
                <Input type="number" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} />
              </div>
              <div>
                <Label className="font-body text-xs">Location</Label>
                <Select value={form.location} onValueChange={(v) => setForm({ ...form, location: v })}>
                  <SelectTrigger className="border-border"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["main", "window", "patio", "bar", "private"].map((l) => (
                      <SelectItem key={l} value={l} className="capitalize">{l}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="font-body text-xs">Status</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                <SelectTrigger className="border-border"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="reserved">Reserved</SelectItem>
                  <SelectItem value="occupied">Occupied</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="flex gap-2">
            {editing && (
              <Button variant="destructive" size="sm" onClick={() => { deleteTable(editing.id); setDialogOpen(false); }}>
                <Trash2 className="h-3 w-3 mr-1" /> Delete
              </Button>
            )}
            <Button variant="ghost" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={save} className="bg-gold-gradient text-primary-foreground">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TableManagement;

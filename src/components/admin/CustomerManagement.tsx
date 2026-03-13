import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Users } from "lucide-react";

interface Customer {
  full_name: string;
  phone: string;
  visits: number;
  lastVisit: string;
}

const CustomerManagement = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      const { data } = await supabase
        .from("reservations")
        .select("full_name, phone, reservation_date")
        .order("reservation_date", { ascending: false });

      if (data) {
        const map = new Map<string, Customer>();
        data.forEach((r) => {
          const key = r.phone;
          if (map.has(key)) {
            const existing = map.get(key)!;
            existing.visits++;
            if (r.reservation_date > existing.lastVisit) {
              existing.lastVisit = r.reservation_date;
              existing.full_name = r.full_name;
            }
          } else {
            map.set(key, {
              full_name: r.full_name,
              phone: r.phone,
              visits: 1,
              lastVisit: r.reservation_date,
            });
          }
        });
        setCustomers(Array.from(map.values()).sort((a, b) => b.visits - a.visits));
      }
      setLoading(false);
    };

    fetchCustomers();
  }, []);

  const filtered = useMemo(() => {
    if (!search) return customers;
    const q = search.toLowerCase();
    return customers.filter(
      (c) => c.full_name.toLowerCase().includes(q) || c.phone.includes(q)
    );
  }, [customers, search]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Users className="h-6 w-6 text-primary" />
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Customers</h1>
          <p className="font-body text-sm text-muted-foreground">
            {customers.length} unique customers
          </p>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 border-border bg-card"
        />
      </div>

      <div className="rounded-lg border border-border bg-card overflow-x-auto">
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="font-body text-[10px] uppercase tracking-widest">Customer</TableHead>
                <TableHead className="font-body text-[10px] uppercase tracking-widest">Phone</TableHead>
                <TableHead className="font-body text-[10px] uppercase tracking-widest">Visits</TableHead>
                <TableHead className="font-body text-[10px] uppercase tracking-widest">Last Visit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.phone} className="border-border">
                  <TableCell className="font-body text-sm font-medium text-foreground">{c.full_name}</TableCell>
                  <TableCell className="font-body text-sm text-muted-foreground">{c.phone}</TableCell>
                  <TableCell className="font-body text-sm text-foreground">{c.visits}</TableCell>
                  <TableCell className="font-body text-xs text-muted-foreground">
                    {new Date(c.lastVisit + "T00:00:00").toLocaleDateString("en-KE", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default CustomerManagement;

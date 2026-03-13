import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  CalendarDays,
  Clock,
  Users,
  DollarSign,
  CheckCircle,
  Grid3X3,
} from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from "recharts";

interface Stats {
  todayTotal: number;
  upcoming: number;
  totalCustomers: number;
  tablesAvailable: number;
  tablesOccupied: number;
  dailyRevenue: number;
  weeklyRevenue: number;
}

const chartConfig: ChartConfig = {
  reservations: { label: "Reservations", color: "hsl(36 60% 52%)" },
  available: { label: "Available", color: "hsl(142 71% 45%)" },
  reserved: { label: "Reserved", color: "hsl(48 96% 53%)" },
  occupied: { label: "Occupied", color: "hsl(0 84% 60%)" },
};

const DashboardOverview = () => {
  const [stats, setStats] = useState<Stats>({
    todayTotal: 0,
    upcoming: 0,
    totalCustomers: 0,
    tablesAvailable: 0,
    tablesOccupied: 0,
    dailyRevenue: 0,
    weeklyRevenue: 0,
  });
  const [weeklyData, setWeeklyData] = useState<{ day: string; reservations: number }[]>([]);
  const [tableStatusData, setTableStatusData] = useState<{ name: string; value: number; color: string }[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const today = new Date().toISOString().split("T")[0];
    const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().split("T")[0];

    const [resResult, tablesResult, activityResult] = await Promise.all([
      supabase.from("reservations").select("*"),
      supabase.from("restaurant_tables").select("*"),
      supabase.from("activity_logs").select("*").order("created_at", { ascending: false }).limit(8),
    ]);

    const reservations = resResult.data || [];
    const tables = tablesResult.data || [];
    const activities = activityResult.data || [];

    // Stats
    const todayRes = reservations.filter((r) => r.reservation_date === today);
    const upcoming = reservations.filter(
      (r) => r.reservation_date >= today && (r.status === "pending" || r.status === "confirmed")
    );
    const uniquePhones = new Set(reservations.map((r) => r.phone));
    const available = tables.filter((t) => t.status === "available").length;
    const occupied = tables.filter((t) => t.status === "occupied").length;
    const reserved = tables.filter((t) => t.status === "reserved").length;

    const dailyRev = todayRes
      .filter((r) => r.status === "completed")
      .reduce((sum, r) => sum + (Number(r.revenue_amount) || 0), 0);
    const weekRes = reservations.filter((r) => r.reservation_date >= weekAgo);
    const weeklyRev = weekRes
      .filter((r) => r.status === "completed")
      .reduce((sum, r) => sum + (Number(r.revenue_amount) || 0), 0);

    setStats({
      todayTotal: todayRes.length,
      upcoming: upcoming.length,
      totalCustomers: uniquePhones.size,
      tablesAvailable: available,
      tablesOccupied: occupied,
      dailyRevenue: dailyRev,
      weeklyRevenue: weeklyRev,
    });

    // Weekly chart
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(Date.now() - (6 - i) * 86400000);
      const dateStr = d.toISOString().split("T")[0];
      const label = d.toLocaleDateString("en-KE", { weekday: "short" });
      const count = reservations.filter((r) => r.reservation_date === dateStr).length;
      return { day: label, reservations: count };
    });
    setWeeklyData(days);

    // Table status pie
    setTableStatusData([
      { name: "Available", value: available, color: "hsl(142 71% 45%)" },
      { name: "Reserved", value: reserved, color: "hsl(48 96% 53%)" },
      { name: "Occupied", value: occupied, color: "hsl(0 84% 60%)" },
    ]);

    setRecentActivity(activities);
  };

  const statCards = [
    { label: "Today's Reservations", value: stats.todayTotal, icon: CalendarDays },
    { label: "Upcoming", value: stats.upcoming, icon: Clock },
    { label: "Total Customers", value: stats.totalCustomers, icon: Users },
    { label: "Tables Available", value: stats.tablesAvailable, icon: Grid3X3 },
    { label: "Tables Occupied", value: stats.tablesOccupied, icon: Grid3X3 },
    { label: "Daily Revenue", value: `KES ${stats.dailyRevenue.toLocaleString()}`, icon: DollarSign },
    { label: "Weekly Revenue", value: `KES ${stats.weeklyRevenue.toLocaleString()}`, icon: DollarSign },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="font-body text-sm text-muted-foreground">
          Overview of your restaurant operations
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
        {statCards.map((s) => (
          <div
            key={s.label}
            className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/20"
          >
            <div className="flex items-center gap-2">
              <s.icon className="h-4 w-4 text-primary shrink-0" />
              <span className="font-body text-[10px] uppercase tracking-widest text-muted-foreground truncate">
                {s.label}
              </span>
            </div>
            <p className="mt-2 font-display text-xl font-bold text-foreground">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Weekly Reservations */}
        <div className="lg:col-span-2 rounded-lg border border-border bg-card p-4">
          <h3 className="mb-4 font-display text-sm font-bold text-foreground">
            Reservations This Week
          </h3>
          <ChartContainer config={chartConfig} className="h-[220px] w-full">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(30 10% 20%)" />
              <XAxis
                dataKey="day"
                stroke="hsl(30 10% 55%)"
                fontSize={11}
                tickLine={false}
              />
              <YAxis
                stroke="hsl(30 10% 55%)"
                fontSize={11}
                tickLine={false}
                allowDecimals={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="reservations"
                fill="hsl(36 60% 52%)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </div>

        {/* Table Status */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="mb-4 font-display text-sm font-bold text-foreground">
            Table Status
          </h3>
          <ChartContainer config={chartConfig} className="h-[220px] w-full">
            <PieChart>
              <Pie
                data={tableStatusData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {tableStatusData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
          <div className="mt-2 flex justify-center gap-4">
            {tableStatusData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5">
                <div
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: d.color }}
                />
                <span className="font-body text-[10px] text-muted-foreground">
                  {d.name} ({d.value})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="mb-4 font-display text-sm font-bold text-foreground">
          Recent Activity
        </h3>
        {recentActivity.length === 0 ? (
          <p className="font-body text-xs text-muted-foreground">No recent activity</p>
        ) : (
          <div className="space-y-3">
            {recentActivity.map((a: any) => (
              <div key={a.id} className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <div className="min-w-0">
                  <p className="font-body text-xs text-foreground">{a.description}</p>
                  <p className="font-body text-[10px] text-muted-foreground">
                    {new Date(a.created_at).toLocaleString("en-KE", {
                      hour: "2-digit",
                      minute: "2-digit",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;

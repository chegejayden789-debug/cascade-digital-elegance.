import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from "recharts";

const chartConfig: ChartConfig = {
  reservations: { label: "Reservations", color: "hsl(36 60% 52%)" },
  revenue: { label: "Revenue", color: "hsl(142 71% 45%)" },
};

const AnalyticsPage = () => {
  const [dailyData, setDailyData] = useState<any[]>([]);
  const [hourlyData, setHourlyData] = useState<any[]>([]);
  const [dayOfWeekData, setDayOfWeekData] = useState<any[]>([]);
  const [returnRate, setReturnRate] = useState(0);
  const [tableUtil, setTableUtil] = useState(0);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    const [resResult, tablesResult] = await Promise.all([
      supabase.from("reservations").select("*"),
      supabase.from("restaurant_tables").select("*"),
    ]);

    const reservations = resResult.data || [];
    const tables = tablesResult.data || [];

    // Daily data (last 14 days)
    const daily = Array.from({ length: 14 }, (_, i) => {
      const d = new Date(Date.now() - (13 - i) * 86400000);
      const dateStr = d.toISOString().split("T")[0];
      const label = d.toLocaleDateString("en-KE", { month: "short", day: "numeric" });
      const dayRes = reservations.filter((r) => r.reservation_date === dateStr);
      return {
        day: label,
        reservations: dayRes.length,
        revenue: dayRes.reduce((s, r) => s + (Number(r.revenue_amount) || 0), 0),
      };
    });
    setDailyData(daily);

    // Hourly distribution
    const hours: Record<string, number> = {};
    reservations.forEach((r) => {
      const h = r.reservation_time?.split(":")[0] || "12";
      const label = `${h}:00`;
      hours[label] = (hours[label] || 0) + 1;
    });
    setHourlyData(
      Object.entries(hours)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([hour, reservations]) => ({ hour, reservations }))
    );

    // Day of week
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dowCounts = Array(7).fill(0);
    reservations.forEach((r) => {
      const d = new Date(r.reservation_date + "T00:00:00").getDay();
      dowCounts[d]++;
    });
    setDayOfWeekData(days.map((d, i) => ({ day: d, reservations: dowCounts[i] })));

    // Return rate
    const phoneMap = new Map<string, number>();
    reservations.forEach((r) => phoneMap.set(r.phone, (phoneMap.get(r.phone) || 0) + 1));
    const returning = Array.from(phoneMap.values()).filter((v) => v > 1).length;
    setReturnRate(phoneMap.size > 0 ? Math.round((returning / phoneMap.size) * 100) : 0);

    // Table utilization (occupied + reserved / total)
    const usedTables = tables.filter((t) => t.status !== "available").length;
    setTableUtil(tables.length > 0 ? Math.round((usedTables / tables.length) * 100) : 0);
  };

  const kpiCards = [
    { label: "Customer Return Rate", value: `${returnRate}%` },
    { label: "Table Utilization", value: `${tableUtil}%` },
    { label: "Avg Daily Bookings", value: dailyData.length > 0 ? Math.round(dailyData.reduce((s, d) => s + d.reservations, 0) / dailyData.length) : 0 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Analytics</h1>
        <p className="font-body text-sm text-muted-foreground">Business performance insights</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {kpiCards.map((k) => (
          <div key={k.label} className="rounded-lg border border-border bg-card p-5">
            <p className="font-body text-[10px] uppercase tracking-widest text-muted-foreground">{k.label}</p>
            <p className="mt-2 font-display text-3xl font-bold text-primary">{k.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="mb-4 font-display text-sm font-bold text-foreground">Daily Reservations (14d)</h3>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(30 10% 20%)" />
              <XAxis dataKey="day" stroke="hsl(30 10% 55%)" fontSize={10} tickLine={false} />
              <YAxis stroke="hsl(30 10% 55%)" fontSize={10} tickLine={false} allowDecimals={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="reservations" stroke="hsl(36 60% 52%)" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ChartContainer>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="mb-4 font-display text-sm font-bold text-foreground">Peak Booking Hours</h3>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(30 10% 20%)" />
              <XAxis dataKey="hour" stroke="hsl(30 10% 55%)" fontSize={10} tickLine={false} />
              <YAxis stroke="hsl(30 10% 55%)" fontSize={10} tickLine={false} allowDecimals={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="reservations" fill="hsl(36 60% 52%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="mb-4 font-display text-sm font-bold text-foreground">Popular Days of the Week</h3>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <BarChart data={dayOfWeekData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(30 10% 20%)" />
              <XAxis dataKey="day" stroke="hsl(30 10% 55%)" fontSize={10} tickLine={false} />
              <YAxis stroke="hsl(30 10% 55%)" fontSize={10} tickLine={false} allowDecimals={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="reservations" fill="hsl(18 70% 45%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="mb-4 font-display text-sm font-bold text-foreground">Daily Revenue (14d)</h3>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(30 10% 20%)" />
              <XAxis dataKey="day" stroke="hsl(30 10% 55%)" fontSize={10} tickLine={false} />
              <YAxis stroke="hsl(30 10% 55%)" fontSize={10} tickLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="revenue" stroke="hsl(142 71% 45%)" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;

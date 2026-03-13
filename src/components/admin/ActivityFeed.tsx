import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Activity } from "lucide-react";

interface ActivityLog {
  id: string;
  action: string;
  description: string;
  entity_type: string | null;
  entity_id: string | null;
  created_at: string;
}

const ActivityFeed = () => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      const { data } = await supabase
        .from("activity_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);
      setLogs((data || []) as ActivityLog[]);
      setLoading(false);
    };

    fetchLogs();

    const channel = supabase
      .channel("activity-feed")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "activity_logs" },
        (payload) => {
          setLogs((prev) => [payload.new as ActivityLog, ...prev].slice(0, 50));
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const actionIcons: Record<string, string> = {
    status_update: "🔄",
    reservation_edited: "✏️",
    new_reservation: "📋",
    reservation_cancelled: "❌",
    table_update: "🪑",
    admin_login: "🔐",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Activity className="h-6 w-6 text-primary" />
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Activity Feed</h1>
          <p className="font-body text-sm text-muted-foreground">Real-time system events</p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card">
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : logs.length === 0 ? (
          <p className="p-8 text-center font-body text-sm text-muted-foreground">
            No activity yet. Actions will appear here in real time.
          </p>
        ) : (
          <div className="divide-y divide-border">
            {logs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 p-4">
                <span className="mt-0.5 text-base">{actionIcons[log.action] || "📌"}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-body text-sm text-foreground">{log.description}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="font-body text-[10px] text-muted-foreground">
                      {new Date(log.created_at).toLocaleString("en-KE", {
                        hour: "2-digit",
                        minute: "2-digit",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    {log.entity_type && (
                      <span className="rounded bg-muted px-1.5 py-0.5 font-body text-[10px] text-muted-foreground capitalize">
                        {log.entity_type}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;

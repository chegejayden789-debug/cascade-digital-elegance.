import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Notification {
  id: string;
  action: string;
  description: string;
  entity_type: string | null;
  entity_id: string | null;
  created_at: string;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [lastReadAt, setLastReadAt] = useState<string>(
    () => localStorage.getItem("cascade_notif_read") || new Date(0).toISOString()
  );

  useEffect(() => {
    // Fetch recent activity logs as notifications
    supabase
      .from("activity_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20)
      .then(({ data }) => {
        if (data) setNotifications(data as Notification[]);
      });

    // Subscribe to new activity logs
    const channel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "activity_logs" },
        (payload) => {
          setNotifications((prev) => [payload.new as Notification, ...prev].slice(0, 20));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const unreadCount = notifications.filter(
    (n) => new Date(n.created_at) > new Date(lastReadAt)
  ).length;

  const markAllRead = () => {
    const now = new Date().toISOString();
    setLastReadAt(now);
    localStorage.setItem("cascade_notif_read", now);
  };

  return { notifications, unreadCount, markAllRead };
}

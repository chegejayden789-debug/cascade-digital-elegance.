import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "list_reservations",
  title: "List reservations",
  description: "List Cascade Premier reservations, optionally filtered by status or date. Returns up to 50 records ordered by date (newest first).",
  inputSchema: {
    status: z.enum(["pending", "confirmed", "completed", "cancelled"]).optional().describe("Filter by reservation status."),
    date: z.string().optional().describe("Filter by exact reservation date (YYYY-MM-DD)."),
    limit: z.number().int().min(1).max(50).optional().describe("Maximum records to return (default 20)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ status, date, limit }) => {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!);
    let query = supabase.from("reservations").select("*").order("reservation_date", { ascending: false }).limit(limit ?? 20);
    if (status) query = query.eq("status", status);
    if (date) query = query.eq("reservation_date", date);
    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { count: data?.length ?? 0, reservations: data ?? [] },
    };
  },
});

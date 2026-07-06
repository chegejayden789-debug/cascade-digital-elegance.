import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "list_tables",
  title: "List restaurant tables",
  description: "List all tables in the restaurant with their capacity, location, and current status (available, reserved, occupied).",
  inputSchema: {
    status: z.enum(["available", "reserved", "occupied"]).optional().describe("Filter tables by current status."),
    min_capacity: z.number().int().min(1).optional().describe("Only return tables with at least this many seats."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ status, min_capacity }) => {
    const supabase = createClient(process.env.SUPABASE_URL!, (process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY)!);
    let query = supabase.from("restaurant_tables").select("*").order("table_number");
    if (status) query = query.eq("status", status);
    if (min_capacity) query = query.gte("capacity", min_capacity);
    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { count: data?.length ?? 0, tables: data ?? [] },
    };
  },
});

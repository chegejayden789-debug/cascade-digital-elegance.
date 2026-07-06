import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "list_reviews",
  title: "List customer reviews",
  description: "List approved customer reviews for Cascade Premier with star ratings.",
  inputSchema: {
    min_rating: z.number().int().min(1).max(5).optional().describe("Only return reviews with at least this star rating."),
    limit: z.number().int().min(1).max(50).optional().describe("Maximum reviews to return (default 10)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ min_rating, limit }) => {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!);
    let query = supabase
      .from("customer_reviews")
      .select("id, name, rating, review_text, source, created_at")
      .eq("is_approved", true)
      .order("created_at", { ascending: false })
      .limit(limit ?? 10);
    if (min_rating) query = query.gte("rating", min_rating);
    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { count: data?.length ?? 0, reviews: data ?? [] },
    };
  },
});

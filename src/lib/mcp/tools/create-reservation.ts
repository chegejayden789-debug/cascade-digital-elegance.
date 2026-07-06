import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "create_reservation",
  title: "Create a reservation",
  description: "Book a table at Cascade Premier for a specific date, time, and party size.",
  inputSchema: {
    full_name: z.string().trim().min(1).max(100).describe("Guest's full name."),
    phone: z.string().trim().min(6).max(15).describe("Contact phone number in international format (e.g. +254712345678)."),
    reservation_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe("Reservation date in YYYY-MM-DD format."),
    reservation_time: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/).describe("Reservation time in 24h HH:MM format."),
    guests: z.string().min(1).describe("Number of guests (e.g. '2', '4', '10+')."),
    occasion: z.enum(["casual", "birthday", "business", "bridal", "conference", "other"]).optional().describe("Occasion type."),
    special_requests: z.string().max(500).optional().describe("Any special requirements."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
  handler: async (input) => {
    const supabase = createClient(process.env.SUPABASE_URL!, (process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY)!);
    const { data, error } = await supabase.from("reservations").insert({
      full_name: input.full_name,
      phone: input.phone,
      reservation_date: input.reservation_date,
      reservation_time: input.reservation_time,
      guests: input.guests,
      occasion: input.occasion ?? null,
      special_requests: input.special_requests ?? null,
    }).select().single();
    if (error) return { content: [{ type: "text", text: `Failed to create reservation: ${error.message}` }], isError: true };
    return {
      content: [{ type: "text", text: `Reservation created for ${input.full_name} on ${input.reservation_date} at ${input.reservation_time} (${input.guests} guests). Status: pending confirmation.` }],
      structuredContent: { reservation: data },
    };
  },
});

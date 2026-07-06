import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_restaurant_info",
  title: "Get restaurant info",
  description: "Returns Cascade Premier's contact details, hours, location, and social links.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      name: "Cascade Premier",
      tagline: "Authentic Kenyan Dining in Thika Town",
      location: "Thika Town, Kiambu County, Kenya",
      google_maps: "https://maps.app.goo.gl/GypH5QrnLeuq3xGb6",
      phone: "+254 708 888 444",
      whatsapp: "https://wa.me/254708888444",
      tiktok: "https://www.tiktok.com/@cascade_kitchens0",
      hours: {
        "Monday–Saturday": "6:00 AM – 9:00 PM",
        "Sunday": "7:00 AM – 9:00 PM",
      },
      price_range: "KES 500 – 1,000 per person",
      rating: "4.1 (1,064+ Google reviews)",
      website: "https://cascade-digital-elegance.lovable.app",
      known_for: [
        "Legendary Uji Special (calabash-served arrowroot, honey & cassava porridge)",
        "Artisan pizza",
        "Authentic Kenyan cuisine",
        "Event venues seating 200+",
      ],
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});

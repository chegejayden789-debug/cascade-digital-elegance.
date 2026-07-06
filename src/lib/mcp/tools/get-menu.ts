import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const MENU = {
  breakfast: {
    label: "Breakfast",
    items: [
      { name: "Uji Special", description: "Arrowroot, honey & cassava porridge served in a calabash", price_kes: 250 },
      { name: "Mandazi & Tea", description: "Freshly fried mandazi with masala chai", price_kes: 150 },
      { name: "Full Breakfast Platter", description: "Eggs, sausage, toast, beans & fresh juice", price_kes: 450 },
      { name: "Bacon & Gizzards", description: "Crispy bacon with seasoned gizzards", price_kes: 400 },
    ],
  },
  chicken: {
    label: "Chicken",
    items: [
      { name: "Chicken Curry", price_kes: 490 },
      { name: "Supreme Chicken", price_kes: 590 },
      { name: "Chicken In Coconut Sauce", price_kes: 545 },
      { name: "Shawarma", description: "With Chips/Rice/Ugali/Chapati/Pilau/Mukimo", price_kes: 500 },
      { name: "Deep Fried Chicken ¼", price_kes: 460 },
    ],
  },
  fish: {
    label: "Fish",
    items: [
      { name: "Deep Fried Whole Tilapia", price_kes: 600 },
      { name: "Wet Fried Whole Tilapia", price_kes: 600 },
      { name: "Fish Curry", price_kes: 600 },
      { name: "Fish Fillet", price_kes: 410 },
      { name: "Lemon Baked Fish", price_kes: 555 },
    ],
  },
  fast_food: {
    label: "Fast Food",
    items: [
      { name: "Artisan Pizza (Medium)", price_kes: 800 },
      { name: "Artisan Pizza (Large)", price_kes: 1200 },
      { name: "Masala Fries", price_kes: 250 },
      { name: "Chicken Sandwich", price_kes: 405 },
      { name: "Samosa (3 pcs)", price_kes: 150 },
    ],
  },
  wraps: {
    label: "Wraps",
    items: [
      { name: "Chicken Wrap", price_kes: 290 },
      { name: "Beef Wrap", price_kes: 290 },
      { name: "Bacon Wrap", price_kes: 330 },
      { name: "Vegetable Wrap", price_kes: 290 },
    ],
  },
  soups: {
    label: "Soups",
    items: [
      { name: "Oxtail Soup", price_kes: 245 },
      { name: "Cream Of Chicken Soup", price_kes: 245 },
      { name: "Bone Soup", price_kes: 210 },
    ],
  },
  coffee: {
    label: "Coffee",
    items: [
      { name: "Cappuccino", price_kes: 265 },
      { name: "Americano", price_kes: 265 },
      { name: "Latte", price_kes: 265 },
      { name: "Mocha", price_kes: 265 },
    ],
  },
  drinks: {
    label: "Drinks",
    items: [
      { name: "Assorted Milk Shakes", price_kes: 310 },
      { name: "Fresh Passion Juice", price_kes: 185 },
      { name: "Delmonte Juice 1L", price_kes: 400 },
      { name: "Soda 500ml", price_kes: 100 },
    ],
  },
};

export default defineTool({
  name: "get_menu",
  title: "Get menu",
  description: "Returns Cascade Premier's menu, optionally filtered to a single category.",
  inputSchema: {
    category: z.enum(["breakfast", "chicken", "fish", "fast_food", "wraps", "soups", "coffee", "drinks"]).optional().describe("Menu category to fetch. Omit to return the full menu."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category }) => {
    const data = category ? { [category]: MENU[category] } : MENU;
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: data,
    };
  },
});

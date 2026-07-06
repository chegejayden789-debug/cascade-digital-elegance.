import { defineMcp } from "@lovable.dev/mcp-js";
import getRestaurantInfo from "./tools/get-restaurant-info";
import getMenu from "./tools/get-menu";
import listReservations from "./tools/list-reservations";
import createReservation from "./tools/create-reservation";
import listTables from "./tools/list-tables";
import listReviews from "./tools/list-reviews";

export default defineMcp({
  name: "cascade-premier-mcp",
  title: "Cascade Premier",
  version: "0.1.0",
  instructions:
    "Tools for Cascade Premier — an authentic Kenyan restaurant in Thika Town. " +
    "Use `get_restaurant_info` for contact details, hours, and location. " +
    "Use `get_menu` to browse dishes and prices (KES). " +
    "Use `create_reservation` to book a table (all bookings start as pending until staff confirm). " +
    "Use `list_reservations`, `list_tables`, and `list_reviews` to inspect current bookings, table availability, and customer feedback.",
  tools: [
    getRestaurantInfo,
    getMenu,
    createReservation,
    listReservations,
    listTables,
    listReviews,
  ],
});

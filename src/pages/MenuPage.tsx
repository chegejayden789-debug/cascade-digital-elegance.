import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import breakfastImg from "@/assets/menu-breakfast.jpg";
import ujiImg from "@/assets/uji-special.jpg";
import pilauImg from "@/assets/pilau.jpg";
import pizzaImg from "@/assets/pizza.jpg";
import mukimoImg from "@/assets/mukimo.jpg";
import drinksImg from "@/assets/menu-drinks.jpg";

type MenuItem = {
  name: string;
  description: string;
  price: string;
  tag?: string;
};

type Category = {
  id: string;
  label: string;
  image: string;
  items: MenuItem[];
};

const menuData: Category[] = [
  {
    id: "breakfast",
    label: "Breakfast",
    image: breakfastImg,
    items: [
      { name: "Uji Special", description: "Arrowroot, honey & cassava porridge served in a calabash", price: "250", tag: "Signature" },
      { name: "Mandazi & Tea", description: "Freshly fried mandazi with masala chai", price: "150" },
      { name: "Brown Chapati & Eggs", description: "Whole-wheat chapati with scrambled or fried eggs", price: "200" },
      { name: "Full Breakfast Platter", description: "Eggs, sausage, toast, beans & fresh juice", price: "450" },
      { name: "Pancakes & Honey", description: "Fluffy pancakes drizzled with natural honey", price: "300" },
      { name: "Bacon & Gizzards", description: "Crispy bacon strips with seasoned gizzards", price: "400" },
      { name: "Fruit Bowl", description: "Seasonal fresh fruits with yoghurt topping", price: "250" },
      { name: "Omelette", description: "Three-egg omelette with vegetables & cheese", price: "300" },
    ],
  },
  {
    id: "lunch",
    label: "Lunch & Dinner",
    image: pilauImg,
    items: [
      { name: "Beef Pilau", description: "Aromatic spiced rice slow-cooked with tender beef", price: "500", tag: "Favourite" },
      { name: "Mukimo & Beef Stew", description: "Traditional mashed potatoes with greens, corn & rich beef stew", price: "450", tag: "Classic" },
      { name: "Chicken Curry", description: "Tender chicken pieces in aromatic curry sauce with rice", price: "550" },
      { name: "Fish Fillet", description: "Crispy breadcrumbed fish fillet with tartar sauce & sides", price: "600" },
      { name: "Oxtail Soup", description: "Slow-simmered oxtail in a rich, hearty broth", price: "500" },
      { name: "Chicken in Coconut Sauce", description: "Creamy coconut chicken served with ugali or rice", price: "550" },
      { name: "Beef Stew & Ugali", description: "Classic Kenyan beef stew with brown ugali", price: "400" },
      { name: "Kienyeji Greens & Ugali", description: "Traditional vegetables with brown ugali", price: "300" },
      { name: "Sautéed Potatoes", description: "Pan-fried potatoes with onions and herbs", price: "250" },
      { name: "Liver & Ugali", description: "Seasoned liver served with ugali and kachumbari", price: "400" },
      { name: "African Mix Platter", description: "A sampler of pilau, mukimo, greens & stew", price: "650" },
      { name: "Brown Chapati & Stew", description: "Whole-wheat chapati paired with your choice of stew", price: "350" },
    ],
  },
  {
    id: "fastfood",
    label: "Fast Food",
    image: pizzaImg,
    items: [
      { name: "Artisan Pizza (Medium)", description: "Hand-tossed with fresh mozzarella & your choice of toppings", price: "800", tag: "Must Try" },
      { name: "Artisan Pizza (Large)", description: "Generous 14-inch pizza, perfect for sharing", price: "1200" },
      { name: "Chicken BBQ Pizza", description: "Smoky BBQ sauce, grilled chicken & onions", price: "900" },
      { name: "Chicken Peri-Peri Pizza", description: "Spicy peri-peri chicken with peppers", price: "900" },
      { name: "Masala Fries", description: "Crispy fries tossed in sweet masala seasoning", price: "250" },
      { name: "French Fries", description: "Golden crispy fries served with ketchup", price: "200" },
      { name: "Deep Fried Chicken", description: "Crispy golden-fried chicken pieces", price: "450" },
      { name: "Chicken & Chips", description: "Quarter chicken with crispy fries", price: "500" },
      { name: "Samosa (3 pcs)", description: "Crispy pastry filled with spiced meat or vegetables", price: "150" },
      { name: "Chips Masala", description: "Fries in rich masala sauce with vegetables", price: "300" },
    ],
  },
  {
    id: "drinks",
    label: "Drinks",
    image: drinksImg,
    items: [
      { name: "Fresh Passion Juice", description: "Freshly squeezed passion fruit", price: "150" },
      { name: "Fresh Mango Juice", description: "Seasonal ripe mango, freshly blended", price: "150" },
      { name: "Mixed Fruit Juice", description: "Tropical blend of seasonal fruits", price: "200" },
      { name: "Chocolate Milkshake", description: "Rich chocolate blended with cold milk & ice cream", price: "300" },
      { name: "Vanilla Milkshake", description: "Classic vanilla milkshake, thick & creamy", price: "300" },
      { name: "Blueberry Milkshake", description: "Fresh blueberry blended with milk & ice cream", price: "350" },
      { name: "Masala Tea", description: "Kenyan chai with aromatic spices", price: "80" },
      { name: "Coffee", description: "Freshly brewed Kenyan coffee", price: "100" },
      { name: "Hot Chocolate", description: "Rich and warming cocoa drink", price: "150" },
      { name: "Soda", description: "Assorted soft drinks", price: "80" },
      { name: "Water (500ml)", description: "Still or sparkling mineral water", price: "50" },
    ],
  },
];

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("breakfast");
  const active = menuData.find((c) => c.id === activeCategory)!;

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative h-[40vh] min-h-[320px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={active.id}
            src={active.image}
            alt={active.label}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <div className="bg-dark-overlay absolute inset-0" />

        <div className="relative z-10 flex h-full flex-col justify-between p-6">
          <Link
            to="/"
            className="flex w-fit items-center gap-2 font-body text-xs uppercase tracking-widest text-foreground/70 transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back Home
          </Link>

          <div className="pb-4">
            <p className="mb-2 font-body text-sm font-medium uppercase tracking-[0.3em] text-primary">
              Our Menu
            </p>
            <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
              Taste the <span className="text-gold-gradient">Experience</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="sticky top-0 z-30 border-b border-primary/10 bg-background/95 backdrop-blur-md">
        <div className="container mx-auto flex gap-1 overflow-x-auto px-6 py-3">
          {menuData.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative whitespace-nowrap px-5 py-2.5 font-body text-xs font-semibold uppercase tracking-widest transition-all ${
                activeCategory === cat.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.label}
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="menu-tab"
                  className="absolute inset-x-0 -bottom-3 h-0.5 bg-primary"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="container mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                {active.label}
              </h2>
              <div className="divider-gold mt-3 w-16" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {active.items.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="group flex items-start justify-between gap-4 rounded-sm border border-primary/5 bg-card p-5 transition-colors hover:border-primary/20"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-base font-semibold text-foreground">
                        {item.name}
                      </h3>
                      {item.tag && (
                        <span className="bg-gold-gradient rounded-sm px-2 py-0.5 font-body text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 font-body text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <p className="shrink-0 font-display text-lg font-bold text-primary">
                    {item.price}<span className="text-xs font-normal text-muted-foreground">/=</span>
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-16 text-center">
          <div className="divider-gold mx-auto mb-6 w-20" />
          <p className="font-body text-sm text-muted-foreground">
            Prices in KES • Menu items subject to availability
          </p>
          <a
            href="https://glovoapp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold-gradient mt-6 inline-block px-10 py-4 font-body text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:opacity-90"
          >
            Order Online
          </a>
        </div>
      </div>
    </main>
  );
};

export default MenuPage;

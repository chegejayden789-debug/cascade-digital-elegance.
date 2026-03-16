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
import fishImg from "@/assets/menu-fish.jpg";
import chickenImg from "@/assets/menu-chicken.jpg";
import wrapsImg from "@/assets/menu-wraps.jpg";
import soupsImg from "@/assets/menu-soups.jpg";
import coffeeImg from "@/assets/menu-coffee.jpg";

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
      { name: "Beef Stew & Ugali", description: "Classic Kenyan beef stew with brown ugali", price: "400" },
      { name: "Kienyeji Greens & Ugali", description: "Traditional vegetables with brown ugali", price: "300" },
      { name: "Sautéed Potatoes", description: "Pan-fried potatoes with onions and herbs", price: "250" },
      { name: "Liver & Ugali", description: "Seasoned liver served with ugali and kachumbari", price: "400" },
      { name: "African Mix Platter", description: "A sampler of pilau, mukimo, greens & stew", price: "650" },
      { name: "Brown Chapati & Stew", description: "Whole-wheat chapati paired with your choice of stew", price: "350" },
    ],
  },
  {
    id: "chicken",
    label: "Chicken",
    image: chickenImg,
    items: [
      { name: "Chicken Curry", description: "Tender chicken pieces in aromatic curry sauce", price: "490" },
      { name: "Supreme Chicken", description: "Premium chicken dish served with accompaniments", price: "590" },
      { name: "Chicken In Coconut Sauce", description: "Creamy coconut chicken served with your choice of side", price: "545" },
      { name: "Chicken Stew", description: "Home-style chicken stew with rich gravy", price: "490" },
      { name: "Chicken Maryland", description: "Classic chicken Maryland with sides", price: "490" },
      { name: "Kienyenji Chicken Plain", description: "Free-range chicken, simply prepared", price: "360" },
      { name: "Wet Fried Kienyeji Chicken ¼", description: "Quarter free-range chicken, wet fried", price: "590" },
      { name: "Pan Fried Chicken", description: "Golden pan-fried chicken pieces", price: "485" },
      { name: "Shawarma", description: "Shawarma with Chips/Rice/Ugali/Chapati/Pilau/Mukimo", price: "500" },
      { name: "Chicken Nuggets", description: "Crispy breaded chicken nuggets", price: "490" },
      { name: "Chicken Stir Fry", description: "Stir-fried chicken with vegetables", price: "590" },
      { name: "Deep Fried Chicken ¼ Plain", description: "Quarter chicken, deep fried plain", price: "330" },
      { name: "Deep Fried Chicken ¼", description: "Quarter chicken, deep fried with sides", price: "460" },
    ],
  },
  {
    id: "fish",
    label: "Fish",
    image: fishImg,
    items: [
      { name: "Deep Fried Whole Tilapia", description: "Served with Chips/Chapati/Irio/Rice/Pilau/Ugali and side salad or vegetables", price: "600", tag: "Popular" },
      { name: "Wet Fried Whole Tilapia", description: "Served with Chips/Chapati/Irio/Rice/Pilau/Ugali and side salad or vegetables", price: "600" },
      { name: "Deep Fried Whole Tilapia Plain", description: "Served with side salad", price: "500" },
      { name: "Fish Fingers", description: "Served with Chips/Chapati/Irio/Rice/Pilau/Ugali and side salad or vegetables", price: "410" },
      { name: "Wet Fried Whole Tilapia Plain", description: "Served with side salad", price: "500" },
      { name: "Fish Curry", description: "Served with Chips/Chapati/Irio/Rice/Pilau/Ugali and side salad or vegetables", price: "600" },
      { name: "Lemon Baked Fish", description: "Served with Chips/Chapati/Irio/Rice/Pilau/Ugali and side salad or vegetables", price: "555" },
      { name: "Fish Fillet", description: "Served with Chips/Chapati/Irio/Rice/Pilau/Ugali and side salad or vegetables", price: "410" },
      { name: "Fish Fillet Plain", description: "Served with side salad or vegetables", price: "325" },
      { name: "Fish Fingers Plain", description: "Served with side salad or vegetables", price: "325" },
      { name: "Pan Fried Fish Fillet", description: "Served with Chips/Chapati/Irio/Rice/Pilau/Ugali and side salad or vegetables", price: "440" },
      { name: "Deep Fried Fish In Batter", description: "Served with Chips/Chapati/Irio/Rice/Pilau/Ugali and side salad or vegetables", price: "600" },
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
      { name: "Bhajia", description: "Hot spicy bhajia", price: "220" },
      { name: "Roast Potatoes", description: "Roasted potatoes", price: "245" },
      { name: "Hot Dog", description: "Classic hot dog", price: "150" },
      { name: "Regular Chips", description: "Plain chips", price: "150" },
      { name: "Chicken Sandwich", description: "Served with a handful of fries and side salad", price: "405" },
      { name: "Vegetable Sandwich", description: "Served with a handful of fries and side salad", price: "245" },
      { name: "Spicy Chips", description: "Spicy seasoned chips", price: "185" },
      { name: "Cheesy Chips", description: "Chips topped with melted cheese", price: "220" },
      { name: "Chicken Drumsticks", description: "Served with a handful of fries and side salad", price: "440" },
      { name: "Grilled Steak Sandwich", description: "Served with a handful of fries and side salad", price: "405" },
      { name: "Spicy Garlic Chicken Wings", description: "Spicy chicken wings", price: "210" },
      { name: "Hot Spicy Gizzards", description: "Spicy gizzards", price: "185" },
      { name: "Chips Masala", description: "Chips in masala sauce", price: "220" },
      { name: "Masala Fries", description: "Crispy fries tossed in sweet masala seasoning", price: "250" },
      { name: "Samosa (3 pcs)", description: "Crispy pastry filled with spiced meat or vegetables", price: "150" },
    ],
  },
  {
    id: "wraps",
    label: "Wraps",
    image: wrapsImg,
    items: [
      { name: "Chicken Wrap", description: "Chicken strips with stir-fried vegetables wrapped in mandar", price: "290" },
      { name: "Vegetable Wrap", description: "Fresh vegetables wrapped in mandar", price: "290" },
      { name: "Beef Wrap", description: "Beef strips with stir-fried vegetables wrapped in mandar", price: "290" },
      { name: "Bacon Wrap", description: "Bacon strips with stir-fried vegetables wrapped in mandar", price: "330" },
    ],
  },
  {
    id: "soups",
    label: "Soups",
    image: soupsImg,
    items: [
      { name: "Oxtail Soup", description: "Slow-simmered oxtail in a rich, hearty broth", price: "245" },
      { name: "Bone Soup", description: "Traditional bone broth soup", price: "210" },
      { name: "Cream Of Chicken Soup", description: "Creamy chicken soup", price: "245" },
      { name: "Vegetable Soup", description: "Fresh vegetable soup", price: "245" },
    ],
  },
  {
    id: "coffee",
    label: "Coffee",
    image: drinksImg,
    items: [
      { name: "Cappuccino", description: "Special tea with milk double shot", price: "265" },
      { name: "Americano", description: "Special black coffee", price: "265" },
      { name: "Ristretto", description: "Short shot of highly concentrated espresso", price: "265" },
      { name: "Macchiatto", description: "Espresso with a dash of milk foam", price: "265" },
      { name: "Expresso", description: "Classic espresso shot", price: "265" },
      { name: "Latte", description: "Espresso with steamed milk", price: "265" },
      { name: "Glace", description: "Iced coffee drink", price: "265" },
      { name: "Mocha", description: "Special blended coffee with chocolate", price: "265" },
    ],
  },
  {
    id: "drinks",
    label: "Drinks",
    image: drinksImg,
    items: [
      { name: "Assorted Milk Shakes", description: "Vanilla, Chocolate, Strawberry — blended milk with ice cream", price: "310" },
      { name: "Fresh Passion Juice", description: "Freshly squeezed passion fruit", price: "185" },
      { name: "Fresh Mango Juice", description: "Seasonal ripe mango, freshly blended", price: "185" },
      { name: "Cocktail Juice", description: "Mixed fruit cocktail juice", price: "185" },
      { name: "Delmonte Juice 1L", description: "Fresh juice/smoothie — passion, mango & orange", price: "400" },
      { name: "Masala Tea", description: "Kenyan chai with aromatic spices", price: "80" },
      { name: "Coffee", description: "Freshly brewed Kenyan coffee", price: "100" },
      { name: "Hot Chocolate", description: "Rich and warming cocoa drink", price: "150" },
      { name: "Soda 500ml", description: "Assorted soft drinks of your choice", price: "100" },
      { name: "Keringet ½L", description: "Mineral water", price: "85" },
      { name: "Dasani ½L", description: "Mineral water", price: "75" },
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
                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <p className="font-display text-lg font-bold text-primary">
                      {item.price}<span className="text-xs font-normal text-muted-foreground">/=</span>
                    </p>
                    <a
                      href={`https://wa.me/254708888444?text=Hi%20Cascade%20Premier!%20I'd%20like%20to%20order%20${encodeURIComponent(item.name)}%20(KES%20${item.price})`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-sm bg-primary/10 px-2.5 py-1 font-body text-[10px] font-medium uppercase tracking-wider text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                    >
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      Order
                    </a>
                  </div>
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
            href="https://wa.me/254708888444?text=Hi%20Cascade%20Premier!%20I'd%20like%20to%20place%20an%20order"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold-gradient mt-6 inline-flex items-center gap-2 px-10 py-4 font-body text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:opacity-90"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Order on WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
};

export default MenuPage;

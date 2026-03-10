import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ujiImg from "@/assets/uji-special.jpg";
import pilauImg from "@/assets/pilau.jpg";
import pizzaImg from "@/assets/pizza.jpg";
import mukimoImg from "@/assets/mukimo.jpg";

const categories = [
  {
    title: "The Legendary Uji Special",
    description: "Arrowroot, honey & cassava porridge served in a calabash — the dish that built our name.",
    price: "KES 250",
    image: ujiImg,
    tag: "Signature",
  },
  {
    title: "Beef Pilau",
    description: "Aromatic spiced rice slow-cooked with tender beef, a Kenyan classic done to perfection.",
    price: "KES 500",
    image: pilauImg,
    tag: "Favourite",
  },
  {
    title: "Artisan Pizza",
    description: '"You have to travel to Italy to meet its equal" — our customers\' words, not ours.',
    price: "KES 800",
    image: pizzaImg,
    tag: "Must Try",
  },
  {
    title: "Mukimo & Beef Stew",
    description: "Traditional mashed potatoes with greens & corn, paired with rich, slow-simmered beef stew.",
    price: "KES 450",
    image: mukimoImg,
    tag: "Classic",
  },
];

const MenuHighlights = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="menu" className="py-24 sm:py-32">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 font-body text-sm font-medium uppercase tracking-[0.3em] text-primary">
            Our Menu
          </p>
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-5xl">
            Signature <span className="text-gold-gradient">Dishes</span>
          </h2>
          <div className="divider-gold mx-auto mb-6 w-20" />
          <p className="mx-auto max-w-lg font-body text-muted-foreground">
            From breakfast to dinner, every plate is a celebration of authentic Kenyan flavour.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2">
          {categories.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative overflow-hidden rounded-sm border border-primary/10 bg-card"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>
              <div className="absolute left-4 top-4">
                <span className="bg-gold-gradient px-3 py-1 font-body text-xs font-semibold uppercase tracking-wider text-primary-foreground">
                  {item.tag}
                </span>
              </div>
              <div className="relative -mt-12 p-6 pt-0">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <p className="shrink-0 font-display text-lg font-bold text-primary">
                    {item.price}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="mb-2 font-body text-sm text-muted-foreground">
            Also serving: Chicken Curry • Fish Fillet • Masala Fries • Chapati • Fresh Juices • Milkshakes & more
          </p>
          <p className="font-display text-sm font-medium text-primary">
            KES 500 – 1,000 per person
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MenuHighlights;

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import interior1 from "@/assets/gallery-interior-1.jpg";
import interior2 from "@/assets/gallery-interior-2.jpg";
import food1 from "@/assets/gallery-food-1.jpg";
import food2 from "@/assets/gallery-food-2.jpg";
import event1 from "@/assets/gallery-event-1.jpg";
import event2 from "@/assets/gallery-event-2.jpg";

const images = [
  { src: interior1, alt: "Warm ambient dining hall", category: "Interior" },
  { src: food1, alt: "Signature African cuisine platter", category: "Food" },
  { src: event1, alt: "Bridal shower venue setup", category: "Events" },
  { src: food2, alt: "Legendary Uji Special with honey", category: "Food" },
  { src: interior2, alt: "Spacious sunlit dining area", category: "Interior" },
  { src: event2, alt: "Corporate conference in session", category: "Events" },
];

const categories = ["All", "Interior", "Food", "Events"];

const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === "All" ? images : images.filter((img) => img.category === filter);

  return (
    <section id="gallery" className="bg-section-gradient py-24 sm:py-32">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <p className="mb-4 font-body text-sm font-medium uppercase tracking-[0.3em] text-primary">
            Gallery
          </p>
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-5xl">
            A Glimpse <span className="text-gold-gradient">Inside</span>
          </h2>
          <div className="divider-gold mx-auto mb-8 w-20" />

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 font-body text-xs font-semibold uppercase tracking-widest transition-all ${
                  filter === cat
                    ? "bg-primary text-primary-foreground"
                    : "border border-primary/20 text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((img, i) => (
            <motion.div
              key={img.alt}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group cursor-pointer overflow-hidden rounded-sm"
              onClick={() => setLightbox(images.indexOf(img))}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-background/0 transition-colors duration-300 group-hover:bg-background/40" />
                <div className="absolute inset-0 flex items-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="font-body text-xs font-semibold uppercase tracking-widest text-foreground">
                    {img.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute right-6 top-6 text-foreground/70 transition-colors hover:text-foreground"
            onClick={() => setLightbox(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <img
            src={images[lightbox].src}
            alt={images[lightbox].alt}
            className="max-h-[85vh] max-w-full rounded-sm object-contain"
          />
        </motion.div>
      )}
    </section>
  );
};

export default Gallery;

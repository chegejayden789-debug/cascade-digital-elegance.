import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Cascade Premier dining experience"
          className="h-full w-full object-cover"
        />
        <div className="bg-dark-overlay absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 font-body text-sm font-medium uppercase tracking-[0.35em] text-primary"
        >
          Thika's Finest Dining Destination
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-2 font-display text-5xl font-bold tracking-tight text-foreground sm:text-7xl md:text-8xl"
        >
          CASCADE
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-gold-gradient mb-6 font-display text-4xl font-light italic tracking-wide sm:text-5xl md:text-6xl"
        >
          Premier
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="divider-gold mb-8 w-32"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mb-10 max-w-lg font-body text-base font-light leading-relaxed text-muted-foreground sm:text-lg"
        >
          Authentic Kenyan cuisine crafted with passion. Legendary Uji, 
          artisan pizza & traditional African dishes — since day one.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <a
            href="#menu"
            className="bg-gold-gradient rounded-none px-10 py-4 font-body text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:opacity-90"
          >
            Explore Menu
          </a>
          <a
            href="#reserve"
            className="rounded-none border border-primary/40 px-10 py-4 font-body text-sm font-semibold uppercase tracking-widest text-primary transition-all hover:border-primary hover:bg-primary/10"
          >
            Reserve a Table
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="h-6 w-6 text-primary/60" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

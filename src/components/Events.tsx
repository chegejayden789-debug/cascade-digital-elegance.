import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import eventsImg from "@/assets/events.jpg";

const Events = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0">
        <img
          src={eventsImg}
          alt="Cascade Premier event venue"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="bg-dark-overlay absolute inset-0" />
      </div>

      <div className="container relative z-10 mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-4 font-body text-sm font-medium uppercase tracking-[0.3em] text-primary">
            Events & Conferences
          </p>
          <h2 className="mb-6 font-display text-3xl font-bold text-foreground sm:text-5xl">
            Your Venue for <span className="text-gold-gradient">Unforgettable</span> Moments
          </h2>
          <div className="divider-gold mx-auto mb-8 w-20" />
          <p className="mb-10 font-body text-base leading-relaxed text-foreground/70 sm:text-lg">
            From bridal showers to corporate conferences, our beautifully appointed halls 
            seat up to 200 guests. Full catering, professional setup, and a team that makes 
            every event extraordinary.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#reserve"
              className="bg-gold-gradient px-10 py-4 font-body text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:opacity-90"
            >
              Book a Venue
            </a>
            <a
              href="tel:+254700000000"
              className="border border-primary/40 px-10 py-4 font-body text-sm font-semibold uppercase tracking-widest text-primary transition-all hover:border-primary hover:bg-primary/10"
            >
              Call Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Events;

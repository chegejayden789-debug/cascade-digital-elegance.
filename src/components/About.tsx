import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star, MapPin, Clock, Users } from "lucide-react";

const stats = [
  { icon: Star, value: "4.1", label: "Google Rating" },
  { icon: Users, value: "1,064+", label: "Happy Reviews" },
  { icon: MapPin, value: "Thika", label: "Town, Kenya" },
  { icon: Clock, value: "6AM–9PM", label: "Daily Service" },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="bg-section-gradient py-24 sm:py-32">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-4 font-body text-sm font-medium uppercase tracking-[0.3em] text-primary">
            Our Story
          </p>
          <h2 className="mb-6 font-display text-3xl font-bold text-foreground sm:text-5xl">
            A Legacy of <span className="text-gold-gradient">Flavour</span>
          </h2>
          <div className="divider-gold mx-auto mb-8 w-20" />
          <p className="mb-6 font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
            For over six years, Cascade Premier has been the heartbeat of Thika's dining scene. 
            From our legendary calabash-served Uji Special — made with arrowroot, honey & cassava — 
            to our award-worthy pizza that rivals Italy's finest, every dish tells the story of 
            authentic Kenyan hospitality.
          </p>
          <p className="font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
            We're more than a restaurant — we're a gathering place. With spacious dining halls, 
            conference facilities seating 200+, and a team trained in-house with love, Cascade Premier 
            is where Thika comes to celebrate life's moments.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-sm border border-primary/10 bg-card/50 p-6 text-center backdrop-blur-sm"
            >
              <stat.icon className="mx-auto mb-3 h-5 w-5 text-primary" />
              <p className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 font-body text-xs uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;

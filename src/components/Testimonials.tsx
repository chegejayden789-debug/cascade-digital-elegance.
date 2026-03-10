import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

const reviews = [
  {
    text: "The pizza here, you have to travel to Italy to meet its equal...",
    rating: 5,
    time: "1 month ago",
  },
  {
    text: "Choosing Cascade for a bridal shower was a great decision... The staff helped with the set-up and made sure we had the best experience, the food was exceptional.",
    rating: 5,
    time: "1 year ago",
  },
  {
    text: "I have 5 stars after I learned that they train in-house and offer jobs to most of their staff. Kudos Cascade!",
    rating: 5,
    time: "1 year ago",
  },
  {
    text: "Wonderful and affordable restaurant in Thika Town. This is so far my favourite restaurant in Thika.",
    rating: 5,
    time: "2 years ago",
  },
  {
    text: "Great ambience, prompt and professional service. There is enough parking. Quality food at fair prices.",
    rating: 5,
    time: "3 years ago",
  },
  {
    text: "This is one of the best hotels I have been to... the food is very very good, service is world class.",
    rating: 5,
    time: "6 years ago",
  },
];

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-section-gradient py-24 sm:py-32">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 font-body text-sm font-medium uppercase tracking-[0.3em] text-primary">
            What They Say
          </p>
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-5xl">
            Loved by <span className="text-gold-gradient">Thousands</span>
          </h2>
          <div className="divider-gold mx-auto mb-6 w-20" />
          <p className="font-body text-muted-foreground">
            Over 1,064 Google reviews and counting — here's what Thika loves about us.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-sm border border-primary/10 bg-card p-6"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="mb-4 font-body text-sm italic leading-relaxed text-foreground/80">
                "{review.text}"
              </p>
              <p className="font-body text-xs text-muted-foreground">
                Google Review · {review.time}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

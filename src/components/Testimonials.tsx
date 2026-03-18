import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, Send } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [hoverRating, setHoverRating] = useState(0);

  const { data: reviews = [] } = useQuery({
    queryKey: ["customer_reviews"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("customer_reviews")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6);
      if (error) throw error;
      return data;
    },
  });

  const submitReview = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("customer_reviews")
        .insert({ name, rating, review_text: reviewText });
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Thank you! ✨", description: "Your review has been submitted and will appear after approval." });
      setName("");
      setRating(5);
      setReviewText("");
      setShowForm(false);
      queryClient.invalidateQueries({ queryKey: ["customer_reviews"] });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to submit review. Please try again.", variant: "destructive" });
    },
  });

  const getTimeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days < 30) return `${days} days ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
    const years = Math.floor(months / 12);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  };

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
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group rounded-sm border border-primary/10 bg-card p-6 transition-all hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex gap-1">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 font-body text-[10px] font-medium uppercase tracking-wider text-primary">
                  {review.source === "google" ? "Google" : "Website"}
                </span>
              </div>
              <p className="mb-4 font-body text-sm italic leading-relaxed text-foreground/80">
                "{review.review_text}"
              </p>
              <div className="flex items-center justify-between">
                <p className="font-body text-xs font-medium text-foreground/60">
                  — {review.name}
                </p>
                <p className="font-body text-xs text-muted-foreground">
                  {getTimeAgo(review.created_at)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Write a review */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          {!showForm ? (
            <Button
              onClick={() => setShowForm(true)}
              variant="outline"
              className="gap-2 border-primary/30 text-primary hover:bg-primary/10"
            >
              <Send className="h-4 w-4" />
              Write a Review
            </Button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-md rounded-lg border border-primary/10 bg-card p-6"
            >
              <h3 className="mb-4 font-display text-lg font-bold text-foreground">Share Your Experience</h3>
              
              {/* Star rating */}
              <div className="mb-4 flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-7 w-7 ${
                        star <= (hoverRating || rating)
                          ? "fill-primary text-primary"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <Input
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mb-3 border-primary/20 bg-secondary"
              />
              <Textarea
                placeholder="Tell us about your experience..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="mb-4 min-h-[100px] border-primary/20 bg-secondary"
              />
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  className="flex-1 border-primary/20"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => submitReview.mutate()}
                  disabled={!name.trim() || !reviewText.trim() || submitReview.isPending}
                  className="bg-gold-gradient flex-1 text-primary-foreground"
                >
                  {submitReview.isPending ? "Submitting..." : "Submit Review"}
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

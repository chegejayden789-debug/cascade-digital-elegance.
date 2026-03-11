import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Reservation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    reservation_date: "",
    reservation_time: "",
    guests: "",
    occasion: "",
    special_requests: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: dbError } = await supabase.from("reservations").insert({
      full_name: form.full_name.trim().slice(0, 100),
      phone: form.phone.trim().slice(0, 15),
      reservation_date: form.reservation_date,
      reservation_time: form.reservation_time,
      guests: form.guests,
      occasion: form.occasion || null,
      special_requests: form.special_requests.trim().slice(0, 500) || null,
    });

    setLoading(false);

    if (dbError) {
      setError("Something went wrong. Please try again or call us at 0708 888 444.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <section id="reserve" className="bg-section-gradient py-24 sm:py-32">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl"
        >
          <div className="mb-12 text-center">
            <p className="mb-4 font-body text-sm font-medium uppercase tracking-[0.3em] text-primary">
              Reservations
            </p>
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-5xl">
              Reserve Your <span className="text-gold-gradient">Table</span>
            </h2>
            <div className="divider-gold mx-auto mb-6 w-20" />
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-sm border border-primary/20 bg-card p-12 text-center"
            >
              <p className="font-display text-2xl font-bold text-primary">Thank You!</p>
              <p className="mt-3 font-body text-muted-foreground">
                We'll confirm your reservation shortly. See you at Cascade Premier!
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-sm border border-primary/10 bg-card p-8 sm:p-12"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block font-body text-xs uppercase tracking-widest text-muted-foreground">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    required
                    maxLength={100}
                    value={form.full_name}
                    onChange={handleChange}
                    className="w-full border-b border-border bg-transparent py-3 font-body text-foreground outline-none transition-colors focus:border-primary"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="mb-2 block font-body text-xs uppercase tracking-widest text-muted-foreground">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    maxLength={15}
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border-b border-border bg-transparent py-3 font-body text-foreground outline-none transition-colors focus:border-primary"
                    placeholder="+254 7XX XXX XXX"
                  />
                </div>
                <div>
                  <label className="mb-2 block font-body text-xs uppercase tracking-widest text-muted-foreground">
                    Date
                  </label>
                  <input
                    type="date"
                    name="reservation_date"
                    required
                    value={form.reservation_date}
                    onChange={handleChange}
                    className="w-full border-b border-border bg-transparent py-3 font-body text-foreground outline-none transition-colors focus:border-primary"
                  />
                </div>
                <div>
                  <label className="mb-2 block font-body text-xs uppercase tracking-widest text-muted-foreground">
                    Time
                  </label>
                  <input
                    type="time"
                    name="reservation_time"
                    required
                    value={form.reservation_time}
                    onChange={handleChange}
                    className="w-full border-b border-border bg-transparent py-3 font-body text-foreground outline-none transition-colors focus:border-primary"
                  />
                </div>
                <div>
                  <label className="mb-2 block font-body text-xs uppercase tracking-widest text-muted-foreground">
                    Guests
                  </label>
                  <select
                    name="guests"
                    required
                    value={form.guests}
                    onChange={handleChange}
                    className="w-full border-b border-border bg-transparent py-3 font-body text-foreground outline-none transition-colors focus:border-primary"
                  >
                    <option value="" className="bg-card">Select</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, "10+", "20+", "50+"].map((n) => (
                      <option key={n} value={n} className="bg-card">
                        {n} {typeof n === "number" && n === 1 ? "guest" : "guests"}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block font-body text-xs uppercase tracking-widest text-muted-foreground">
                    Occasion
                  </label>
                  <select
                    name="occasion"
                    value={form.occasion}
                    onChange={handleChange}
                    className="w-full border-b border-border bg-transparent py-3 font-body text-foreground outline-none transition-colors focus:border-primary"
                  >
                    <option value="" className="bg-card">Select (optional)</option>
                    <option value="casual" className="bg-card">Casual Dining</option>
                    <option value="birthday" className="bg-card">Birthday</option>
                    <option value="business" className="bg-card">Business Meeting</option>
                    <option value="bridal" className="bg-card">Bridal Shower</option>
                    <option value="conference" className="bg-card">Conference</option>
                    <option value="other" className="bg-card">Other</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="mb-2 block font-body text-xs uppercase tracking-widest text-muted-foreground">
                  Special Requests
                </label>
                <textarea
                  name="special_requests"
                  maxLength={500}
                  rows={3}
                  value={form.special_requests}
                  onChange={handleChange}
                  className="w-full border-b border-border bg-transparent py-3 font-body text-foreground outline-none transition-colors focus:border-primary"
                  placeholder="Any special requirements..."
                />
              </div>

              {error && (
                <p className="mt-4 font-body text-sm text-destructive">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="bg-gold-gradient mt-8 w-full py-4 font-body text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Reserve Now"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Reservation;
import { MapPin, Phone, Clock, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-primary/10 bg-card py-16">
      <div className="container mx-auto px-6">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold text-foreground">
              CASCADE <span className="text-gold-gradient">Premier</span>
            </h3>
            <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground">
              Thika's favourite restaurant — authentic Kenyan cuisine, legendary uji, 
              artisan pizza & unforgettable dining experiences.
            </p>
          </div>

          {/* Hours */}
          <div>
            <h4 className="mb-4 font-body text-xs font-semibold uppercase tracking-widest text-primary">
              Opening Hours
            </h4>
            <div className="space-y-2 font-body text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary/60" />
                <div>
                  <p>Monday – Saturday</p>
                  <p className="text-foreground">6:00 AM – 9:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary/60" />
                <div>
                  <p>Sunday</p>
                  <p className="text-foreground">7:00 AM – 9:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-body text-xs font-semibold uppercase tracking-widest text-primary">
              Contact
            </h4>
            <div className="space-y-3 font-body text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary/60" />
                <p>Thika Town, Kiambu County, Kenya</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary/60" />
                <p>Order via Glovo</p>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="h-4 w-4 shrink-0 text-primary/60" />
                <p>@cascadepremier</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-body text-xs font-semibold uppercase tracking-widest text-primary">
              Quick Links
            </h4>
            <div className="space-y-2 font-body text-sm">
              <a href="#menu" className="block text-muted-foreground transition-colors hover:text-primary">
                Our Menu
              </a>
              <a href="#reserve" className="block text-muted-foreground transition-colors hover:text-primary">
                Reservations
              </a>
              <a href="#about" className="block text-muted-foreground transition-colors hover:text-primary">
                About Us
              </a>
              <a
                href="https://glovoapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground transition-colors hover:text-primary"
              >
                Order on Glovo
              </a>
            </div>
          </div>
        </div>

        <div className="divider-gold mt-12 mb-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-body text-xs text-muted-foreground">
            © {new Date().getFullYear()} Cascade Premier. All rights reserved.
          </p>
          <p className="font-body text-xs text-muted-foreground">
            Thika's Finest Dining Since Day One
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

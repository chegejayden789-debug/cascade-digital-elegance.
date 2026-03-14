import { MapPin, Phone, Clock } from "lucide-react";

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
              <a 
                href="https://maps.app.goo.gl/GypH5QrnLeuq3xGb6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 transition-colors hover:text-primary"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary/60" />
                <p>Thika Town, Kiambu County, Kenya</p>
              </a>
              <a 
                href="tel:+254708888444"
                className="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4 shrink-0 text-primary/60" />
                <span>0708 888 444</span>
              </a>
              <a 
                href="https://wa.me/254708888444?text=Hi%20Cascade%20Premier!%20I'd%20like%20to%20place%20an%20order"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <svg className="h-4 w-4 shrink-0 text-primary/60" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>Order on WhatsApp</span>
              </a>
              <a 
                href="https://www.tiktok.com/@cascade_kitchens0?_r=1&_t=ZS-94e7uiyB5VM"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <svg className="h-4 w-4 shrink-0 text-primary/60" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
                <span>@cascade_kitchens0</span>
              </a>
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

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import MenuHighlights from "@/components/MenuHighlights";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Events from "@/components/Events";
import Reservation from "@/components/Reservation";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import PageTransition from "@/components/PageTransition";

const Index = () => {
  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <Navbar />
        <Hero />
        <About />
        <MenuHighlights />
        <Gallery />
        <Testimonials />
        <section id="events">
          <Events />
        </section>
        <Reservation />
        <Footer />
        <WhatsAppWidget />
      </main>
    </PageTransition>
  );
};

export default Index;

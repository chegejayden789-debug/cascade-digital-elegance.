import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import MenuHighlights from "@/components/MenuHighlights";
import Testimonials from "@/components/Testimonials";
import Events from "@/components/Events";
import Reservation from "@/components/Reservation";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <MenuHighlights />
      <Testimonials />
      <section id="events">
        <Events />
      </section>
      <Reservation />
      <Footer />
    </main>
  );
};

export default Index;

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import FinancialCalculator from '@/components/FinancialCalculator';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Services />
        <FinancialCalculator />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

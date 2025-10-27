import Hero from '@/components/Hero';
import Services from '@/components/Services';
import FinancialCalculator from '@/components/FinancialCalculator';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';

export default function Home() {
    return (
        <div className="min-h-screen bg-white">
            <main>
                <Hero />
                <Services />
                <FinancialCalculator />
                <About />
                <Testimonials />
                <Contact />
            </main>

        </div>
    );
}

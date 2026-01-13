import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Blogs from "@/components/Blogs";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <main>
        <Hero />
        <Services />
        <Blogs />     {/* ✅ Blog Section */}
        <About />
        <Testimonials />
        <Contact />
      </main>
    </div>
  );
}

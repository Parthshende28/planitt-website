import Link from "next/link";
import ProjectSection from "@/components/ProjectSection";

export default function AppDevPage() {
  return (
    <section className="bg-white text-gray-900">
      <div className="container mx-auto px-6 py-20">



        {/* Hero */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
          App Development
        </h1>

        <p className="text-gray-600 max-w-3xl mb-12">
          Native and cross-platform mobile applications built with modern
          technologies to deliver performance, scalability, and exceptional user experience.
        </p>

        {/* Projects */}
        <ProjectSection
          title="App Development Projects"
          subtitle="Our latest mobile applications and digital products are coming soon."
          accentColor="indigo"
          projects={[]}
        />

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-10 text-white text-center">
          <h3 className="text-2xl font-bold mb-3">
            Have an App Idea?
          </h3>
          <p className="mb-6 max-w-2xl mx-auto text-indigo-50">
            Let’s turn your idea into a high-performing mobile application.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transition"
          >
            Get Free Consultation →
          </Link>
        </div>

      </div>
      </div>
    </section>
  );
}

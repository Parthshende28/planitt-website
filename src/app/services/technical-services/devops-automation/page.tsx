import Link from "next/link";
import ProjectSection from "@/components/ProjectSection";
import { GitBranch, Repeat, Server, Activity } from "lucide-react";

export default function DevOpsPage() {
  return (
    <section className="bg-white text-gray-900">
      <div className="container mx-auto px-6 py-20">


        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            DevOps & Automation
          </h1>
          <p className="text-gray-600 text-lg">
            Automate deployments and improve system reliability with DevOps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <FeatureCard icon={<GitBranch />} title="CI/CD Pipelines" description="Automated deployments" />
          <FeatureCard icon={<Repeat />} title="Automation" description="Reduced manual effort" />
          <FeatureCard icon={<Server />} title="Infrastructure" description="Cloud & IaC" />
          <FeatureCard icon={<Activity />} title="Monitoring" description="Logs & performance" />
        </div>

        {/* Projects */}
        <ProjectSection
          title="DevOps & Automation Projects"
          subtitle="Our latest DevOps and automation implementations are coming soon."
          accentColor="indigo"
          projects={[]}
        />

        <CTA />
      </div>
    </section>
  );
}
function CTA() {
  return (
    <div className="
      bg-gradient-to-r from-indigo-700 to-slate-900
      rounded-2xl p-10
      text-white text-center
    ">
      <h3 className="text-2xl font-bold mb-3">
        Ready to Automate Your Infrastructure?
      </h3>

      <p className="mb-6 max-w-2xl mx-auto text-indigo-50">
        Let’s build reliable CI/CD pipelines, automate deployments, and
        scale your infrastructure with modern DevOps practices.
      </p>

      <Link
        href="/#contact"
        className="
          inline-flex items-center justify-center
          bg-white text-indigo-900
          px-8 py-4 rounded-lg
          font-semibold
          hover:bg-indigo-50 transition
        "
      >
        Get Free DevOps Consultation →
      </Link>
    </div>
  );
}


/* ---------- Feature Card Component ---------- */
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:border-indigo-500 transition group">
      <div className="mb-4 text-indigo-500 group-hover:scale-110 transition">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-gray-900">
        {title}
      </h3>
      <p className="text-gray-600 text-sm">
        {description}
      </p>
    </div>
  );
}

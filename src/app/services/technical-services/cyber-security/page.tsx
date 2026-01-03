import Link from "next/link";
import ProjectSection from "@/components/ProjectSection";
import { ShieldCheck, Lock, Eye, FileShield, ArrowLeft } from "lucide-react";

export default function CyberSecurityPage() {
  return (
    <section className="bg-white text-gray-900">
      <div className="container mx-auto px-6 py-20">
        
        {/* Hero */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Cyber Security
          </h1>
          <p className="text-gray-600 text-lg">
            Protect your digital assets with enterprise-grade security solutions
            designed to mitigate risks and ensure business continuity.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            icon={<ShieldCheck />}
            title="Vulnerability Assessment"
            description="Identify and fix security loopholes before they can be exploited."
          />
          <FeatureCard
            icon={<Lock />}
            title="Data Encryption"
            description="Ensure your sensitive data remains private and secure at rest and in transit."
          />
          <FeatureCard
            icon={<Eye />}
            title="Threat Monitoring"
            description="24/7 monitoring to detect and respond to security threats in real-time."
          />
        </div>

        {/* Projects */}
        <ProjectSection
          title="Security Case Studies"
          subtitle="Our latest cyber security projects are coming soon."
          accentColor="indigo"
          projects={[]}
        />

        {/* CTA */}
        <div className="bg-gradient-to-r from-slate-800 to-indigo-900 rounded-2xl p-10 text-white text-center">
          <h3 className="text-2xl font-bold mb-3">
            Secure Your Digital Future
          </h3>
          <p className="mb-6 max-w-2xl mx-auto text-indigo-50">
            Let’s build a robust security strategy to protect your business
            from evolving cyber threats.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-white text-indigo-900 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transition"
          >
            Get a Security Consultation
            <ArrowLeft className="rotate-180" size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

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
      <div className="mb-4 text-indigo-600 group-hover:scale-110 transition">
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

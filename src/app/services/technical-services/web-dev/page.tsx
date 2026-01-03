import Link from "next/link";
import ProjectSection from "@/components/ProjectSection";
import {
  ArrowLeft,
  Globe,
  Code,
  Zap,
  ShieldCheck,
  Smartphone,
  Layers,
} from "lucide-react";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPostman,
  SiGoogleanalytics,
} from "react-icons/si";


export default function WebDevPage() {
  return (
    <section className="bg-white text-gray-900">
      <div className="container mx-auto px-6 py-20">


        {/* Hero */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Website Development
          </h1>
          <p className="text-gray-600 text-lg">
            We build modern, fast, and scalable websites that combine stunning
            design with powerful technology to help your business grow online.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            icon={<Globe />}
            title="Modern Frameworks"
            description="Built with Next.js and React for blazing-fast performance and SEO."
          />
          <FeatureCard
            icon={<Zap />}
            title="High Performance"
            description="Optimized for speed, accessibility, and user experience."
          />
          <FeatureCard
            icon={<ShieldCheck />}
            title="Secure & Reliable"
            description="Security best practices and scalable backend architecture."
          />
          <FeatureCard
            icon={<Smartphone />}
            title="Fully Responsive"
            description="Perfect experience across mobile, tablet, and desktop."
          />
          <FeatureCard
            icon={<Code />}
            title="Clean Code"
            description="Maintainable, scalable, and future-proof development."
          />
          <FeatureCard
            icon={<Layers />}
            title="Scalable Architecture"
            description="Designed to grow with your business needs."
          />
        </div>

        {/* Technologies */}
<div className="mb-20">
  <h2 className="text-2xl font-semibold mb-8">
    Technologies We Use
  </h2>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
    <TechItem icon={<SiNextdotjs />} label="Next.js" color="text-black" />
    <TechItem icon={<SiReact />} label="React" color="text-cyan-500" />
    <TechItem icon={<SiTypescript />} label="TypeScript" color="text-blue-600" />
    <TechItem icon={<SiTailwindcss />} label="Tailwind CSS" color="text-teal-500" />
    <TechItem icon={<SiNodedotjs />} label="Node.js" color="text-green-600" />
    <TechItem icon={<SiPostman />} label="REST APIs" color="text-orange-600" />
    <TechItem icon={<SiGoogleanalytics />} label="SEO Optimization" color="text-yellow-600" />
  </div>
</div>

        {/* Projects */}
        <ProjectSection
          title="Web Development Projects"
          subtitle="A showcase of our high-performance websites and web applications."
          accentColor="blue"
          projects={[
            {
              title: "ZeyNix",
              description: "A premium e-commerce platform for fashion enthusiasts, featuring a seamless shopping experience and responsive design.",
              image: "/Zeynix.png",
              liveLink: "https://www.zeynix.in/",
              tags: ["E-commerce", "React", "Next.js"],
            },
            {
              title: "Lancers.io",
              description: "A modern agency landing page with high-performance animations and a clean, professional aesthetic.",
              image: "/Lancers.png",
              liveLink: "https://lancers-io.vercel.app/",
              tags: ["Agency", "Portfolio", "Tailwind CSS"],
            },
            {
              title: "Krypsm",
              description: "A secure and intuitive cryptocurrency trading platform dashboard with real-time data visualization.",
              image: "/Krypsm.png",
              liveLink: "https://krypsm.com/",
              tags: ["Web App", "Fintech", "Dashboard"],
            },
          ]}
        />

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-10 text-white">
          <h3 className="text-2xl font-bold mb-3">
            Ready to Build Your Website?
          </h3>
          <p className="mb-6 max-w-2xl text-blue-50">
            Let’s create a powerful online presence that drives traffic,
            engagement, and conversions for your business.
          </p>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            Build Your Website
            <ArrowLeft className="rotate-180" size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- Feature Card Component ---------- */
function TechItem({
  icon,
  label,
  color = "text-blue-600",
}: {
  icon: React.ReactNode;
  label: string;
  color?: string;
}) {
  return (
    <div className="
  relative overflow-hidden
  flex flex-col items-center justify-center gap-3
  bg-gray-50 border border-gray-200
  rounded-xl p-6
  text-gray-700
  transition-all duration-300
  hover:-translate-y-1
  hover:border-transparent
  group
">
  {/* Gradient Hover */}
  <div className="
    absolute inset-0
    bg-linear-to-br from-blue-500/10 to-indigo-500/10
    opacity-0 group-hover:opacity-100
    transition-opacity duration-300
  " />
  <div className="relative z-10 flex flex-col items-center gap-3">
    <div className={`text-3xl ${color} group-hover:scale-110 transition`}>
      {icon}
    </div>
    <span className="text-sm font-medium text-gray-900">
      {label}
    </span>
  </div>
</div>

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
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:border-blue-500 transition group">
      <div className="mb-4 text-blue-600 group-hover:scale-110 transition">
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

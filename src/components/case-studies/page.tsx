import { FileText, ArrowUpRight } from "lucide-react";

interface CaseStudy {
  title: string;
  description: string;
  industry: string;
  pdf: string;
}

const caseStudies: CaseStudy[] = [
  {
    title: "Investor Dashboard Platform",
    description:
      "An in-house private fintech platform built for investors to track portfolios, profits, and growth analytics securely.",
    industry: "Fintech • In-house",
    pdf: "/case-studies/investor-dashboard.pdf",
  },
  {
    title: "ZeyNix E-commerce Platform",
    description:
      "A high-performance fashion e-commerce platform focused on scalability, UX, and conversion optimization.",
    industry: "E-commerce",
    pdf: "/case-studies/zeynix-case-study.pdf",
  },
  {
    title: "Krypsm Trading Dashboard",
    description:
      "A secure crypto trading dashboard with real-time analytics, charts, and role-based access control.",
    industry: "Fintech • Web App",
    pdf: "/case-studies/krypsm-case-study.pdf",
  },
];

export default function CaseStudiesPage() {
  return (
    <section className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-6 py-20">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Case Studies
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Detailed breakdowns of our projects, processes, and results —
            available as downloadable PDFs.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((item, index) => (
            <a
              key={index}
              href={item.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group relative
                bg-gray-50 dark:bg-gray-900
                border border-gray-200 dark:border-gray-800
                rounded-2xl p-6
                hover:border-indigo-500 dark:hover:border-indigo-400
                hover:shadow-xl
                transition
              "
            >
              {/* Icon */}
              <div className="mb-4 inline-flex items-center justify-center
                              w-12 h-12 rounded-xl
                              bg-indigo-100 dark:bg-indigo-500/20
                              text-indigo-600 dark:text-indigo-400">
                <FileText />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {item.description}
              </p>

              <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                {item.industry}
              </span>

              {/* CTA */}
              <div className="mt-6 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium">
                View Case Study
                <ArrowUpRight
                  size={16}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

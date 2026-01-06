import Image from "next/image";

export interface Project {
  title: string;
  description: string;
  image: string;
  liveLink?: string;
  tags?: string[];
}

interface ProjectSectionProps {
  title?: string;
  subtitle?: string;
  projects: Project[];
  accentColor?: "blue" | "indigo" | "rose" | "orange" | "green" | "cyan";
}

export default function ProjectSection({
  title = "Our Featured Projects",
  subtitle = "Check out some of our recent work across various industries.",
  projects,
  accentColor = "blue",
}: ProjectSectionProps) {
  const spinnerColor = {
    blue: "border-blue-600",
    indigo: "border-indigo-600",
    rose: "border-rose-600",
    orange: "border-orange-600",
    green: "border-green-600",
    cyan: "border-cyan-600",
  }[accentColor];

  return (
    <section className="mb-24">
      {/* Header */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">{title}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
      </div>

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block h-72 rounded-2xl overflow-hidden
                         border border-gray-200 bg-gray-100
                         transition-all duration-300
                         hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500
                           group-hover:scale-105"
              />

              {/* Hover Overlay */}
              <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm
                           opacity-0 group-hover:opacity-100
                           transition-opacity duration-300
                           flex flex-col justify-end p-6"
              >
                <h3 className="text-white text-xl font-semibold mb-2">
                  {project.title}
                </h3>

                <p className="text-gray-200 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {project.tags && (
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs rounded-full
                                   bg-white/10 text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 border-2 border-dashed border-gray-200 rounded-3xl
                        flex flex-col items-center text-center bg-gray-50">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm
                          flex items-center justify-center mb-4">
            <div
              className={`w-8 h-8 rounded-full border-4
                          border-t-transparent animate-spin ${spinnerColor}`}
            />
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Projects Coming Soon
          </h3>
          <p className="text-gray-500 max-w-sm">
            We&apos;re currently working on some amazing projects. Check back soon to
            see our latest work.
          </p>
        </div>
      )}
    </section>
  );
}

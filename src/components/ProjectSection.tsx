import Image from "next/image";
import { ExternalLink } from "lucide-react";

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
  accentColor?: string;
}

export default function ProjectSection({
  title = "Our Featured Projects",
  subtitle = "Check out some of our recent work across various industries.",
  projects,
  accentColor = "blue",
}: ProjectSectionProps) {
  const getAccentClass = (color: string) => {
    switch (color) {
      case "blue": return "text-blue-600 border-blue-600 hover:bg-blue-600";
      case "indigo": return "text-indigo-600 border-indigo-600 hover:bg-indigo-600";
      case "rose": return "text-rose-600 border-rose-600 hover:bg-rose-600";
      case "orange": return "text-orange-600 border-orange-600 hover:bg-orange-600";
      case "green": return "text-green-600 border-green-600 hover:bg-green-600";
      case "cyan": return "text-cyan-600 border-cyan-600 hover:bg-cyan-600";
      default: return "text-blue-600 border-blue-600 hover:bg-blue-600";
    }
  };

  const accentClass = getAccentClass(accentColor);

  return (
    <div className="mb-20">
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">{title}</h2>
        <p className="text-gray-600 max-w-2xl">{subtitle}</p>
      </div>

      {projects.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Project Image */}
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Project Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags?.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-gray-100 text-gray-500 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm mb-6 flex-grow">
                  {project.description}
                </p>

                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 border-2 px-4 py-2 rounded-lg font-semibold transition-colors w-fit text-sm ${accentClass} hover:text-white`}
                  >
                    Live Preview
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-center bg-gray-50/50">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
            <div className={`w-8 h-8 rounded-full border-4 border-t-transparent animate-spin ${accentColor === 'blue' ? 'border-blue-600' : accentColor === 'indigo' ? 'border-indigo-600' : accentColor === 'rose' ? 'border-rose-600' : accentColor === 'cyan' ? 'border-cyan-600' : 'border-blue-600'}`}></div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Projects Coming Soon</h3>
          <p className="text-gray-500 max-w-sm">
            We're currently working on some amazing projects. Check back soon to see our latest work in this category.
          </p>
        </div>
      )}
    </div>
  );
}

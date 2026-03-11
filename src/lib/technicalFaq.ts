type TechnicalFaqEntry = {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
  pathPrefixes?: string[];
  followUps?: string[];
};

export type TechnicalFaqMatch = {
  reply: string;
  suggestions: string[];
  matches: Array<Pick<TechnicalFaqEntry, "id" | "question">>;
};

const TECHNICAL_FAQ: TechnicalFaqEntry[] = [
  {
    id: "technical-services-overview",
    question: "What technical services does Planitt offer?",
    answer:
      "Planitt currently offers:\n\n• Website development\n• App development\n• Cloud services\n• Digital marketing\n• DevOps and automation\n• Cyber security\n\nIf you want, ask about one specific service and I will give a more direct answer.",
    keywords: ["services", "offer", "technical", "what do you do", "development", "marketing", "cloud", "devops", "cyber"],
    followUps: [
      "What is included in website development?",
      "What is included in app development?",
      "What does the cloud services plan cover?",
      "What is included in DevOps and automation?",
    ],
  },
  {
    id: "web-development",
    question: "What is included in website development?",
    answer:
      "Website development includes:\n\n• Modern website build with Next.js, React, TypeScript, Tailwind CSS, Node.js, and API integration\n• Discovery and planning\n• UI/UX design and prototyping\n• Development and deployment\n• Focus on performance, responsiveness, and SEO\n\nIf needed, you can also ask about project scope, maintenance, or revision policy.",
    keywords: ["website", "web", "site", "next.js", "react", "seo", "frontend", "backend"],
    pathPrefixes: ["/services/technical-services/web-dev"],
    followUps: [
      "What is included in project scope?",
      "What maintenance plans are available for web or DevOps work?",
      "What is the revision policy?",
    ],
  },
  {
    id: "app-development",
    question: "What is included in app development?",
    answer:
      "App development includes:\n\n• Native and cross-platform mobile apps\n• Backend and API integration\n• Performance and scalability focus\n• Security-minded implementation\n• Tech stack such as React, React Native, Flutter, Expo, TypeScript, Firebase, Kotlin, and Swift\n\nYou can also ask about app maintenance pricing, scope, or delivery flow.",
    keywords: ["app", "mobile", "react native", "flutter", "android", "ios", "expo", "firebase"],
    pathPrefixes: ["/services/technical-services/app-dev"],
    followUps: [
      "What maintenance plans are available for app development?",
      "What is included in project scope?",
      "How does Planitt handle project timelines?",
    ],
  },
  {
    id: "cloud-services",
    question: "What does the cloud services plan cover?",
    answer:
      "Cloud services cover:\n\n• Cloud migration\n• Infrastructure design\n• Security and IAM\n• High availability and disaster recovery\n• Load balancing and monitoring\n• Cost optimization\n\nThe service references AWS, Azure, and GCP support.",
    keywords: ["cloud", "aws", "azure", "gcp", "migration", "infrastructure", "hosting", "server"],
    pathPrefixes: ["/services/technical-services/cloud-services"],
    followUps: [
      "How does Planitt handle project timelines?",
      "How can I get a quote or discuss requirements?",
    ],
  },
  {
    id: "devops-automation",
    question: "What is included in DevOps and automation?",
    answer:
      "DevOps and automation includes:\n\n• CI/CD pipelines\n• Deployment automation\n• Infrastructure management\n• Monitoring and quality gates\n• Docker and Kubernetes workflows\n• Better environment management and reliability\n\nThis service is meant to reduce manual work and make releases more stable.",
    keywords: ["devops", "automation", "ci/cd", "deployment", "docker", "kubernetes", "terraform", "ansible", "monitoring"],
    pathPrefixes: ["/services/technical-services/devops-automation"],
    followUps: [
      "What maintenance plans are available for web or DevOps work?",
      "What is included in project scope?",
      "How does Planitt handle project timelines?",
    ],
  },
  {
    id: "cyber-security",
    question: "What does the cyber security service include?",
    answer:
      "Cyber security includes:\n\n• Threat protection\n• Vulnerability assessment\n• Data security and encryption\n• Monitoring and detection\n• Compliance and audits\n• Risk management and incident response planning",
    keywords: ["cyber", "security", "threat", "vulnerability", "audit", "compliance", "encryption", "incident"],
    pathPrefixes: ["/services/technical-services/cyber-security"],
    followUps: [
      "How does Planitt handle project timelines?",
      "How can I get a quote or discuss requirements?",
    ],
  },
  {
    id: "digital-marketing",
    question: "What is included in digital marketing?",
    answer:
      "Digital marketing includes:\n\n• SEO\n• Social media marketing\n• Paid advertising\n• Content marketing\n• Audience targeting\n• Performance analytics\n\nThe approach shown on the page is strategy and planning, execution and optimization, then reporting and growth.",
    keywords: ["digital marketing", "seo", "social media", "ads", "content", "audience", "campaign", "marketing"],
    pathPrefixes: ["/services/technical-services/digital-marketing"],
    followUps: [
      "How can I get a quote or discuss requirements?",
      "How does Planitt handle project timelines?",
    ],
  },
  {
    id: "maintenance-plans-overview",
    question: "What maintenance plans are available?",
    answer:
      "Planitt shows maintenance and support plans on selected technical pages.\n\n• Monthly maintenance starts at Rs 6,999\n• Annual plans are also available\n• Final pricing and inclusions depend on the service page and project scope\n\nIf you want, ask specifically for web, app, or DevOps maintenance pricing.",
    keywords: ["maintenance plans", "maintenance", "support plans", "monthly", "annual", "pricing", "6999"],
    followUps: [
      "What maintenance plans are available for web or DevOps work?",
      "What maintenance plans are available for app development?",
      "What does maintenance cover?",
    ],
  },
  {
    id: "maintenance-plans-web-devops",
    question: "What maintenance plans are available for web or DevOps work?",
    answer:
      "For website development and DevOps:\n\n• Monthly maintenance: Rs 6,999\n• Annual maintenance: Rs 29,999\n\nPlan highlights:\n• Bug fixes and minor updates\n• Performance optimization\n• Security updates\n• Basic feature additions\n• Priority support and quarterly reviews on the annual plan",
    keywords: ["maintenance", "support", "monthly", "annual", "6999", "29999", "plan", "bug fixes", "priority support"],
    pathPrefixes: [
      "/services/technical-services/web-dev",
      "/services/technical-services/devops-automation",
    ],
    followUps: [
      "What does maintenance cover?",
      "What is the revision policy?",
      "What is included in project scope?",
    ],
  },
  {
    id: "maintenance-plans-app-dev",
    question: "What maintenance plans are available for app development?",
    answer:
      "For app development:\n\n• Monthly maintenance: Rs 6,999\n• Annual maintenance: Rs 59,999\n\nPlan highlights:\n• Bug fixes and minor updates\n• Performance optimization\n• Security updates\n• Basic feature additions\n• Priority support and advanced feature work on the annual plan",
    keywords: ["maintenance", "support", "monthly", "annual", "6999", "59999", "app maintenance", "priority support"],
    pathPrefixes: ["/services/technical-services/app-dev"],
    followUps: [
      "What does maintenance cover?",
      "What is the revision policy?",
      "What is included in project scope?",
    ],
  },
  {
    id: "project-scope",
    question: "What is included in project scope?",
    answer:
      "Project scope currently states:\n\n• Complete development is included\n• Backend and database integration are included\n• Hosting and publishing are included\n• Domain purchases or app store subscriptions are separate\n\nThis applies to the technical service terms shown on the site.",
    keywords: ["scope", "included", "backend", "database", "hosting", "publishing", "domain", "app store", "what is included"],
    followUps: [
      "What is the revision policy?",
      "Are agreements signed separately?",
      "How can I get a quote or discuss requirements?",
    ],
  },
  {
    id: "revision-policy",
    question: "What is the revision policy?",
    answer:
      "Revision policy:\n\n• Changes requested within the first month after project completion are included at no extra cost\n• After one month, extra changes may be charged based on complexity and time required",
    keywords: ["revision", "changes", "after launch", "after completion", "edits", "fixes", "first month"],
    followUps: [
      "What does maintenance cover?",
      "Are agreements signed separately?",
      "How can I get a quote or discuss requirements?",
    ],
  },
  {
    id: "maintenance-scope",
    question: "What does maintenance cover?",
    answer:
      "Maintenance covers:\n\n• Bug fixes\n• Feature additions\n• Incremental improvements\n\nIt does not include major redevelopment or large architectural changes. Those would be quoted separately.",
    keywords: ["maintenance scope", "maintenance cover", "bug fixes", "feature additions", "redevelopment", "architecture"],
    followUps: [
      "What maintenance plans are available?",
      "What is the revision policy?",
      "How can I get a quote or discuss requirements?",
    ],
  },
  {
    id: "agreements",
    question: "Are agreements signed separately?",
    answer:
      "Yes.\n\nSeparate agreements are signed for:\n• Project development\n• Monthly maintenance\n• Annual maintenance\n\nThe terms are finalized before work begins.",
    keywords: ["agreement", "contract", "signed", "terms", "before work begins"],
    followUps: [
      "What is included in project scope?",
      "What is the revision policy?",
    ],
  },
  {
    id: "timeline",
    question: "How does Planitt handle project timelines?",
    answer:
      "Planitt shows a staged delivery process instead of one fixed public timeline.\n\nTypical flow:\n• Discovery or planning\n• Design or solution planning\n• Development\n• Testing\n• Deployment\n• Support\n\nFinal timelines depend on project scope and requirements.",
    keywords: ["timeline", "duration", "delivery", "how long", "deadline", "launch", "process"],
    followUps: [
      "What is included in project scope?",
      "How can I get a quote or discuss requirements?",
    ],
  },
  {
    id: "contact",
    question: "How can I get a quote or discuss requirements?",
    answer:
      "To get a quote, use the main contact section and mention:\n\n• Which technical service you need\n• Your main scope or expected features\n• Whether you need maintenance or ongoing support\n• Any timeline or delivery expectations\n\nThat will make the first discussion much more precise.",
    keywords: ["quote", "contact", "consultation", "talk", "requirements", "pricing"],
    followUps: [
      "What technical services does Planitt offer?",
      "What is included in project scope?",
      "How does Planitt handle project timelines?",
    ],
  },
];

const DEFAULT_SUGGESTIONS = [
  "What technical services does Planitt offer?",
  "What is included in project scope?",
  "What maintenance plans are available?",
  "How does Planitt handle project timelines?",
];

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s./+-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const scoreEntry = (entry: TechnicalFaqEntry, query: string, pathname?: string) => {
  let score = 0;

  for (const keyword of entry.keywords) {
    const normalizedKeyword = normalize(keyword);
    if (query.includes(normalizedKeyword)) score += normalizedKeyword.includes(" ") ? 5 : 3;
  }

  const normalizedQuestion = normalize(entry.question);
  if (query.includes(normalizedQuestion)) score += 8;

  if (pathname && entry.pathPrefixes?.some((prefix) => pathname.startsWith(prefix))) score += 2;

  return score;
};

const pageScopedSuggestions = (pathname?: string) => {
  if (!pathname) return DEFAULT_SUGGESTIONS;
  if (pathname.startsWith("/services/technical-services/web-dev")) {
    return [
      "What is included in website development?",
      "What maintenance plans are available for web or DevOps work?",
      "What is included in project scope?",
      "What is the revision policy?",
      "How can I get a quote or discuss requirements?",
    ];
  }
  if (pathname.startsWith("/services/technical-services/app-dev")) {
    return [
      "What is included in app development?",
      "What maintenance plans are available for app development?",
      "What is included in project scope?",
      "How does Planitt handle project timelines?",
      "What is the revision policy?",
    ];
  }
  if (pathname.startsWith("/services/technical-services/cloud-services")) {
    return [
      "What does the cloud services plan cover?",
      "How does Planitt handle project timelines?",
      "What is included in project scope?",
      "How can I get a quote or discuss requirements?",
    ];
  }
  if (pathname.startsWith("/services/technical-services/devops-automation")) {
    return [
      "What is included in DevOps and automation?",
      "What maintenance plans are available for web or DevOps work?",
      "What is included in project scope?",
      "How does Planitt handle project timelines?",
    ];
  }
  if (pathname.startsWith("/services/technical-services/cyber-security")) {
    return [
      "What does the cyber security service include?",
      "How does Planitt handle project timelines?",
      "How can I get a quote or discuss requirements?",
      "What technical services does Planitt offer?",
    ];
  }
  if (pathname.startsWith("/services/technical-services/digital-marketing")) {
    return [
      "What is included in digital marketing?",
      "How does Planitt handle project timelines?",
      "How can I get a quote or discuss requirements?",
      "What technical services does Planitt offer?",
    ];
  }
  return DEFAULT_SUGGESTIONS;
};

export const technicalFaqPrompts = [
  "What technical services does Planitt offer?",
  "What maintenance plans are available?",
  "What is included in project scope?",
  "How does Planitt handle project timelines?",
  "How can I get a quote or discuss requirements?",
];

export function answerTechnicalFaq(message: string, pathname?: string): TechnicalFaqMatch {
  const query = normalize(message);
  const exactMatch = TECHNICAL_FAQ.find((entry) => normalize(entry.question) === query);
  if (exactMatch) {
    return {
      reply: exactMatch.answer,
      suggestions: (exactMatch.followUps?.length ? exactMatch.followUps : pageScopedSuggestions(pathname)).slice(0, 4),
      matches: [{ id: exactMatch.id, question: exactMatch.question }],
    };
  }

  const scored = TECHNICAL_FAQ.map((entry) => ({ entry, score: scoreEntry(entry, query, pathname) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    return {
      reply:
        "I can help with Planitt technical FAQs.\n\nYou can ask about:\n• Service details\n• Project scope\n• Maintenance plans\n• Revision policy\n• Timelines\n• Contact and quote flow",
      suggestions: pageScopedSuggestions(pathname),
      matches: [],
    };
  }

  const best = scored[0].entry;

  return {
    reply: best.answer,
    suggestions: (best.followUps?.length ? best.followUps : pageScopedSuggestions(pathname)).slice(0, 4),
    matches: [{ id: best.id, question: best.question }],
  };
}

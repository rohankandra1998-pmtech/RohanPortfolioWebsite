export type SocialLink = {
  label: string;
  href: string;
};

export type ExperienceLogoVariant = "standard" | "wide" | "compact";

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  skills: string[];
  logoSrc: string;
  logoVariant: ExperienceLogoVariant;
};

export type ProjectMedia = {
  src: string;
  alt: string;
  caption: string;
};

export type ProjectSection = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  media?: ProjectMedia[];
};

export type Project = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  timeframe: string;
  organization: string;
  role: string;
  team: string;
  tags: string[];
  image: string;
  imageAlt: string;
  liveUrl?: string;
  repoUrl?: string;
  metrics: { value: string; label: string }[];
  sections: ProjectSection[];
};

export const contact = {
  name: "Rohan Singh Kandra",
  shortName: "Rohan",
  email: "rohankandra1998@gmail.com",
  location: "San Francisco Bay Area",
  positioning: "Product Manager & AI Product Builder",
  statement:
    "I turn complex systems into products people can understand, trust, and use.",
};

export const socials: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/MeetRohanKandra",
  },
  {
    label: "GitHub",
    href: "https://github.com/rohankandra1998-pmtech",
  },
  {
    label: "Email",
    href: `mailto:${contact.email}`,
  },
];

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Work", href: "/work" },
  { label: "Thoughts", href: "/thoughts" },
  { label: "Contact", href: "/contact" },
];

export const experiences: Experience[] = [
  {
    company: "Vivify Solutions Inc",
    role: "Product Manager Co-Op",
    period: "Jun 2025 — Apr 2026",
    location: "Atlanta, GA · Remote",
    summary:
      "Brought structure to ambiguous early-stage product work across discovery, requirements, design, and delivery.",
    highlights: [
      "Drove MVP delivery for an entrepreneurship app by defining 3 epics, 50+ user stories, and 150+ acceptance criteria in Jira, optimizing backlog management and cutting developer clarification cycles via sprint planning and backlog grooming, reducing time-to-market by 30%.",
      "Authored a Product Requirements Document (PRD) for an entrepreneurship app redesign, defining 6 MVP product features and translating Figma UX/UI wireframes and user flow diagrams into actionable requirements, reducing rework by 20% for a 3-stage product roadmap.",
      "Shipped a 0-1 financial literacy app for children with 6 MVP learning features based on user research, driving 5K+ weekly active users, 4.5 parent CSAT, and 62% lesson completion within 30 days.",
      "Led end-to-end product discovery for a women's wellness and productivity app within 7 weeks, turning 25+ interviews, 500+ survey responses, and market analysis into target audience segments, user needs, MVP features, UI/UX design, and refined product strategy.",
      "Built a 6-stage user journey map for a healthcare app in Figma/FigJam based on 10+ customer interviews, 1,000+ survey responses, and product discovery to map personas, actions, goals, emotions, pain points, and opportunities, prioritizing 15+ features in product design.",
      "Conducted secondary market research to size a 9M target market and prioritize 3 customer segments to guide go-to-market strategy.",
      "Redesigned Confluence documentation for 3 software products / projects, including REST & Rx, Business Builderz, and FLIP where specified, creating a standardized hierarchy to cut knowledge retrieval time and improve onboarding efficiency by 50%.",
      "Designed an AI-powered workflow to automate daily standups and follow-up reminders, improving internal productivity by 15%.",
      "Managed weekly intake of 20+ questions and blockers from Engineering, Design, QA, and cross-functional partners, clarifying scope, dependencies, and acceptance criteria to unblock 15+ Jira tickets per sprint and support on-time product delivery.",
    ],
    skills: [
      "Product discovery",
      "User stories",
      "Acceptance criteria",
      "Market research",
      "Figma",
      "AI workflow automation",
      "MVP delivery",
      "Jira",
      "Product requirements documents",
      "Backlog management",
      "Backlog grooming",
      "Sprint planning",
      "User journey mapping",
      "FigJam",
      "Customer interviews",
      "Survey analysis",
      "Market sizing",
      "Go-to-market strategy",
      "Product strategy",
      "Confluence",
      "Cross-functional collaboration",
    ],
    logoSrc: "/images/experience/vivify-solutions-logo.png",
    logoVariant: "compact",
  },
  {
    company: "PwC",
    role: "Technology Consultant · Data Analytics",
    period: "Oct 2022 — May 2024",
    location: "Bangalore, India",
    summary:
      "Built analytics products, automation, and a source-grounded knowledge assistant for enterprise teams.",
    highlights: [
      "Developed and managed the end-to-end product lifecycle of 7 reports for Unilever's business unit by collaborating with 10+ stakeholders to gather requirements, design, and deploy solutions, driving supply chain automation and process optimization to boost efficiency by 21%.",
      "Resolved 40+ monthly BI troubleshooting tasks via root cause analysis, including bug fixes, ad-hoc analysis, DAX optimization, SQL queries, Power BI report updates, and user acceptance testing (UAT), aligning with company SLA, product vision, and OKR fulfillment.",
      "Accelerated mitigation efforts by 55% by building 50+ automated email alerts using Power Automate to notify concerned teams of KPI breaches, addressing customer compliance needs, reducing response time by 14 days, and enhancing customer satisfaction.",
      "Deployed a Generative AI conversational RAG assistant for PwC's internal team using OpenAI LLM, embedding model, semantic chunking, and Python to enable source-grounded Q&A across internal/HR docs, reducing manual search time by 70% and answer retrieval from 10+ minutes to under 30 seconds.",
      "Multitasked responsibilities for Unilever and Tata Hitachi as an emergency backup to meet customer needs, swiftly taking over Power BI development, implementing new features, and resolving 10+ weekly bugs or logic modifications based on user feedback.",
      "Communicated complex solutions via 30+ technical documents, covering product features, user stories, and more for 500+ end users.",
      "Coached and guided 30+ interns, professionals, clients, and customers in industry-standard technologies through knowledge transfer, one-on-one sessions, and workshops, fostering ownership, problem-solving skills, and subject matter expertise.",
    ],
    skills: [
      "Product analytics",
      "Stakeholder management",
      "Power BI",
      "Power Automate",
      "RAG",
      "Supply-chain analytics",
      "Requirements gathering",
      "Root-cause analysis",
      "DAX",
      "SQL",
      "User acceptance testing",
      "BI troubleshooting",
      "OpenAI LLMs",
      "Python",
      "Embeddings",
      "Semantic chunking",
      "Technical documentation",
      "Knowledge transfer",
      "Coaching and enablement",
      "Agile delivery",
      "OKRs",
    ],
    logoSrc: "/images/experience/pwc-logo.svg",
    logoVariant: "standard",
  },
  {
    company: "VNB Consulting Services",
    role: "Business Intelligence Developer",
    period: "Aug 2021 — Sep 2022",
    location: "Bangalore, India",
    summary:
      "Designed secure, embedded analytics products for energy and public-sector healthcare workflows.",
    highlights: [
      "Directed a significant upgrade in data security for 1,500 UGI employees by spearheading product development and go-to-market strategy for an RLS-based solution in Power BI, using Static and Dynamic RLS to implement data masking, security, and filtration measures.",
      "Enhanced data visualization and user experience by migrating 15 Oracle BI operational reports to Power BI for UGI, preserving Oracle business logic, adapting to evolving requirements, and implementing industry best practices including Star and Snowflake Schema via Agile Scrum sprints in Jira.",
      "Crafted Paginated Reports / SQL Server Reporting Services to deliver meaningful and actionable insights in an easy-to-comprehend, pixel-perfect printable format by learning the technology within 5 days.",
      "Led creation of 6 reports / dashboards and collaborated with the integration team to deploy a SaaS Power BI Embedded API, converting 150M MySQL rows into actionable insights and boosting decision-making and customer service quality for 300M patients in an Indian government program / eSanjeevani OPD.",
      "Executed 150+ action items as the key liaison across the customer's database team, KPMG, senior management, and UI/UX team, ensuring timely delivery, effective stakeholder management, and integration of dynamic requirements to improve business performance.",
    ],
    skills: [
      "Business intelligence",
      "Row-level security",
      "Embedded analytics",
      "Power BI",
      "MySQL",
      "Data modelling",
      "Static RLS",
      "Dynamic RLS",
      "Data masking",
      "Oracle BI migration",
      "Star Schema",
      "Snowflake Schema",
      "Paginated Reports",
      "SQL Server Reporting Services",
      "Power BI Embedded",
      "SaaS API integration",
      "Jira",
      "Agile Scrum",
      "Stakeholder management",
      "Product strategy",
      "Go-to-market strategy",
    ],
    logoSrc: "/images/experience/vnb-consulting-logo.png",
    logoVariant: "wide",
  },
  {
    company: "DXC Technology",
    role: "Associate Professional Software Engineer",
    period: "Sep 2020 — Aug 2021",
    location: "Bangalore, India",
    summary:
      "Started in reporting automation, learning how disciplined data products change everyday operations.",
    highlights: [
      "Automated key performance indicator (KPI) reporting by collaborating with a cross-functional global team and applying Agile methodologies to build 2 data-driven Power BI dashboards for Marsh Inc., cutting manual tasks by 90% and advancing business strategy.",
      "Created and managed a Manager Dashboard / Proof of Concept using Power BI, supporting organized recording of monthly tasks and tracking expectations, new skills/learnings, monthly discussion statuses, QA metrics, and key performance indicators for 500+ employees.",
    ],
    skills: [
      "Dashboard automation",
      "Power BI",
      "KPI reporting",
      "Data analytics",
      "Proof of concept",
      "Agile",
      "Cross-functional collaboration",
      "Reporting automation",
      "QA metrics",
      "Employee performance tracking",
      "Business strategy",
    ],
    logoSrc: "/images/experience/dxc-technology-logo.svg",
    logoVariant: "wide",
  },
];

export const principles = [
  {
    number: "01",
    title: "Start from evidence",
    body:
      "Talk to users, inspect the workflow, and define the decision before defining the feature. Discovery is how I reduce product risk.",
  },
  {
    number: "02",
    title: "Make systems legible",
    body:
      "Complexity is not a badge. The product should make hidden states, tradeoffs, and next steps understandable to the people using it.",
  },
  {
    number: "03",
    title: "Design for action",
    body:
      "A dashboard, evaluation report, or AI answer is only useful when it helps someone decide what to do next.",
  },
  {
    number: "04",
    title: "Bridge the disciplines",
    body:
      "Product strategy, UX, data, and engineering are different views of the same question: what should we build, and why will it work?",
  },
  {
    number: "05",
    title: "Build trust into the flow",
    body:
      "Provenance, citations, evaluation criteria, and clear limits should live inside the product—not in a footnote after launch.",
  },
  {
    number: "06",
    title: "Keep room to learn",
    body:
      "The best roadmap leaves space for new evidence. I like strong hypotheses, measurable feedback, and teams that can change their minds.",
  },
];

export const skillGroups = [
  {
    title: "Product",
    items: [
      "Product discovery",
      "PRDs",
      "Roadmaps",
      "User stories",
      "Acceptance criteria",
      "Backlog strategy",
      "JTBD",
      "Customer interviews",
      "Journey mapping",
    ],
  },
  {
    title: "AI product craft",
    items: [
      "Human evaluation",
      "Prompt versioning",
      "RAG systems",
      "Failure analysis",
      "Source attribution",
      "AI workflow automation",
      "LLM product strategy",
    ],
  },
  {
    title: "Data & analytics",
    items: [
      "SQL",
      "Power BI",
      "DAX",
      "Python",
      "Excel",
      "Tableau",
      "Data modeling",
      "UAT",
      "Power Automate",
    ],
  },
  {
    title: "Design & delivery",
    items: [
      "Figma",
      "FigJam",
      "Jira",
      "Confluence",
      "Scrum",
      "Sprint planning",
      "Technical documentation",
      "Stakeholder alignment",
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "launchguard",
    title: "LaunchGuard",
    kicker: "AI evaluation · Product strategy · Full-stack build",
    summary:
      "An open collaborative workspace that turns prompt testing, human review, failure analysis, and prompt improvement into one evidence-backed loop.",
    timeframe: "2026",
    organization: "Independent product",
    role: "Product creator & builder",
    team: "Independent build",
    tags: ["AI evaluation", "Human review", "Prompt tooling", "Next.js"],
    image: "/images/projects/launchguard-golden-dataset.png",
    imageAlt: "LaunchGuard Golden Dataset human-review workspace",
    liveUrl: "https://launchguardaievaluator.vercel.app/",
    repoUrl:
      "https://github.com/rohankandra1998-pmtech/LaunchGuard-AI-Evaluator",
    metrics: [
      { value: "1 loop", label: "dataset → review → analysis → prompt" },
      { value: "Versioned", label: "outputs, reviews, and provenance" },
      { value: "Public", label: "collaborative prototype" },
    ],
    sections: [
      {
        eyebrow: "The problem",
        title: "AI teams need more than a vibe check.",
        paragraphs: [
          "Prompt quality is often judged through scattered chats, spreadsheets, and memory. That makes it hard to compare versions, understand repeated failures, or preserve why a change was made.",
          "LaunchGuard brings the evidence into a shared workflow: define criteria, build a golden dataset, generate outputs, review each result, analyze patterns, and turn the findings into a new prompt proposal.",
        ],
      },
      {
        eyebrow: "Product model",
        title: "A deliberate evaluation loop",
        paragraphs: [
          "The product is organized around public workspaces and AI projects. Each project connects prompt versions, structured variables, evaluation criteria, test cases, model outputs, human ratings, reports, and editable prompt proposals.",
        ],
        bullets: [
          "Prompt versions become materially immutable once evaluation history exists, preserving the meaning of prior evidence.",
          "Human reviews attach to version-specific generated outputs, so switching versions restores the correct ratings and notes.",
          "Error-analysis and prompt-proposal artifacts become stale when their underlying evidence changes.",
          "Variable provenance is stored with generation and report context so results remain explainable.",
        ],
        media: [
          {
            src: "/images/projects/launchguard-overview.webp",
            alt: "LaunchGuard project overview illustration",
            caption:
              "The project overview guides the next highest-value evaluation action.",
          },
        ],
      },
      {
        eyebrow: "Human evaluation",
        title: "The Golden Dataset is the center of gravity.",
        paragraphs: [
          "Reviewers can compare the test input, compiled prompt context, model output, ground truth, and shared rubric in one place. Status follows the active prompt version instead of treating a model dropdown as a new result identity.",
        ],
        media: [
          {
            src: "/images/projects/launchguard-golden-dataset.png",
            alt: "LaunchGuard Golden Dataset interface",
            caption:
              "Version-aware outputs and criterion-level human review live side by side.",
          },
        ],
      },
      {
        eyebrow: "From evidence to change",
        title: "Prompt proposals stay tied to their reasons.",
        paragraphs: [
          "A generated proposal is an editable draft, not an automatic deployment. The comparison view preserves the baseline, highlights changes, and keeps annotations linked to the failure patterns and criteria that motivated them.",
        ],
        media: [
          {
            src: "/images/projects/launchguard-prompt-diff.png",
            alt: "LaunchGuard prompt proposal comparison",
            caption:
              "A structured diff helps reviewers understand what changed and why.",
          },
        ],
      },
      {
        eyebrow: "Technical choices",
        title: "Built for traceability, with prototype limits made explicit.",
        paragraphs: [
          "The application uses Next.js, React, TypeScript, Tailwind CSS, Supabase Postgres, server-side OpenAI calls, and Zod-validated structured outputs. The schema includes relational checks, indexes, migrations, and public row-level policies.",
          "This is intentionally a public prototype: it has no authentication, moderation, ownership roles, quotas, or conflict handling. The interface and README warn users not to store sensitive information, and public project deletion uses a recoverable 30-day trash lifecycle.",
        ],
      },
    ],
  },
  {
    slug: "rag-knowledge-assistant",
    title: "RAG Knowledge Assistant",
    kicker: "Retrieval · AI UX · Observability",
    summary:
      "A conversational document assistant that ingests PDFs, retrieves and reranks relevant evidence, and answers with inline citations and transparent retrieval details.",
    timeframe: "2026",
    organization: "Independent product",
    role: "Product creator & builder",
    team: "Independent build",
    tags: ["RAG", "Streamlit", "ChromaDB", "OpenAI"],
    image: "/images/projects/rag-live-app.png",
    imageAlt: "RAG Knowledge Assistant live application",
    liveUrl: "https://ragknowledgeassistant.streamlit.app/",
    repoUrl:
      "https://github.com/rohankandra1998-pmtech/rag-knowledge-assistant",
    metrics: [
      { value: "Top 10", label: "chunks retrieved before reranking" },
      { value: "SHA-256", label: "duplicate document prevention" },
      { value: "7 days", label: "demo session retention when available" },
    ],
    sections: [
      {
        eyebrow: "The problem",
        title: "A useful answer needs visible evidence.",
        paragraphs: [
          "A generic chat box hides the hardest parts of document Q&A: what was indexed, which passages were retrieved, how relevance changed after reranking, and whether the answer is grounded in those passages.",
          "The product treats citations and observability as part of the core experience rather than optional debug tooling.",
        ],
        media: [
          {
            src: "/images/projects/rag-live-app.png",
            alt: "RAG assistant chat and evidence interface",
            caption:
              "The live app keeps the answer surface and evidence surface together.",
          },
        ],
      },
      {
        eyebrow: "Pipeline",
        title: "From PDF pages to grounded conversation",
        paragraphs: [
          "PDF pages are extracted with pypdf, semantically chunked, embedded with text-embedding-3-large, and stored in a persistent ChromaDB collection. A fallback recursive splitter keeps ingestion resilient when semantic chunking fails.",
        ],
        bullets: [
          "Full adjacent-page context helps preserve meaning across page boundaries.",
          "Follow-up questions are rewritten into standalone queries using recent conversation context.",
          "ChromaDB retrieves the top 10 similar chunks before an OpenAI reranking step.",
          "The answer prompt is constrained to retrieved context and emits filename, page, and chunk citations.",
        ],
      },
      {
        eyebrow: "Evidence UX",
        title: "Sources are inspectable, not decorative.",
        paragraphs: [
          "The source panel exposes the passages used for an answer with similarity and rerank scores. A separate behind-the-scenes view explains query rewriting, retrieval, reranking, answer generation, and token usage.",
        ],
        media: [
          {
            src: "/images/projects/rag-sources.png",
            alt: "RAG source evidence panel",
            caption:
              "Each answer can be traced to the retrieved source chunks.",
          },
          {
            src: "/images/projects/rag-observability.png",
            alt: "RAG behind-the-scenes observability panel",
            caption:
              "The pipeline view makes model and retrieval behavior easier to reason about.",
          },
        ],
      },
      {
        eyebrow: "Deployment tradeoff",
        title: "A demo that is honest about persistence.",
        paragraphs: [
          "Local development uses persistent directories and ChromaDB. The public Streamlit deployment uses anonymous browser-persistent session IDs with session-isolated files that may survive for up to seven days while the runtime retains them.",
          "That is demo persistence, not production storage. A production version would add authentication, hosted file storage, and a hosted vector database.",
        ],
      },
    ],
  },
  {
    slug: "ur-coursebot",
    title: "UR CourseBot 2.0",
    kicker: "Product discovery · Education AI · Roadmapping",
    summary:
      "A professor-centered product strategy for improving an AI academic assistant integrated with Blackboard.",
    timeframe: "2025",
    organization: "Simon Product Management Labs",
    role: "Associate Product Manager",
    team: "Rohan Singh Kandra, Upasana Goswami, and MD Mehedi Hassan",
    tags: ["Customer discovery", "JTBD", "Prioritization", "AI education"],
    image: "/images/projects/coursebot-prototype.png",
    imageAlt: "UR CourseBot proposed content dashboard",
    liveUrl:
      "https://www.linkedin.com/feed/update/urn:li:activity:7323049408026021890/",
    metrics: [
      { value: "4", label: "professor discovery interviews" },
      { value: "5", label: "jobs to be done" },
      { value: "2 horizons", label: "0–6 and 6–12 month roadmap" },
    ],
    sections: [
      {
        eyebrow: "Context",
        title: "A 24/7 academic assistant with an adoption problem.",
        paragraphs: [
          "UR CourseBot was designed to answer students’ questions from course content inside Blackboard. The team’s assignment was to improve the product from the professor’s perspective.",
          "The current experience created administrative overhead through manual file enabling, scattered content, repetitive filenames, unclear navigation, and limited insight into how students were using the bot.",
        ],
      },
      {
        eyebrow: "Discovery",
        title: "Listen to the people managing the system.",
        paragraphs: [
          "The team interviewed four University of Rochester professors to understand content-management workflows, expectations, adoption barriers, and the role of a virtual teaching assistant in classroom instruction.",
          "One pilot reported only 15–20 queries per semester in classes of 40–50 students. Interviews pointed to low student onboarding, logistical rather than conceptual questions, manual content review, and no fast way to spot learning patterns.",
        ],
        media: [
          {
            src: "/images/projects/coursebot-jtbd.png",
            alt: "Five UR CourseBot jobs to be done",
            caption:
              "The jobs-to-be-done reframed requests around professor outcomes.",
          },
        ],
      },
      {
        eyebrow: "Prioritization",
        title: "Separate immediate workflow wins from the longer AI vision.",
        paragraphs: [
          "The team evaluated user-first interface improvements, SmartSync, ethical AI protocols, onboarding, analytics, and personalization through a value-versus-effort lens.",
          "The short-term proposal focused on a Blackboard-like content manager and SmartSync: automatic transcript and lecture-file import, background processing, auto-enable behavior, grouping, search, filters, and clearer labels.",
        ],
        media: [
          {
            src: "/images/projects/coursebot-prioritization.png",
            alt: "UR CourseBot value versus effort matrix",
            caption:
              "The matrix separated immediate workflow improvements from higher-effort bets.",
          },
          {
            src: "/images/projects/coursebot-prototype.png",
            alt: "UR CourseBot dashboard prototype",
            caption:
              "The prototype grouped course content and made sync state visible.",
          },
        ],
      },
      {
        eyebrow: "Roadmap",
        title: "Trust and learning outcomes shaped the next horizon.",
        paragraphs: [
          "The 6–12 month roadmap proposed assignment detection, hint mode rather than answer mode, professor tagging, student onboarding, engagement analytics, top queried concepts, and eventually more adaptive content recommendations.",
          "These were roadmap concepts, not shipped capabilities. The case study keeps that distinction explicit.",
        ],
        media: [
          {
            src: "/images/projects/coursebot-roadmap.png",
            alt: "UR CourseBot future product roadmap",
            caption:
              "The future roadmap connected academic integrity, onboarding, analytics, and personalization.",
          },
        ],
      },
    ],
  },
];

export const writing = [
  {
    status: "Published",
    title: "Reinventing UR CourseBot 2.0",
    summary:
      "A short field note on professor interviews, personas, JTBD, prioritization, SmartSync, ethical AI protocols, and the product roadmap.",
    href:
      "https://www.linkedin.com/feed/update/urn:li:activity:7323049408026021890/",
  },
  {
    status: "Draft",
    title: "Why AI evaluation needs a product workflow",
    summary:
      "Notes from building LaunchGuard: evidence history, version identity, stale artifacts, and human judgment.",
  },
  {
    status: "In progress",
    title: "Showing the work in a RAG product",
    summary:
      "A practical look at citations, retrieval scores, reranking, and honest demo persistence.",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

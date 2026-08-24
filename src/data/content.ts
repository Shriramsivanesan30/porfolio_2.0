export const profile = {
  name: "Shriram Sivanesan S",
  shortName: "Shriram",
  roles: ["Full Stack Developer", "AI Agent Developer", "MERN Stack Developer"],
  location: "Coimbatore, Tamil Nadu",
  email: "shrirampchust@gmail.com",
  phone: "+91 7604906071",
  linkedin: "https://linkedin.com/in/shriram-sivanesan-2311a4328",
  github: "https://github.com/shriramsivanesan30",
  summary:
    "B.Tech Information Technology student with hands-on full stack experience and a growing focus on AI agents and workflow automation. Three live, client-facing applications currently in active institutional use.",
  availability: "Available for work",
  cv: "/Shriram_Sivanesan_Resume.pdf",
  headline: { lead: "Software that goes", accent: "into production" },
  subhead:
    "Full stack and AI agent developer. Three platforms live and in daily institutional use — plus one new build every week.",
} as const;

/** Compact proof points for the floating hero cards. */
export const heroCards = [
  { title: "3 platforms live", detail: "In daily institutional use" },
  { title: "Google Student Ambassador", detail: "Selected for the 2026–28 cohort" },
] as const;

/** Stack chips shown under the hero actions. */
export const heroStack = ["React", "Django", "Python", "MySQL", "n8n"] as const;

export type Work = {
  id: string;
  name: string;
  subtitle: string;
  stack: string[];
  description: string;
  status: "live" | "deployed";
  href?: string;
  hrefLabel?: string;
};

export const work: Work[] = [
  {
    id: "mrpc",
    name: "MRPC",
    subtitle: "College Management Platform",
    stack: ["Django", "MySQL", "React"],
    description:
      "A full-stack platform for Dr. MCET that digitizes institutional workflows and data management. Deployed and used college-wide by staff and administration.",
    status: "live",
    href: "https://ri.drmcet.info",
    hrefLabel: "ri.drmcet.info",
  },
  {
    id: "iqac",
    name: "IQAC",
    subtitle: "Internal Quality Assurance Cell Portal",
    stack: ["Django", "MySQL", "React"],
    description:
      "An academic quality management system enabling structured compliance reporting. Replaced manual tracking processes and is in active use by the institution.",
    status: "deployed",
  },
  {
    id: "kbf",
    name: "KBF",
    subtitle: "Business Forum Website",
    stack: ["HTML", "CSS", "JavaScript"],
    description:
      "A corporate branding website designed and shipped for a business client, presenting organizational identity, leadership and activities.",
    status: "deployed",
  },
];

export const challenge = {
  title: "52 Weeks, 52 Projects",
  completed: 10,
  total: 52,
  window: "2025 – 2026",
  blurb:
    "One shipped project every week for a year. A self-imposed constraint that forces scope discipline and turns unfamiliar tools into working software fast.",
  highlights: [
    {
      name: "Multimodal AI Assistant",
      detail: "Voice, gesture and AI chat input combined into a single conversational interface.",
    },
    {
      name: "AI Chatbot Website",
      detail: "Real-time conversational UI with live response streaming.",
    },
    {
      name: "n8n WhatsApp Automation Agent",
      detail: "Automated messaging workflows via Meta's WhatsApp Business integration.",
    },
  ],
} as const;

export const skills = [
  { group: "Programming", items: ["C", "Java", "Python"] },
  { group: "Front-End", items: ["HTML5", "CSS3", "JavaScript", "React"] },
  { group: "Back-End", items: ["Express.js", "Django"] },
  { group: "AI & Automation", items: ["AI Agents", "n8n", "ML Basics"] },
  { group: "Design & Tools", items: ["Figma", "Spline AI"] },
  { group: "Version Control", items: ["Git", "GitHub"] },
] as const;

export const recognition = {
  featured: {
    title: "Google Student Ambassador",
    detail: "Selected by Google for the 2026 – 2028 cohort.",
  },
  awards: [
    { place: "1st", title: "Web Design & Development", event: "CodeChaos" },
    { place: "1st", title: "Techwala & Enthusia'26", event: "MCET" },
    { place: "1st", title: "Project Presentation", event: "NEXORA'26, MCET" },
    { place: "1st", title: "Paper Presentation, InfoBee IT", event: "Enthusia'26, MCET Pollachi" },
    { place: "Winner", title: "Hackathon", event: "Enthusia'26, InfoBee Association, MCET" },
  ],
  certifications: [
    "HTML, CSS & JavaScript for Web Developers — Coursera",
    "Business Fundamentals for Entrepreneurs — NPTEL",
    "ChatGPT for Everyone — GUVI & HCL",
    "Python Programming — Livewire, Karur",
  ],
} as const;

export const education = {
  degree: "B.Tech, Information Technology",
  status: "Pursuing",
  years: "2024 – 2028",
  institution: "Dr. Mahalingam College of Engineering and Technology, Pollachi",
  cgpa: "7.9 / 10.0",
  note: "No active arrears",
} as const;

export const languages = [
  { name: "English", level: "Fluent" },
  { name: "Tamil", level: "Native" },
  { name: "Hindi", level: "Basic" },
] as const;

export const nav = [
  { id: "work", label: "Work" },
  { id: "challenge", label: "Challenge" },
  { id: "stack", label: "Stack" },
  { id: "recognition", label: "Recognition" },
  { id: "contact", label: "Contact" },
] as const;

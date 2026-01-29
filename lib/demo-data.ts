import {
  Code2,
  GitBranch,
  Bug,
  Database,
  ArrowRightToLine,
  Search,
  FileBarChart,
  Users,
  Server,
  BookOpen,
  Brain,
  FileText,
  TrendingUp,
  ClipboardCheck,
  PenLine,
  Network,
  LucideIcon,
} from "lucide-react";

export type Category = "development" | "research" | "operations" | "content";

export type IconName =
  | "Code2"
  | "GitBranch"
  | "Bug"
  | "Database"
  | "ArrowRightToLine"
  | "Search"
  | "FileBarChart"
  | "Users"
  | "Server"
  | "BookOpen"
  | "Brain"
  | "FileText"
  | "TrendingUp"
  | "ClipboardCheck"
  | "PenLine"
  | "Network";

export const iconMap: Record<IconName, LucideIcon> = {
  Code2,
  GitBranch,
  Bug,
  Database,
  ArrowRightToLine,
  Search,
  FileBarChart,
  Users,
  Server,
  BookOpen,
  Brain,
  FileText,
  TrendingUp,
  ClipboardCheck,
  PenLine,
  Network,
};

export interface DemoConfig {
  id: string;
  title: string;
  narrative: string;
  category: Category;
  agentCount: number;
  featured: boolean;
  animationType: "code" | "network" | "flow" | "video";
  iconName: IconName;
}

export const demos: DemoConfig[] = [
  // Category 1: Development
  {
    id: "mvp-builder",
    title: "The 10-Minute MVP Builder",
    narrative: "Watch as 6 AI agents collaborate to build a full-stack app in 10 minutes - from API design to frontend deployment.",
    category: "development",
    agentCount: 6,
    featured: true,
    animationType: "code",
    iconName: "Code2",
  },
  {
    id: "bug-hunt",
    title: "Bug Hunt Squad",
    narrative: "A radar-style sweep through your codebase where agents find, classify, and fix bugs in parallel with real-time verification.",
    category: "development",
    agentCount: 5,
    featured: true,
    animationType: "network",
    iconName: "Bug",
  },
  {
    id: "migration-masters",
    title: "Migration Masters",
    narrative: "See codebases transform in real-time as agents refactor legacy code to modern frameworks, preserving functionality while upgrading architecture.",
    category: "development",
    agentCount: 4,
    featured: false,
    animationType: "code",
    iconName: "ArrowRightToLine",
  },
  {
    id: "devops-dream-team",
    title: "DevOps Dream Team",
    narrative: "Watch infrastructure come alive as agents provision, configure, and deploy entire cloud environments with best practices baked in.",
    category: "development",
    agentCount: 6,
    featured: false,
    animationType: "flow",
    iconName: "Server",
  },

  // Category 2: Research
  {
    id: "research-engine",
    title: "Research Synthesis Engine",
    narrative: "A mind map comes to life as agents explore topics in 8 directions, synthesizing findings into coherent insights with source citations.",
    category: "research",
    agentCount: 8,
    featured: true,
    animationType: "network",
    iconName: "Brain",
  },
  {
    id: "deep-research",
    title: "Deep Research Agent",
    narrative: "An expanding research tree where each agent burrows deep into their domain, cross-referencing findings and building confidence scores.",
    category: "research",
    agentCount: 8,
    featured: false,
    animationType: "network",
    iconName: "Search",
  },
  {
    id: "literature-review",
    title: "Literature Review Pro",
    narrative: "Citation networks bloom before your eyes as agents map connections between academic papers, identifying seminal works and emerging trends.",
    category: "research",
    agentCount: 5,
    featured: false,
    animationType: "network",
    iconName: "BookOpen",
  },
  {
    id: "market-intel",
    title: "Market Intelligence Gatherer",
    narrative: "Dashboards assemble dynamically as agents gather pricing, features, and competitive positioning from across the web.",
    category: "research",
    agentCount: 6,
    featured: false,
    animationType: "flow",
    iconName: "TrendingUp",
  },
  {
    id: "due-diligence",
    title: "Due Diligence Team",
    narrative: "Scorecards fill in real-time as agents audit technical, financial, and legal aspects with risk meters and final recommendations.",
    category: "research",
    agentCount: 6,
    featured: false,
    animationType: "flow",
    iconName: "ClipboardCheck",
  },

  // Category 3: Operations & Support
  {
    id: "data-pipeline",
    title: "Data Pipeline Factory",
    narrative: "Flowcharts animate as data flows from sources through transformations to dashboards, with agents monitoring quality and performance.",
    category: "operations",
    agentCount: 5,
    featured: true,
    animationType: "flow",
    iconName: "Database",
  },
  {
    id: "competitive-intel",
    title: "Competitive Intelligence Unit",
    narrative: "Grids of browser windows light up as agents simultaneously crawl competitor sites, extracting features, pricing, and positioning data.",
    category: "operations",
    agentCount: 8,
    featured: false,
    animationType: "flow",
    iconName: "FileBarChart",
  },
  {
    id: "support-swarm",
    title: "Customer Support Swarm",
    narrative: "Watch tiered routing in action as L0-L3 agents handle customer queries with escalating expertise, updating the knowledge base.",
    category: "operations",
    agentCount: 7,
    featured: false,
    animationType: "flow",
    iconName: "Users",
  },
  {
    id: "tech-docs",
    title: "Technical Documentation Writer",
    narrative: "Codebase trees spawn documentation branches as agents analyze code, generate docs, and deploy to your knowledge portal.",
    category: "operations",
    agentCount: 4,
    featured: false,
    animationType: "code",
    iconName: "FileText",
  },

  // Category 4: Content & Learning
  {
    id: "content-machine",
    title: "Content Marketing Machine",
    narrative: "An assembly line where raw ideas transform into blog posts, social media, newsletters, and metrics reports through sequential processing.",
    category: "content",
    agentCount: 7,
    featured: true,
    animationType: "flow",
    iconName: "PenLine",
  },
  {
    id: "learning-accelerator",
    title: "Learning Accelerator",
    narrative: "A knowledge tree grows as agents assess skills, identify gaps, recommend resources, and track mastery with progress visualizations.",
    category: "content",
    agentCount: 5,
    featured: false,
    animationType: "network",
    iconName: "GitBranch",
  },

  // Demo 16: Meta
  {
    id: "swarm-visualizer",
    title: "Swarm Visualizer",
    narrative: "The meta-demo: watch an actual AI swarm orchestrate tasks in real-time with live agent communication and progress tracking.",
    category: "development",
    agentCount: 8,
    featured: true,
    animationType: "network",
    iconName: "Network",
  },

  // Demo 17: Launcher
  {
    id: "swarm-launcher",
    title: "Swarm Launcher",
    narrative: "Watch a single prompt activate 10 specialized AI agents - see the swarm come alive with a single command.",
    category: "development",
    agentCount: 10,
    featured: true,
    animationType: "network",
    iconName: "Network",
  },
];

export const featuredDemos = demos.filter((demo) => demo.featured);

export const getDemosByCategory = (category: Category): DemoConfig[] => {
  return demos.filter((demo) => demo.category === category);
};

export const getDemoById = (id: string): DemoConfig | undefined => {
  return demos.find((demo) => demo.id === id);
};

export const categoryInfo: Record<
  Category,
  { label: string; description: string }
> = {
  development: {
    label: "Development",
    description: "Build, debug, and deploy with AI-powered engineering teams",
  },
  research: {
    label: "Research",
    description: "Synthesize information and generate insights at scale",
  },
  operations: {
    label: "Operations",
    description: "Streamline workflows and automate complex processes",
  },
  content: {
    label: "Content & Learning",
    description: "Create content and accelerate knowledge acquisition",
  },
};

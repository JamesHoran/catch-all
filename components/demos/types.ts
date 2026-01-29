import type { DemoConfig } from "@/lib/demo-data";

export interface DemoCardProps {
  demo: DemoConfig;
  onPlay?: () => void;
  size?: "small" | "medium" | "large";
  className?: string;
}

export interface DemoGridProps {
  demos: DemoConfig[];
  categoryFilter?: string;
  onDemoClick?: (demo: DemoConfig) => void;
  className?: string;
}

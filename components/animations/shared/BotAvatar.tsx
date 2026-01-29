"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AgentRole } from "./AgentNode";

// Bot/Robot icon combinations for each role
// Each role gets a base bot icon with role-specific indicators
const roleBotConfigs: Record<
  AgentRole,
  { baseIcon: React.ComponentType<{ className?: string }>; color: string; label: string }
> = {
  architect: { baseIcon: BotIcon, color: "blue", label: "Architect" },
  backend: { baseIcon: ServerBot, color: "violet", label: "Backend" },
  database: { baseIcon: DatabaseBot, color: "pink", label: "Database" },
  api: { baseIcon: ApiBot, color: "orange", label: "API" },
  frontend: { baseIcon: LayoutBot, color: "teal", label: "Frontend" },
  mobile: { baseIcon: MobileBot, color: "lime", label: "Mobile" },
  researcher: { baseIcon: ResearchBot, color: "cyan", label: "Researcher" },
  analyst: { baseIcon: ChartBot, color: "indigo", label: "Analyst" },
  writer: { baseIcon: WriterBot, color: "rose", label: "Writer" },
  editor: { baseIcon: EditorBot, color: "amber", label: "Editor" },
  designer: { baseIcon: DesignBot, color: "purple", label: "Designer" },
  tester: { baseIcon: TestBot, color: "red", label: "Tester" },
  deployer: { baseIcon: DeployBot, color: "green", label: "Deployer" },
  monitor: { baseIcon: MonitorBot, color: "emerald", label: "Monitor" },
};

// Bot icon components with role-specific styling
function BotIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="8" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M8 8V6C8 4.89543 8.89543 4 10 4H14C15.1046 4 16 4.89543 16 6V8" stroke="currentColor" strokeWidth="2"/>
      <circle cx="9" cy="13" r="1.5" fill="currentColor"/>
      <circle cx="15" cy="13" r="1.5" fill="currentColor"/>
      <path d="M10 17H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="6" r="1" fill="currentColor"/>
      <line x1="12" y1="2" x2="12" y2="4" stroke="currentColor" strokeWidth="2"/>
      <circle cx="2" cy="10" r="1" fill="currentColor"/>
      <circle cx="22" cy="10" r="1" fill="currentColor"/>
    </svg>
  );
}

function ServerBot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="4" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M9 8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M9 16H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="2" r="1" fill="currentColor"/>
      <circle cx="4" cy="8" r="1" fill="currentColor"/>
      <circle cx="20" cy="8" r="1" fill="currentColor"/>
      <circle cx="4" cy="16" r="1" fill="currentColor"/>
      <circle cx="20" cy="16" r="1" fill="currentColor"/>
    </svg>
  );
}

function DatabaseBot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="12" cy="5" rx="8" ry="3" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M4 5V19C4 21.2091 7.58172 23 12 23C16.4183 23 20 21.2091 20 19V5" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M4 12C4 14.2091 7.58172 16 12 16C16.4183 16 20 14.2091 20 12" stroke="currentColor" strokeWidth="2"/>
      <circle cx="16" cy="8" r="1" fill="currentColor"/>
      <circle cx="8" cy="8" r="1" fill="currentColor"/>
      <circle cx="16" cy="15" r="1" fill="currentColor"/>
      <circle cx="8" cy="15" r="1" fill="currentColor"/>
    </svg>
  );
}

function ApiBot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M12 4V2" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 22V20" stroke="currentColor" strokeWidth="2"/>
      <path d="M20 12H22" stroke="currentColor" strokeWidth="2"/>
      <path d="M2 12H4" stroke="currentColor" strokeWidth="2"/>
      <circle cx="9" cy="12" r="1.5" fill="currentColor"/>
      <circle cx="15" cy="12" r="1.5" fill="currentColor"/>
      <path d="M7 8L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M17 8L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M7 16L5 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M17 16L19 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function LayoutBot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <rect x="3" y="8" width="18" height="2" fill="currentColor"/>
      <rect x="7" y="12" width="4" height="4" rx="1" fill="currentColor"/>
      <rect x="13" y="12" width="4" height="4" rx="1" fill="currentColor"/>
      <circle cx="12" cy="6" r="1" fill="currentColor"/>
    </svg>
  );
}

function MobileBot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="2" width="8" height="20" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="12" cy="18" r="1" fill="currentColor"/>
      <circle cx="12" cy="5" r="1" fill="currentColor"/>
      <circle cx="6" cy="8" r="1" fill="currentColor"/>
      <circle cx="18" cy="8" r="1" fill="currentColor"/>
    </svg>
  );
}

function ResearchBot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M17 17L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="9" cy="10" r="1.5" fill="currentColor"/>
      <circle cx="13" cy="10" r="1.5" fill="currentColor"/>
      <path d="M11 14C11 14 9 15 9 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="11" cy="3" r="1" fill="currentColor"/>
    </svg>
  );
}

function ChartBot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="8" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M8 8V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 8V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16 8V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="8" cy="14" r="1.5" fill="currentColor"/>
      <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
      <circle cx="16" cy="15" r="1.5" fill="currentColor"/>
    </svg>
  );
}

function WriterBot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 19L19 12L15 8L8 15V19H12Z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round"/>
      <path d="M13 14L16 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="4" r="1" fill="currentColor"/>
      <path d="M5 4H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M21 4H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function EditorBot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 8H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 16H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="2" r="1" fill="currentColor"/>
      <path d="M4 20L2 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function DesignBot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M12 3V2" stroke="currentColor" strokeWidth="2"/>
      <path d="M5.6 5.6L4.9 4.9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M18.4 5.6L19.1 4.9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="9" cy="10" r="1.5" fill="currentColor"/>
      <circle cx="15" cy="10" r="1.5" fill="currentColor"/>
      <path d="M9 15C9 15 10.5 17 12 17C13.5 17 15 15 15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="21" r="1" fill="currentColor"/>
    </svg>
  );
}

function TestBot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M9 9L6 12L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 9L18 12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 12L14 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="2" r="1" fill="currentColor"/>
      <path d="M8 20H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function DeployBot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 12L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 12L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="3" r="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <rect x="6" y="16" width="12" height="6" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="12" cy="19" r="1" fill="currentColor"/>
      <circle cx="4" cy="12" r="1" fill="currentColor"/>
      <circle cx="20" cy="12" r="1" fill="currentColor"/>
    </svg>
  );
}

function MonitorBot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M8 21H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 15V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M7 9H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M14 9H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M7 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M15 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="2" r="1" fill="currentColor"/>
    </svg>
  );
}

interface BotAvatarProps {
  role: AgentRole;
  size?: "xs" | "sm" | "md" | "lg";
  color?: string;
  status?: "idle" | "working" | "complete" | "error";
  className?: string;
}

const sizeClasses = {
  xs: "w-4 h-4",
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-10 h-10",
};

export function BotAvatar({
  role,
  size = "md",
  color,
  status,
  className,
}: BotAvatarProps) {
  const config = roleBotConfigs[role];
  const BotIcon = config.baseIcon;
  const avatarColor = color || config.color;
  const sizeClass = sizeClasses[size];

  return (
    <div className={cn("relative", className)}>
      <motion.div
        className={cn(
          "rounded-lg flex items-center justify-center",
          sizeClass,
          status === "working" && "animate-pulse"
        )}
        style={{
          backgroundColor: `rgba(var(--color-${avatarColor}-500), 0.2)`,
          border: `1px solid rgb(var(--color-${avatarColor}-500))`,
        }}
      >
        <BotIcon className={cn(
          size === "xs" ? "w-3 h-3" : size === "sm" ? "w-4 h-4" : size === "lg" ? "w-6 h-6" : "w-5 h-5",
          `text-${avatarColor}-400`
        )} />
      </motion.div>

      {/* Status indicator dot */}
      {status && (
        <motion.div
          className={cn(
            "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-slate-900",
            status === "working" && `bg-${avatarColor}-500 animate-pulse`,
            status === "complete" && "bg-green-500",
            status === "error" && "bg-red-500",
            status === "idle" && "bg-slate-500"
          )}
        />
      )}
    </div>
  );
}

// Export the bot configs for use in other components
export { roleBotConfigs };

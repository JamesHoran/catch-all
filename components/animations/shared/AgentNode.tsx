"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { BotAvatar } from "./BotAvatar";

export type AgentStatus = "idle" | "working" | "complete" | "error";

export type AgentRole =
  | "architect"
  | "backend"
  | "database"
  | "api"
  | "frontend"
  | "mobile"
  | "researcher"
  | "analyst"
  | "writer"
  | "editor"
  | "designer"
  | "tester"
  | "deployer"
  | "monitor";

interface AgentNodeProps {
  id: number;
  icon?: LucideIcon;
  status?: AgentStatus;
  label?: string;
  role?: AgentRole;
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
  showGlow?: boolean;
}

const sizeClasses = {
  sm: { container: "w-8 h-8", icon: "w-4 h-4", text: "text-sm" },
  md: { container: "w-12 h-12", icon: "w-6 h-6", text: "text-base" },
  lg: { container: "w-16 h-16", icon: "w-8 h-8", text: "text-xl" },
};

const statusColors: Record<AgentStatus, { bg: string; border: string; glow: string }> = {
  idle: {
    bg: "bg-slate-700",
    border: "border-slate-600",
    glow: "shadow-none",
  },
  working: {
    bg: "bg-blue-900/50",
    border: "border-blue-500",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.5)]",
  },
  complete: {
    bg: "bg-green-900/50",
    border: "border-green-500",
    glow: "shadow-[0_0_20px_rgba(34,197,94,0.5)]",
  },
  error: {
    bg: "bg-red-900/50",
    border: "border-red-500",
    glow: "shadow-[0_0_20px_rgba(239,68,68,0.5)]",
  },
};

const roleColors: Record<AgentRole, string> = {
  architect: "blue",
  backend: "violet",
  database: "pink",
  api: "orange",
  frontend: "teal",
  mobile: "lime",
  researcher: "cyan",
  analyst: "indigo",
  writer: "rose",
  editor: "amber",
  designer: "purple",
  tester: "red",
  deployer: "green",
  monitor: "emerald",
};

const defaultAgentColors = [
  "blue",
  "violet",
  "pink",
  "orange",
  "teal",
  "lime",
  "cyan",
  "rose",
];

export function AgentNode({
  id,
  icon: Icon,
  status = "idle",
  label,
  role,
  size = "md",
  color,
  className,
  showGlow = true,
}: AgentNodeProps) {
  const agentColor = color || (role && roleColors[role]) || defaultAgentColors[(id - 1) % defaultAgentColors.length];
  const sizeClass = sizeClasses[size];
  const statusConfig = statusColors[status];

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <motion.div
        className={cn(
          "relative rounded-full border-2 flex items-center justify-center",
          sizeClass.container,
          statusConfig.bg,
          statusConfig.border,
          showGlow && statusConfig.glow,
          status !== "idle" && "animate-pulse"
        )}
        style={{
          borderColor: `rgb(var(--color-${agentColor}-500))`,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: status === "working" ? [1, 1.08, 1] : 1,
          opacity: 1,
        }}
        transition={{
          scale: status === "working" ? { repeat: Infinity, duration: 1 } : { type: "spring" },
        }}
      >
        {Icon ? (
          <Icon
            className={cn(sizeClass.icon, `text-${agentColor}-400`)}
          />
        ) : role ? (
          // Use BotAvatar with role when no custom icon provided
          <BotAvatar
            role={role}
            color={agentColor}
            size={size === "sm" ? "sm" : size === "lg" ? "lg" : "md"}
            status={status}
          />
        ) : (
          <span className={cn("font-bold", sizeClass.icon, `text-${agentColor}-400`)}>
            {id}
          </span>
        )}

        {/* Working spinner - only show when using custom icon or no role */}
        {status === "working" && (Icon || !role) && (
          <motion.div
            className={cn("absolute inset-0 rounded-full border-2")}
            style={{
              borderColor: `rgb(var(--color-${agentColor}-400))`,
              borderTopColor: "transparent",
              borderLeftColor: "transparent",
            }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          />
        )}

        {/* Role indicator badge - only show when using custom icon */}
        {role && Icon && (
          <div
            className={cn(
              "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900",
              `bg-${agentColor}-500`
            )}
          />
        )}
      </motion.div>

      {label && (
        <motion.span
          className={cn("text-xs font-medium", `text-${agentColor}-300`)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {label}
        </motion.span>
      )}
    </div>
  );
}

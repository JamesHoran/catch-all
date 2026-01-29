"use client";

import { motion } from "framer-motion";
import { FileText, Code, Database, Bug, CheckCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { BotAvatar } from "./BotAvatar";
import type { AgentRole } from "./AgentNode";

export type ArtifactType =
  | "code"
  | "data"
  | "document"
  | "bug"
  | "feature"
  | "fix"
  | "insight"
  | "report";

interface WorkArtifactProps {
  type: ArtifactType;
  progress: number;
  contributors: number[];
  contributorRoles?: Record<number, AgentRole>; // Map agent ID to role for bot avatars
  position?: { x: number; y: number };
  size?: "sm" | "md" | "lg";
  label?: string;
  showContributors?: boolean;
  onComplete?: () => void;
  className?: string;
}

const artifactConfig: Record<
  ArtifactType,
  { icon: typeof FileText; color: string; label: string }
> = {
  code: { icon: Code, color: "blue", label: "Code" },
  data: { icon: Database, color: "violet", label: "Data" },
  document: { icon: FileText, color: "pink", label: "Document" },
  bug: { icon: Bug, color: "red", label: "Bug" },
  feature: { icon: Sparkles, color: "teal", label: "Feature" },
  fix: { icon: CheckCircle, color: "green", label: "Fix" },
  insight: { icon: Sparkles, color: "amber", label: "Insight" },
  report: { icon: FileText, color: "cyan", label: "Report" },
};

const sizeClasses = {
  sm: { container: "w-8 h-8", icon: "w-4 h-4" },
  md: { container: "w-12 h-12", icon: "w-6 h-6" },
  lg: { container: "w-16 h-16", icon: "w-8 h-8" },
};

export function WorkArtifact({
  type,
  progress,
  contributors,
  contributorRoles,
  position,
  size = "md",
  label,
  showContributors = true,
  onComplete,
  className,
}: WorkArtifactProps) {
  const config = artifactConfig[type];
  const Icon = config.icon;
  const sizeClass = sizeClasses[size];
  const isComplete = progress >= 100;

  // Trigger completion callback when progress reaches 100
  if (isComplete && onComplete) {
    onComplete();
  }

  return (
    <motion.div
      className={cn("absolute", className)}
      style={{
        left: position?.x,
        top: position?.y,
        x: "-50%",
        y: "-50%",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring" }}
    >
      {/* Progress Ring */}
      <svg className={cn("absolute inset-0", sizeClass.container)} viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className={`text-${config.color}-900/30`}
        />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className={`text-${config.color}-500`}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: progress / 100 }}
          transition={{ duration: 0.5 }}
          style={{
            strokeDasharray: "283",
            strokeDashoffset: 283 * (1 - progress / 100),
          }}
        />
      </svg>

      {/* Artifact Container */}
      <div
        className={cn(
          "relative rounded-full flex items-center justify-center",
          sizeClass.container,
          isComplete
            ? `bg-${config.color}-900/50 border-2 border-${config.color}-500`
            : `bg-slate-800/80 border-2 border-${config.color}-500/50`
        )}
      >
        {/* Icon */}
        <Icon className={cn(sizeClass.icon, `text-${config.color}-400`)} />

        {/* Completion Glow */}
        {isComplete && (
          <motion.div
            className={`absolute inset-0 rounded-full bg-${config.color}-500/20`}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        )}
      </div>

      {/* Contributor Badges */}
      {showContributors && contributors.length > 0 && (
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex -space-x-2">
          {contributors.map((agentId) => {
            const contributorRole = contributorRoles?.[agentId];
            return contributorRole ? (
              // Use BotAvatar when role is provided
              <motion.div
                key={agentId}
                initial={{ scale: 0, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: contributors.indexOf(agentId) * 0.1 }}
              >
                <BotAvatar
                  role={contributorRole}
                  color={config.color}
                  size="sm"
                  className="scale-75"
                />
              </motion.div>
            ) : (
              // Fallback to number badge when no role
              <motion.div
                key={agentId}
                className={cn(
                  "w-5 h-5 rounded-full border-2 border-slate-800 flex items-center justify-center text-xs font-bold",
                  `bg-${config.color}-500`
                )}
                initial={{ scale: 0, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: contributors.indexOf(agentId) * 0.1 }}
              >
                {agentId}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Label */}
      {label && (
        <motion.div
          className={cn(
            "absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium",
            `text-${config.color}-300`
          )}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {label}
        </motion.div>
      )}

      {/* Progress Percentage */}
      {!isComplete && progress > 0 && (
        <motion.div
          className={cn(
            "absolute inset-0 flex items-center justify-center text-xs font-bold",
            `text-${config.color}-400`
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {Math.round(progress)}%
        </motion.div>
      )}
    </motion.div>
  );
}

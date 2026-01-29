"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type ProgressStatus = "pending" | "in-progress" | "complete" | "error";

interface ProgressBarProps {
  label?: string;
  progress: number; // 0-100
  status?: ProgressStatus;
  agentId?: number;
  color?: string;
  className?: string;
  showPercentage?: boolean;
  delay?: number;
}

const statusColors: Record<ProgressStatus, string> = {
  pending: "bg-slate-700",
  "in-progress": "bg-blue-500",
  complete: "bg-green-500",
  error: "bg-red-500",
};

const agentColors = [
  "bg-blue-500",
  "bg-violet-500",
  "bg-pink-500",
  "bg-orange-500",
  "bg-teal-500",
  "bg-lime-500",
  "bg-cyan-500",
  "bg-rose-500",
];

export function ProgressBar({
  label,
  progress,
  status = "pending",
  agentId,
  color,
  className,
  showPercentage = false,
  delay = 0,
}: ProgressBarProps) {
  const barColor = color || (agentId ? agentColors[(agentId - 1) % agentColors.length] : statusColors[status]);
  const isComplete = status === "complete";
  const isError = status === "error";
  const isInProgress = status === "in-progress";

  return (
    <motion.div
      className={cn("space-y-1", className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-sm">
          {label && <span className="text-slate-300 font-medium">{label}</span>}
          {showPercentage && (
            <span className="text-slate-400">{Math.round(progress)}%</span>
          )}
        </div>
      )}

      <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden">
        {/* Background track */}
        <div className="absolute inset-0 bg-slate-800 rounded-full" />

        {/* Progress bar */}
        <motion.div
          className={cn(
            "absolute left-0 top-0 h-full rounded-full",
            barColor,
            isInProgress && "shadow-[0_0_10px_rgba(59,130,246,0.5)]"
          )}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{
            duration: isInProgress ? 2 : 0.5,
            ease: "easeOut",
            delay: isInProgress ? delay : 0,
          }}
        />

        {/* Checkmark overlay when complete */}
        {isComplete && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: delay + 0.2 }}
          >
            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="w-3 h-3 text-white" strokeWidth={3} />
            </div>
          </motion.div>
        )}

        {/* Error indicator */}
        {isError && (
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1, x: [0, -5, 0] }}
            transition={{ delay: delay + 0.2 }}
          />
        )}
      </div>
    </motion.div>
  );
}

interface MultiProgressProps {
  label: string;
  agents: Array<{ id: number; label?: string; progress: number; status?: ProgressStatus }>;
  overallProgress: number;
  className?: string;
}

export function MultiProgress({ label, agents, overallProgress, className }: MultiProgressProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-200">{label}</span>
        <span className="text-sm text-slate-400">{Math.round(overallProgress)}%</span>
      </div>

      <div className="space-y-2">
        {agents.map((agent) => (
          <ProgressBar
            key={agent.id}
            agentId={agent.id}
            label={agent.label}
            progress={agent.progress}
            status={agent.status}
            showPercentage={false}
          />
        ))}
      </div>

      <ProgressBar
        progress={overallProgress}
        status={overallProgress === 100 ? "complete" : "in-progress"}
        className="mt-2"
      />
    </div>
  );
}

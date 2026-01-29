"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { BotAvatar } from "./BotAvatar";

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

export type AgentStatus = "idle" | "moving" | "working" | "complete" | "delivering";

interface WorkingAgentProps {
  id: number;
  role: AgentRole;
  icon?: LucideIcon;
  status?: AgentStatus;
  position?: { x: number; y: number };
  targetPosition?: { x: number; y: number };
  carrying?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  color?: string;
  label?: string;
  showTrail?: boolean;
  onArrive?: () => void;
  className?: string;
}

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

const sizeClasses = {
  sm: { container: "w-10 h-10", icon: "w-4 h-4", label: "text-xs" },
  md: { container: "w-14 h-14", icon: "w-6 h-6", label: "text-sm" },
  lg: { container: "w-18 h-18", icon: "w-8 h-8", label: "text-base" },
};

export function WorkingAgent({
  id,
  role,
  icon: Icon,
  status = "idle",
  position,
  targetPosition,
  carrying,
  size = "md",
  color,
  label,
  showTrail = false,
  onArrive,
  className,
}: WorkingAgentProps) {
  const agentColor = color || roleColors[role];
  const sizeClass = sizeClasses[size];

  const isMoving = status === "moving" || status === "delivering";
  const isWorking = status === "working";

  return (
    <motion.div
      className={cn("absolute", className)}
      style={{
        left: position?.x ?? 0,
        top: position?.y ?? 0,
        x: "-50%",
        y: "-50%",
      }}
      initial={targetPosition ? false : { scale: 0, opacity: 0 }}
      animate={
        isMoving && targetPosition && position
          ? {
              left: [position.x, targetPosition.x],
              top: [position.y, targetPosition.y],
            }
          : {
              scale: status === "working" ? [1, 1.05, 1] : 1,
              opacity: 1,
            }
      }
      transition={
        isMoving && targetPosition
          ? {
              duration: 1,
              ease: "easeInOut",
              onComplete: onArrive,
            }
          : {
              scale: {
                duration: 1,
                repeat: isWorking ? Infinity : 0,
              },
            }
      }
    >
      {/* Movement Trail */}
      {showTrail && isMoving && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${agentColor}40 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.5, 2],
            opacity: [0.5, 0.3, 0],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
          }}
        />
      )}

      {/* Agent Container */}
      <div className="relative">
        {/* Glow effect when working */}
        {isWorking && (
          <motion.div
            className={cn(
              "absolute inset-0 rounded-full blur-md",
              `bg-${agentColor}-500/50`
            )}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        )}

        {/* Main Agent Circle */}
        <motion.div
          className={cn(
            "relative rounded-full border-2 flex items-center justify-center",
            sizeClass.container,
            status === "complete"
              ? `bg-green-900/50 border-green-500`
              : isWorking
                ? `bg-${agentColor}-900/50 border-${agentColor}-500`
                : `bg-slate-800/80 border-${agentColor}-500/50`
          )}
          animate={
            isWorking
            ? {
                boxShadow: [
                  `0 0 10px rgba(var(--color-${agentColor}-500), 0.3)`,
                  `0 0 20px rgba(var(--color-${agentColor}-500), 0.6)`,
                  `0 0 10px rgba(var(--color-${agentColor}-500), 0.3)`,
                ],
              }
            : {}
          }
          transition={{
            duration: 1.5,
            repeat: isWorking ? Infinity : 0,
          }}
        >
          {Icon ? (
            <Icon className={cn(sizeClass.icon, `text-${agentColor}-400`)} />
          ) : (
            // Use BotAvatar for default bot appearance when no custom icon
            <BotAvatar
              role={role}
              color={agentColor}
              size={size === "sm" ? "sm" : size === "lg" ? "lg" : "md"}
              status={status === "complete" ? "complete" : isWorking ? "working" : "idle"}
            />
          )}

          {/* Working spinner - only show when using custom icon */}
          {isWorking && Icon && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-t-transparent"
              style={{
                borderColor: `transparent`,
                borderTopColor: `rgb(var(--color-${agentColor}-500))`,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          )}
        </motion.div>

        {/* Carrying Item */}
        {carrying && (
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-700 border-2 border-white flex items-center justify-center shadow-lg z-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1, y: isMoving ? [0, -5, 0] : 0 }}
            transition={{
              scale: { type: "spring" },
              y: { duration: 0.5, repeat: isMoving ? Infinity : 0 },
            }}
          >
            {carrying}
          </motion.div>
        )}

        {/* Role Label */}
        {label && (
          <motion.div
            className={cn(
              "absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap",
              sizeClass.label,
              `text-${agentColor}-300 font-medium`
            )}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {label}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

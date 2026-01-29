"use client";

import { motion } from "framer-motion";
import { Play, Users, Clock } from "lucide-react";
import type { DemoConfig } from "@/lib/demo-data";
import { iconMap } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

interface DemoCardProps {
  demo: DemoConfig;
  onPlay?: () => void;
  size?: "small" | "medium" | "large";
  className?: string;
}

const sizeStyles = {
  small: {
    container: "h-48",
    icon: "w-10 h-10",
    title: "text-sm",
  },
  medium: {
    container: "h-64",
    icon: "w-14 h-14",
    title: "text-lg",
  },
  large: {
    container: "h-80",
    icon: "w-20 h-20",
    title: "text-2xl",
  },
};

const categoryBadgeColors: Record<DemoConfig["category"], string> = {
  development: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  research: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  operations: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  content: "bg-teal-500/20 text-teal-400 border-teal-500/30",
};

export function DemoCard({ demo, onPlay, size = "medium", className }: DemoCardProps) {
  const styles = sizeStyles[size];
  const Icon = iconMap[demo.iconName];

  return (
    <motion.div
      className={cn(
        "group relative rounded-2xl overflow-hidden cursor-pointer",
        "bg-gradient-to-br from-slate-900 to-slate-800",
        "border border-slate-700 hover:border-slate-500",
        "transition-all duration-300",
        className
      )}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onPlay}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Preview Area */}
      <div className={cn("relative flex items-center justify-center", styles.container)}>
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-slate-700/20 to-transparent"
          animate={{
            x: ["0%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
        />

        {/* Icon */}
        <motion.div
          className={cn(
            "relative flex items-center justify-center rounded-full",
            "bg-slate-800 border-2 border-slate-600",
            "group-hover:border-slate-500 group-hover:shadow-lg",
            "transition-all duration-300",
            styles.icon
          )}
          whileHover={{ rotate: 5, scale: 1.1 }}
        >
          <Icon className="w-1/2 h-1/2 text-slate-300 group-hover:text-white transition-colors" />
        </motion.div>

        {/* Agent count badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-900/80 backdrop-blur-sm border border-slate-700">
          <Users className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs font-medium text-slate-300">{demo.agentCount}</span>
        </div>

        {/* Duration badge (placeholder) */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-900/80 backdrop-blur-sm border border-slate-700">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs font-medium text-slate-300">10-30s</span>
        </div>

        {/* Play button overlay on hover */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black/40"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-8 h-8 text-white fill-white ml-1" />
          </motion.div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Category badge */}
        <div className="inline-flex items-center">
          <span
            className={cn(
              "px-2 py-0.5 rounded-full text-xs font-medium border",
              categoryBadgeColors[demo.category]
            )}
          >
            {demo.category}
          </span>
        </div>

        {/* Title */}
        <h3 className={cn("font-semibold text-slate-100 line-clamp-2", styles.title)}>
          {demo.title}
        </h3>

        {/* Narrative */}
        <p className="text-sm text-slate-400 line-clamp-2">
          {demo.narrative}
        </p>
      </div>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CodeLine {
  content: string;
  type?: "normal" | "add" | "remove" | "highlight";
  delay?: number;
}

interface CodeBlockProps {
  lines: CodeLine[];
  language?: string;
  typingSpeed?: number;
  className?: string;
  showLineNumbers?: boolean;
}

const languageColors: Record<string, string> = {
  typescript: "text-blue-400",
  python: "text-yellow-400",
  javascript: "text-yellow-300",
  go: "text-cyan-400",
  sql: "text-orange-400",
  bash: "text-green-400",
};

const lineTypeClasses: Record<"normal" | "add" | "remove" | "highlight", string> = {
  normal: "text-slate-300",
  add: "text-green-400 bg-green-900/20 -mx-2 px-2",
  remove: "text-red-400 bg-red-900/20 line-through -mx-2 px-2",
  highlight: "text-yellow-300 bg-yellow-900/20 -mx-2 px-2",
};

export function CodeBlock({
  lines,
  language = "typescript",
  typingSpeed = 30,
  className,
  showLineNumbers = true,
}: CodeBlockProps) {
  const languageColor = languageColors[language] || "text-slate-400";

  return (
    <motion.div
      className={cn(
        "rounded-lg bg-slate-900/80 border border-slate-700 p-4 font-mono text-sm overflow-hidden",
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Language indicator */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-700">
        <span className={cn("text-xs font-medium", languageColor)}>
          {language}
        </span>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
        </div>
      </div>

      {/* Code lines */}
      <div className="space-y-0.5">
        {lines.map((line, index) => (
          <motion.div
            key={index}
            className={cn(
              "flex gap-3 py-0.5",
              lineTypeClasses[line.type || "normal"]
            )}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: ((line.delay ?? index) * typingSpeed) / 1000,
              duration: 0.1,
            }}
          >
            {showLineNumbers && (
              <span className="text-slate-600 select-none w-6 text-right shrink-0">
                {index + 1}
              </span>
            )}
            <span className="flex-1">{line.content || "\u00A0"}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

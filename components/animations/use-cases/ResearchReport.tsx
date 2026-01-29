"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, FileText, Download } from "lucide-react";
import { AnimationContainer } from "../shared/LazyAnimationWrapper";
import { BotAvatar } from "../shared/BotAvatar";
import type { AgentRole } from "../shared/AgentNode";

// The research query that gets typed out
const RESEARCH_QUERY = "Generate a comprehensive market analysis report on AI trends and forecast for 2025...";

// Number of lines to generate
const TOTAL_LINES = 24;

// Speed of typing (ms per character)
const TYPING_SPEED = 30;

// Speed of line generation (ms per update)
const GENERATION_SPEED = 150;

// Single agent role for all lines
const AGENT_ROLE: AgentRole = "researcher";
const AGENT_COLOR = "cyan";

// Line data structure
interface Line {
  id: number;
  visible: boolean;
}

export function ResearchReport() {
  // Typing animation state
  const [typedQuery, setTypedQuery] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // Report generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  // Progress tracking
  const [progress, setProgress] = useState(0);

  // Type out the research query
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < RESEARCH_QUERY.length) {
        setTypedQuery(RESEARCH_QUERY.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
        // Start generating report after typing finishes
        setTimeout(() => {
          setIsGenerating(true);
        }, 500);
      }
    }, TYPING_SPEED);

    return () => clearInterval(interval);
  }, []);

  // Generate report lines
  useEffect(() => {
    if (!isGenerating) return;

    let prog = 0;
    let lineIndex = 0;

    const interval = setInterval(() => {
      // Increment progress
      prog += Math.random() * 3 + 1;
      if (prog > 100) prog = 100;
      setProgress(prog);

      // Add lines based on progress
      const targetLines = Math.floor(TOTAL_LINES * (prog / 100));
      while (lineIndex < targetLines) {
        const newLine: Line = { id: lineIndex, visible: true };
        setLines((prev) => [...prev, newLine]);
        lineIndex++;
      }

      // Check completion
      if (prog >= 100) {
        clearInterval(interval);
        setIsComplete(true);
      }
    }, GENERATION_SPEED);

    return () => clearInterval(interval);
  }, [isGenerating]);

  return (
    <AnimationContainer
      title="Research Report"
      description="Watch AI agents collaborate to write a comprehensive research report"
    >
      <div className="relative w-full h-full p-8 flex items-center justify-between gap-8">
        {/* Left Side - User Typing Prompt */}
        <motion.div
        className="flex-1 flex flex-col items-center justify-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* User Avatar */}
        <motion.div
          className="mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border-2 border-slate-600 flex items-center justify-center shadow-lg">
            <User className="w-8 h-8 text-slate-300" />
          </div>
        </motion.div>

        {/* Prompt Input Box */}
        <div className="w-full max-w-lg">
          <div className="relative bg-slate-900/80 border-2 border-slate-700 rounded-2xl p-6 shadow-xl">
            {/* Prompt Label */}
            <motion.div
              className="absolute -top-3 left-4 px-3 py-1 bg-slate-800 border border-slate-600 rounded-full text-xs text-slate-400"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              Your Prompt
            </motion.div>

            {/* Typed Text */}
            <div className="min-h-[80px] text-slate-200 text-base leading-relaxed">
              {typedQuery}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-0.5 h-5 bg-cyan-400 ml-1 align-middle"
              />
            </div>

            {/* Send Button */}
            <motion.div
              className="absolute -right-4 -bottom-4"
              initial={{ scale: 0 }}
              animate={isTyping ? {} : { scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg">
                <Send className="w-5 h-5 text-white" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Typing Status */}
        <motion.div
          className="mt-4 text-sm text-slate-500"
          animate={{ opacity: isTyping ? 1 : 0 }}
        >
          {isTyping ? "Typing..." : "Prompt sent!"}
        </motion.div>
      </motion.div>

      {/* Right Side - Report Document */}
      <motion.div
        className="flex-1 flex flex-col items-center justify-center"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: isGenerating ? 1 : 0.4, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {!isComplete ? (
          // Document view while generating
          <div className="w-full max-w-[320px]">
            {/* Document container */}
            <motion.div
              className="bg-slate-900/90 border border-slate-700 rounded-xl p-5 shadow-2xl"
              animate={isGenerating && !isComplete ? {
                scale: [1, 1.005, 1],
                borderColor: [
                  "rgb(51, 65, 85)",
                  "rgb(6, 182, 212)",
                  "rgb(51, 65, 85)"
                ]
              } : {}}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Document header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-medium text-slate-300">
                    AI Market Analysis 2025
                  </span>
                </div>
                <motion.div
                  className="text-xs text-cyan-400 font-medium"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {lines.length} / {TOTAL_LINES} lines
                </motion.div>
              </div>

              {/* Lines area */}
              <div className="space-y-1.5 max-h-[280px] overflow-hidden pr-2">
                <AnimatePresence>
                  {lines.map((line, index) => (
                    <motion.div
                      key={line.id}
                      initial={{ opacity: 0, x: -20, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: "auto" }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      {/* Line with agent icon - with pulsing animation */}
                      <motion.div
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 relative overflow-hidden"
                        animate={{
                          scale: [1, 1.02, 1],
                          borderColor: [
                            "rgb(51, 65, 85)",
                            "rgb(6, 182, 212)",
                            "rgb(51, 65, 85)"
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.1
                        }}
                      >
                        {/* Radiating glow effect */}
                        <motion.div
                          className="absolute inset-0 rounded-lg bg-cyan-500/10"
                          animate={{
                            opacity: [0, 0.3, 0],
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.15,
                          }}
                        />

                        {/* Shimmer effect */}
                        <motion.div
                          className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
                          animate={{
                            x: ["-100%", "100%"],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                            delay: index * 0.2,
                          }}
                        />

                        {/* Agent icon with vibration */}
                        <motion.div
                          animate={{
                            rotate: [0, -2, 2, -2, 0],
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.1,
                          }}
                        >
                          <BotAvatar role={AGENT_ROLE} color={AGENT_COLOR} size="xs" />
                        </motion.div>

                        {/* Text with subtle pulse */}
                        <motion.p
                          className="text-[10px] text-slate-300 relative z-10"
                          animate={{
                            opacity: [0.8, 1, 0.8],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.1,
                          }}
                        >
                          Agent researching...
                        </motion.p>

                        {/* Typing dots */}
                        <motion.div
                          className="flex gap-0.5 ml-auto relative z-10"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1, repeat: Infinity, delay: index * 0.2 }}
                        >
                          <motion.div
                            className="w-0.5 h-0.5 rounded-full bg-cyan-400"
                            animate={{ scaleY: [1, 1.5, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: index * 0.2 }}
                          />
                          <motion.div
                            className="w-0.5 h-0.5 rounded-full bg-cyan-400"
                            animate={{ scaleY: [1, 1.5, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: index * 0.2 + 0.1 }}
                          />
                          <motion.div
                            className="w-0.5 h-0.5 rounded-full bg-cyan-400"
                            animate={{ scaleY: [1, 1.5, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: index * 0.2 + 0.2 }}
                          />
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Loading indicator at bottom */}
                {!isComplete && isGenerating && (
                  <motion.div
                    className="flex items-center gap-2 py-2 px-4"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <div className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse" />
                    <span className="text-xs text-slate-500">Generating...</span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        ) : (
          // Complete button view
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-full max-w-[280px]"
          >
            <motion.button
              className="w-full px-8 py-6 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 border-2 border-cyan-400 shadow-lg shadow-cyan-500/30 flex flex-col items-center gap-3 hover:from-cyan-500 hover:to-teal-500 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FileText className="w-14 h-14 text-white" />
              <span className="text-lg font-bold text-white">Report Ready!</span>
              <div className="flex items-center gap-2 text-cyan-100 text-sm">
                <Download className="w-4 h-4" />
                <span>Click to download</span>
              </div>
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
    </AnimationContainer>
  );
}

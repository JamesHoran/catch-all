"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Zap, Users, Timer } from "lucide-react";
import { AnimationContainer } from "../shared/LazyAnimationWrapper";
import { BotAvatar } from "../shared/BotAvatar";
import type { AgentRole } from "../shared/AgentNode";

// The prompt that gets typed out
const PROMPT = "Analyze 100,000 customer records and generate insights...";

// Agent roles
const SINGLE_AGENT: AgentRole = "analyst";
const SWARM_AGENT_ROLE: AgentRole = "analyst";
const AGENT_COLOR = "violet";

// Task counts
const TOTAL_TASKS = 100000;

// Speed comparison - single agent is much slower
const SINGLE_AGENT_TASKS_PER_TICK = 1;
const SWARM_TASKS_PER_TICK = 500;

export function SwarmSpeed() {
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Single agent progress
  const [singleProgress, setSingleProgress] = useState(0);
  const [singleTasksComplete, setSingleTasksComplete] = useState(0);

  // Swarm progress
  const [swarmProgress, setSwarmProgress] = useState(0);
  const [swarmTasksComplete, setSwarmTasksComplete] = useState(0);
  const [swarmAgentCount, setSwarmAgentCount] = useState(10000);

  // Winner
  const [winner, setWinner] = useState<"single" | "swarm" | null>(null);

  // Type out the prompt
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < PROMPT.length) {
        setTypedText(PROMPT.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
        setTimeout(() => {
          setIsRunning(true);
        }, 500);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Run the speed comparison
  useEffect(() => {
    if (!isRunning) return;

    let singleDone = false;
    let swarmDone = false;

    const interval = setInterval(() => {
      // Single agent processing (slow)
      if (!singleDone) {
        setSingleTasksComplete((prev) => {
          const newVal = prev + SINGLE_AGENT_TASKS_PER_TICK;
          if (newVal >= TOTAL_TASKS) {
            singleDone = true;
            setSingleProgress(100);
            return TOTAL_TASKS;
          }
          setSingleProgress((newVal / TOTAL_TASKS) * 100);
          return newVal;
        });
      }

      // Swarm processing (fast - many agents in parallel)
      if (!swarmDone) {
        setSwarmTasksComplete((prev) => {
          const newVal = prev + SWARM_TASKS_PER_TICK;
          if (newVal >= TOTAL_TASKS) {
            swarmDone = true;
            setSwarmProgress(100);
            setWinner("swarm");
            // Delay slightly before showing completion
            setTimeout(() => {
              setIsComplete(true);
            }, 500);
            return TOTAL_TASKS;
          }
          setSwarmProgress((newVal / TOTAL_TASKS) * 100);

          // Update virtual agent count as they join
          setSwarmAgentCount((prev) => {
            const progress = newVal / TOTAL_TASKS;
            return Math.floor(10000 * (0.1 + progress * 0.9));
          });

          return newVal;
        });
      }

      // Check if both done
      if (singleDone && swarmDone) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isRunning]);

  // Calculate time difference
  const singleTimePercent = singleProgress;
  const swarmTimePercent = swarmProgress;

  return (
    <AnimationContainer
      title="Speed Comparison"
      description="See the dramatic speed difference: 1 agent vs 10,000 agents working in parallel"
    >
      <div className="relative w-full h-full p-8 flex items-center justify-between gap-8">
        {/* Left Side - User Prompt */}
        <motion.div
        className="w-[280px] flex flex-col justify-center"
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
              {typedText}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-0.5 h-5 bg-violet-400 ml-1 align-middle"
              />
            </div>

            {/* Send Button */}
            <motion.div
              className="absolute -right-4 -bottom-4"
              initial={{ scale: 0 }}
              animate={isTyping ? {} : { scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg">
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

      {/* Right Side - Speed Comparison */}
      <motion.div
        className="flex-1 flex flex-col justify-center gap-4"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: isRunning ? 1 : 0.4, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Single Agent */}
        <motion.div
          className="bg-slate-900/90 border border-slate-700 rounded-xl p-4"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-300">1 Agent</span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-400">{singleTasksComplete.toLocaleString()}</div>
              <div className="text-xs text-slate-500">/ {TOTAL_TASKS.toLocaleString()} tasks</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <motion.div
              className={`h-full ${singleProgress >= 100 ? "bg-slate-500" : "bg-gradient-to-r from-slate-500 to-slate-400"}`}
              animate={{ width: `${singleProgress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Single agent working */}
          <div className="mt-3 flex items-center justify-center">
            <motion.div
              animate={isRunning && singleProgress < 100 ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <BotAvatar role={SINGLE_AGENT} color={AGENT_COLOR} size="md" status={singleProgress >= 100 ? "complete" : "working"} />
            </motion.div>
          </div>

          {/* Time indicator */}
          {singleProgress < 100 && isRunning && (
            <div className="mt-2 text-center text-xs text-slate-500 flex items-center justify-center gap-1">
              <Timer className="w-3 h-3" />
              <span>{Math.floor(100 / Math.max(singleProgress, 1))}x slower...</span>
            </div>
          )}
        </motion.div>

        {/* VS Divider */}
        <div className="flex items-center justify-center">
          <motion.div
            className="text-2xl font-black text-slate-600"
            animate={isRunning && !isComplete ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          >
            VS
          </motion.div>
        </div>

        {/* 10,000 Agents */}
        <motion.div
          className={`bg-slate-900/90 border rounded-xl p-4 ${
            winner === "swarm" && isComplete
              ? "border-violet-500 shadow-lg shadow-violet-500/30"
              : "border-slate-700"
          }`}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-medium text-violet-300">
                {swarmAgentCount.toLocaleString()} Agents
              </span>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${winner === "swarm" ? "text-violet-400" : "text-violet-300"}`}>
                {swarmTasksComplete.toLocaleString()}
              </div>
              <div className="text-xs text-slate-500">/ {TOTAL_TASKS.toLocaleString()} tasks</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <motion.div
              className={`h-full ${swarmProgress >= 100 ? "bg-gradient-to-r from-violet-500 to-purple-500" : "bg-gradient-to-r from-violet-600 to-purple-600"}`}
              animate={{ width: `${swarmProgress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Agents grid visualization */}
          <div className="mt-3 flex flex-wrap justify-center gap-1 max-h-[60px] overflow-hidden">
            {[...Array(Math.min(50, Math.floor(swarmAgentCount / 200)))].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.02 }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
              </motion.div>
            ))}
          </div>

          {/* Speed indicator */}
          {swarmProgress < 100 && isRunning && (
            <div className="mt-2 text-center text-xs text-violet-400 flex items-center justify-center gap-1">
              <Zap className="w-3 h-3" />
              <span>{Math.floor(SWARM_TASKS_PER_TICK / SINGLE_AGENT_TASKS_PER_TICK)}x faster!</span>
            </div>
          )}
        </motion.div>

        {/* Winner banner */}
        <AnimatePresence>
          {isComplete && winner === "swarm" && (
            <motion.div
              initial={{ scale: 0, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0, y: 20 }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 border-2 border-violet-400 flex items-center justify-center gap-3 shadow-lg shadow-violet-500/30"
            >
              <Zap className="w-5 h-5 text-white" />
              <span className="text-sm font-bold text-white">
                Swarm wins! Completed {SWARM_TASKS_PER_TICK}x faster
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
    </AnimationContainer>
  );
}

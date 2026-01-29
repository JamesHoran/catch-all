"use client";

import { motion } from "framer-motion";
import { Bug, AlertTriangle, Shield, CheckCircle, Radar, Target, Zap, Crosshair } from "lucide-react";
import { AnimationContainer } from "../shared/LazyAnimationWrapper";
import { AgentNode, type AgentRole } from "../shared/AgentNode";
import { useState, useEffect } from "react";

const PROMPT = "Scan the codebase and find all critical bugs before production release...";

const agents = [
  { id: 1, role: "tester" as AgentRole, color: "red", delay: 0 },
  { id: 2, role: "tester" as AgentRole, color: "orange", delay: 100 },
  { id: 3, role: "analyst" as AgentRole, color: "yellow", delay: 200 },
  { id: 4, role: "backend" as AgentRole, color: "amber", delay: 300 },
  { id: 5, role: "frontend" as AgentRole, color: "lime", delay: 400 },
];

const bugStages = [
  { id: 1, name: "Scanning codebase...", threshold: 10 },
  { id: 2, name: "Analyzing patterns...", threshold: 25 },
  { id: 3, name: "Detecting vulnerabilities...", threshold: 45 },
  { id: 4, name: "Running tests...", threshold: 65 },
  { id: 5, name: "Fixing issues...", threshold: 85 },
  { id: 6, name: "Verifying fixes...", threshold: 95 },
];

interface FoundBug {
  id: number;
  type: "critical" | "high" | "medium" | "low";
  x: number;
  y: number;
  fixed: boolean;
}

export function BugHuntPro() {
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showAgents, setShowAgents] = useState(false);
  const [activeAgents, setActiveAgents] = useState<number[]>([]);
  const [scanProgress, setScanProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [bugsFound, setBugsFound] = useState(0);
  const [bugs, setBugs] = useState<FoundBug[]>([]);

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < PROMPT.length) {
        setTypedText(PROMPT.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
        setTimeout(() => {
          setShowAgents(true);
        }, 300);
      }
    }, 35);
    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    if (showAgents) {
      agents.forEach((agent) => {
        setTimeout(() => {
          setActiveAgents((prev) => [...prev, agent.id]);
        }, agent.delay);
      });

      setTimeout(() => {
        startScanProgress();
      }, 1500);
    }
  }, [showAgents]);

  const startScanProgress = () => {
    let progress = 0;
    const totalBugs = 247;

    const progressInterval = setInterval(() => {
      progress += Math.random() * 6 + 2;

      if (progress >= 100) {
        progress = 100;
        clearInterval(progressInterval);
        setIsComplete(true);
        setBugsFound(totalBugs);
      } else {
        setScanProgress(progress);
        setBugsFound(Math.floor(totalBugs * (progress / 100)));

        // Add bugs randomly
        if (Math.random() > 0.7) {
          const newBug: FoundBug = {
            id: Date.now(),
            type: ["critical", "high", "medium", "low"][Math.floor(Math.random() * 4)] as FoundBug["type"],
            x: Math.random() * 80 + 10,
            y: Math.random() * 60 + 20,
            fixed: false,
          };
          setBugs((prev) => [...prev.slice(-8), newBug]);
        }

        // Fix some bugs
        setBugs((prev) =>
          prev.map((bug) =>
            Math.random() > 0.8 ? { ...bug, fixed: true } : bug
          )
        );

        const stageIndex = bugStages.findIndex(
          (stage) => progress < stage.threshold
        );
        setCurrentStage(stageIndex === -1 ? bugStages.length : Math.max(0, stageIndex - 1));
      }
    }, 80);
  };

  const bugColors = {
    critical: "bg-red-500 border-red-400",
    high: "bg-orange-500 border-orange-400",
    medium: "bg-yellow-500 border-yellow-400",
    low: "bg-blue-500 border-blue-400",
  };

  return (
    <AnimationContainer
      title="Bug Hunt Pro"
      description="AI agents hunt down bugs in your codebase"
    >
      <div className="relative w-full h-full p-6 flex gap-6">
        {/* Left Side - User Prompt */}
        <motion.div
          className="flex-1 flex flex-col justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-slate-900/80 border-2 border-slate-700 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-red-400" />
              <span className="text-sm font-medium text-slate-300">Bug Hunt Command</span>
            </div>
            <div className="min-h-[60px] text-slate-200 text-sm">
              {typedText}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-0.5 h-4 bg-red-400 ml-1 align-middle"
              />
            </div>
            <motion.div
              className="mt-3 text-xs text-slate-500"
              animate={{ opacity: isTyping ? 1 : 0 }}
            >
              {isTyping ? "Entering command..." : "Scan initiated!"}
            </motion.div>
          </div>
        </motion.div>

        {/* Center - Radar Display */}
        <motion.div
          className="flex-1 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: showAgents ? 1 : 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-full aspect-square max-w-[280px]">
            {/* Radar circles */}
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {[1, 2, 3, 4].map((i) => (
                <circle
                  key={i}
                  cx={50}
                  cy={50}
                  r={i * 10}
                  fill="none"
                  stroke="#334155"
                  strokeWidth="0.5"
                />
              ))}

              {/* Radar sweep */}
              <motion.line
                x1={50}
                y1={50}
                x2={50}
                y2={10}
                stroke="#22c55e"
                strokeWidth="1"
                strokeLinecap="round"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{
                  transformOrigin: "50px 50px",
                  filter: "drop-shadow(0 0 8px rgba(34, 197, 94, 0.6))"
                }}
              />

              {/* Bug indicators */}
              {bugs.slice(-5).map((bug) => (
                <g key={bug.id}>
                  <circle
                    cx={bug.x}
                    cy={bug.y}
                    r="3"
                    fill={bug.fixed ? "#22c55e" : bugColors[bug.type].split(" ")[0].replace("bg-", "#")}
                    stroke={bug.fixed ? "#16a34a" : (bugColors[bug.type].split(" ").pop()?.replace("border-", "#") || "#ef4444")}
                    strokeWidth="0.5"
                    opacity={bug.fixed ? 0.4 : 1}
                  />
                  {!bug.fixed && (
                    <motion.g
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <circle cx={bug.x} cy={bug.y} r="5" fill="none" stroke="#ef4444" strokeWidth="0.3" />
                    </motion.g>
                  )}
                </g>
              ))}
            </svg>

            {/* Center radar hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Radar className={`w-8 h-8 ${showAgents ? "text-green-400" : "text-slate-600"}`} />
            </div>
          </div>
        </motion.div>

        {/* Right Side - Agents & Stats */}
        <motion.div
          className="flex-1 flex flex-col justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Stats */}
          <motion.div
            className="mb-4 grid grid-cols-2 gap-2"
            animate={{ opacity: showAgents ? 1 : 0.5 }}
          >
            <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-red-400">{bugsFound}</div>
              <div className="text-xs text-slate-500">Bugs Found</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-400">{bugs.filter(b => b.fixed).length}</div>
              <div className="text-xs text-slate-500">Fixed</div>
            </div>
          </motion.div>

          {/* Current stage */}
          {showAgents && !isComplete && (
            <motion.div
              className="mb-3 px-3 py-1 rounded-full bg-red-900/30 border border-red-500/50"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <span className="text-xs text-red-300">
                {bugStages[Math.min(currentStage, bugStages.length - 1)]?.name || "Initializing..."}
              </span>
            </motion.div>
          )}

          {/* Progress bar */}
          {showAgents && (
            <motion.div
              className="mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <motion.div
                  className={`h-full ${isComplete ? "bg-green-500" : "bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"}`}
                  animate={{ width: `${scanProgress}%` }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-slate-500">Scan Progress</span>
                <span className={`text-xs font-medium ${isComplete ? "text-green-400" : "text-red-400"}`}>
                  {Math.round(scanProgress)}%
                </span>
              </div>
            </motion.div>
          )}

          {/* Agent swarm */}
          <div className="flex flex-wrap justify-center gap-2">
            {agents.map((agent, index) => {
              const isActive = activeAgents.includes(agent.id);
              const isAwakened = activeAgents.length >= index + 1;

              return (
                <motion.div
                  key={agent.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: isAwakened ? 1 : 0.5,
                    opacity: isAwakened ? 1 : 0.3,
                  }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                >
                  <AgentNode
                    id={agent.id}
                    role={agent.role}
                    status={isActive ? "working" : "idle"}
                    size="sm"
                    color={agent.color}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Complete status */}
          {isComplete && (
            <motion.div
              className="mt-4 px-4 py-2 rounded-full bg-green-900/50 border border-green-500 flex items-center justify-center gap-2"
              initial={{ scale: 0, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring" }}
            >
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400 font-medium">All Bugs Squashed!</span>
              <CheckCircle className="w-4 h-4 text-green-400" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimationContainer>
  );
}

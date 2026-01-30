"use client";

import { motion } from "framer-motion";
import { Send, Sparkles, User, CheckCircle2, Rocket } from "lucide-react";
import { AnimationContainer } from "../shared/LazyAnimationWrapper";
import { AgentNode, type AgentRole } from "../shared/AgentNode";
import { useState, useEffect } from "react";

// The prompt to be typed out
const PROMPT = "Build me a full-stack e-commerce platform with inventory management, payment processing, and real-time analytics dashboard...";

// 10 agents with their roles and colors
const agents = [
  { id: 1, role: "architect" as AgentRole, color: "blue", delay: 0 },
  { id: 2, role: "backend" as AgentRole, color: "violet", delay: 100 },
  { id: 3, role: "database" as AgentRole, color: "pink", delay: 200 },
  { id: 4, role: "api" as AgentRole, color: "orange", delay: 300 },
  { id: 5, role: "frontend" as AgentRole, color: "teal", delay: 400 },
  { id: 6, role: "mobile" as AgentRole, color: "lime", delay: 500 },
  { id: 7, role: "tester" as AgentRole, color: "red", delay: 600 },
  { id: 8, role: "deployer" as AgentRole, color: "green", delay: 700 },
  { id: 9, role: "monitor" as AgentRole, color: "emerald", delay: 800 },
  { id: 10, role: "analyst" as AgentRole, color: "indigo", delay: 900 },
];

// Build stages that show progress
const buildStages = [
  { id: 1, name: "Analyzing requirements...", threshold: 5 },
  { id: 2, name: "Designing architecture...", threshold: 15 },
  { id: 3, name: "Setting up database schema...", threshold: 25 },
  { id: 4, name: "Building API endpoints...", threshold: 40 },
  { id: 5, name: "Creating frontend components...", threshold: 55 },
  { id: 6, name: "Implementing payment gateway...", threshold: 65 },
  { id: 7, name: "Adding inventory management...", threshold: 75 },
  { id: 8, name: "Building analytics dashboard...", threshold: 85 },
  { id: 9, name: "Running tests...", threshold: 92 },
  { id: 10, name: "Deploying to production...", threshold: 98 },
];

export function SwarmLauncher() {
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showAgents, setShowAgents] = useState(false);
  const [activeAgents, setActiveAgents] = useState<number[]>([]);
  const [buildProgress, setBuildProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [virtualAgentCount, setVirtualAgentCount] = useState(10);

  // Typing animation
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < PROMPT.length) {
        setTypedText(PROMPT.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
        // Show agents after typing completes
        setTimeout(() => {
          setShowAgents(true);
        }, 300);
      }
    }, 40);

    return () => clearInterval(typingInterval);
  }, []);

  // Activate agents sequentially
  useEffect(() => {
    if (showAgents) {
      agents.forEach((agent) => {
        setTimeout(() => {
          setActiveAgents((prev) => [...prev, agent.id]);
        }, agent.delay);
      });

      // Start build progress after all agents activate
      setTimeout(() => {
        startBuildProgress();
      }, 1500);
    }
  }, [showAgents]);

  // Simulate rapid build progress with virtual agent counter
  const startBuildProgress = () => {
    let progress = 0;
    const totalAgents = 100000;
    const activeLeaderAgents = 10;

    const progressInterval = setInterval(() => {
      // Add random increment (1-2% for ~7 second average build time)
      progress += Math.random() * 1 + 1;

      // Ensure we hit exactly 100 when close enough
      if (progress >= 99) {
        progress = 100;
      }

      if (progress >= 100) {
        setBuildProgress(100);
        clearInterval(progressInterval);
        setIsComplete(true);
        setVirtualAgentCount(totalAgents);

        // Update current stage based on progress
        const stageIndex = buildStages.findIndex(
          (stage) => 100 < stage.threshold
        );
        setCurrentStage(stageIndex === -1 ? buildStages.length : Math.max(0, stageIndex - 1));
      } else {
        setBuildProgress(progress);
        setVirtualAgentCount(Math.floor(
          activeLeaderAgents + (totalAgents - activeLeaderAgents) * (progress / 100)
        ));

        // Update current stage based on progress
        const stageIndex = buildStages.findIndex(
          (stage) => progress < stage.threshold
        );
        setCurrentStage(stageIndex === -1 ? buildStages.length : Math.max(0, stageIndex - 1));
      }
    }, 100);
  };

  return (
    <AnimationContainer
      title="AI Swarm Launcher"
      description="Watch a single prompt activate 10 specialized AI agents"
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
                {typedText}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-0.5 h-5 bg-blue-400 ml-1 align-middle"
                />
              </div>

              {/* Send Button */}
              <motion.div
                className="absolute -right-4 -bottom-4"
                initial={{ scale: 0 }}
                animate={isTyping ? {} : { scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center shadow-lg">
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

        {/* Center - Connection/Flow */}
        <motion.div
          className="flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: showAgents ? 1 : 0.3 }}
          transition={{ duration: 0.5 }}
        >
          {/* Flowing particles */}
          <div className="relative w-24 h-64 overflow-hidden">
            {showAgents && [...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-violet-400"
                initial={{ left: "0%", top: "50%", opacity: 0 }}
                animate={{
                  left: ["0%", "100%"],
                  top: ["50%", `${20 + i * 15}%`],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Central hub */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900 border-2 border-blue-500 flex items-center justify-center z-10"
              animate={{
                boxShadow: showAgents
                  ? [
                      "0 0 20px rgba(59, 130, 246, 0.3)",
                      "0 0 40px rgba(59, 130, 246, 0.6)",
                      "0 0 20px rgba(59, 130, 246, 0.3)",
                    ]
                  : "0 0 10px rgba(59, 130, 246, 0.1)",
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <Sparkles className={`w-6 h-6 ${showAgents ? "text-blue-400" : "text-slate-600"}`} />
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - 10 Agents + Progress */}
        <motion.div
          className="flex-1 flex flex-col items-center justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Agent Count Label - Shows 10 out of 100,000 */}
          <motion.div
            className="mb-3 text-sm font-medium"
            animate={{ opacity: showAgents ? 1 : 0.5 }}
          >
            <span className="text-blue-400">{virtualAgentCount.toLocaleString()}</span>
            <span className="text-slate-500"> agents out of </span>
            <span className="text-slate-400">100,000</span>
            <span className="text-slate-500"> activated</span>
          </motion.div>

          {/* Current Build Stage */}
          {showAgents && !isComplete && (
            <motion.div
              className="mb-4 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/50"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <span className="text-xs text-blue-300">
                {buildStages[Math.min(currentStage, buildStages.length - 1)]?.name || "Initializing..."}
              </span>
            </motion.div>
          )}

          {/* Progress Bar */}
          {showAgents && (
            <motion.div
              className="w-full max-w-xs mb-4"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <motion.div
                  className={`h-full transition-all duration-100 ${
                    isComplete
                      ? "bg-gradient-to-r from-green-400 to-emerald-500"
                      : "bg-gradient-to-r from-blue-500 via-violet-500 to-teal-500"
                  }`}
                  animate={{ width: `${buildProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-slate-500">Build Progress</span>
                <span className={`text-xs font-medium ${isComplete ? "text-green-400" : "text-blue-400"}`}>
                  {Math.round(buildProgress)}%
                </span>
              </div>
            </motion.div>
          )}

          {/* Agent Grid */}
          <div className="grid grid-cols-5 gap-3">
            {agents.map((agent, index) => {
              const isActive = activeAgents.includes(agent.id);
              const isAwakened = activeAgents.length >= index + 1;

              return (
                <motion.div
                  key={agent.id}
                  className="flex flex-col items-center gap-1"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: isAwakened ? 1 : 0.5,
                    opacity: isAwakened ? 1 : 0.3,
                  }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                >
                  {/* Agent Node */}
                  <div className="relative">
                    <AgentNode
                      id={agent.id}
                      role={agent.role}
                      status={isActive ? "working" : "idle"}
                      size="sm"
                      color={agent.color}
                    />

                    {/* Activation ring effect */}
                    {isActive && !isComplete && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-blue-400"
                        animate={{
                          scale: [1, 1.5, 2],
                          opacity: [0.8, 0.4, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                        }}
                      />
                    )}
                  </div>

                  {/* Agent Label */}
                  <motion.div
                    className={`text-[10px] font-medium capitalize ${
                      isActive ? `text-${agent.color}-400` : "text-slate-600"
                    }`}
                    animate={{ opacity: isAwakened ? 1 : 0 }}
                  >
                    {agent.role}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Complete Status */}
          {isComplete && (
            <motion.div
              className="mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-2 border-green-500 flex items-center gap-3"
              initial={{ scale: 0, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring" }}
            >
              <Rocket className="w-5 h-5 text-green-400" />
              <div className="text-left">
                <span className="text-sm text-green-400 font-bold">App Complete!</span>
                <span className="block text-xs text-green-300/70">Deployed to production</span>
              </div>
              <CheckCircle2 className="w-6 h-6 text-green-400" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimationContainer>
  );
}

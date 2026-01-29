"use client";

import { motion } from "framer-motion";
import { PenTool, FileText, Image, Video, Mail, Share2, Sparkles, CheckCircle, Wand2 } from "lucide-react";
import { AnimationContainer } from "../shared/LazyAnimationWrapper";
import { AgentNode, type AgentRole } from "../shared/AgentNode";
import { useState, useEffect } from "react";

const PROMPT = "Create a complete content marketing campaign for our SaaS product launch with blog posts, social media, and email sequences...";

const agents = [
  { id: 1, role: "writer" as AgentRole, color: "rose", delay: 0 },
  { id: 2, role: "designer" as AgentRole, color: "purple", delay: 100 },
  { id: 3, role: "analyst" as AgentRole, color: "amber", delay: 200 },
  { id: 4, role: "editor" as AgentRole, color: "cyan", delay: 300 },
  { id: 5, role: "deployer" as AgentRole, color: "green", delay: 400 },
];

const contentTypes = [
  { icon: FileText, label: "Blog Posts", color: "rose" },
  { icon: Image, label: "Social Media", color: "purple" },
  { icon: Video, label: "Video Scripts", color: "cyan" },
  { icon: Mail, label: "Email Series", color: "green" },
  { icon: Share2, label: "Press Release", color: "amber" },
];

const contentStages = [
  { id: 1, name: "Researching topic...", threshold: 10 },
  { id: 2, name: "Generating blog posts...", threshold: 25 },
  { id: 3, name: "Creating social graphics...", threshold: 40 },
  { id: 4, name: "Writing email sequences...", threshold: 55 },
  { id: 5, name: "Producing video scripts...", threshold: 70 },
  { id: 6, name: "Finalizing campaign...", threshold: 85 },
];

interface CreatedContent {
  id: number;
  type: string;
  x: number;
  y: number;
  created: boolean;
}

export function ContentStorm() {
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showAgents, setShowAgents] = useState(false);
  const [activeAgents, setActiveAgents] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [contentCount, setContentCount] = useState(0);
  const [createdContent, setCreatedContent] = useState<CreatedContent[]>([]);

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
    }, 30);
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
        startCreation();
      }, 1500);
    }
  }, [showAgents]);

  const startCreation = () => {
    let prog = 0;
    const totalContent = 150;

    const interval = setInterval(() => {
      prog += Math.random() * 5 + 2;

      if (prog >= 100) {
        prog = 100;
        clearInterval(interval);
        setIsComplete(true);
        setContentCount(totalContent);
      } else {
        setProgress(prog);
        setContentCount(Math.floor(totalContent * (prog / 100)));

        // Add content items
        if (Math.random() > 0.6) {
          const newContent: CreatedContent = {
            id: Date.now(),
            type: contentTypes[Math.floor(Math.random() * contentTypes.length)].label,
            x: Math.random() * 70 + 15,
            y: Math.random() * 50 + 25,
            created: true,
          };
          setCreatedContent((prev) => [...prev.slice(-10), newContent]);
        }

        const stageIndex = contentStages.findIndex(
          (stage) => prog < stage.threshold
        );
        setCurrentStage(stageIndex === -1 ? contentStages.length : Math.max(0, stageIndex - 1));
      }
    }, 100);
  };

  return (
    <AnimationContainer
      title="Content Storm"
      description="AI content creation army at your fingertips"
    >
      <div className="relative w-full h-full p-6 flex gap-6">
        {/* Left Side - Prompt Input */}
        <motion.div
          className="flex-1 flex flex-col justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-2 border-purple-700/50 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <Wand2 className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-medium text-purple-200">Content Request</span>
            </div>
            <div className="min-h-[60px] text-purple-100 text-sm">
              {typedText}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-0.5 h-4 bg-purple-400 ml-1 align-middle"
              />
            </div>
            <motion.div
              className="mt-3 text-xs text-purple-400/70"
              animate={{ opacity: isTyping ? 1 : 0 }}
            >
              {isTyping ? "Magic in progress..." : "✨ Creating content!"}
            </motion.div>
          </div>
        </motion.div>

        {/* Center - Content Canvas */}
        <motion.div
          className="flex-1 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: showAgents ? 1 : 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-full aspect-square max-w-[280px]">
            {/* Sparkle effects */}
            {showAgents && [...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-purple-400"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
              />
            ))}

            {/* Content items floating */}
            {createdContent.slice(-8).map((content) => {
              const Icon = contentTypes.find(c => c.label === content.type)?.icon || FileText;
              return (
                <motion.div
                  key={content.id}
                  className="absolute"
                  style={{ left: `${content.x}%`, top: `${content.y}%` }}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring" }}
                >
                  <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-600">
                    <Icon className="w-4 h-4 text-purple-300" />
                  </div>
                </motion.div>
              );
            })}

            {/* Central creative hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg"
                animate={{
                  boxShadow: showAgents
                    ? [
                        "0 0 30px rgba(168, 85, 247, 0.4)",
                        "0 0 60px rgba(236, 72, 153, 0.6)",
                        "0 0 30px rgba(168, 85, 247, 0.4)",
                      ]
                    : "0 0 15px rgba(168, 85, 247, 0.2)",
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Agents & Progress */}
        <motion.div
          className="flex-1 flex flex-col justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Stats */}
          <motion.div
            className="mb-4 bg-slate-900/60 border border-slate-700 rounded-lg p-4 text-center"
            animate={{ opacity: showAgents ? 1 : 0.5 }}
          >
            <div className="text-3xl font-bold text-purple-400">{contentCount}</div>
            <div className="text-xs text-slate-500">Pieces Created</div>
          </motion.div>

          {/* Current stage */}
          {showAgents && !isComplete && (
            <motion.div
              className="mb-3 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/50"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <span className="text-xs text-purple-300">
                {contentStages[Math.min(currentStage, contentStages.length - 1)]?.name || "Initializing..."}
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
                  className={`h-full ${isComplete ? "bg-purple-500" : "bg-gradient-to-r from-rose-500 via-purple-500 to-amber-500"}`}
                  animate={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-slate-500">Creation</span>
                <span className={`text-xs font-medium ${isComplete ? "text-purple-400" : "text-rose-400"}`}>
                  {Math.round(progress)}%
                </span>
              </div>
            </motion.div>
          )}

          {/* Content type indicators */}
          <div className="flex flex-wrap justify-center gap-2 mb-3">
            {contentTypes.map((type, i) => (
              <motion.div
                key={type.label}
                className="px-2 py-1 rounded-full bg-slate-800 border border-slate-700 flex items-center gap-1"
                initial={{ scale: 0 }}
                animate={{ scale: showAgents ? 1 : 0.8 }}
                transition={{ delay: i * 0.1 }}
              >
                <type.icon className={`w-3 h-3 text-${type.color}-400`} />
                <span className="text-[10px] text-slate-400">{type.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Agent creators */}
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
              className="mt-4 px-4 py-2 rounded-full bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500 flex items-center justify-center gap-2"
              initial={{ scale: 0, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring" }}
            >
              <Sparkles className="w-4 h-4 text-purple-300" />
              <span className="text-sm text-purple-300 font-medium">Campaign Ready!</span>
              <CheckCircle className="w-4 h-4 text-purple-300" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimationContainer>
  );
}

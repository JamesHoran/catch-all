"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Users, HeadphonesIcon, CheckCircle, Send, Bot, Zap } from "lucide-react";
import { AnimationContainer } from "../shared/LazyAnimationWrapper";
import { AgentNode, type AgentRole } from "../shared/AgentNode";
import { ChatBubble } from "../shared/ChatBubble";
import { useState, useEffect } from "react";

const PROMPT = "Set up a 24/7 customer support system with intelligent routing and multi-tier escalation...";

const agents = [
  { id: 1, role: "analyst" as AgentRole, color: "blue", delay: 0 },
  { id: 2, role: "analyst" as AgentRole, color: "violet", delay: 100 },
  { id: 3, role: "researcher" as AgentRole, color: "pink", delay: 200 },
  { id: 4, role: "writer" as AgentRole, color: "amber", delay: 300 },
  { id: 5, role: "monitor" as AgentRole, color: "emerald", delay: 400 },
];

const supportStages = [
  { id: 1, name: "Training agents...", threshold: 10 },
  { id: 2, name: "Setting up knowledge base...", threshold: 22 },
  { id: 3, name: "Configuring routing...", threshold: 35 },
  { id: 4, name: "Testing escalation paths...", threshold: 50 },
  { id: 5, name: "Integrating channels...", threshold: 65 },
  { id: 6, name: "Going live...", threshold: 85 },
];

interface Ticket {
  id: string;
  message: string;
  tier: number;
  resolved: boolean;
}

const sampleTickets = [
  { message: "How do I reset my password?", tier: 1 },
  { message: "Payment failed, what do I do?", tier: 2 },
  { message: "Need help with API integration", tier: 3 },
  { message: "Custom enterprise pricing?", tier: 4 },
  { message: "Dashboard not loading properly", tier: 2 },
];

export function SupportHive() {
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showAgents, setShowAgents] = useState(false);
  const [activeAgents, setActiveAgents] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [ticketsResolved, setTicketsResolved] = useState(0);
  const [activeTickets, setActiveTickets] = useState<Ticket[]>([]);
  const [satisfaction, setSatisfaction] = useState(94);

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
        startSupportSetup();
      }, 1500);
    }
  }, [showAgents]);

  const startSupportSetup = () => {
    let prog = 0;
    const totalTickets = 50000;

    const interval = setInterval(() => {
      prog += Math.random() * 5 + 2;

      if (prog >= 100) {
        prog = 100;
        clearInterval(interval);
        setIsComplete(true);
        setTicketsResolved(totalTickets);
        setSatisfaction(98);
      } else {
        setProgress(prog);
        setTicketsResolved(Math.floor(totalTickets * (prog / 100)));

        // Add tickets randomly
        if (Math.random() > 0.7) {
          const ticket = sampleTickets[Math.floor(Math.random() * sampleTickets.length)];
          const newTicket: Ticket = {
            id: `${Date.now()}-${Math.random()}`,
            message: ticket.message,
            tier: ticket.tier,
            resolved: Math.random() > 0.6,
          };
          setActiveTickets((prev) => [...prev.slice(-3), newTicket]);

          // Auto-resolve after a moment
          setTimeout(() => {
            setActiveTickets((prev) =>
              prev.map((t) =>
                t.id === newTicket.id ? { ...t, resolved: true } : t
              )
            );
          }, 2000);
        }

        const stageIndex = supportStages.findIndex(
          (stage) => prog < stage.threshold
        );
        setCurrentStage(stageIndex === -1 ? supportStages.length : Math.max(0, stageIndex - 1));
      }
    }, 100);
  };

  const tierColors = {
    1: "border-blue-500 bg-blue-900/30",
    2: "border-violet-500 bg-violet-900/30",
    3: "border-pink-500 bg-pink-900/30",
    4: "border-amber-500 bg-amber-900/30",
  };

  return (
    <AnimationContainer
      title="Support Hive"
      description="24/7 AI customer support at massive scale"
    >
      <div className="relative w-full h-full p-8 flex items-center justify-center gap-8">
        {/* Left Side - Setup Command */}
        <motion.div
          className="flex-1 flex flex-col justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-br from-blue-900/40 to-violet-900/40 border-2 border-blue-700/50 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <HeadphonesIcon className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium text-blue-200">Support Setup</span>
            </div>
            <div className="min-h-[60px] text-blue-100 text-sm">
              {typedText}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-0.5 h-4 bg-blue-400 ml-1 align-middle"
              />
            </div>
            <motion.div
              className="mt-3 text-xs text-blue-400/70"
              animate={{ opacity: isTyping ? 1 : 0 }}
            >
              {isTyping ? "Configuring agents..." : "🎧 Support online!"}
            </motion.div>
          </div>
        </motion.div>

        {/* Center - Support Queue Visualization */}
        <motion.div
          className="flex-1 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: showAgents ? 1 : 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-full aspect-square max-w-[280px]">
            {/* Tier rings */}
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {[1, 2, 3, 4].map((tier) => (
                <circle
                  key={tier}
                  cx={50}
                  cy={50}
                  r={tier * 18}
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="0.5"
                />
              ))}

              {/* Active ticket paths */}
              {activeTickets.slice(-4).map((ticket) => (
                <g key={ticket.id}>
                  <motion.circle
                    cx={50}
                    cy={50}
                    r={ticket.tier * 18}
                    fill="none"
                    stroke={ticket.resolved ? "#22c55e" : "#3b82f6"}
                    strokeWidth="1"
                    opacity={ticket.resolved ? 0.3 : 0.8}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: ticket.resolved ? 0 : 1, opacity: [1, ticket.resolved ? 0 : 1] }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.circle
                    cx={50}
                    cy={50}
                    r={ticket.tier * 18}
                    fill={ticket.resolved ? "#22c55e" : "none"}
                    opacity={ticket.resolved ? 0.2 : 0}
                    initial={{ scale: 0 }}
                    animate={{ scale: ticket.resolved ? [0, 1, 0] : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </g>
              ))}
            </svg>

            {/* Central hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shadow-lg"
                animate={{
                  boxShadow: showAgents
                    ? [
                        "0 0 30px rgba(59, 130, 246, 0.4)",
                        "0 0 60px rgba(139, 92, 246, 0.6)",
                        "0 0 30px rgba(59, 130, 246, 0.4)",
                      ]
                    : "0 0 15px rgba(59, 130, 246, 0.2)",
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Users className="w-8 h-8 text-white" />
              </motion.div>
            </div>

            {/* Incoming chat bubbles */}
            <AnimatePresence>
              {activeTickets.slice(-2).map((ticket) => (
                <motion.div
                  key={ticket.id}
                  className="absolute"
                  style={{
                    left: `${ticket.tier * 15 + 10}%`,
                    top: "50%",
                  }}
                  initial={{ scale: 0, x: -20 }}
                  animate={{ scale: 1, x: 0 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`px-2 py-1 rounded-lg border ${tierColors[ticket.tier as keyof typeof tierColors]}`}>
                    <MessageCircle className="w-3 h-3 text-slate-300" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right Side - Agents & Metrics */}
        <motion.div
          className="flex-1 flex flex-col justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 gap-2 mb-4"
            animate={{ opacity: showAgents ? 1 : 0.5 }}
          >
            <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-blue-400">{ticketsResolved.toLocaleString()}</div>
              <div className="text-xs text-slate-500">Tickets</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-green-400">{satisfaction}%</div>
              <div className="text-xs text-slate-500">Satisfaction</div>
            </div>
          </motion.div>

          {/* Current stage */}
          {showAgents && !isComplete && (
            <motion.div
              className="mb-3 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/50"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <span className="text-xs text-blue-300">
                {supportStages[Math.min(currentStage, supportStages.length - 1)]?.name || "Initializing..."}
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
                  className={`h-full ${isComplete ? "bg-blue-500" : "bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500"}`}
                  animate={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-slate-500">Setup</span>
                <span className={`text-xs font-medium ${isComplete ? "text-blue-400" : "text-violet-400"}`}>
                  {Math.round(progress)}%
                </span>
              </div>
            </motion.div>
          )}

          {/* Active support agents */}
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
              className="mt-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-900/50 to-violet-900/50 border border-blue-500 flex items-center justify-center gap-2"
              initial={{ scale: 0, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring" }}
            >
              <HeadphonesIcon className="w-4 h-4 text-blue-300" />
              <span className="text-sm text-blue-300 font-medium">Support Live!</span>
              <CheckCircle className="w-4 h-4 text-blue-300" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimationContainer>
  );
}

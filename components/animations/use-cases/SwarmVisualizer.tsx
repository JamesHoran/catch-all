"use client";

import { motion } from "framer-motion";
import { Network, MessageSquare, Zap } from "lucide-react";
import { AnimationContainer } from "../shared/LazyAnimationWrapper";
import { AgentNode, type AgentRole } from "../shared/AgentNode";
import { useState, useEffect } from "react";

interface AgentMessage {
  id: string;
  from: number;
  to: number;
  content: string;
}

// Assign roles to each agent for bot avatar display
const agentRoles: Record<number, AgentRole> = {
  1: "architect",
  2: "backend",
  3: "database",
  4: "api",
  5: "frontend",
  6: "tester",
  7: "deployer",
  8: "monitor",
};

const agentColors: Record<number, string> = {
  1: "blue",
  2: "violet",
  3: "pink",
  4: "orange",
  5: "teal",
  6: "red",
  7: "green",
  8: "emerald",
};

export function SwarmVisualizer() {
  const [activeAgents, setActiveAgents] = useState<number[]>([]);
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [taskProgress, setTaskProgress] = useState(0);

  useEffect(() => {
    // Activate agents sequentially
    const agentIds = [1, 2, 3, 4, 5, 6, 7, 8];
    agentIds.forEach((id, i) => {
      setTimeout(() => {
        setActiveAgents((prev) => [...prev, id]);
      }, 400 * (i + 1));
    });

    // Simulate agent communication
    const communicationFlow: AgentMessage[] = [
      { id: "1", from: 1, to: 2, content: "Starting analysis..." },
      { id: "2", from: 2, to: 3, content: "Data received, processing..." },
      { id: "3", from: 3, to: 4, content: "Pattern detected, confirming..." },
      { id: "4", from: 4, to: 5, content: "Validating findings..." },
      { id: "5", from: 5, to: 6, content: "Cross-referencing..." },
      { id: "6", from: 6, to: 7, content: "Synthesizing results..." },
      { id: "7", from: 7, to: 8, content: "Final review..." },
      { id: "8", from: 8, to: 1, content: "All clear! Task complete." },
    ];

    communicationFlow.forEach((msg) => {
      setTimeout(() => {
        setMessages((prev) => [...prev, msg]);
      }, 2000 + communicationFlow.indexOf(msg) * 800);
    });

    // Update task progress
    const progressInterval = setInterval(() => {
      setTaskProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 8;
      });
    }, 500);

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <AnimationContainer title="Swarm Visualizer" description="Live AI swarm orchestration in action">
      <div className="relative w-full h-full">
        {/* Network Visualization */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Connection Lines */}
          {activeAgents.map((agentId) => {
            const angle = ((agentId - 1) / 8) * Math.PI * 2 - Math.PI / 2;
            const centerX = 50;
            const centerY = 50;
            const radius = 30;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            return (
              <motion.line
                key={`line-${agentId}`}
                x1={centerX}
                y1={centerY}
                x2={x}
                y2={y}
                stroke="#3b82f6"
                strokeWidth="0.5"
                opacity={0.6}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: agentId * 0.3, duration: 0.5 }}
                strokeDasharray={radius}
              />
            );
          })}

          {/* Message Tokens (flowing along edges) */}
          {messages.map((msg) => {
            const agentFrom = activeAgents.includes(msg.from);
            if (!agentFrom) return null;

            const angle = ((msg.from - 1) / 8) * Math.PI * 2 - Math.PI / 2;
            const centerX = 50;
            const centerY = 50;
            const radius = 30;

            return (
              <motion.circle
                key={msg.id}
                r="1.5"
                fill="#22c55e"
                initial={{ cx: centerX, cy: centerY }}
                animate={{
                  cx: centerX + radius * Math.cos(angle),
                  cy: centerY + radius * Math.sin(angle),
                }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            );
          })}

          {/* Orchestrator (Center) */}
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            <circle cx={50} cy={50} r="6" fill="#1e293b" stroke="#3b82f6" strokeWidth="1" />
            <Network className="w-3 h-3 text-blue-400" x={46.5} y={47} />

            {/* Pulse effect */}
            <motion.circle
              cx={50}
              cy={50}
              r="6"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.g>

          {/* Agent Nodes */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => {
            const isActive = activeAgents.includes(id);
            const angle = ((id - 1) / 8) * Math.PI * 2 - Math.PI / 2;
            const radius = 30;
            const x = 50 + radius * Math.cos(angle);
            const y = 50 + radius * Math.sin(angle);

            return (
              <g key={id}>
                {/* Connection to center (animated) */}
                {isActive && (
                  <motion.line
                    x1={50}
                    y1={50}
                    x2={x}
                    y2={y}
                    stroke="#60a5fa"
                    strokeWidth="0.3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.2, 0.6, 0.2] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: id * 0.1 }}
                  />
                )}

                {/* Agent Node */}
                <motion.circle
                  cx={x}
                  cy={y}
                  r="3"
                  fill={isActive ? "#1e3a5f" : "#1e293b"}
                  stroke={isActive ? "#60a5fa" : "#475569"}
                  strokeWidth="0.5"
                  initial={{ scale: 0 }}
                  animate={{ scale: isActive ? 1 : 0.5 }}
                  transition={{ type: "spring", delay: id * 0.2 }}
                />

                {/* Agent label */}
                {isActive && (
                  <motion.text
                    x={x}
                    y={y - 5}
                    textAnchor="middle"
                    fontSize="2"
                    fill="#94a3b8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: id * 0.2 + 0.2 }}
                  >
                    {agentRoles[id]?.charAt(0).toUpperCase() + agentRoles[id]?.slice(1) || `A${id}`}
                  </motion.text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Task Progress Panel */}
        <motion.div
          className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur border border-slate-700 rounded-lg px-4 py-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="text-xs text-slate-400 mb-1">Task Progress</div>
          <div className="text-2xl font-bold text-blue-400">{Math.round(taskProgress)}%</div>
          <div className="h-1 bg-slate-700 rounded-full overflow-hidden mt-1">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-green-500"
              animate={{ width: `${taskProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Communication Log */}
        <motion.div
          className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur border border-slate-700 rounded-lg px-3 py-2 max-h-32 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-xs text-slate-400 mb-2 flex items-center gap-1">
            <MessageSquare className="w-3 h-3" />
            Communication Log
          </div>
          <div className="space-y-1">
            {messages.slice(-3).map((msg) => (
              <div key={msg.id} className="text-xs text-slate-300">
                <span className={`text-${agentColors[msg.from]}-400`}>
                  {agentRoles[msg.from]?.charAt(0).toUpperCase() + agentRoles[msg.from]?.slice(1) || `A${msg.from}`}
                </span>
                <span className="text-slate-500"> → </span>
                <span className={`text-${agentColors[msg.to]}-400`}>
                  {agentRoles[msg.to]?.charAt(0).toUpperCase() + agentRoles[msg.to]?.slice(1) || `A${msg.to}`}
                </span>
                <span className="text-slate-500">: </span>
                <span>{msg.content}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Agent Status */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <AgentNode
                id={i}
                role={agentRoles[i]}
                status={activeAgents.includes(i) ? "working" : "idle"}
                size="sm"
                color={agentColors[i]}
              />
            </motion.div>
          ))}
        </div>

        {/* Completion Badge */}
        {taskProgress >= 100 && (
          <motion.div
            className="absolute bottom-4 right-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            <div className="px-3 py-2 rounded-full bg-green-900/30 border border-green-500 flex items-center gap-2">
              <Zap className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-green-400">Complete</span>
            </div>
          </motion.div>
        )}
      </div>
    </AnimationContainer>
  );
}

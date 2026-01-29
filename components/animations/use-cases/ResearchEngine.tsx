"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Brain, BookOpen, Globe, FileText, Sparkles } from "lucide-react";
import { AnimationContainer } from "../shared/LazyAnimationWrapper";
import { AgentNode, AgentRole } from "../shared/AgentNode";
import { WorkingAgent } from "../shared/WorkingAgent";
import { WorkArtifact } from "../shared/WorkArtifact";
import { useState, useEffect } from "react";

const CENTER = { x: 50, y: 50 };

const branches = [
  { id: "1", x: 50, y: 15, label: "Academic", icon: "book", angle: -90 },
  { id: "2", x: 75, y: 25, label: "News", icon: "globe", angle: -45 },
  { id: "3", x: 85, y: 50, label: "Blogs", icon: "globe", angle: 0 },
  { id: "4", x: 75, y: 75, label: "Papers", icon: "file", angle: 45 },
  { id: "5", x: 50, y: 85, label: "Datasets", icon: "file", angle: 90 },
  { id: "6", x: 25, y: 75, label: "Forums", icon: "globe", angle: 135 },
  { id: "7", x: 15, y: 50, label: "Videos", icon: "globe", angle: 180 },
  { id: "8", x: 25, y: 25, label: "Reports", icon: "file", angle: 225 },
];

const agentRoles: AgentRole[] = [
  "researcher",
  "analyst",
  "researcher",
  "analyst",
  "researcher",
  "analyst",
  "researcher",
  "analyst",
];

export function ResearchEngine() {
  const [activeAgents, setActiveAgents] = useState<number[]>([]);
  const [synthesisComplete, setSynthesisComplete] = useState(false);
  const [agentStates, setAgentStates] = useState<
    Array<{ id: number; state: "idle" | "outbound" | "gathering" | "returning" | "complete" }>
  >(
    Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      state: "idle" as const,
    }))
  );
  const [dataOrbs, setDataOrbs] = useState<Array<{ id: string; agentId: number; progress: number }>>([]);

  useEffect(() => {
    // Sequentially send agents to their branches
    branches.forEach((branch, index) => {
      // Agent moves to branch
      setTimeout(() => {
        setActiveAgents((prev) => [...prev, index + 1]);
        setAgentStates((prev) =>
          prev.map((a) => (a.id === index + 1 ? { ...a, state: "outbound" } : a))
        );
      }, branch.id === "1" ? 300 : index * 500 + 300);

      // Agent gathers data
      setTimeout(() => {
        setAgentStates((prev) =>
          prev.map((a) => (a.id === index + 1 ? { ...a, state: "gathering" } : a))
        );

        // Create data orb
        setTimeout(() => {
          setDataOrbs((prev) => [
            ...prev,
            { id: `${index + 1}-${Date.now()}`, agentId: index + 1, progress: 0 },
          ]);
        }, 1000);
      }, branch.id === "1" ? 1500 : index * 500 + 1500);

      // Agent returns with data
      setTimeout(() => {
        setAgentStates((prev) =>
          prev.map((a) => (a.id === index + 1 ? { ...a, state: "returning" } : a))
        );
      }, branch.id === "1" ? 3000 : index * 500 + 3000);
    });

    // Complete synthesis
    setTimeout(() => {
      setSynthesisComplete(true);
    }, 6000);
  }, []);

  // Update data orb progress
  useEffect(() => {
    dataOrbs.forEach((orb) => {
      if (orb.progress < 100) {
        const interval = setInterval(() => {
          setDataOrbs((prev) =>
            prev.map((o) =>
              o.id === orb.id ? { ...o, progress: Math.min(100, o.progress + 10) } : o
            )
          );
        }, 200);
        return () => clearInterval(interval);
      }
    });
  }, [dataOrbs]);

  return (
    <AnimationContainer title="Research Synthesis Engine" description="8 agents explore and synthesize research">
      <div className="relative w-full h-full">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Connection Lines */}
          {branches.map((branch, index) => {
            const isActive = activeAgents.includes(index + 1);
            return (
              <motion.line
                key={`line-${branch.id}`}
                x1={CENTER.x}
                y1={CENTER.y}
                x2={branch.x}
                y2={branch.y}
                stroke={isActive ? "#3b82f6" : "#334155"}
                strokeWidth="0.5"
                opacity={isActive ? 0.6 : 0.2}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: isActive ? 1 : 0 }}
                transition={{ delay: index * 0.4, duration: 0.5 }}
                strokeDasharray={Math.sqrt(Math.pow(branch.x - CENTER.x, 2) + Math.pow(branch.y - CENTER.y, 2))}
              />
            );
          })}

          {/* Data Flow Particles (returning to center) */}
          <AnimatePresence>
            {agentStates
              .filter((a) => a.state === "returning")
              .map((agent) => {
                const branchIndex = agent.id - 1;
                const branch = branches[branchIndex];
                if (!branch) return null;

                return (
                  <motion.circle
                    key={`particle-${agent.id}`}
                    r="2"
                    fill="#22c55e"
                    initial={{ cx: branch.x, cy: branch.y }}
                    animate={{ cx: [branch.x, CENTER.x], cy: [branch.y, CENTER.y] }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    exit={{ opacity: 0 }}
                  />
                );
              })}
          </AnimatePresence>

          {/* Center Node (Synthesis Core) */}
          <g>
            {/* Core background */}
            <circle cx={CENTER.x} cy={CENTER.y} r="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
            <Brain className="w-4 h-4 text-blue-400" x={CENTER.x - 8} y={CENTER.y - 8} />

            {/* Synthesis progress indicator */}
            <motion.circle
              cx={CENTER.x}
              cy={CENTER.y}
              r="8"
              fill="none"
              stroke="#22c55e"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: activeAgents.length / 8, opacity: synthesisComplete ? 1 : 0.5 }}
              transition={{ duration: 1 }}
              style={{
                strokeDasharray: "50",
                strokeDashoffset: 50 * (1 - activeAgents.length / 8),
              }}
            />

            {/* Completion pulse */}
            {synthesisComplete && (
              <motion.circle
                cx={CENTER.x}
                cy={CENTER.y}
                r="8"
                fill="none"
                stroke="#22c55e"
                strokeWidth="1"
                animate={{ scale: [1, 2.5, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </g>

          {/* Branch Nodes */}
          {branches.map((branch, index) => {
            const isActive = activeAgents.includes(index + 1);
            const agentState = agentStates[index];
            const hasAgent = agentState?.state !== "idle";

            return (
              <g key={branch.id}>
                {/* Branch circle */}
                <motion.circle
                  cx={branch.x}
                  cy={branch.y}
                  r="5"
                  fill={hasAgent ? "#1e3a5f" : "#1e293b"}
                  stroke={isActive ? "#60a5fa" : "#475569"}
                  strokeWidth="1"
                  initial={{ scale: 0 }}
                  animate={{ scale: isActive ? 1 : 0.8 }}
                  transition={{ delay: index * 0.4, duration: 0.3 }}
                />

                {/* Icon */}
                <text x={branch.x} y={branch.y + 1.5} textAnchor="middle" fontSize="3" fill={isActive ? "#60a5fa" : "#64748b"}>
                  {branch.icon === "globe" ? "🌐" : branch.icon === "file" ? "📄" : "📚"}
                </text>

                {/* Branch label */}
                {isActive && (
                  <motion.text
                    x={branch.x}
                    y={branch.y - 7}
                    textAnchor="middle"
                    fontSize="2"
                    fill="#94a3b8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.4 + 0.2 }}
                  >
                    {branch.label}
                  </motion.text>
                )}

                {/* Agent indicator at branch */}
                {hasAgent && (
                  <circle
                    cx={branch.x + 4}
                    cy={branch.y - 4}
                    r="2.5"
                    fill="#3b82f6"
                    stroke="#1e293b"
                    strokeWidth="0.5"
                  >
                    {agentState?.state === "gathering" && (
                      <animate
                        attributeName="r"
                        values="2.5;3.5;2.5"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    )}
                  </circle>
                )}

                {/* Gathering animation */}
                {agentState?.state === "gathering" && (
                  <motion.circle
                    cx={branch.x}
                    cy={branch.y}
                    r="6"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="0.5"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Moving Agents */}
        <AnimatePresence>
          {agentStates.map((agentState) => {
            const branchIndex = agentState.id - 1;
            const branch = branches[branchIndex];

            if (agentState.state === "idle" || agentState.state === "complete") return null;

            const isOutbound = agentState.state === "outbound";
            const isReturning = agentState.state === "returning";

            return (
              <WorkingAgent
                key={agentState.id}
                id={agentState.id}
                role={agentRoles[branchIndex]}
                icon={agentRoles[branchIndex] === "researcher" ? BookOpen : Globe}
                status={agentState.state === "gathering" ? "working" : "moving"}
                position={isOutbound ? CENTER : branch}
                targetPosition={isOutbound ? branch : CENTER}
                carrying={
                  isReturning ? <Sparkles className="w-3 h-3 text-green-400" /> : undefined
                }
                size="sm"
                color={agentRoles[branchIndex] === "researcher" ? "cyan" : "indigo"}
                showTrail={true}
                label={`${agentRoles[branchIndex]} ${agentState.id}`}
              />
            );
          })}
        </AnimatePresence>

        {/* Data Artifacts at center */}
        <AnimatePresence>
          {dataOrbs.map((orb) => (
            <WorkArtifact
              key={orb.id}
              type="insight"
              progress={orb.progress}
              contributors={[orb.agentId]}
              position={CENTER}
              size="sm"
              showContributors={false}
            />
          ))}
        </AnimatePresence>

        {/* Synthesis Summary */}
        {synthesisComplete && (
          <motion.div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur border border-green-700 rounded-lg px-6 py-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="text-center">
              <div className="text-lg font-bold text-green-400">Research Complete</div>
              <div className="text-sm text-slate-400">
                {activeAgents.length} sources synthesized
              </div>
            </div>
          </motion.div>
        )}

        {/* Agent Status Panel */}
        <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur border border-slate-700 rounded-lg px-3 py-2">
          <div className="text-xs text-slate-400 mb-2">Agent Status</div>
          <div className="space-y-1">
            {agentStates.map((agent) => {
              const branchIndex = agent.id - 1;
              const branch = branches[branchIndex];

              return (
                <div key={agent.id} className="flex items-center gap-2 text-xs">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      agent.state === "complete"
                        ? "bg-green-500"
                        : agent.state === "idle"
                          ? "bg-slate-600"
                          : "bg-blue-500"
                    }`}
                  />
                  <span className="text-slate-300">
                    {agent.state === "idle"
                      ? `Agent ${agent.id}`
                      : agent.state === "complete"
                        ? `Agent ${agent.id} ✓`
                        : `Agent ${agent.id} → ${branch.label}`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AnimationContainer>
  );
}

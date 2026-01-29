"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Layout, Server, Database, Cpu, Smartphone, Code, CheckCircle, GitBranch } from "lucide-react";
import { AnimationContainer } from "../shared/LazyAnimationWrapper";
import { AgentNode, AgentRole } from "../shared/AgentNode";
import { WorkingAgent } from "../shared/WorkingAgent";
import { WorkArtifact } from "../shared/WorkArtifact";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface Agent {
  id: number;
  name: string;
  role: AgentRole;
  icon: typeof Layout;
  color: string;
  station: { x: number; y: number };
  state: "idle" | "moving" | "working" | "delivering" | "complete";
  progress: number;
}

interface CodeBlock {
  id: string;
  type: "api" | "database" | "frontend" | "mobile";
  position: { x: number; y: number };
  status: "pending" | "building" | "delivered" | "assembled";
  contributorId?: number;
}

const agents: Agent[] = [
  { id: 1, name: "Architect", role: "architect", icon: Layout, color: "blue", station: { x: 15, y: 25 }, state: "idle", progress: 0 },
  { id: 2, name: "Backend", role: "backend", icon: Server, color: "violet", station: { x: 15, y: 50 }, state: "idle", progress: 0 },
  { id: 3, name: "Database", role: "database", icon: Database, color: "pink", station: { x: 15, y: 75 }, state: "idle", progress: 0 },
  { id: 4, name: "API", role: "api", icon: Cpu, color: "orange", station: { x: 85, y: 25 }, state: "idle", progress: 0 },
  { id: 5, name: "Frontend", role: "frontend", icon: Layout, color: "teal", station: { x: 85, y: 50 }, state: "idle", progress: 0 },
  { id: 6, name: "Mobile", role: "mobile", icon: Smartphone, color: "lime", station: { x: 85, y: 75 }, state: "idle", progress: 0 },
];

const SCAFFOLD_CENTER = { x: 50, y: 50 };

export function MvpBuilder() {
  const [agentStates, setAgentStates] = useState<Agent[]>(
    agents.map(a => ({ ...a, state: "idle" as const, progress: 0 }))
  );
  const [codeBlocks, setCodeBlocks] = useState<CodeBlock[]>([]);
  const [assembledBlocks, setAssembledBlocks] = useState<number>(0);
  const [overallProgress, setOverallProgress] = useState<number>(0);

  useEffect(() => {
    // Sequential agent activation
    agents.forEach((agent, index) => {
      // Move to work area
      setTimeout(() => {
        setAgentStates(prev => prev.map(a =>
          a.id === agent.id ? { ...a, state: "moving" } : a
        ));
      }, index * 800);

      // Start working
      setTimeout(() => {
        setAgentStates(prev => prev.map(a =>
          a.id === agent.id ? { ...a, state: "working", progress: 0 } : a
        ));

        // Simulate work progress
        let progress = 0;
        const progressInterval = setInterval(() => {
          progress += Math.random() * 15;
          if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);

            // Create code block
            const blockId = `${agent.id}-${Date.now()}`;
            setCodeBlocks(prev => [...prev, {
              id: blockId,
              type: agent.role as any,
              position: agent.station,
              status: "building",
              contributorId: agent.id,
            }]);

            // Move to deliver
            setAgentStates(prev => prev.map(a =>
              a.id === agent.id ? { ...a, state: "delivering", progress: 100 } : a
            ));
          }
          setAgentStates(prev => prev.map(a =>
            a.id === agent.id ? { ...a, progress } : a
          ));
        }, 200);

        return () => clearInterval(progressInterval);
      }, index * 800 + 1000);
    });
  }, []);

  // Animate code blocks moving to center
  useEffect(() => {
    codeBlocks.forEach((block, index) => {
      if (block.status === "building") {
        setTimeout(() => {
          setCodeBlocks(prev => prev.map(b =>
            b.id === block.id ? { ...b, status: "delivered" } : b
          ));
          setAssembledBlocks(prev => prev + 1);

          // Reset agent for next round
          const contributorId = block.contributorId;
          if (contributorId) {
            setAgentStates(prev => prev.map(a =>
              a.id === contributorId ? { ...a, state: "complete", progress: 100 } : a
            ));
          }
        }, 1500 + index * 500);
      }
    });
  }, [codeBlocks]);

  // Update overall progress
  useEffect(() => {
    const totalProgress = agentStates.reduce((sum, a) => sum + a.progress, 0);
    setOverallProgress(totalProgress / agentStates.length);
  }, [agentStates]);

  const isComplete = assembledBlocks >= agents.length;

  return (
    <AnimationContainer title="10-Minute MVP Builder" description="6 agents collaborate to build a full-stack app">
      <div className="relative w-full h-full">
        {/* Central App Scaffold */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-2xl border-2 bg-slate-900/80"
          style={{ borderColor: isComplete ? "rgb(34, 197, 94)" : "rgb(71, 85, 105)" }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {/* App Structure Layers */}
          <div className="absolute inset-2 space-y-1">
            {/* Layer 1: Backend */}
            <motion.div
              className="h-4 rounded bg-violet-900/50 border border-violet-500/30 flex items-center justify-center"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: agentStates[1]?.progress >= 100 ? 1 : 0 }}
              transition={{ delay: 2 }}
            >
              {agentStates[1]?.progress >= 100 && <Server className="w-3 h-3 text-violet-400" />}
            </motion.div>

            {/* Layer 2: Database */}
            <motion.div
              className="h-4 rounded bg-pink-900/50 border border-pink-500/30 flex items-center justify-center"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: agentStates[2]?.progress >= 100 ? 1 : 0 }}
              transition={{ delay: 2.8 }}
            >
              {agentStates[2]?.progress >= 100 && <Database className="w-3 h-3 text-pink-400" />}
            </motion.div>

            {/* Layer 3: API */}
            <motion.div
              className="h-4 rounded bg-orange-900/50 border border-orange-500/30 flex items-center justify-center"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: agentStates[3]?.progress >= 100 ? 1 : 0 }}
              transition={{ delay: 3.6 }}
            >
              {agentStates[3]?.progress >= 100 && <Cpu className="w-3 h-3 text-orange-400" />}
            </motion.div>

            {/* Layer 4: Frontend */}
            <motion.div
              className="h-4 rounded bg-teal-900/50 border border-teal-500/30 flex items-center justify-center"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: agentStates[4]?.progress >= 100 ? 1 : 0 }}
              transition={{ delay: 4.4 }}
            >
              {agentStates[4]?.progress >= 100 && <Layout className="w-3 h-3 text-teal-400" />}
            </motion.div>

            {/* Layer 5: Mobile */}
            <motion.div
              className="h-4 rounded bg-lime-900/50 border border-lime-500/30 flex items-center justify-center"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: agentStates[5]?.progress >= 100 ? 1 : 0 }}
              transition={{ delay: 5.2 }}
            >
              {agentStates[5]?.progress >= 100 && <Smartphone className="w-3 h-3 text-lime-400" />}
            </motion.div>
          </div>

          {/* Completion Badge */}
          {isComplete && (
            <motion.div
              className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
            >
              <CheckCircle className="w-5 h-5 text-white" />
            </motion.div>
          )}
        </motion.div>

        {/* Connection Lines from Stations to Center */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {agents.map((agent) => {
            const agentState = agentStates.find(a => a.id === agent.id);
            const isActive = agentState?.state !== "idle";

            return (
              <motion.line
                key={agent.id}
                x1={agent.station.x}
                y1={agent.station.y}
                x2={SCAFFOLD_CENTER.x}
                y2={SCAFFOLD_CENTER.y}
                stroke={isActive ? `rgb(var(--color-${agent.color}-500))` : "#334155"}
                strokeWidth="1"
                strokeDasharray="4,4"
                opacity={isActive ? 0.5 : 0.2}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: isActive ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              />
            );
          })}
        </svg>

        {/* Agent Stations */}
        {agents.map((agent) => {
          const agentState = agentStates.find(a => a.id === agent.id);
          return (
            <motion.div
              key={agent.id}
              className="absolute"
              style={{
                left: `${agent.station.x}%`,
                top: `${agent.station.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: agent.id * 0.1 }}
            >
              {/* Station Marker */}
              <div
                className={cn(
                  "w-12 h-12 rounded-xl border-2 flex items-center justify-center",
                  agentState?.state === "complete"
                    ? `bg-${agent.color}-900/50 border-${agent.color}-500`
                    : `bg-slate-800/80 border-${agent.color}-500/30`
                )}
              >
                <agent.icon className={cn(`w-5 h-5 text-${agent.color}-400`)} />
              </div>

              {/* Agent Label */}
              <div className={cn("text-xs mt-1 text-center", `text-${agent.color}-300`)}>
                {agent.name}
              </div>

              {/* Agent at station (when not moving) */}
              {agentState?.state === "idle" || agentState?.state === "working" || agentState?.state === "complete" ? (
                <AgentNode
                  id={agent.id}
                  icon={agent.icon}
                  status={
                    agentState.state === "complete" ? "complete" :
                    agentState.state === "working" ? "working" : "idle"
                  }
                  role={agent.role}
                  size="sm"
                  className="absolute -top-3 -right-3"
                />
              ) : null}

              {/* Progress indicator at station */}
              {agentState?.state === "working" && (
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-10">
                  <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      className={cn("h-full", `bg-${agent.color}-500`)}
                      animate={{ width: `${agentState.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}

        {/* Moving Agents (between station and center) */}
        <AnimatePresence>
          {agentStates
            .filter(a => a.state === "moving" || a.state === "delivering")
            .map((agentState) => {
              const agent = agents.find(a => a.id === agentState.id);
              if (!agent) return null;

              const isDelivering = agentState.state === "delivering";
              const startPos = isDelivering ? SCAFFOLD_CENTER : agent.station;
              const endPos = isDelivering ? agent.station : SCAFFOLD_CENTER;

              return (
                <WorkingAgent
                  key={agent.id}
                  id={agent.id}
                  role={agent.role}
                  icon={agent.icon}
                  status={agentState.state}
                  position={startPos}
                  targetPosition={endPos}
                  carrying={
                    <Code className={cn("w-3 h-3", `text-${agent.color}-400`)} />
                  }
                  size="sm"
                  color={agent.color}
                  showTrail={true}
                  label={agent.name}
                />
              );
            })}
        </AnimatePresence>

        {/* Code Blocks being assembled */}
        <AnimatePresence>
          {codeBlocks.map((block) => {
            const agent = agents.find(a => a.id === block.contributorId);
            if (!agent) return null;

            return (
              <WorkArtifact
                key={block.id}
                type="code"
                progress={block.status === "delivered" ? 100 : 50}
                contributors={[block.contributorId!]}
                position={block.status === "delivered" ? SCAFFOLD_CENTER : block.position}
                size="sm"
                label={agent?.name}
              />
            );
          })}
        </AnimatePresence>

        {/* Overall Progress Footer */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur border-t border-slate-700 p-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-300">App Progress</span>
              <span className={cn("text-lg font-bold", isComplete ? "text-green-400" : "text-blue-400")}>
                {Math.round(overallProgress)}%
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="text-green-400">
                {assembledBlocks}/{agents.length} modules
              </span>
              <span>|</span>
              <span className="text-blue-400">
                {agentStates.filter(a => a.state === "working").length} working
              </span>
              {isComplete && (
                <>
                  <span>|</span>
                  <span className="text-green-400 font-medium">MVP Complete!</span>
                </>
              )}
            </div>
          </div>
          <div className="mt-2 h-2 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className={cn("h-full transition-colors", isComplete ? "bg-green-500" : "bg-gradient-to-r from-blue-500 to-violet-500")}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      </div>
    </AnimationContainer>
  );
}

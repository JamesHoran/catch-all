"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Radar, Bug, CheckCircle, Wrench } from "lucide-react";
import { AnimationContainer } from "../shared/LazyAnimationWrapper";
import { AgentNode } from "../shared/AgentNode";
import { WorkingAgent } from "../shared/WorkingAgent";
import { WorkArtifact } from "../shared/WorkArtifact";
import { useState, useEffect } from "react";

interface BugData {
  id: number;
  x: number;
  y: number;
  found: boolean;
  beingFixed: boolean;
  fixed: boolean;
  fixers: number[];
}

interface Agent {
  id: number;
  position: { x: number; y: number };
  targetBug: number | null;
  state: "idle" | "moving" | "fixing" | "returning";
}

const RADAR_CENTER = { x: 50, y: 50 };
const RADAR_RADIUS = 35;
const PERIMETER_RADIUS = 42;

const initialBugs: BugData[] = [
  { id: 1, x: 35, y: 35, found: false, beingFixed: false, fixed: false, fixers: [] },
  { id: 2, x: 65, y: 30, found: false, beingFixed: false, fixed: false, fixers: [] },
  { id: 3, x: 50, y: 65, found: false, beingFixed: false, fixed: false, fixers: [] },
  { id: 4, x: 25, y: 55, found: false, beingFixed: false, fixed: false, fixers: [] },
  { id: 5, x: 70, y: 60, found: false, beingFixed: false, fixed: false, fixers: [] },
];

export function BugHunt() {
  const [bugs, setBugs] = useState<BugData[]>(initialBugs);
  const [radarAngle, setRadarAngle] = useState(0);
  const [agents, setAgents] = useState<Agent[]>(
    Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      position: getPerimeterPosition(i, 5),
      targetBug: null,
      state: "idle" as const,
    }))
  );
  const [fixedCount, setFixedCount] = useState(0);

  function getPerimeterPosition(index: number, total: number): { x: number; y: number } {
    const angle = ((index * 72 - 90) * Math.PI) / 180;
    return {
      x: RADAR_CENTER.x + PERIMETER_RADIUS * Math.cos(angle),
      y: RADAR_CENTER.y + PERIMETER_RADIUS * Math.sin(angle),
    };
  }

  // Radar rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setRadarAngle((prev) => (prev + 3) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Discover bugs with radar
  useEffect(() => {
    initialBugs.forEach((bug, i) => {
      setTimeout(() => {
        setBugs((prev) =>
          prev.map((b) =>
            b.id === bug.id ? { ...b, found: true } : b
          )
        );
      }, 800 + i * 600);
    });
  }, []);

  // Agent behavior - move to bugs and fix them
  useEffect(() => {
    const agentAssignments: { agentId: number; bugId: number; delay: number }[] = [
      { agentId: 1, bugId: 1, delay: 1500 },
      { agentId: 2, bugId: 2, delay: 2000 },
      { agentId: 3, bugId: 3, delay: 2500 },
      { agentId: 1, bugId: 4, delay: 4000 },
      { agentId: 4, bugId: 4, delay: 3000 },
      { agentId: 2, bugId: 5, delay: 4500 },
      { agentId: 5, bugId: 5, delay: 3500 },
    ];

    agentAssignments.forEach(({ agentId, bugId, delay }) => {
      setTimeout(() => {
        const bug = bugs.find(b => b.id === bugId);
        if (!bug || bug.fixed) return;

        // Agent moves to bug
        setAgents(prev => prev.map(a =>
          a.id === agentId
            ? { ...a, state: "moving", targetBug: bugId }
            : a
        ));

        // Mark bug as being fixed
        setBugs(prev => prev.map(b =>
          b.id === bugId ? { ...b, beingFixed: true, fixers: [...b.fixers, agentId] } : b
        ));

        // Start fixing after arrival
        setTimeout(() => {
          setAgents(prev => prev.map(a =>
            a.id === agentId ? { ...a, state: "fixing" } : a
          ));
        }, 1000);

        // Bug fixed
        setTimeout(() => {
          setBugs(prev => prev.map(b =>
            b.id === bugId ? { ...b, fixed: true, beingFixed: false } : b
          ));
          setFixedCount(prev => prev + 1);

          // Agent returns to perimeter
          setAgents(prev => prev.map(a =>
            a.id === agentId
              ? { ...a, state: "returning", targetBug: null }
              : a
          ));

          setTimeout(() => {
            setAgents(prev => prev.map(a =>
              a.id === agentId ? { ...a, state: "idle" } : a
            ));
          }, 1000);
        }, 2500);
      }, delay);
    });
  }, []);

  const allFixed = fixedCount >= bugs.length;

  return (
    <AnimationContainer title="Bug Hunt Squad" description="Agents swarm to detect and fix bugs">
      <div className="relative w-full h-full">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Radar Background Circles */}
          {[1, 2, 3, 4].map((i) => (
            <circle
              key={i}
              cx={RADAR_CENTER.x}
              cy={RADAR_CENTER.y}
              r={(RADAR_RADIUS * i) / 4}
              fill="none"
              stroke="#334155"
              strokeWidth="0.3"
            />
          ))}

          {/* Radar Grid Lines */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <line
              key={angle}
              x1={RADAR_CENTER.x}
              y1={RADAR_CENTER.y}
              x2={RADAR_CENTER.x + RADAR_RADIUS * Math.cos((angle * Math.PI) / 180)}
              y2={RADAR_CENTER.y + RADAR_RADIUS * Math.sin((angle * Math.PI) / 180)}
              stroke="#334155"
              strokeWidth="0.3"
            />
          ))}

          {/* Scanning Line */}
          <line
            x1={RADAR_CENTER.x}
            y1={RADAR_CENTER.y}
            x2={RADAR_CENTER.x + RADAR_RADIUS * Math.cos((radarAngle * Math.PI) / 180)}
            y2={RADAR_CENTER.y + RADAR_RADIUS * Math.sin((radarAngle * Math.PI) / 180)}
            stroke="rgba(34, 197, 94, 0.6)"
            strokeWidth="0.8"
            style={{
              filter: "drop-shadow(0 0 8px rgba(34, 197, 94, 0.5))",
            }}
          />

          {/* Bugs */}
          {bugs.map((bug) => {
            if (!bug.found) return null;

            return (
              <g key={bug.id}>
                {/* Bug marker */}
                <motion.circle
                  cx={bug.x}
                  cy={bug.y}
                  r={bug.beingFixed ? 5 : 3}
                  fill={bug.fixed ? "#22c55e" : "#ef4444"}
                  initial={{ scale: 0 }}
                  animate={{ scale: bug.beingFixed ? [1, 1.3, 1] : 1 }}
                  transition={{ duration: bug.beingFixed ? 0.5 : 0.3 }}
                  opacity={bug.fixed ? 0.6 : 1}
                />

                {/* Bug icon */}
                {bug.beingFixed && !bug.fixed && (
                  <foreignObject
                    x={bug.x - 3}
                    y={bug.y - 3}
                    width="6"
                    height="6"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Bug className="w-6 h-6 text-red-400" />
                    </motion.div>
                  </foreignObject>
                )}

                {/* Fixed checkmark */}
                {bug.fixed && (
                  <CheckCircle
                    className="w-5 h-5 text-green-400"
                    style={{
                      transform: `translate(${bug.x - 2.5}px, ${bug.y - 2.5}px)`,
                    }}
                  />
                )}

                {/* Fix count indicator */}
                {bug.fixers.length > 0 && !bug.fixed && (
                  <text
                    x={bug.x}
                    y={bug.y - 6}
                    textAnchor="middle"
                    fontSize="2"
                    fill="#94a3b8"
                  >
                    {bug.fixers.length} fixing
                  </text>
                )}
              </g>
            );
          })}

          {/* Connection lines from agents to bugs */}
          {agents
            .filter(a => a.targetBug !== null && a.state !== "returning")
            .map((agent) => {
              const bug = bugs.find(b => b.id === agent.targetBug);
              if (!bug) return null;

              return (
                <motion.line
                  key={`line-${agent.id}-${agent.targetBug}`}
                  x1={agent.position.x}
                  y1={agent.position.y}
                  x2={bug.x}
                  y2={bug.y}
                  stroke="#3b82f6"
                  strokeWidth="0.3"
                  strokeDasharray="1,1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  opacity={0.5}
                />
              );
            })}
        </svg>

        {/* Agent Hub (Center) */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-800 border-2 flex items-center justify-center"
          style={{
            borderColor: allFixed ? "rgb(34, 197, 94)" : "rgb(59, 130, 246)",
          }}
          animate={{
            boxShadow: allFixed
              ? [
                  "0 0 20px rgba(34, 197, 94, 0.3)",
                  "0 0 40px rgba(34, 197, 94, 0.6)",
                  "0 0 20px rgba(34, 197, 94, 0.3)",
                ]
              : [
                  "0 0 15px rgba(59, 130, 246, 0.2)",
                  "0 0 25px rgba(59, 130, 246, 0.4)",
                  "0 0 15px rgba(59, 130, 246, 0.2)",
                ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Radar className="w-5 h-5 text-blue-400" />
        </motion.div>

        {/* Moving Agents */}
        <AnimatePresence>
          {agents.map((agent) => {
            const isMoving = agent.state === "moving" || agent.state === "returning";
            const isFixing = agent.state === "fixing";

            if (!isMoving && !isFixing) return null;

            const targetBug = bugs.find(b => b.id === agent.targetBug);
            const targetPosition = targetBug
              ? { x: targetBug.x, y: targetBug.y }
              : getPerimeterPosition(agent.id - 1, agents.length);

            return (
              <WorkingAgent
                key={agent.id}
                id={agent.id}
                role="tester"
                icon={Wrench}
                status={isFixing ? "working" : "moving"}
                position={agent.position}
                targetPosition={targetPosition}
                carrying={
                  <Bug className="w-3 h-3 text-red-400" />
                }
                size="sm"
                color="blue"
                showTrail={true}
                label={`Agent ${agent.id}`}
              />
            );
          })}
        </AnimatePresence>

        {/* Bug Artifacts (when being fixed) */}
        <AnimatePresence>
          {bugs
            .filter(b => b.beingFixed && !b.fixed)
            .map((bug) => (
              <WorkArtifact
                key={bug.id}
                type="bug"
                progress={60}
                contributors={bug.fixers}
                position={{ x: bug.x, y: bug.y + 8 }}
                size="sm"
                showContributors={false}
              />
            ))}
        </AnimatePresence>

        {/* Stats Panel */}
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur border border-slate-700 rounded-lg px-6 py-3 flex gap-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">
              {bugs.filter(b => b.found).length}
            </div>
            <div className="text-xs text-slate-400">Found</div>
          </div>
          <div className="w-px bg-slate-700" />
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{fixedCount}</div>
            <div className="text-xs text-slate-400">Fixed</div>
          </div>
          <div className="w-px bg-slate-700" />
          <div className="text-center">
            <motion.div
              className="text-2xl font-bold"
              animate={{
                color: allFixed ? "#22c55e" : "#3b82f6",
              }}
            >
              {allFixed ? "CLEAN!" : "HUNTING"}
            </motion.div>
            <div className="text-xs text-slate-400">Status</div>
          </div>
        </motion.div>

        {/* Active Agents Indicator */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {agents.map((agent) => {
            const isActive = agent.state !== "idle";
            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: agent.id * 0.1 }}
              >
                <AgentNode
                  id={agent.id}
                  icon={Wrench}
                  status={
                    agent.state === "fixing"
                      ? "working"
                      : agent.state === "moving" || agent.state === "returning"
                        ? "working"
                        : "idle"
                  }
                  role="tester"
                  size="sm"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </AnimationContainer>
  );
}

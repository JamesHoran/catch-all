"use client";

import { motion } from "framer-motion";
import { Database, TrendingUp, BarChart3, Activity, Zap, Brain, CheckCircle, LineChart } from "lucide-react";
import { AnimationContainer } from "../shared/LazyAnimationWrapper";
import { AgentNode, type AgentRole } from "../shared/AgentNode";
import { useState, useEffect } from "react";

const PROMPT = "Analyze all our data streams and generate comprehensive insights with real-time dashboards...";

const agents = [
  { id: 1, role: "database" as AgentRole, color: "pink", delay: 0 },
  { id: 2, role: "analyst" as AgentRole, color: "indigo", delay: 100 },
  { id: 3, role: "researcher" as AgentRole, color: "cyan", delay: 200 },
  { id: 4, role: "monitor" as AgentRole, color: "emerald", delay: 300 },
  { id: 5, role: "backend" as AgentRole, color: "violet", delay: 400 },
];

const dataStages = [
  { id: 1, name: "Connecting data sources...", threshold: 8 },
  { id: 2, name: "Ingesting streams...", threshold: 20 },
  { id: 3, name: "Processing data...", threshold: 35 },
  { id: 4, name: "Running analytics...", threshold: 55 },
  { id: 5, name: "Generating insights...", threshold: 75 },
  { id: 6, name: "Building dashboards...", threshold: 90 },
];

interface DataPoint {
  id: number;
  value: number;
  x: number;
  y: number;
}

export function DataNexus() {
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showAgents, setShowAgents] = useState(false);
  const [activeAgents, setActiveAgents] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [recordsProcessed, setRecordsProcessed] = useState(0);
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const [insights, setInsights] = useState(0);

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
        startAnalysis();
      }, 1500);
    }
  }, [showAgents]);

  const startAnalysis = () => {
    let prog = 0;
    const totalRecords = 15000000;
    const totalInsights = 847;

    const interval = setInterval(() => {
      prog += Math.random() * 4 + 2;

      if (prog >= 100) {
        prog = 100;
        clearInterval(interval);
        setIsComplete(true);
        setRecordsProcessed(totalRecords);
        setInsights(totalInsights);
      } else {
        setProgress(prog);
        setRecordsProcessed(Math.floor(totalRecords * (prog / 100)));
        setInsights(Math.floor(totalInsights * (prog / 100)));

        // Add data points for visualization
        if (Math.random() > 0.5) {
          const newPoint: DataPoint = {
            id: Date.now(),
            value: Math.random() * 100,
            x: 10 + Math.random() * 80,
            y: 20 + Math.random() * 60,
          };
          setDataPoints((prev) => [...prev.slice(-15), newPoint]);
        }

        const stageIndex = dataStages.findIndex(
          (stage) => prog < stage.threshold
        );
        setCurrentStage(stageIndex === -1 ? dataStages.length : Math.max(0, stageIndex - 1));
      }
    }, 80);
  };

  return (
    <AnimationContainer
      title="Data Nexus"
      description="AI-powered data analytics at massive scale"
    >
      <div className="relative w-full h-full p-6 flex gap-6">
        {/* Left Side - Data Query */}
        <motion.div
          className="flex-1 flex flex-col justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-br from-indigo-900/40 to-cyan-900/40 border-2 border-indigo-700/50 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-5 h-5 text-indigo-400" />
              <span className="text-sm font-medium text-indigo-200">Analytics Query</span>
            </div>
            <div className="min-h-[60px] text-indigo-100 text-sm">
              {typedText}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-0.5 h-4 bg-cyan-400 ml-1 align-middle"
              />
            </div>
            <motion.div
              className="mt-3 text-xs text-indigo-400/70"
              animate={{ opacity: isTyping ? 1 : 0 }}
            >
              {isTyping ? "Processing query..." : "📊 Analyzing..."}
            </motion.div>
          </div>
        </motion.div>

        {/* Center - Data Visualization */}
        <motion.div
          className="flex-1 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: showAgents ? 1 : 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-full aspect-square max-w-[280px]">
            {/* Background grid */}
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {[20, 40, 60, 80].map((y) => (
                <line key={`h-${y}`} x1="10" y1={y} x2="90" y2={y} stroke="#1e293b" strokeWidth="0.3" />
              ))}
              {[20, 40, 60, 80].map((x) => (
                <line key={`v-${x}`} x1={x} y1="10" x2={x} y2="90" stroke="#1e293b" strokeWidth="0.3" />
              ))}

              {/* Data points */}
              {dataPoints.slice(-12).map((point) => (
                <g key={point.id}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="2"
                    fill="#22d3ee"
                    opacity={0.6}
                  />
                  <motion.circle
                    cx={point.x}
                    cy={point.y}
                    r="4"
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="0.5"
                    animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: Math.random() }}
                  />
                </g>
              ))}

              {/* Connecting lines between points */}
              {dataPoints.slice(-6).map((point, i) => {
                if (i === 0) return null;
                const prevPoint = dataPoints[dataPoints.indexOf(point) - 1];
                if (!prevPoint) return null;
                return (
                  <line
                    key={`line-${point.id}`}
                    x1={prevPoint.x}
                    y1={prevPoint.y}
                    x2={point.x}
                    y2={point.y}
                    stroke="#0891b2"
                    strokeWidth="0.5"
                    opacity="0.3"
                  />
                );
              })}
            </svg>

            {/* Central data hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-600 flex items-center justify-center shadow-lg"
                animate={{
                  boxShadow: showAgents
                    ? [
                        "0 0 30px rgba(99, 102, 241, 0.4)",
                        "0 0 60px rgba(34, 211, 238, 0.6)",
                        "0 0 30px rgba(99, 102, 241, 0.4)",
                      ]
                    : "0 0 15px rgba(99, 102, 241, 0.2)",
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Activity className="w-7 h-7 text-white" />
              </motion.div>
            </div>

            {/* Orbiting data particles */}
            {showAgents && [...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400"
                animate={{
                  rotate: [0, 360],
                  x: [0, Math.cos((i * 60) * Math.PI / 180) * 80],
                  y: [0, Math.sin((i * 60) * Math.PI / 180) * 80],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.2,
                }}
                style={{ transformOrigin: "50% 50%" }}
              />
            ))}
          </div>
        </motion.div>

        {/* Right Side - Agents & Stats */}
        <motion.div
          className="flex-1 flex flex-col justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Metrics */}
          <motion.div
            className="grid grid-cols-2 gap-2 mb-4"
            animate={{ opacity: showAgents ? 1 : 0.5 }}
          >
            <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-cyan-400">{(recordsProcessed / 1000000).toFixed(1)}M</div>
              <div className="text-xs text-slate-500">Records</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-indigo-400">{insights}</div>
              <div className="text-xs text-slate-500">Insights</div>
            </div>
          </motion.div>

          {/* Current stage */}
          {showAgents && !isComplete && (
            <motion.div
              className="mb-3 px-3 py-1 rounded-full bg-indigo-900/30 border border-indigo-500/50"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <span className="text-xs text-indigo-300">
                {dataStages[Math.min(currentStage, dataStages.length - 1)]?.name || "Initializing..."}
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
                  className={`h-full ${isComplete ? "bg-indigo-500" : "bg-gradient-to-r from-pink-500 via-indigo-500 to-cyan-500"}`}
                  animate={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-slate-500">Analysis</span>
                <span className={`text-xs font-medium ${isComplete ? "text-indigo-400" : "text-cyan-400"}`}>
                  {Math.round(progress)}%
                </span>
              </div>
            </motion.div>
          )}

          {/* Agent analysts */}
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
              className="mt-4 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-900/50 to-cyan-900/50 border border-indigo-500 flex items-center justify-center gap-2"
              initial={{ scale: 0, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring" }}
            >
              <LineChart className="w-4 h-4 text-indigo-300" />
              <span className="text-sm text-indigo-300 font-medium">Insights Ready!</span>
              <CheckCircle className="w-4 h-4 text-indigo-300" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimationContainer>
  );
}

"use client";

import { motion } from "framer-motion";
import { BookOpen, Target } from "lucide-react";
import { AnimationContainer } from "../shared/LazyAnimationWrapper";
import { AgentNode, type AgentRole } from "../shared/AgentNode";

const skills = [
  { id: 1, name: "React", status: "mastered" },
  { id: 2, name: "TypeScript", status: "mastered" },
  { id: 3, name: "Node.js", status: "in-progress" },
  { id: 4, name: "Python", status: "in-progress" },
  { id: 5, name: "AWS", status: "locked" },
  { id: 6, name: "Docker", status: "locked" },
  { id: 7, name: "GraphQL", status: "locked" },
  { id: 8, name: "Kubernetes", status: "locked" },
];

const resources = [
  { id: 1, type: "book", label: "Docs" },
  { id: 2, type: "video", label: "Course" },
  { id: 3, type: "practice", label: "Labs" },
  { id: 4, type: "mentor", label: "Review" },
];

export function LearningAccelerator() {
  return (
    <AnimationContainer title="Learning Accelerator" description="AI-driven skill tree growth">
      <div className="relative w-full h-full p-6 flex">
        {/* Left Panel - Current Learning */}
        <motion.div
          className="w-1/3 pr-4 border-r border-slate-700"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-sm font-medium text-slate-300 mb-3">Active Learning</div>

          {/* Skills in Progress */}
          <div className="space-y-3">
            {skills.filter((s) => s.status === "in-progress").map((skill) => (
              <div key={skill.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">{skill.name}</span>
                  <span className="text-xs text-blue-400">65%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: "65%" }}
                    transition={{ delay: 0.5, duration: 1 }}
                  />
                </div>
              </div>
            ))}

            {/* Agent Working */}
            <motion.div
              className="flex items-center gap-2 pt-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <AgentNode id={1} role="researcher" status="working" size="sm" color="cyan" />
              <span className="text-xs text-slate-400">AI Tutor Active</span>
            </motion.div>
          </div>

          {/* Recommended Resources */}
          <div className="mt-4">
            <div className="text-xs text-slate-400 mb-2">Recommended</div>
            <div className="flex flex-wrap gap-2">
              {resources.map((resource) => (
                <motion.div
                  key={resource.id}
                  className="px-2 py-1 rounded bg-slate-700/50 text-xs text-slate-300 flex items-center gap-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7 + resource.id * 0.1 }}
                >
                  <BookOpen className="w-3 h-3" />
                  {resource.label}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Center - Skill Tree */}
        <div className="flex-1 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 300 250">
            {/* Tree Structure */}
            {/* Trunk */}
            <motion.path
              d="M 150 250 L 150 150"
              stroke="#475569"
              strokeWidth="8"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            />

            {/* Level 1 Branches */}
            {[
              { x1: 150, y1: 150, x2: 80, y2: 100 },
              { x1: 150, y1: 150, x2: 220, y2: 100 },
            ].map((branch, i) => (
              <motion.path
                key={`l1-${i}`}
                d={`M ${branch.x1} ${branch.y1} L ${branch.x2} ${branch.y2}`}
                stroke="#475569"
                strokeWidth="4"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
              />
            ))}

            {/* Level 2 Branches */}
            {[
              { x1: 80, y1: 100, x2: 40, y2: 60 },
              { x1: 80, y1: 100, x2: 100, y2: 50 },
              { x1: 220, y1: 100, x2: 200, y2: 50 },
              { x1: 220, y1: 100, x2: 260, y2: 60 },
            ].map((branch, i) => (
              <motion.path
                key={`l2-${i}`}
                d={`M ${branch.x1} ${branch.y1} L ${branch.x2} ${branch.y2}`}
                stroke="#475569"
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
              />
            ))}

            {/* Level 3 Branches (growing) */}
            {[
              { x1: 40, y1: 60, x2: 20, y2: 30 },
              { x1: 100, y1: 50, x2: 90, y2: 20 },
              { x1: 200, y1: 50, x2: 190, y2: 20 },
              { x1: 260, y1: 60, x2: 280, y2: 30 },
            ].map((branch, i) => (
              <motion.path
                key={`l3-${i}`}
                d={`M ${branch.x1} ${branch.y1} L ${branch.x2} ${branch.y2}`}
                stroke="#475569"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
              />
            ))}

            {/* Skill Nodes */}
            {skills.map((skill, i) => {
              const positions = [
                [150, 150], // Root
                [80, 100],
                [220, 100], // Level 1
                [40, 60],
                [100, 50],
                [200, 50],
                [260, 60], // Level 2
                [20, 30],
                [280, 30], // Level 3
              ];

              const [x, y] = positions[i] || [150, 150];
              const isMastered = skill.status === "mastered";
              const inProgress = skill.status === "in-progress";

              return (
                <motion.g
                  key={skill.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  {/* Node circle */}
                  <circle
                    cx={x}
                    cy={y}
                    r="14"
                    fill={
                      isMastered
                        ? "#22c55e"
                        : inProgress
                        ? "#3b82f6"
                        : "#334155"
                    }
                    stroke={inProgress ? "#60a5fa" : "#475569"}
                    strokeWidth="2"
                  />

                  {/* Icon */}
                  {isMastered && (
                    <motion.text
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="12"
                      fill="white"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                    >
                      ✓
                    </motion.text>
                  )}

                  {/* Label */}
                  <text
                    x={x}
                    y={y + 26}
                    textAnchor="middle"
                    fontSize="9"
                    fill="#94a3b8"
                  >
                    {skill.name}
                  </text>

                  {/* Pulse for in-progress */}
                  {inProgress && (
                    <motion.circle
                      cx={x}
                      cy={y}
                      r="18"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      opacity={0.5}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.g>
              );
            })}
          </svg>
        </div>

        {/* Right Panel - Mastery Goals */}
        <motion.div
          className="w-1/3 pl-4 border-l border-slate-700"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-sm font-medium text-slate-300 mb-3">Mastery Goals</div>

          {/* Progress to Mastery */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 rounded bg-slate-800/50 border border-slate-700">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-green-400" />
                <span className="text-xs text-slate-300">Skills Mastered</span>
              </div>
              <motion.span
                className="text-lg font-bold text-green-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                2/8
              </motion.span>
            </div>

            {/* Overall Progress */}
            <div className="p-3 rounded bg-slate-800/50 border border-slate-700">
              <div className="text-xs text-slate-400 mb-2">Overall Progress</div>
              <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                  initial={{ width: 0 }}
                  animate={{ width: "45%" }}
                  transition={{ delay: 0.7, duration: 1 }}
                />
              </div>
              <div className="flex justify-between mt-1 text-xs text-slate-400">
                <span>Beginner</span>
                <span>Expert</span>
              </div>
            </div>

            {/* Mastery Badge */}
            <motion.div
              className="p-3 rounded-lg bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border border-yellow-600/30 text-center"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1.2, type: "spring" }}
            >
              <div className="text-2xl mb-1">🏆</div>
              <div className="text-xs text-yellow-400 font-medium">
                Next: React Master
              </div>
              <div className="text-xs text-slate-400">2 modules left</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimationContainer>
  );
}

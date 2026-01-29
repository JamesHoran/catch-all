"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { AnimationContainer } from "../shared/LazyAnimationWrapper";
import { AgentNode, type AgentRole } from "../shared/AgentNode";
import { useState, useEffect, useMemo } from "react";

interface TreeNode {
  id: string;
  x: number;
  y: number;
  parent?: string;
  depth: number;
  direction: number;
}

export function DeepResearch() {
  const [grownNodes, setGrownNodes] = useState<string[]>([]);
  const [confidence, setConfidence] = useState(0);

  // Generate tree structure (memoized for performance)
  const treeNodes: TreeNode[] = useMemo(() => [
    { id: "root", x: 50, y: 90, depth: 0, direction: 0 },
    // Depth 1
    { id: "1-1", x: 35, y: 75, parent: "root", depth: 1, direction: -1 },
    { id: "1-2", x: 65, y: 75, parent: "root", depth: 1, direction: 1 },
    // Depth 2
    { id: "2-1", x: 25, y: 60, parent: "1-1", depth: 2, direction: -1 },
    { id: "2-2", x: 45, y: 60, parent: "1-1", depth: 2, direction: 0 },
    { id: "2-3", x: 55, y: 60, parent: "1-2", depth: 2, direction: 0 },
    { id: "2-4", x: 75, y: 60, parent: "1-2", depth: 2, direction: 1 },
    // Depth 3
    { id: "3-1", x: 15, y: 45, parent: "2-1", depth: 3, direction: -1 },
    { id: "3-2", x: 30, y: 45, parent: "2-1", depth: 3, direction: 0 },
    { id: "3-3", x: 40, y: 45, parent: "2-2", depth: 3, direction: 0 },
    { id: "3-4", x: 60, y: 45, parent: "2-3", depth: 3, direction: 0 },
    { id: "3-5", x: 70, y: 45, parent: "2-4", depth: 3, direction: 0 },
    { id: "3-6", x: 85, y: 45, parent: "2-4", depth: 3, direction: 1 },
    // Depth 4 (findings)
    { id: "4-1", x: 10, y: 30, parent: "3-1", depth: 4, direction: -1 },
    { id: "4-2", x: 20, y: 30, parent: "3-1", depth: 4, direction: 0 },
    { id: "4-3", x: 35, y: 30, parent: "3-2", depth: 4, direction: 0 },
    { id: "4-4", x: 45, y: 30, parent: "3-3", depth: 4, direction: 0 },
    { id: "4-5", x: 55, y: 30, parent: "3-4", depth: 4, direction: 0 },
    { id: "4-6", x: 65, y: 30, parent: "3-5", depth: 4, direction: 0 },
    { id: "4-7", x: 80, y: 30, parent: "3-6", depth: 4, direction: 0 },
    { id: "4-8", x: 90, y: 30, parent: "3-6", depth: 4, direction: 1 },
  ], []);

  useEffect(() => {
    // Grow tree by depth levels
    const depths = [0, 1, 2, 3, 4];
    depths.forEach((depth) => {
      setTimeout(() => {
        const nodesAtDepth = treeNodes.filter((n) => n.depth === depth);
        nodesAtDepth.forEach((node) => {
          setTimeout(() => {
            setGrownNodes((prev) => [...prev, node.id]);
          }, Math.random() * 500);
        });
      }, depth * 800);
    });

    // Build confidence
    const confidenceInterval = setInterval(() => {
      setConfidence((prev) => {
        if (prev >= 95) {
          clearInterval(confidenceInterval);
          return 95;
        }
        return prev + Math.random() * 5;
      });
    }, 300);

    return () => clearInterval(confidenceInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [/* treeNodes is stable with useMemo */]);

  return (
    <AnimationContainer title="Deep Research Agent" description="Expanding research tree with cross-references">
      <div className="relative w-full h-full p-4">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Tree Edges */}
          {treeNodes.map((node) => {
            if (!node.parent) return null;
            const parent = treeNodes.find((n) => n.id === node.parent);
            if (!parent) return null;

            const isGrown = grownNodes.includes(node.id);

            return (
              <motion.line
                key={`edge-${node.id}`}
                x1={parent.x}
                y1={parent.y}
                x2={node.x}
                y2={node.y}
                stroke="#475569"
                strokeWidth="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: isGrown ? 1 : 0, opacity: isGrown ? 1 : 0 }}
                transition={{ duration: 0.5, delay: node.depth * 0.8 }}
                strokeDasharray={Math.sqrt(Math.pow(node.x - parent.x, 2) + Math.pow(node.y - parent.y, 2))}
              />
            );
          })}

          {/* Cross-reference lines (curved) */}
          {grownNodes.length > 8 &&
            [
              ["4-2", "4-3"],
              ["4-4", "4-5"],
              ["4-6", "4-7"],
            ].map(([from, to], i) => {
              const fromNode = treeNodes.find((n) => n.id === from);
              const toNode = treeNodes.find((n) => n.id === to);
              if (!fromNode || !toNode) return null;

              return (
                <motion.path
                  key={`xref-${i}`}
                  d={`M ${fromNode.x} ${fromNode.y} Q ${(fromNode.x + toNode.x) / 2} ${fromNode.y - 5}, ${toNode.x} ${toNode.y}`}
                  stroke="#22c55e"
                  strokeWidth="0.3"
                  fill="none"
                  strokeDasharray="1,1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                />
              );
            })}

          {/* Tree Nodes */}
          {treeNodes.map((node) => {
            const isGrown = grownNodes.includes(node.id);
            const isLeaf = node.depth === 4;
            const isRoot = node.depth === 0;

            return (
              <motion.g
                key={node.id}
                initial={{ scale: 0 }}
                animate={{ scale: isGrown ? 1 : 0 }}
                transition={{
                  delay: node.depth * 0.8,
                  type: "spring",
                  stiffness: 300,
                }}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isRoot ? 3 : isLeaf ? 1.5 : 2}
                  fill={
                    isRoot
                      ? "#3b82f6"
                      : isLeaf
                      ? "#22c55e"
                      : isGrown
                      ? "#1e3a5f"
                      : "#1e293b"
                  }
                  stroke={isGrown ? (isLeaf ? "#22c55e" : "#60a5fa") : "#475569"}
                  strokeWidth="0.5"
                />

                {/* Icons for source nodes */}
                {isLeaf && isGrown && (
                  <text
                    x={node.x}
                    y={node.y + 0.5}
                    textAnchor="middle"
                    fontSize="1.5"
                  >
                    {node.direction < 0 ? "📚" : node.direction > 0 ? "🌐" : "📄"}
                  </text>
                )}

                {/* Root label */}
                {isRoot && (
                  <text x={node.x} y={node.y + 1} textAnchor="middle" fontSize="1.5" fill="white">
                    🔍
                  </text>
                )}
              </motion.g>
            );
          })}
        </svg>

        {/* Confidence Score */}
        <motion.div
          className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur border border-slate-700 rounded-lg px-4 py-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="text-xs text-slate-400 mb-1">Confidence Score</div>
          <div className="text-2xl font-bold text-green-400">{Math.round(confidence)}%</div>
          <div className="h-1 bg-slate-700 rounded-full mt-1 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-green-500"
              animate={{ width: `${confidence}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Source Legend */}
        <motion.div
          className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur border border-slate-700 rounded-lg px-3 py-2 text-xs space-y-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-2 text-slate-300">
            <span>📚 Academic</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span>🌐 Web</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span>📄 Papers</span>
          </div>
          <div className="h-px bg-slate-700 my-1" />
          <div className="text-green-400 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            {grownNodes.filter((n) => n.startsWith("4-")).length}/8 sources
          </div>
        </motion.div>

        {/* Agent Status */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: grownNodes.length >= i * 2 ? 1 : 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <AgentNode id={i} role="researcher" status="working" size="sm" color="cyan" />
            </motion.div>
          ))}
        </div>
      </div>
    </AnimationContainer>
  );
}

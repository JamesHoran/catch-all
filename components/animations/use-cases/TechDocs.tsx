"use client";

import { motion } from "framer-motion";
import { FileText, BookOpen, ArrowRight, CheckCircle } from "lucide-react";
import { AnimationContainer } from "../shared/LazyAnimationWrapper";
import { AgentNode, type AgentRole } from "../shared/AgentNode";
import { useState, useEffect } from "react";

const codeFiles = [
  { name: "api.ts", path: "src/api" },
  { name: "types.ts", path: "src/types" },
  { name: "utils.ts", path: "src/utils" },
  { name: "config.ts", path: "src/config" },
];

const docFiles = [
  { name: "API.md", path: "docs/api" },
  { name: "Types.md", path: "docs/types" },
  { name: "Utils.md", path: "docs/utils" },
  { name: "Config.md", path: "docs/config" },
];

export function TechDocs() {
  const [connections, setConnections] = useState<number[]>([]);
  const [generatedDocs, setGeneratedDocs] = useState<number[]>([]);

  useEffect(() => {
    // Create connections sequentially
    codeFiles.forEach((_, i) => {
      setTimeout(() => {
        setConnections((prev) => [...prev, i]);
      }, 500 * (i + 1));
    });

    // Generate docs
    codeFiles.forEach((_, i) => {
      setTimeout(() => {
        setGeneratedDocs((prev) => [...prev, i]);
      }, 2500 + 500 * (i + 1));
    });
  }, []);

  return (
    <AnimationContainer title="Technical Documentation Writer" description="Auto-generated documentation from codebase">
      <div className="relative w-full h-full p-6 flex gap-8">
        {/* Left - Codebase Tree */}
        <motion.div
          className="w-1/2 flex flex-col"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-400" />
            Codebase
          </div>

          <div className="flex-1 bg-slate-900/50 rounded-lg border border-slate-700 p-4">
            <div className="space-y-2">
              {codeFiles.map((file, index) => (
                <motion.div
                  key={file.name}
                  className="flex items-center gap-2 p-2 rounded bg-slate-800/50 border border-slate-700"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <FileText className={`w-4 h-4 text-${index < generatedDocs.length ? "green" : "blue"}-400`} />
                  <div>
                    <div className={`text-sm ${index < generatedDocs.length ? "text-green-400" : "text-slate-300"}`}>
                      {file.name}
                    </div>
                    <div className="text-xs text-slate-500">{file.path}</div>
                  </div>
                  {index < generatedDocs.length && (
                    <CheckCircle className="w-4 h-4 text-green-400 ml-auto" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Center - Agent & Connections */}
        <motion.div className="flex flex-col items-center justify-center gap-4">
          {/* Agent */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.5 }}
          >
            <AgentNode id={1} role="writer" status="working" />
          </motion.div>

          {/* Connection Lines */}
          <svg className="w-24 h-64" viewBox="0 0 96 200">
            {codeFiles.map((_, i) => {
              const isConnected = connections.includes(i);
              const yPos = 20 + i * 30;

              return (
                <g key={i}>
                  {/* Horizontal line from code */}
                  <motion.line
                    x1={0}
                    y1={yPos}
                    x2={isConnected ? 48 : 0}
                    y2={yPos}
                    stroke="#3b82f6"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: isConnected ? 1 : 0 }}
                    transition={{ delay: 0.5 + i * 0.5, duration: 0.3 }}
                    strokeDasharray="96"
                    className="origin-left"
                  />

                  {/* Animated data packet */}
                  {isConnected && i < generatedDocs.length && (
                    <motion.circle
                      r="4"
                      fill="#60a5fa"
                      initial={{ cx: 0, cy: yPos }}
                      animate={{ cx: [0, 48, 96] }}
                      transition={{ duration: 1.5, ease: "linear" }}
                    />
                  )}

                  {/* Vertical line to docs */}
                  {isConnected && (
                    <motion.line
                      x1={96}
                      y1={yPos}
                      x2={96}
                      y2={yPos + 20}
                      stroke="#22c55e"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 1 + i * 0.5, duration: 0.3 }}
                      strokeDasharray="20"
                      className="origin-top"
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </motion.div>

        {/* Right - Documentation Tree */}
        <motion.div
          className="w-1/2 flex flex-col"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-green-400" />
            Documentation
          </div>

          <div className="flex-1 bg-slate-900/50 rounded-lg border border-slate-700 p-4">
            <div className="space-y-2">
              {docFiles.map((file, index) => (
                <motion.div
                  key={file.name}
                  className={`flex items-center gap-2 p-2 rounded border transition-all ${
                    index < generatedDocs.length
                      ? "bg-green-900/20 border-green-700"
                      : "bg-slate-800/50 border-slate-700"
                  }`}
                  initial={{ opacity: 0, x: 20, scale: 0.9 }}
                  animate={
                    index < generatedDocs.length
                      ? { opacity: 1, x: 0, scale: 1 }
                      : { opacity: 0.5, x: 0, scale: 0.95 }
                  }
                  transition={{ delay: 1.5 + index * 0.5 }}
                >
                  <BookOpen
                    className={`w-4 h-4 ${index < generatedDocs.length ? "text-green-400" : "text-slate-500"}`}
                  />
                  <div>
                    <div className={`text-sm ${index < generatedDocs.length ? "text-green-400" : "text-slate-500"}`}>
                      {file.name}
                    </div>
                    <div className="text-xs text-slate-500">{file.path}</div>
                  </div>
                  {index < generatedDocs.length && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                    >
                      <CheckCircle className="w-4 h-4 text-green-400 ml-auto" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Deploy Button */}
          {generatedDocs.length === docFiles.length && (
            <motion.div
              className="mt-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
            >
              <button className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <ArrowRight className="w-4 h-4" />
                Deploy Documentation
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimationContainer>
  );
}

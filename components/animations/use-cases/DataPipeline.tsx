"use client";

import { motion } from "framer-motion";
import { Database, FileJson, Server, GitBranch } from "lucide-react";
import { AnimationContainer } from "../shared/LazyAnimationWrapper";
import { AgentNode, type AgentRole } from "../shared/AgentNode";

export function DataPipeline() {
  return (
    <AnimationContainer title="Data Pipeline Factory" description="Watch data flow from sources to dashboard">
      <div className="relative w-full h-full p-6 flex items-center justify-between">
        {/* Sources Section */}
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-xs text-slate-400 font-medium mb-2">Sources</div>

          {/* API Source */}
          <motion.div
            className="relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <div className="w-16 h-16 rounded-xl bg-blue-900/30 border-2 border-blue-500/50 flex items-center justify-center">
              <Server className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-xs text-blue-400 mt-1 text-center">API</div>
          </motion.div>

          {/* Database Source */}
          <motion.div
            className="relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <div className="w-16 h-16 rounded-xl bg-violet-900/30 border-2 border-violet-500/50 flex items-center justify-center">
              <Database className="w-6 h-6 text-violet-400" />
            </div>
            <div className="text-xs text-violet-400 mt-1 text-center">DB</div>
          </motion.div>

          {/* CSV Source */}
          <motion.div
            className="relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <div className="w-16 h-16 rounded-xl bg-teal-900/30 border-2 border-teal-500/50 flex items-center justify-center">
              <FileJson className="w-6 h-6 text-teal-400" />
            </div>
            <div className="text-xs text-teal-400 mt-1 text-center">CSV</div>
          </motion.div>
        </motion.div>

        {/* Pipeline Section */}
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8">
          {/* Pipeline 1 */}
          <motion.div
            className="relative w-full h-2 bg-slate-700 rounded-full overflow-hidden"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {/* Data packet */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]"
              animate={{ x: ["0%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.8 }}
            />
          </motion.div>

          {/* Pipeline 2 */}
          <motion.div
            className="relative w-full h-2 bg-slate-700 rounded-full overflow-hidden"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.8)]"
              animate={{ x: ["0%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
            />
          </motion.div>

          {/* Pipeline 3 */}
          <motion.div
            className="relative w-full h-2 bg-slate-700 rounded-full overflow-hidden"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.8)]"
              animate={{ x: ["0%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1.2 }}
            />
          </motion.div>
        </div>

        {/* Transformation Section */}
        <motion.div
          className="flex flex-col gap-4 items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-xs text-slate-400 font-medium mb-2">Transform</div>

          <motion.div
            className="relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-20 h-20 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center">
              <GitBranch className="w-8 h-8 text-slate-300" />
            </div>
          </motion.div>

          {/* Agent working indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <AgentNode id={1} role="analyst" status="working" size="sm" color="indigo" />
          </motion.div>
        </motion.div>

        {/* Pipeline to Dashboard */}
        <div className="flex-1 flex items-center justify-center px-8">
          <motion.div
            className="relative w-full h-3 bg-gradient-to-r from-slate-700 to-green-900/50 rounded-full overflow-hidden"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]"
                animate={{ x: ["0%", "100%"] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 1.2 + i * 0.3,
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Dashboard Section */}
        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="text-xs text-slate-400 font-medium mb-2">Dashboard</div>

          {/* Dashboard Panel */}
          <motion.div
            className="w-32 rounded-xl bg-slate-800 border-2 border-slate-600 p-3 space-y-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, type: "spring" }}
          >
            {/* Animated Bar Chart */}
            <div className="space-y-1">
              <div className="flex items-end justify-between gap-1 h-12">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t"
                    initial={{ height: 0 }}
                    animate={{ height: [20, 40, 60, 35, 50, 45][i] }}
                    transition={{
                      delay: 1.3 + i * 0.1,
                      type: "spring",
                      stiffness: 300,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-700/50 rounded p-1.5">
                <div className="text-slate-400">Rows</div>
                <motion.div
                  className="text-green-400 font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  12.5K
                </motion.div>
              </div>
              <div className="bg-slate-700/50 rounded p-1.5">
                <div className="text-slate-400">Rate</div>
                <motion.div
                  className="text-blue-400 font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  1.2K/s
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AnimationContainer>
  );
}

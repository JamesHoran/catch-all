"use client";

import { motion } from "framer-motion";
import { FileText, Image, Share2, Mail, PenLine, CheckCircle, TrendingUp } from "lucide-react";
import { AnimationContainer } from "../shared/LazyAnimationWrapper";
import { AgentNode, type AgentRole } from "../shared/AgentNode";

const stations = [
  { id: 1, name: "Research", icon: FileText, color: "blue", role: "researcher" as AgentRole },
  { id: 2, name: "Draft", icon: PenLine, color: "violet", role: "writer" as AgentRole },
  { id: 3, name: "Edit", icon: FileText, color: "pink", role: "editor" as AgentRole },
  { id: 4, name: "Design", icon: Image, color: "orange", role: "designer" as AgentRole },
  { id: 5, name: "SEO", icon: TrendingUp, color: "teal", role: "analyst" as AgentRole },
  { id: 6, name: "Publish", icon: Share2, color: "lime", role: "deployer" as AgentRole },
  { id: 7, name: "Distribute", icon: Mail, color: "cyan", role: "deployer" as AgentRole },
];

export function ContentMachine() {
  return (
    <AnimationContainer title="Content Marketing Machine" description="Assembly line for content production">
      <div className="relative w-full h-full p-6 flex flex-col">
        {/* Title */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-sm font-medium text-slate-300">7-Agent Content Pipeline</div>
        </motion.div>

        {/* Assembly Line */}
        <div className="flex-1 flex items-center justify-between gap-2">
          {stations.map((station, index) => (
            <motion.div
              key={station.id}
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              {/* Station */}
              <div className="relative">
                {/* Connection line */}
                {index < stations.length - 1 && (
                  <motion.div
                    className="absolute top-1/2 left-full w-full h-1 bg-slate-700"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                  />
                )}

                {/* Station Circle */}
                <motion.div
                  className={`relative w-12 h-12 rounded-full bg-${station.color}-900/30 border-2 border-${station.color}-500/50 flex items-center justify-center z-10`}
                  animate={{
                    scale: [1, 1.1, 1],
                    borderColor: [
                      `rgb(var(--color-${station.color}-500) / 0.5)`,
                      `rgb(var(--color-${station.color}-500) / 1)`,
                      `rgb(var(--color-${station.color}-500) / 0.5)`,
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                    ease: "easeInOut",
                  }}
                >
                  <station.icon className={`w-5 h-5 text-${station.color}-400`} />

                  {/* Quality Gate Check */}
                  <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{
                      scale: [0, 1, 1, 0],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: 2 + index * 0.4,
                      ease: "easeInOut",
                    }}
                  >
                    <CheckCircle className="w-3 h-3 text-white" strokeWidth={3} />
                  </motion.div>
                </motion.div>
              </div>

              {/* Station Name */}
              <div className="text-xs text-slate-400 text-center w-16">{station.name}</div>

              {/* Agent Badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: 1 + index * 0.4,
                }}
              >
                <AgentNode id={station.id} role={station.role} status="working" size="sm" color={station.color} />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Content Flow Animation */}
        <div className="h-8 relative overflow-hidden mt-4">
          <motion.div
            className="absolute inset-0 flex items-center"
            animate={{ x: [0, -200] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            {[
              "Idea",
              "Research",
              "Draft",
              "Edit",
              "Design",
              "SEO",
              "Publish",
              "Blog Post",
              "Social",
              "Newsletter",
            ].map((item, i) => (
              <motion.div
                key={item}
                className="flex-shrink-0 px-3 py-1 mx-2 rounded-full bg-slate-700/50 text-xs text-slate-300 whitespace-nowrap"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.3 }}
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Metrics Bar */}
        <motion.div
          className="flex justify-center gap-6 mt-4 pt-4 border-t border-slate-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {[
            { label: "Articles", value: "12" },
            { label: "Social", value: "48" },
            { label: "Email", value: "6" },
          ].map((metric) => (
            <div key={metric.label} className="text-center">
              <div className="text-lg font-bold text-green-400">{metric.value}</div>
              <div className="text-xs text-slate-400">{metric.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </AnimationContainer>
  );
}

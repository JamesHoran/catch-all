"use client";

import { motion } from "framer-motion";
import { Server, Database, Shield, Globe, CheckCircle2, Layers } from "lucide-react";
import { AnimationContainer } from "../shared/LazyAnimationWrapper";
import { AgentNode, type AgentRole } from "../shared/AgentNode";
import { useState, useEffect } from "react";

const layers = [
  { id: 1, name: "Infrastructure", icon: Server, color: "blue", status: "pending", role: "deployer" as AgentRole },
  { id: 2, name: "Database", icon: Database, color: "violet", status: "pending", role: "database" as AgentRole },
  { id: 3, name: "Services", icon: Layers, color: "pink", status: "pending", role: "backend" as AgentRole },
  { id: 4, name: "Security", icon: Shield, color: "orange", status: "pending", role: "tester" as AgentRole },
  { id: 5, name: "CDN", icon: Globe, color: "teal", status: "pending", role: "deployer" as AgentRole },
  { id: 6, name: "Monitoring", icon: CheckCircle2, color: "lime", status: "pending", role: "monitor" as AgentRole },
];

export function DevopsDreamTeam() {
  const [activeLayers, setActiveLayers] = useState<number[]>([]);

  useEffect(() => {
    // Activate layers sequentially
    layers.forEach((_, i) => {
      setTimeout(() => {
        setActiveLayers((prev) => [...prev, i]);
      }, 800 * (i + 1));
    });
  }, []);

  return (
    <AnimationContainer title="DevOps Dream Team" description="Infrastructure provisioning and deployment">
      <div className="relative w-full h-full p-6 flex flex-col">
        {/* Title */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-sm font-medium text-slate-300">Stack Orchestration</div>
        </motion.div>

        {/* 3D Layer Stack */}
        <div className="flex-1 flex items-center justify-center perspective-1000">
          <div className="relative flex flex-col items-center gap-4">
            {layers.map((layer, index) => {
              const isActive = activeLayers.includes(index);
              const isTopLayer = index === layers.length - 1;
              const depthIndex = layers.length - 1 - index;

              return (
                <motion.div
                  key={layer.id}
                  className="relative w-64"
                  style={{
                    zIndex: depthIndex,
                  }}
                  initial={{ opacity: 0, y: -50, rotateX: -20 }}
                  animate={isActive ? {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    scale: isTopLayer ? [1, 1.05, 1] : 1,
                  } : {
                    opacity: 0.3,
                    y: -20,
                    rotateX: -10,
                  }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                    scale: {
                      duration: 2,
                      repeat: isTopLayer ? Infinity : 0,
                    },
                  }}
                >
                  {/* Layer Card */}
                  <div
                    className={`relative p-4 rounded-lg border-2 backdrop-blur-sm ${
                      isActive
                        ? `bg-${layer.color}-900/40 border-${layer.color}-500 shadow-lg`
                        : "bg-slate-800/30 border-slate-700"
                    }`}
                    style={{
                      transform: `translateZ(${depthIndex * 10}px)`,
                    }}
                  >
                    {/* Layer Content */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-${layer.color}-900/50`}>
                          <layer.icon className={`w-5 h-5 text-${layer.color}-400`} />
                        </div>
                        <div>
                          <div className={`text-sm font-medium text-${layer.color}-300`}>
                            {layer.name}
                          </div>
                          <div className="text-xs text-slate-400">
                            Layer {depthIndex + 1}
                          </div>
                        </div>
                      </div>

                      {/* Status */}
                      {isActive ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <AgentNode id={layer.id} role={layer.role} status="working" size="sm" color={layer.color} />
                        </motion.div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600" />
                      )}
                    </div>

                    {/* Connection Lines */}
                    {isActive && index < layers.length - 1 && (
                      <motion.div
                        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-gradient-to-b from-slate-500 to-transparent"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: 0.3 }}
                      />
                    )}
                  </div>

                  {/* Connection Points (decorative) */}
                  {isActive && (
                    <>
                      <div className="absolute -left-2 top-1/2 w-2 h-2 rounded-full bg-blue-400" />
                      <div className="absolute -right-2 top-1/2 w-2 h-2 rounded-full bg-blue-400" />
                    </>
                  )}
                </motion.div>
              );
            })}

            {/* Base Platform */}
            <motion.div
              className="w-72 h-3 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3 }}
            />
          </div>
        </div>

        {/* Production Ready Badge */}
        {activeLayers.length === layers.length && (
          <motion.div
            className="mt-4 text-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-900/30 border border-green-500">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium text-green-400">Production Ready</span>
            </div>
          </motion.div>
        )}

        {/* Status Bar */}
        <motion.div
          className="mt-4 bg-slate-800/50 border border-slate-700 rounded-lg p-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Infrastructure Status</span>
            <span className="text-green-400 font-medium">
              {activeLayers.length}/{layers.length} Layers Deployed
            </span>
          </div>
          <div className="mt-2 h-2 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-green-500"
              initial={{ width: 0 }}
              animate={{ width: `${(activeLayers.length / layers.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>
      </div>
    </AnimationContainer>
  );
}

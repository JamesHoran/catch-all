"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, CheckCircle, Database } from "lucide-react";
import { AnimationContainer } from "../shared/LazyAnimationWrapper";
import { AgentNode, type AgentRole } from "../shared/AgentNode";
import { ChatBubble } from "../shared/ChatBubble";
import { useState, useEffect } from "react";

const tiers = [
  { id: 0, name: "L0", label: "Bot", color: "blue", resolution: 0.6 },
  { id: 1, name: "L1", label: "Support", color: "violet", resolution: 0.25 },
  { id: 2, name: "L2", label: "Specialist", color: "pink", resolution: 0.12 },
  { id: 3, name: "L3", label: "Expert", color: "orange", resolution: 0.03 },
];

export function SupportSwarm() {
  const [currentTier, setCurrentTier] = useState(0);
  const [messages, setMessages] = useState<Array<{ id: string; role: "user" | "agent"; content: string; agentId?: number }>>([]);

  // Simulate ticket flow
  useEffect(() => {
    const sequence = [
      { delay: 500, tier: 0, message: { id: "1", role: "user" as const, content: "My payment keeps failing!" } },
      { delay: 1500, tier: 0, message: { id: "2", role: "agent" as const, content: "Let me check your account...", agentId: 1 } },
      { delay: 3000, tier: 1, message: { id: "3", role: "agent" as const, content: "I see the issue. Escalating to payment specialist.", agentId: 2 } },
      { delay: 4500, tier: 2, message: { id: "4", role: "agent" as const, content: "Found a billing system conflict. Fixing now.", agentId: 3 } },
      { delay: 6000, tier: 3, message: { id: "5", role: "agent" as const, content: "Issue resolved! Refund processed.", agentId: 4 } },
    ];

    sequence.forEach(({ delay, tier, message }) => {
      setTimeout(() => {
        setCurrentTier(tier);
        if (message) {
          setMessages((prev) => [...prev, message]);
        }
      }, delay);
    });
  }, []);

  return (
    <AnimationContainer title="Customer Support Swarm" description="Tiered AI support routing system">
      <div className="relative w-full h-full p-6 flex gap-6">
        {/* Left - Tier Flow */}
        <div className="w-1/2 flex flex-col">
          <div className="text-sm font-medium text-slate-300 mb-3">Tiered Routing</div>

          {/* Tiers */}
          <div className="flex-1 flex flex-col justify-center gap-3">
            {tiers.map((tier) => {
              const isActive = currentTier === tier.id;
              const wasActive = currentTier > tier.id;

              return (
                <motion.div
                  key={tier.id}
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: tier.id * 0.1 }}
                >
                  {/* Tier Card */}
                  <motion.div
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-colors ${
                      isActive
                        ? `bg-${tier.color}-900/30 border-${tier.color}-500`
                        : wasActive
                        ? "bg-green-900/20 border-green-700"
                        : "bg-slate-800/50 border-slate-700"
                    }`}
                    animate={isActive ? { scale: [1, 1.02, 1] } : {}}
                    transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
                  >
                    {/* Tier Label */}
                    <div className={`w-10 h-10 rounded-full bg-${tier.color}-900/50 border-2 border-${tier.color}-500/50 flex items-center justify-center font-bold text-${tier.color}-400`}>
                      {tier.name}
                    </div>

                    <div className="flex-1">
                      <div className={`text-sm font-medium text-${tier.color}-400`}>{tier.label}</div>
                      <div className="text-xs text-slate-400">{(tier.resolution * 100).toFixed(0)}% resolution</div>
                    </div>

                    {/* Status */}
                    {isActive && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <AgentNode id={tier.id + 1} role="analyst" status="working" size="sm" color={tier.color} />
                      </motion.div>
                    )}

                    {wasActive && (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                  </motion.div>

                  {/* Arrow Down */}
                  {tier.id < tiers.length - 1 && (
                    <motion.div
                      className="absolute -bottom-4 left-1/2 -translate-x-1/2"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
                    >
                      <ArrowDown className="w-4 h-4 text-slate-500" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Resolution Stats */}
          <motion.div
            className="mt-6 p-3 rounded-lg bg-slate-800/50 border border-slate-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="grid grid-cols-2 gap-3 text-center">
              <div>
                <div className="text-xs text-slate-400">Avg Resolution</div>
                <motion.div
                  className="text-lg font-bold text-green-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  2.4m
                </motion.div>
              </div>
              <div>
                <div className="text-xs text-slate-400">Satisfaction</div>
                <motion.div
                  className="text-lg font-bold text-blue-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  94%
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right - Live Chat Feed */}
        <div className="w-1/2 flex flex-col border-l border-slate-700 pl-6">
          <div className="text-sm font-medium text-slate-300 mb-3">Live Ticket</div>

          {/* Chat Messages */}
          <div className="flex-1 space-y-3 overflow-hidden">
            <AnimatePresence>
              {messages.map((msg) => (
                <ChatBubble key={msg.id} message={msg} showAvatar delay={0} />
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {currentTier > 0 && currentTier < 4 && (
              <motion.div
                className="flex items-center gap-2 text-sm text-slate-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                <span>Agent {currentTier + 1} is typing...</span>
              </motion.div>
            )}
          </div>

          {/* Knowledge Base Update */}
          <motion.div
            className="mt-4 p-3 rounded-lg bg-slate-800/50 border border-slate-700"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-medium text-slate-300">Knowledge Base</span>
            </div>
            {currentTier >= 3 ? (
              <motion.div
                className="text-xs text-green-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                ✓ New solution added: &quot;Payment gateway timeout retries&quot;
              </motion.div>
            ) : (
              <div className="text-xs text-slate-500">Awaiting resolution to learn...</div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimationContainer>
  );
}

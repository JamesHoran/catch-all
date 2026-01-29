"use client";

import { motion } from "framer-motion";
import { TrendingUp, DollarSign, BarChart3, Target } from "lucide-react";
import { AnimationContainer } from "../shared/LazyAnimationWrapper";
import { AgentNode, type AgentRole } from "../shared/AgentNode";
import { useState, useEffect } from "react";

const competitors = [
  { name: "Competitor A", price: 99, market: 35, color: "blue" },
  { name: "Competitor B", price: 149, market: 25, color: "violet" },
  { name: "Competitor C", price: 79, market: 20, color: "pink" },
  { name: "Your Product", price: 129, market: 20, color: "green", isYours: true },
];

const swotData = {
  strengths: ["AI-powered", "24/7 Support", "Best Price"],
  weaknesses: ["New Brand", "Limited Features"],
  opportunities: ["Growing Market", "Tech Trends"],
  threats: ["Big Players", "Price Wars"],
};

export function MarketIntel() {
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const [animatedPrices, setAnimatedPrices] = useState<Record<string, number>>({});

  // Fixed quadrant delays (not using Math.random in render)
  const quadrantDelays = [1.2, 1.4, 1.6, 1.8];

  useEffect(() => {
    // Reveal sections sequentially
    const sections = ["chart", "competitors", "swot", "summary"];
    sections.forEach((section) => {
      setTimeout(() => {
        setVisibleSections((prev) => [...prev, section]);
      }, 800 * (sections.indexOf(section) + 1));
    });

    // Animate prices
    competitors.forEach((comp) => {
      setTimeout(() => {
        let current = 0;
        const interval = setInterval(() => {
          current += 5;
          if (current >= comp.price) {
            current = comp.price;
            clearInterval(interval);
          }
          setAnimatedPrices((prev) => ({ ...prev, [comp.name]: current }));
        }, 30);
      }, 2000 + competitors.indexOf(comp) * 200);
    });
  }, []);

  const maxMarket = Math.max(...competitors.map((c) => c.market));

  return (
    <AnimationContainer title="Market Intelligence Gatherer" description="Competitive analysis dashboard">
      <div className="relative w-full h-full p-4">
        {/* Market Size Chart */}
        <motion.div
          className="h-24 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: visibleSections.includes("chart") ? 1 : 0.3, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-xs text-slate-400 mb-2">Market Size ($B)</div>
          <div className="flex items-end justify-around h-16 gap-2">
            {[
              { label: "2023", value: 12 },
              { label: "2024", value: 18 },
              { label: "2025", value: 28 },
              { label: "2026", value: 45 },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="flex flex-col items-center gap-1"
                initial={{ height: 0 }}
                animate={{ height: (item.value / 45) * 60 }}
                transition={{ delay: 1 + i * 0.2, type: "spring" }}
              >
                <div className="text-xs text-slate-300">{item.value}</div>
                <div className="w-8 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t" />
                <div className="text-xs text-slate-500">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Competitor Analysis */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: visibleSections.includes("competitors") ? 1 : 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-xs text-slate-400 mb-2">Competitive Landscape</div>
          <div className="grid grid-cols-4 gap-2">
            {competitors.map((comp) => (
              <motion.div
                key={comp.name}
                className={`p-2 rounded-lg border-2 text-center ${
                  comp.isYours
                    ? "bg-green-900/30 border-green-500"
                    : `bg-${comp.color}-900/20 border-${comp.color}-500/50`
                }`}
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: 1.5 + competitors.indexOf(comp) * 0.15, type: "spring" }}
              >
                <div className={`text-xs font-medium ${comp.isYours ? "text-green-400" : `text-${comp.color}-400`}`}>
                  {comp.name}
                </div>
                <div className="flex items-center justify-center gap-1 my-1">
                  <DollarSign className="w-3 h-3 text-slate-400" />
                  <span className="text-lg font-bold text-slate-200">
                    {animatedPrices[comp.name] || 0}
                  </span>
                </div>
                <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-${comp.color}-500`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(comp.market / maxMarket) * 100}%` }}
                    transition={{ delay: 2, duration: 0.5 }}
                  />
                </div>
                <div className="text-xs text-slate-500 mt-1">{comp.market}% share</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* SWOT Analysis */}
        <motion.div
          className="grid grid-cols-2 gap-2 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: visibleSections.includes("swot") ? 1 : 0.3 }}
          transition={{ duration: 0.5 }}
        >
          {[
            { title: "Strengths", items: swotData.strengths, color: "green", icon: TrendingUp },
            { title: "Weaknesses", items: swotData.weaknesses, color: "red", icon: Target },
            { title: "Opportunities", items: swotData.opportunities, color: "blue", icon: BarChart3 },
            { title: "Threats", items: swotData.threats, color: "orange", icon: Target },
          ].map((quadrant, i) => (
            <motion.div
              key={quadrant.title}
              className={`p-2 rounded bg-${quadrant.color}-900/20 border border-${quadrant.color}-500/30`}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: quadrantDelays[i] }}
            >
              <div className={`flex items-center gap-1 mb-1`}>
                <quadrant.icon className={`w-3 h-3 text-${quadrant.color}-400`} />
                <span className={`text-xs font-medium text-${quadrant.color}-400`}>{quadrant.title}</span>
              </div>
              <div className="space-y-0.5">
                {quadrant.items.map((item, j) => (
                  <motion.div
                    key={item}
                    className="text-xs text-slate-300 flex items-center gap-1"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: quadrantDelays[i] + 0.2 + j * 0.1 }}
                  >
                    <span className={`w-1 h-1 rounded-full bg-${quadrant.color}-400`} />
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Summary Badge */}
        {visibleSections.includes("summary") && (
          <motion.div
            className="flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 3.5 }}
          >
            <div className="px-4 py-2 rounded-full bg-green-900/30 border border-green-500 flex items-center gap-2">
              <Target className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-green-400">
                Optimal Price: $129 | Position: Premium Value
              </span>
            </div>
          </motion.div>
        )}

        {/* Agents */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.3 }}
            >
              <AgentNode id={i} role="analyst" status={visibleSections.length >= i ? "working" : "idle"} size="sm" color="indigo" />
            </motion.div>
          ))}
        </div>
      </div>
    </AnimationContainer>
  );
}

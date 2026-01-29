"use client";

import { motion } from "framer-motion";
import { Globe, FileBarChart, Check, AlertCircle } from "lucide-react";
import { AnimationContainer } from "../shared/LazyAnimationWrapper";
import { AgentNode, type AgentRole } from "../shared/AgentNode";
import { useState, useEffect } from "react";

const competitorSites = [
  { name: "competitorA.com", status: "crawling", color: "blue" },
  { name: "competitorB.io", status: "pending", color: "violet" },
  { name: "competitorC.net", status: "pending", color: "pink" },
  { name: "rivalD.com", status: "pending", color: "orange" },
];

const extractedData = {
  features: ["AI Analytics", "Real-time Dashboard", "API Access", "Custom Reports"],
  pricing: ["Free: $0", "Pro: $49/mo", "Enterprise: Custom"],
  positioning: ["B2B SaaS", "Enterprise Focus", "API-First", "Cloud Native"],
};

type CrawlStatus = "pending" | "crawling" | "complete";

export function CompetitiveIntel() {
  const [crawlStatus, setCrawlStatus] = useState<Record<string, CrawlStatus>>({
    "competitorA.com": "crawling",
    "competitorB.io": "pending",
    "competitorC.net": "pending",
    "rivalD.com": "pending",
  });
  const [extractedItems, setExtractedItems] = useState<string[]>([]);
  const [currentSite, setCurrentSite] = useState(0);

  useEffect(() => {
    // Simulate crawling each site
    competitorSites.forEach((site, index) => {
      setTimeout(() => {
        setCrawlStatus((prev) => ({ ...prev, [site.name]: "crawling" }));
        setCurrentSite(index);

        setTimeout(() => {
          setCrawlStatus((prev) => ({ ...prev, [site.name]: "complete" }));

          // Add extracted items progressively
          const items = [...extractedData.features, ...extractedData.pricing, ...extractedData.positioning];
          items.forEach((item, i) => {
            setTimeout(() => {
              setExtractedItems((prev) => {
                if (!prev.includes(item)) return [...prev, item];
                return prev;
              });
            }, i * 200);
          });
        }, 1500);
      }, index * 2000);
    });
  }, []);

  const getStatusIcon = (status: CrawlStatus) => {
    switch (status) {
      case "crawling":
        return <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><Globe className="w-4 h-4 text-blue-400" /></motion.div>;
      case "complete":
        return <Check className="w-4 h-4 text-green-400" />;
      default:
        return <div className="w-4 h-4 rounded-full border-2 border-slate-600" />;
    }
  };

  return (
    <AnimationContainer title="Competitive Intelligence Unit" description="Multi-site competitive analysis">
      <div className="relative w-full h-full p-6">
        {/* Competitor Browser Windows Grid */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {competitorSites.map((site, index) => (
            <motion.div
              key={site.name}
              className={`relative border-2 rounded-lg overflow-hidden transition-all ${
                crawlStatus[site.name] === "complete"
                  ? `border-${site.color}-500 bg-${site.color}-950/30`
                  : crawlStatus[site.name] === "crawling"
                    ? `border-${site.color}-400 bg-${site.color}-950/20`
                    : "border-slate-700 bg-slate-900/50"
              }`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.3 }}
            >
              {/* Browser Header */}
              <div className={`flex items-center gap-2 px-2 py-1 border-b ${
                crawlStatus[site.name] === "complete" ? `border-${site.color}-500/30` : "border-slate-700"
              }`}>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500/70" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
                  <div className="w-2 h-2 rounded-full bg-green-500/70" />
                </div>
                <div className="flex-1 text-xs text-slate-400 truncate">{site.name}</div>
                {getStatusIcon(crawlStatus[site.name])}
              </div>

              {/* Browser Content */}
              <div className="p-2 h-24 space-y-1">
                {crawlStatus[site.name] === "crawling" && (
                  <>
                    <motion.div
                      className="h-2 bg-slate-700 rounded"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                    <div className="space-y-1">
                      {[1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          className="h-1.5 bg-slate-700/50 rounded"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.2, duration: 0.3 }}
                        />
                      ))}
                    </div>
                  </>
                )}

                {crawlStatus[site.name] === "complete" && (
                  <motion.div
                    className="space-y-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="flex items-center gap-1 text-xs text-green-400">
                      <Check className="w-3 h-3" />
                      <span>Data Extracted</span>
                    </div>
                    <div className="text-xs text-slate-400">
                      {Math.floor(Math.random() * 20 + 10)} items found
                    </div>
                  </motion.div>
                )}

                {crawlStatus[site.name] === "pending" && (
                  <div className="flex items-center justify-center h-full">
                    <AlertCircle className="w-6 h-6 text-slate-600" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Extracted Data Panel */}
        <motion.div
          className="border border-slate-700 rounded-lg p-4 bg-slate-900/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <FileBarChart className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-slate-300">Extracted Intelligence</span>
            <motion.span
              className="ml-auto px-2 py-0.5 rounded-full bg-blue-900/50 text-blue-400 text-xs"
              key={extractedItems.length}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
            >
              {extractedItems.length} items
            </motion.span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {/* Features */}
            <div className="space-y-1">
              <div className="text-xs text-slate-500 uppercase tracking-wide">Features</div>
              <div className="space-y-1">
                {extractedData.features.map((feature) => (
                  <motion.div
                    key={feature}
                    className={`text-xs flex items-center gap-1 ${
                      extractedItems.includes(feature) ? "text-slate-300" : "text-slate-600"
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: extractedItems.includes(feature) ? 1 : 0.3, x: 0 }}
                  >
                    <Check className={`w-3 h-3 ${extractedItems.includes(feature) ? "text-green-400" : "text-slate-600"}`} />
                    {feature}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-1">
              <div className="text-xs text-slate-500 uppercase tracking-wide">Pricing</div>
              <div className="space-y-1">
                {extractedData.pricing.map((price) => (
                  <motion.div
                    key={price}
                    className={`text-xs flex items-center gap-1 ${
                      extractedItems.includes(price) ? "text-slate-300" : "text-slate-600"
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: extractedItems.includes(price) ? 1 : 0.3, x: 0 }}
                  >
                    <Check className={`w-3 h-3 ${extractedItems.includes(price) ? "text-green-400" : "text-slate-600"}`} />
                    {price}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Positioning */}
            <div className="space-y-1">
              <div className="text-xs text-slate-500 uppercase tracking-wide">Positioning</div>
              <div className="space-y-1">
                {extractedData.positioning.map((pos) => (
                  <motion.div
                    key={pos}
                    className={`text-xs flex items-center gap-1 ${
                      extractedItems.includes(pos) ? "text-slate-300" : "text-slate-600"
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: extractedItems.includes(pos) ? 1 : 0.3, x: 0 }}
                  >
                    <Check className={`w-3 h-3 ${extractedItems.includes(pos) ? "text-green-400" : "text-slate-600"}`} />
                    {pos}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Agent Nodes */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <AgentNode
                id={i}
                role="analyst"
                status={i <= currentSite + 1 ? "working" : "idle"}
                size="sm"
                color="indigo"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </AnimationContainer>
  );
}

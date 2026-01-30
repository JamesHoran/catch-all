"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import {
  SwarmLauncher,
  ResearchReport,
  SpreadsheetData,
} from "@/components/animations/use-cases";

interface TabDemoProps {
  defaultDemoId?: string;
}

// Featured demos for tabs with their components
const tabDemos = [
  { id: "swarm-launcher", label: "🚀 App Builder", component: SwarmLauncher },
  { id: "research-report", label: "📝 Report Writer", component: ResearchReport },
  { id: "spreadsheet-data", label: "📊 Spreadsheet", component: SpreadsheetData },
];

type DemoComponentType = React.ComponentType;

export function TabDemo({ defaultDemoId = "swarm-launcher" }: TabDemoProps) {
  const [selectedDemoId, setSelectedDemoId] = useState(defaultDemoId);
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (demoId: string) => {
    if (demoId !== selectedDemoId) {
      setIsLoading(true);
      setSelectedDemoId(demoId);
      setTimeout(() => setIsLoading(false), 100);
    }
  };

  const currentDemo = tabDemos.find((d) => d.id === selectedDemoId);
  const DemoComponent = currentDemo?.component;

  return (
    <div className="h-screen flex flex-col p-6 gap-4 -m-6">
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 shrink-0">
        {tabDemos.map((demo) => (
          <motion.button
            key={demo.id}
            onClick={() => handleTabChange(demo.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all relative overflow-hidden ${
              selectedDemoId === demo.id
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {demo.label}
            {selectedDemoId === demo.id && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-violet-400 opacity-20"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ backgroundSize: "200% 200%" }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Demo Display - Full Height */}
      <motion.div
        key={selectedDemoId}
        className={`flex-1 rounded-2xl bg-slate-900/50 border border-slate-700 overflow-hidden ${
          isLoading ? "opacity-50" : "opacity-100"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0.5 : 1 }}
        transition={{ duration: 0.15 }}
      >
        {DemoComponent ? (
          <DemoComponent />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            <Loader2 className="w-8 h-8 text-blue-400 animate-spin mr-3" />
            Loading demo...
          </div>
        )}
      </motion.div>
    </div>
  );
}

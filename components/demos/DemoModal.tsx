"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import * as DemoComponents from "@/components/animations/use-cases";
import { FullScreenProvider } from "@/components/animations/shared";
import type { DemoConfig } from "@/lib/demo-data";
import { useEffect } from "react";

interface DemoModalProps {
  demo: DemoConfig | null;
  onClose: () => void;
}

export function DemoModal({ demo, onClose }: DemoModalProps) {
  // ESC key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!demo) return null;

  // Get the component for this demo using the id
  // Convert id like "mvp-builder" to "MVPBuilder"
  const componentName = demo.id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("") as keyof typeof DemoComponents;

  const DemoComponent = DemoComponents[componentName];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-full h-screen flex flex-col bg-slate-900"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 bg-slate-800/50 shrink-0">
            <div>
              <h2 className="text-xl font-bold text-white">{demo.title}</h2>
              <p className="text-sm text-slate-400 mt-1">{demo.narrative}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-700 transition-colors"
              aria-label="Close demo (ESC)"
            >
              <X className="w-6 h-6 text-slate-400" />
            </button>
          </div>

          {/* Demo Content - Full Screen */}
          <div className="flex-1 overflow-auto bg-black">
            {DemoComponent ? (
              <FullScreenProvider>
                <DemoComponent />
              </FullScreenProvider>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                Demo coming soon...
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-700 bg-slate-800/50 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span className="px-2 py-1 rounded bg-slate-700 capitalize">{demo.category}</span>
              <span>{demo.agentCount} Agents</span>
              <span className="capitalize">{demo.animationType}</span>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition-colors"
            >
              Close (ESC)
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

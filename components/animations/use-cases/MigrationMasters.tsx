"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { AnimationContainer } from "../shared/LazyAnimationWrapper";
import { CodeBlock } from "../shared/CodeBlock";
import { useState, useEffect } from "react";

const oldCode = [
  { content: "function getData() {", type: "normal" as const },
  { content: "  return fetch('/api/data')", type: "normal" as const },
  { content: "    .then(res => res.json())", type: "remove" as const },
  { content: "    .then(data => data)", type: "remove" as const },
  { content: "    .catch(err => null)", type: "remove" as const },
  { content: "}", type: "normal" as const },
];

const newCode = [
  { content: "async function getData() {", type: "normal" as const },
  { content: "  try {", type: "add" as const },
  { content: "    const res = await fetch('/api/data')", type: "add" as const },
  { content: "    return await res.json()", type: "highlight" as const },
  { content: "  } catch (err) {", type: "add" as const },
  { content: "    throw new Error(err)", type: "highlight" as const },
  { content: "  }", type: "add" as const },
  { content: "}", type: "normal" as const },
];

export function MigrationMasters() {
  const [scanX, setScanX] = useState(0);
  const [showNewCode, setShowNewCode] = useState(false);
  const [transformComplete, setTransformComplete] = useState(false);

  useEffect(() => {
    // Animate scan line
    const scanInterval = setInterval(() => {
      setScanX((prev) => {
        if (prev >= 100) {
          clearInterval(scanInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Show new code after scan
    const newCodeTimer = setTimeout(() => {
      setShowNewCode(true);
    }, 5500);

    // Complete transform
    const completeTimer = setTimeout(() => {
      setTransformComplete(true);
    }, 8500);

    return () => {
      clearInterval(scanInterval);
      clearTimeout(newCodeTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  return (
    <AnimationContainer title="Migration Masters" description="Code transformation in real-time">
      <div className="relative w-full h-full flex gap-4 p-4">
        {/* Old Code Panel */}
        <motion.div
          className="flex-1 relative"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-xs text-slate-400 mb-2 flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-red-900/30 text-red-400">Legacy</span>
            <span>Before Migration</span>
          </div>

          <div className="relative">
            <CodeBlock lines={oldCode} language="javascript" typingSpeed={20} showLineNumbers={false} />

            {/* Scanning Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent pointer-events-none"
              style={{ left: `${scanX}%` }}
              animate={{
                boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
              }}
            />
          </div>
        </motion.div>

        {/* Arrow */}
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: "spring" }}
        >
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowRight className="w-8 h-8 text-slate-500" />
          </motion.div>
        </motion.div>

        {/* New Code Panel */}
        <motion.div
          className="flex-1 relative"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: showNewCode ? 1 : 0.3, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-xs text-slate-400 mb-2 flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-green-900/30 text-green-400">Modern</span>
            <span>After Migration</span>
          </div>

          <div className="relative bg-slate-900/80 rounded-lg border border-slate-700 p-4">
            {showNewCode ? (
              <CodeBlock lines={newCode} language="javascript" typingSpeed={15} showLineNumbers={false} />
            ) : (
              <div className="h-full flex items-center justify-center text-slate-600">
                Awaiting transformation...
              </div>
            )}

            {/* Success Badge */}
            {transformComplete && (
              <motion.div
                className="absolute top-2 right-2 px-2 py-1 rounded bg-green-500/20 border border-green-500 flex items-center gap-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              >
                <CheckCircle className="w-3 h-3 text-green-400" />
                <span className="text-xs text-green-400">Migrated</span>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Agent Status */}
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur border border-slate-700 rounded-lg px-4 py-2 flex items-center gap-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              className="w-3 h-3 rounded-full"
              animate={{
                backgroundColor:
                  scanX < 100
                    ? "#3b82f6"
                    : showNewCode
                    ? "#f59e0b"
                    : "#22c55e",
              }}
            />
            <span className="text-xs text-slate-300">
              {scanX < 100
                ? "Scanning..."
                : showNewCode && !transformComplete
                ? "Transforming..."
                : "Complete"}
            </span>
          </div>
        </motion.div>
      </div>
    </AnimationContainer>
  );
}

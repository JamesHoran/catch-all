"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { AnimationContainer } from "../shared/LazyAnimationWrapper";
import { AgentNode, type AgentRole } from "../shared/AgentNode";
import { ProgressBar } from "../shared/ProgressBar";
import { useState, useEffect } from "react";

const auditCategories = [
  { id: 1, name: "Technical", weight: 0.25, icon: "🔧" },
  { id: 2, name: "Financial", weight: 0.25, icon: "💰" },
  { id: 3, name: "Legal", weight: 0.2, icon: "⚖️" },
  { id: 4, name: "Team", weight: 0.15, icon: "👥" },
  { id: 5, name: "Market", weight: 0.1, icon: "📊" },
  { id: 6, name: "Product", weight: 0.05, icon: "📦" },
];

export function DueDiligence() {
  const [auditProgress, setAuditProgress] = useState<Record<number, number>>({});
  const [completedAudits, setCompletedAudits] = useState<number[]>([]);
  const [overallScore, setOverallScore] = useState(0);
  const [riskLevel, setRiskLevel] = useState<"low" | "medium" | "high">("high");
  const [findings, setFindings] = useState<Record<number, number>>({});

  useEffect(() => {
    // Run audits sequentially
    auditCategories.forEach((category) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setCompletedAudits((prev) => [...prev, category.id]);
          // Store random findings when complete
          setFindings((prev) => ({ ...prev, [category.id]: Math.floor(Math.random() * 3 + 1) }));
        }
        setAuditProgress((prev) => ({ ...prev, [category.id]: Math.min(100, progress) }));
      }, 300);
    });
  }, []);

  useEffect(() => {
    // Calculate overall score whenever auditProgress changes
    const score = auditCategories.reduce((sum, cat) => {
      const progress = auditProgress[cat.id] || 0;
      return sum + (progress / 100) * cat.weight * 100;
    }, 0);

    // Defer state updates to avoid synchronous setState in effect
    const timeoutId = setTimeout(() => {
      setOverallScore(score);

      // Determine risk level
      if (score >= 80) setRiskLevel("low");
      else if (score >= 50) setRiskLevel("medium");
      else setRiskLevel("high");
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [auditProgress]);

  const riskConfig = {
    low: { color: "green", label: "Low Risk", icon: CheckCircle },
    medium: { color: "yellow", label: "Medium Risk", icon: AlertTriangle },
    high: { color: "red", label: "High Risk", icon: AlertTriangle },
  };

  const config = riskConfig[riskLevel];

  return (
    <AnimationContainer title="Due Diligence Team" description="Automated audit and scoring system">
      <div className="relative w-full h-full flex flex-col">
        {/* Scorecard */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
          {auditCategories.map((category) => {
            const progress = auditProgress[category.id] || 0;
            const isComplete = completedAudits.includes(category.id);

            return (
              <motion.div
                key={category.id}
                className={`p-3 rounded-lg border-2 transition-all ${
                  isComplete
                    ? "bg-green-900/20 border-green-600"
                    : progress > 0
                    ? "bg-blue-900/20 border-blue-600"
                    : "bg-slate-800/50 border-slate-700"
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: category.id * 0.2 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{category.icon}</span>
                    <span className="text-sm font-medium text-slate-200">{category.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isComplete ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : progress > 0 ? (
                      <AgentNode id={category.id} role="analyst" status="working" size="sm" color="indigo" />
                    ) : (
                      <span className="text-xs text-slate-500">Pending</span>
                    )}
                  </div>
                </div>

                <ProgressBar
                  agentId={category.id}
                  progress={progress}
                  status={isComplete ? "complete" : progress > 0 ? "in-progress" : "pending"}
                  showPercentage={true}
                />

                {/* Audit details (shown when complete) */}
                {isComplete && (
                  <motion.div
                    className="mt-2 pt-2 border-t border-slate-700 text-xs"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                  >
                    <div className="flex justify-between text-slate-400">
                      <span>Findings:</span>
                      <span className="text-green-400">
                        {findings[category.id] || 1} issues
                      </span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Overall Score Panel */}
        <motion.div
          className="bg-slate-900/90 border-t border-slate-700 p-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between">
            {/* Risk Meter */}
            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-16 rounded-full bg-${config.color}-900/30 border-2 border-${config.color}-500 flex items-center justify-center`}
              >
                <config.icon className={`w-8 h-8 text-${config.color}-400`} />
              </div>
              <div>
                <div className="text-xs text-slate-400">Risk Assessment</div>
                <div className={`text-lg font-bold text-${config.color}-400`}>
                  {config.label}
                </div>
              </div>
            </div>

            {/* Overall Score */}
            <div className="text-center">
              <div className="text-xs text-slate-400 mb-1">Overall Score</div>
              <motion.div
                className={`text-3xl font-bold text-${config.color}-400`}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5 }}
              >
                {Math.round(overallScore)}
              </motion.div>
              <div className="text-xs text-slate-500">out of 100</div>
            </div>

            {/* Recommendation */}
            <div className="flex-1 ml-4">
              <div className="text-xs text-slate-400 mb-1">Recommendation</div>
              <motion.div
                className={`text-sm font-medium p-2 rounded bg-${config.color}-900/30 text-${config.color}-300`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {riskLevel === "low" && "✓ Approved for investment"}
                {riskLevel === "medium" && "⚠ Review with team recommended"}
                {riskLevel === "high" && "✗ High risk - recommend passing"}
              </motion.div>
            </div>
          </div>

          {/* Score Bar */}
          <div className="mt-3 h-3 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500`}
              animate={{ width: `${overallScore}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>
      </div>
    </AnimationContainer>
  );
}

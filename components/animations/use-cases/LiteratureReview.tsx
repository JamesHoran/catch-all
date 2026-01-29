"use client";

import { motion } from "framer-motion";
import { AnimationContainer } from "../shared/LazyAnimationWrapper";
import { AgentNode, type AgentRole } from "../shared/AgentNode";
import { useState, useEffect } from "react";

interface Paper {
  id: string;
  x: number;
  y: number;
  citations: number;
  year: number;
  isSeminal: boolean;
  title: string;
}

const papers: Paper[] = [
  { id: "p1", x: 30, y: 25, citations: 150, year: 2018, isSeminal: true, title: "Foundations" },
  { id: "p2", x: 55, y: 30, citations: 89, year: 2020, isSeminal: false, title: "Methods A" },
  { id: "p3", x: 75, y: 20, citations: 120, year: 2019, isSeminal: true, title: "Survey" },
  { id: "p4", x: 20, y: 55, citations: 45, year: 2021, isSeminal: false, title: "Case Study" },
  { id: "p5", x: 50, y: 60, citations: 67, year: 2022, isSeminal: false, title: "Applications" },
  { id: "p6", x: 80, y: 50, citations: 78, year: 2021, isSeminal: false, title: "Extensions" },
  { id: "p7", x: 35, y: 80, citations: 34, year: 2023, isSeminal: false, title: "Recent A" },
  { id: "p8", x: 65, y: 85, citations: 28, year: 2023, isSeminal: false, title: "Recent B" },
];

const citations: Array<{ from: string; to: string }> = [
  { from: "p2", to: "p1" },
  { from: "p3", to: "p1" },
  { from: "p4", to: "p1" },
  { from: "p4", to: "p2" },
  { from: "p5", to: "p2" },
  { from: "p5", to: "p4" },
  { from: "p6", to: "p1" },
  { from: "p6", to: "p3" },
  { from: "p7", to: "p4" },
  { from: "p7", to: "p5" },
  { from: "p8", to: "p5" },
  { from: "p8", to: "p6" },
];

export function LiteratureReview() {
  const [visiblePapers, setVisiblePapers] = useState<string[]>([]);
  const [visibleCitations, setVisibleCitations] = useState<string[]>([]);
  const [highlighted, setHighlighted] = useState<string[]>([]);

  useEffect(() => {
    // Show papers sequentially
    papers.forEach((paper, i) => {
      setTimeout(() => {
        setVisiblePapers((prev) => [...prev, paper.id]);
      }, i * 300);
    });

    // Show citations after papers
    setTimeout(() => {
      citations.forEach((citation, i) => {
        setTimeout(() => {
          setVisibleCitations((prev) => [...prev, `${citation.from}-${citation.to}`]);
        }, i * 200);
      });
    }, 2500);

    // Highlight key papers
    setTimeout(() => {
      setHighlighted(["p1", "p3"]);
    }, 4000);
  }, []);

  return (
    <AnimationContainer title="Literature Review Pro" description="Citation network visualization">
      <div className="relative w-full h-full">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Citation Edges */}
          {citations.map((citation) => {
            const fromPaper = papers.find((p) => p.id === citation.from);
            const toPaper = papers.find((p) => p.id === citation.to);
            if (!fromPaper || !toPaper) return null;

            const isVisible = visibleCitations.includes(`${citation.from}-${citation.to}`);
            const isHighlighted =
              highlighted.includes(citation.from) || highlighted.includes(citation.to);

            return (
              <motion.line
                key={`edge-${citation.from}-${citation.to}`}
                x1={fromPaper.x}
                y1={fromPaper.y}
                x2={toPaper.x}
                y2={toPaper.y}
                stroke={isHighlighted ? "#22c55e" : "#475569"}
                strokeWidth={isHighlighted ? "1" : "0.3"}
                opacity={isHighlighted ? 0.8 : 0.4}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: isVisible ? 1 : 0, opacity: isVisible ? (isHighlighted ? 0.8 : 0.4) : 0 }}
                transition={{ duration: 0.5 }}
                strokeDasharray={Math.sqrt(Math.pow(toPaper.x - fromPaper.x, 2) + Math.pow(toPaper.y - fromPaper.y, 2))}
              />
            );
          })}

          {/* Paper Nodes */}
          {papers.map((paper) => {
            const isVisible = visiblePapers.includes(paper.id);
            const isHighlighted = highlighted.includes(paper.id);
            const radius = Math.sqrt(paper.citations) * 0.8;

            return (
              <motion.g
                key={paper.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: isVisible ? 1 : 0, opacity: isVisible ? 1 : 0 }}
                transition={{ type: "spring", delay: papers.indexOf(paper) * 0.1 }}
              >
                {/* Node circle */}
                <circle
                  cx={paper.x}
                  cy={paper.y}
                  r={radius}
                  fill={isHighlighted ? "#1e3a5f" : paper.isSeminal ? "#1e293b" : "#0f172a"}
                  stroke={isHighlighted ? "#22c55e" : paper.isSeminal ? "#3b82f6" : "#64748b"}
                  strokeWidth={isHighlighted ? "1.5" : paper.isSeminal ? "1" : "0.5"}
                />

                {/* Highlight glow */}
                {isHighlighted && (
                  <motion.circle
                    cx={paper.x}
                    cy={paper.y}
                    r={radius}
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="2"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                {/* Citation count */}
                <text
                  x={paper.x}
                  y={paper.y + 1}
                  textAnchor="middle"
                  fontSize={Math.max(2, radius * 0.8)}
                  fill={isHighlighted ? "#22c55e" : paper.isSeminal ? "#60a5fa" : "#94a3b8"}
                  fontWeight={isHighlighted ? "bold" : "normal"}
                >
                  {paper.citations}
                </text>

                {/* Title tooltip */}
                {isVisible && (
                  <motion.text
                    x={paper.x}
                    y={paper.y - radius - 2}
                    textAnchor="middle"
                    fontSize="2"
                    fill="#e2e8f0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {paper.title}
                  </motion.text>
                )}

                {/* Year badge */}
                <text
                  x={paper.x}
                  y={paper.y + radius + 3}
                  textAnchor="middle"
                  fontSize="1.5"
                  fill={paper.year >= 2023 ? "#22c55e" : "#64748b"}
                >
                  {paper.year}
                </text>
              </motion.g>
            );
          })}
        </svg>

        {/* Legend */}
        <motion.div
          className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur border border-slate-700 rounded-lg px-3 py-2 text-xs space-y-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="text-slate-300 font-medium">Legend</div>
          <div className="flex items-center gap-2 text-slate-400">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span>Seminal Papers</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>Key Findings</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <div className="w-3 h-3 rounded-full bg-slate-500" />
            <span>Recent Work</span>
          </div>
        </motion.div>

        {/* Stats */}
        {highlighted.length > 0 && (
          <motion.div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur border border-green-700 rounded-lg px-4 py-2 flex items-center gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="text-center">
              <div className="text-lg font-bold text-green-400">15</div>
              <div className="text-xs text-slate-400">Key Papers</div>
            </div>
            <div className="w-px h-8 bg-slate-700" />
            <div className="text-center">
              <div className="text-lg font-bold text-blue-400">611</div>
              <div className="text-xs text-slate-400">Total Citations</div>
            </div>
            <div className="w-px h-8 bg-slate-700" />
            <div className="text-center">
              <div className="text-lg font-bold text-violet-400">2018-23</div>
              <div className="text-xs text-slate-400">Time Span</div>
            </div>
          </motion.div>
        )}

        {/* Agents */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.3 }}
            >
              <AgentNode id={i} role="researcher" status={visiblePapers.length >= i + 3 ? "working" : "idle"} size="sm" color="cyan" />
            </motion.div>
          ))}
        </div>
      </div>
    </AnimationContainer>
  );
}

"use client";

import { useState, useEffect, useRef, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileSpreadsheet, Sigma, CheckCircle2 } from "lucide-react";
import { AnimationContainer } from "../shared/LazyAnimationWrapper";
import { BotAvatar } from "../shared/BotAvatar";
import type { AgentRole } from "../shared/AgentNode";

const COLUMNS = ["A", "B", "C", "D", "E", "F"];
const ROWS = [1, 2, 3, 4, 5, 6, 7];

const CELL_DATA = [
  { row: 1, col: "A", value: "Product", type: "header" },
  { row: 1, col: "B", value: "Q1 Sales", type: "header" },
  { row: 1, col: "C", value: "Q2 Sales", type: "header" },
  { row: 1, col: "D", value: "Q3 Sales", type: "header" },
  { row: 1, col: "E", value: "Q4 Sales", type: "header" },
  { row: 1, col: "F", value: "Total", type: "header" },
  { row: 2, col: "A", value: "Product A", type: "label" },
  { row: 2, col: "B", value: "$45,200", type: "number" },
  { row: 2, col: "C", value: "$52,100", type: "number" },
  { row: 2, col: "D", value: "$48,900", type: "number" },
  { row: 2, col: "E", value: "$61,500", type: "number" },
  { row: 2, col: "F", value: "$207,700", type: "total" },
  { row: 3, col: "A", value: "Product B", type: "label" },
  { row: 3, col: "B", value: "$32,800", type: "number" },
  { row: 3, col: "C", value: "$38,200", type: "number" },
  { row: 3, col: "D", value: "$41,500", type: "number" },
  { row: 3, col: "E", value: "$49,800", type: "number" },
  { row: 3, col: "F", value: "$162,300", type: "total" },
  { row: 4, col: "A", value: "Product C", type: "label" },
  { row: 4, col: "B", value: "$28,500", type: "number" },
  { row: 4, col: "C", value: "$31,200", type: "number" },
  { row: 4, col: "D", value: "$35,800", type: "number" },
  { row: 4, col: "E", value: "$42,100", type: "number" },
  { row: 4, col: "F", value: "$137,600", type: "total" },
  { row: 5, col: "A", value: "Product D", type: "label" },
  { row: 5, col: "B", value: "$51,300", type: "number" },
  { row: 5, col: "C", value: "$58,700", type: "number" },
  { row: 5, col: "D", value: "$55,200", type: "number" },
  { row: 5, col: "E", value: "$67,900", type: "number" },
  { row: 5, col: "F", value: "$233,100", type: "total" },
  { row: 6, col: "A", value: "Product E", type: "label" },
  { row: 6, col: "B", value: "$39,600", type: "number" },
  { row: 6, col: "C", value: "$44,800", type: "number" },
  { row: 6, col: "D", value: "$48,300", type: "number" },
  { row: 6, col: "E", value: "$56,700", type: "number" },
  { row: 6, col: "F", value: "$189,400", type: "total" },
  { row: 7, col: "A", value: "TOTAL", type: "total" },
  { row: 7, col: "B", value: "$197,400", type: "total" },
  { row: 7, col: "C", value: "$225,000", type: "total" },
  { row: 7, col: "D", value: "$229,700", type: "total" },
  { row: 7, col: "E", value: "$278,000", type: "total" },
  { row: 7, col: "F", value: "$930,100", type: "total" },
];

const AGENT_ROLE: AgentRole = "analyst";
const AGENT_COLOR = "emerald";

interface FilledCell {
  row: number;
  col: string;
  value: string;
  type: string;
}

// Mini Spreadsheet Component - one of the 9
const MiniSpreadsheet = memo(({
  index,
  filledCells,
  currentCell,
  isComplete,
  isVisible
}: {
  index: number;
  filledCells: FilledCell[];
  currentCell: { row: number; col: string } | null;
  isComplete: boolean;
  isVisible: boolean;
}) => {
  const getCellValue = (row: number, col: string) => {
    const cell = filledCells.find((c) => c.row === row && c.col === col);
    return cell?.value || "";
  };

  const getCellType = (row: number, col: string) => {
    const cell = filledCells.find((c) => c.row === row && c.col === col);
    return cell?.type || "";
  };

  const isCurrentCell = (row: number, col: string) => {
    return currentCell?.row === row && currentCell?.col === col;
  };

  return (
    <div className="bg-slate-900/50 rounded-xl p-2 border border-slate-700">
      <div className="flex items-center gap-1 mb-2">
        <FileSpreadsheet className="w-3 h-3 text-emerald-400" />
        <span className="text-[8px] text-slate-300">Report {index + 1}.xlsx</span>
        <BotAvatar role={AGENT_ROLE} color={AGENT_COLOR} size="xs" />
      </div>

      {/* Spreadsheet grid */}
      <div className="bg-slate-900/90 border border-slate-700 rounded overflow-hidden">
        <div className="overflow-hidden">
          <table className="w-full border-collapse">
            <tbody>
              {[1, 2, 3, 4].map((row) => (
                <tr key={row}>
                  {COLUMNS.map((col) => {
                    const value = getCellValue(row, col);
                    const type = getCellType(row, col);
                    const isCurrent = isCurrentCell(row, col);

                    return (
                      <td
                        key={col}
                        className="min-w-[24px] h-5 border border-slate-700 text-[7px] relative p-0.5 bg-slate-900/50"
                      >
                        {value && (
                          <motion.span
                            key={`value-${index}-${row}-${col}`}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className={`block ${
                              type === "total"
                                ? "text-emerald-400 font-bold"
                                : type === "header"
                                ? "text-slate-400 font-semibold"
                                : type === "label"
                                ? "text-slate-500"
                                : "text-slate-300"
                            }`}
                          >
                            {value.length > 6 ? value.slice(0, 5) + '..' : value}
                          </motion.span>
                        )}

                        {/* Active cell indicator */}
                        {isCurrent && (
                          <motion.div
                            key={`current-${index}-${row}-${col}`}
                            className="absolute inset-0 bg-emerald-500/20 border border-emerald-500 rounded-sm"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between px-2 py-1 bg-slate-800 border-t border-slate-700 text-[7px] text-slate-500">
          <span>{filledCells.length} / {CELL_DATA.length} cells</span>
          <span className={isComplete ? "text-emerald-400" : ""}>{isComplete ? "Done!" : "Working"}</span>
        </div>
      </div>
    </div>
  );
});

MiniSpreadsheet.displayName = 'MiniSpreadsheet';

export function ExcelAtScale() {
  const [filledCells, setFilledCells] = useState<FilledCell[]>([]);
  const [currentCell, setCurrentCell] = useState<{ row: number; col: string } | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [zoomOut, setZoomOut] = useState(false);
  const [startFilling, setStartFilling] = useState(false);
  const isPaused = useRef(false);
  const cellIndexRef = useRef(0);
  const animationIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const resetTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Main animation loop
  const startAnimation = useCallback(() => {
    // Reset state
    setFilledCells([]);
    setCurrentCell(null);
    setIsComplete(false);
    setZoomOut(false);
    setStartFilling(false);
    cellIndexRef.current = 0;
    isPaused.current = false;

    // Step 1: Start zoomed in, then zoom out after 1 second
    const zoomTimeout = setTimeout(() => {
      if (isPaused.current) return;
      setZoomOut(true);
    }, 1000);

    // Step 2: After zoom completes (4s), start filling cells
    const fillDelay = 5000; // 1s initial wait + 4s zoom duration
    const fillStartTimeout = setTimeout(() => {
      if (isPaused.current) return;
      setStartFilling(true);

      // Start filling cells
      const interval = setInterval(() => {
        if (isPaused.current) return;

        if (cellIndexRef.current < CELL_DATA.length) {
          const cell = CELL_DATA[cellIndexRef.current];
          setFilledCells((prev) => [...prev, cell]);
          setCurrentCell({ row: cell.row, col: cell.col });
          cellIndexRef.current += 1;

          if (cellIndexRef.current >= CELL_DATA.length) {
            clearInterval(interval);
            setTimeout(() => {
              setIsComplete(true);
              setCurrentCell(null);
              // Reset and loop
              resetTimeoutRef.current = setTimeout(() => {
                startAnimation();
              }, 4000);
            }, 500);
          }
        }
      }, 80);

      animationIntervalRef.current = interval;
    }, fillDelay);

    return () => {
      clearTimeout(zoomTimeout);
      clearTimeout(fillStartTimeout);
      if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    };
  }, []);

  // Pause handling
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data === 'pause') {
        isPaused.current = true;
      } else if (e.data === 'play') {
        isPaused.current = false;
      } else if (e.data === 'reset') {
        // Restart animation
        if (animationIntervalRef.current) {
          clearInterval(animationIntervalRef.current);
        }
        if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
        startAnimation();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [startAnimation]);

  // Auto-start animation
  useEffect(() => {
    const startDelay = setTimeout(() => {
      startAnimation();
    }, 500);

    return () => {
      clearTimeout(startDelay);
      if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    };
  }, [startAnimation]);

  return (
    <AnimationContainer
      title="Excel at Scale"
      description="9 AI agents processing spreadsheets in perfect synchronization"
    >
      <div className="relative w-full h-full flex items-center justify-center p-6 overflow-hidden">
        {/* 3x3 Grid of 9 Spreadsheets with zoom effect */}
        <motion.div
          className="grid grid-cols-3 gap-4 w-full max-w-4xl"
          initial={{ scale: 3.5, x: -180, y: 180 }}
          animate={zoomOut ? { scale: 1, x: 0, y: 0 } : { scale: 3.5, x: -180, y: 180 }}
          transition={{ duration: 4, ease: "easeInOut" }}
          style={{ transformOrigin: "top left" }}
        >
          {[...Array(9)].map((_, i) => (
            <MiniSpreadsheet
              key={i}
              index={i}
              filledCells={startFilling ? filledCells : []}
              currentCell={currentCell}
              isComplete={isComplete}
              isVisible={true}
            />
          ))}
        </motion.div>

        {/* Completion Banner */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ scale: 0, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0, y: 30, opacity: 0 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 px-6 py-3 rounded-2xl bg-gradient-to-r from-green-900/80 to-emerald-900/80 border-2 border-green-500 backdrop-blur-sm flex items-center gap-3"
            >
              <CheckCircle2 className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-green-400 font-bold">
                  Complete!
                </div>
                <div className="text-green-300/80 text-xs">
                  9 reports processed in sync
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimationContainer>
  );
}

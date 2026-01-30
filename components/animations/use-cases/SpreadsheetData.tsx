"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Table2, FileSpreadsheet, Sigma, Plus } from "lucide-react";
import { AnimationContainer } from "../shared/LazyAnimationWrapper";
import { BotAvatar } from "../shared/BotAvatar";
import type { AgentRole } from "../shared/AgentNode";

// The prompt that gets typed out
const PROMPT = "Create a sales report with quarterly data, calculate growth rates, and add conditional formatting...";

// Excel-like column headers
const COLUMNS = ["A", "B", "C", "D", "E", "F"];

// Row headers
const ROWS = [1, 2, 3, 4, 5, 6, 7];

// Cell data that gets filled in
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

// Agent role
const AGENT_ROLE: AgentRole = "analyst";
const AGENT_COLOR = "emerald";

interface FilledCell {
  row: number;
  col: string;
  value: string;
  type: string;
}

export function SpreadsheetData() {
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isFilling, setIsFilling] = useState(false);
  const [filledCells, setFilledCells] = useState<FilledCell[]>([]);
  const [currentCell, setCurrentCell] = useState<{ row: number; col: string } | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  // Type out the prompt
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < PROMPT.length) {
        setTypedText(PROMPT.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
        setTimeout(() => {
          setIsFilling(true);
        }, 500);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Fill cells progressively
  useEffect(() => {
    if (!isFilling) return;

    let cellIndex = 0;

    const interval = setInterval(() => {
      if (cellIndex < CELL_DATA.length) {
        const cell = CELL_DATA[cellIndex];
        setFilledCells((prev) => [...prev, cell]);
        setCurrentCell({ row: cell.row, col: cell.col });

        // Move to next cell
        cellIndex++;

        // Check completion
        if (cellIndex >= CELL_DATA.length) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            setCurrentCell(null);
          }, 500);
        }
      }
    }, 80);

    return () => clearInterval(interval);
  }, [isFilling]);

  // Get cell value
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
    <AnimationContainer
      title="Spreadsheet"
      description="AI agent creates spreadsheets, fills data, and performs Excel-like calculations"
    >
      <div className="relative w-full h-full p-8 flex items-center justify-between gap-8">
        {/* Left Side - User Typing Prompt */}
        <motion.div
        className="flex-1 flex flex-col items-center justify-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* User Avatar */}
        <motion.div
          className="mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border-2 border-slate-600 flex items-center justify-center shadow-lg">
            <User className="w-8 h-8 text-slate-300" />
          </div>
        </motion.div>

        {/* Prompt Input Box */}
        <div className="w-full max-w-lg">
          <div className="relative bg-slate-900/80 border-2 border-slate-700 rounded-2xl p-6 shadow-xl">
            {/* Prompt Label */}
            <motion.div
              className="absolute -top-3 left-4 px-3 py-1 bg-slate-800 border border-slate-600 rounded-full text-xs text-slate-400"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              Your Prompt
            </motion.div>

            {/* Typed Text */}
            <div className="min-h-[80px] text-slate-200 text-base leading-relaxed">
              {typedText}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-0.5 h-5 bg-emerald-400 ml-1 align-middle"
              />
            </div>

            {/* Send Button */}
            <motion.div
              className="absolute -right-4 -bottom-4"
              initial={{ scale: 0 }}
              animate={isTyping ? {} : { scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-lg">
                <Send className="w-5 h-5 text-white" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Typing Status */}
        <motion.div
          className="mt-4 text-sm text-slate-500"
          animate={{ opacity: isTyping ? 1 : 0 }}
        >
          {isTyping ? "Typing..." : "Prompt sent!"}
        </motion.div>
      </motion.div>

      {/* Right Side - Excel-like Spreadsheet */}
      <motion.div
        className="flex-1 flex flex-col items-center justify-center"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: isFilling ? 1 : 0.4, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Spreadsheet view (always visible) */}
        <div className="w-full max-w-[360px]">
          {/* Spreadsheet header */}
          <motion.div
            className={`mb-4 flex items-center gap-3 px-4 py-3 border rounded-xl ${
              isComplete
                ? "bg-gradient-to-r from-emerald-600 to-green-600 border-emerald-400 shadow-lg shadow-emerald-500/30"
                : "bg-slate-900/90 border-slate-700"
            }`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <FileSpreadsheet className={`w-5 h-5 ${isComplete ? "text-white" : "text-emerald-400"}`} />
            <span className={`text-sm font-medium ${isComplete ? "text-white" : "text-slate-200"}`}>
              Sales Report.xlsx
              {isComplete && ` Complete! ${filledCells.length} cells`}
            </span>
            <motion.div
              className="ml-auto flex items-center gap-1.5 text-xs"
              animate={isComplete ? {} : { opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <BotAvatar role={AGENT_ROLE} color={AGENT_COLOR} size="xs" />
              <span className={isComplete ? "text-emerald-100" : "text-emerald-400"}>
                {isComplete ? "Done!" : "Agent filling..."}
              </span>
            </motion.div>
          </motion.div>

          {/* Spreadsheet grid */}
          <div className="bg-slate-900/90 border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
            {/* Formula bar */}
            <div className="flex items-center gap-2 px-2 py-1.5 bg-slate-800 border-b border-slate-700">
              <Sigma className="w-3 h-3 text-slate-500" />
              <div className="flex-1 px-2 py-0.5 bg-slate-900 rounded text-[10px] text-slate-400 font-mono">
                {currentCell ? `${currentCell.col}${currentCell.row}` : isComplete ? "All cells filled" : "Select a cell"}
              </div>
            </div>

            {/* Grid */}
            <div className="overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-800">
                    <th className="w-8 h-6 bg-slate-800 border border-slate-700 text-[10px] text-slate-500 font-normal"></th>
                    {COLUMNS.map((col) => (
                      <th
                        key={col}
                        className="min-w-[50px] h-6 bg-slate-800 border border-slate-700 text-[10px] text-slate-400 font-normal"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row) => (
                    <tr key={row}>
                      <td className="w-8 h-7 bg-slate-800 border border-slate-700 text-[10px] text-slate-500 text-center">
                        {row}
                      </td>
                      {COLUMNS.map((col) => {
                        const value = getCellValue(row, col);
                        const type = getCellType(row, col);
                        const isCurrent = isCurrentCell(row, col);

                        return (
                          <td
                            key={col}
                            className={`min-w-[50px] h-7 border border-slate-700 text-[10px] relative p-0.5 ${
                              type === "header" ? "bg-slate-800/50" : "bg-slate-900/50"
                            }`}
                          >
                            {/* Cell value */}
                            {value && (
                              <motion.span
                                key={`value-${row}-${col}`}
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className={`block ${
                                  type === "header"
                                    ? "text-slate-300 font-semibold"
                                    : type === "total"
                                    ? "text-emerald-400 font-bold"
                                    : type === "formula"
                                    ? "text-blue-400 font-mono"
                                    : type === "label"
                                    ? "text-slate-400"
                                    : "text-slate-300"
                                }`}
                              >
                                {value}
                              </motion.span>
                            )}

                            {/* Current cell indicator */}
                            {isCurrent && (
                              <motion.div
                                key={`current-${row}-${col}`}
                                className="absolute inset-0 bg-emerald-500/20 border-2 border-emerald-500 rounded-sm"
                                initial={{ opacity: 0 }}
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
            <div className="flex items-center justify-between px-2 py-1 bg-slate-800 border-t border-slate-700 text-[10px] text-slate-500">
              <span>{filledCells.length} / {CELL_DATA.length} cells filled</span>
              <span className={isComplete ? "text-emerald-400 font-medium" : ""}>{isComplete ? "Complete!" : "Ready"}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
    </AnimationContainer>
  );
}

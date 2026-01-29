"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import type { DemoConfig, Category } from "@/lib/demo-data";
import { DemoCard } from "./DemoCard";
import { categoryInfo } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

interface DemoGridProps {
  demos: DemoConfig[];
  categoryFilter?: string | "all";
  onDemoClick?: (demo: DemoConfig) => void;
  className?: string;
}

const categories: Array<Category | "all"> = ["all", "development", "research", "operations", "content"];

export function DemoGrid({ demos, categoryFilter = "all", onDemoClick, className }: DemoGridProps) {
  const [filter, setFilter] = useState<string>(categoryFilter);

  const filteredDemos = useMemo(() => {
    if (filter === "all") return demos;
    return demos.filter((demo) => demo.category === filter);
  }, [demos, filter]);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isActive = filter === category;
          const info = category === "all" ? { label: "All Demos", description: "Browse all demonstrations" } : categoryInfo[category];

          return (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium border transition-all",
                "hover:scale-105 active:scale-95",
                isActive
                  ? "bg-slate-100 text-slate-900 border-slate-300 shadow-lg"
                  : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:border-slate-600"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {info.label}
            </motion.button>
          );
        })}
      </div>

      {/* Category description */}
      {filter !== "all" && (
        <motion.p
          key={filter}
          className="text-sm text-slate-400"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {categoryInfo[filter as Category].description}
        </motion.p>
      )}

      {/* Demo Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        layout
      >
        {filteredDemos.map((demo, index) => (
          <motion.div
            key={demo.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              duration: 0.3,
              delay: index * 0.05,
            }}
          >
            <DemoCard
              demo={demo}
              onPlay={() => onDemoClick?.(demo)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Empty state */}
      {filteredDemos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400">No demos found for this category.</p>
        </div>
      )}

      {/* Demo count */}
      <div className="text-sm text-slate-500">
        Showing {filteredDemos.length} demo{filteredDemos.length !== 1 ? "s" : ""}
      </div>
    </div>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { DemoConfig } from "@/lib/demo-data";
import { iconMap } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

interface HeroCarouselProps {
  demos: DemoConfig[];
  autoPlayInterval?: number;
  onDemoClick?: (demo: DemoConfig) => void;
  className?: string;
}

export function HeroCarousel({ demos, autoPlayInterval = 5000, onDemoClick, className }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const currentDemo = demos[currentIndex];

  // Auto-play with pause on hover
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % demos.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [demos.length, autoPlayInterval]);

  const goToPrevious = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + demos.length) % demos.length);
  }, [demos.length]);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % demos.length);
  }, [demos.length]);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
  };

  if (!currentDemo) return null;

  const Icon = iconMap[currentDemo.iconName];

  return (
    <div className={cn("relative", className)}>
      {/* Main Carousel */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentDemo.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
            }}
            className="relative"
          >
            {/* Hero Content */}
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
              {/* Left: Narrative */}
              <div className="space-y-6 flex flex-col justify-center">
                {/* Badge */}
                <motion.span
                  className="inline-flex w-fit px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Featured Demo
                </motion.span>

                {/* Title */}
                <motion.h1
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {currentDemo.title}
                </motion.h1>

                {/* Narrative */}
                <motion.p
                  className="text-lg text-slate-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {currentDemo.narrative}
                </motion.p>

                {/* Stats */}
                <motion.div
                  className="flex flex-wrap gap-4 text-sm text-slate-400"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded bg-slate-700/50">{currentDemo.agentCount} Agents</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded bg-slate-700/50 capitalize">{currentDemo.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded bg-slate-700/50 capitalize">{currentDemo.animationType}</span>
                  </div>
                </motion.div>

                {/* Play Button */}
                <motion.button
                  onClick={() => onDemoClick?.(currentDemo)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors w-fit"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-5 h-5 fill-white" />
                  Watch Demo
                </motion.button>
              </div>

              {/* Right: Visual Preview */}
              <div className="relative flex items-center justify-center min-h-[300px]">
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-teal-500/10 rounded-2xl"
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ backgroundSize: "200% 200%" }}
                />

                {/* Icon */}
                <motion.div
                  className="relative w-48 h-48 rounded-full bg-slate-800 border-4 border-slate-600 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  whileHover={{ rotate: 5, scale: 1.05 }}
                >
                  <Icon className="w-24 h-24 text-slate-300" />

                  {/* Orbiting dots */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 rounded-full bg-blue-400"
                      style={{
                        top: "50%",
                        left: "50%",
                        marginLeft: -6,
                        marginTop: -6,
                      }}
                      animate={{
                        x: [0, Math.cos((i / 8) * Math.PI * 2) * 100],
                        y: [0, Math.sin((i / 8) * Math.PI * 2) * 100],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "linear",
                      }}
                      suppressHydrationWarning
                    />
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors backdrop-blur-sm"
          aria-label="Previous demo"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors backdrop-blur-sm"
          aria-label="Next demo"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {demos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === currentIndex
                ? "w-8 bg-blue-500"
                : "bg-slate-600 hover:bg-slate-500"
            )}
            aria-label={`Go to demo ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

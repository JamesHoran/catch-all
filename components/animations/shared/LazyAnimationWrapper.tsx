"use client";

import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { useState, useEffect, useRef, createContext, useContext } from "react";
import { cn } from "@/lib/utils";

const FullScreenContext = createContext(false);

export const useFullScreen = () => useContext(FullScreenContext);

export function FullScreenProvider({ children, value = true }: { children: React.ReactNode; value?: boolean }) {
  return <FullScreenContext.Provider value={value}>{children}</FullScreenContext.Provider>;
}

interface LazyAnimationWrapperProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  className?: string;
  pauseButton?: boolean;
  placeholder?: React.ReactNode;
}

export function LazyAnimationWrapper({
  children,
  threshold = 0.1,
  rootMargin = "0px",
  triggerOnce = true,
  className,
  pauseButton = true,
  placeholder,
}: LazyAnimationWrapperProps) {
  const [ref, inView] = useInView({
    threshold,
    rootMargin,
    triggerOnce,
  });

  const [isPaused, setIsPaused] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const controls = useAnimation();
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (inView && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      // Defer setState to avoid synchronous setState in effect
      const timeoutId = setTimeout(() => {
        setHasPlayed(true);
        controls.start("visible");
      }, 0);
      return () => clearTimeout(timeoutId);
    } else if (!inView && !triggerOnce) {
      controls.start("hidden");
    }
  }, [inView, triggerOnce, controls]);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div ref={ref} className={cn("relative", className)}>
      {inView || hasPlayed ? (
        <>
          <motion.div
            initial="hidden"
            animate={isPaused ? "paused" : controls}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
              paused: { opacity: 1 },
            }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>

          {pauseButton && (
            <button
              onClick={togglePause}
              className="absolute top-2 right-2 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700/80 text-white backdrop-blur-sm transition-colors"
              aria-label={isPaused ? "Play animation" : "Pause animation"}
            >
              {isPaused ? (
                <Play className="w-4 h-4" fill="currentColor" />
              ) : (
                <Pause className="w-4 h-4" />
              )}
            </button>
          )}
        </>
      ) : (
        <div className="aspect-video bg-slate-800/50 rounded-lg flex items-center justify-center">
          {placeholder || (
            <div className="text-slate-500 text-sm">Scroll to play</div>
          )}
        </div>
      )}
    </div>
  );
}

interface AnimationContainerProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  aspectRatio?: "video" | "square" | "portrait" | "full";
  fullScreen?: boolean;
}

export function AnimationContainer({
  children,
  title,
  description,
  className,
  aspectRatio = "video",
  fullScreen: propsFullScreen,
}: AnimationContainerProps) {
  const contextFullScreen = useFullScreen();
  const fullScreen = propsFullScreen ?? contextFullScreen;

  const aspectClasses = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    full: "h-full min-h-[500px]",
  };

  return (
    <div className={cn("space-y-2 h-full flex flex-col", className)}>
      {(title || description) && !fullScreen && (
        <div className="space-y-1 shrink-0">
          {title && (
            <h3 className="text-sm font-medium text-slate-200">{title}</h3>
          )}
          {description && (
            <p className="text-xs text-slate-400">{description}</p>
          )}
        </div>
      )}

      <div
        className={cn(
          "flex-1 w-full rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 overflow-auto",
          aspectClasses[fullScreen ? "full" : aspectRatio]
        )}
      >
        <LazyAnimationWrapper triggerOnce={!fullScreen}>{children}</LazyAnimationWrapper>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

export type MessageRole = "user" | "agent" | "system";

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  agentId?: number;
  timestamp?: number;
}

interface ChatBubbleProps {
  message: Message;
  delay?: number;
  className?: string;
  showAvatar?: boolean;
  maxWidth?: string;
}

const roleConfig: Record<MessageRole, { bg: string; text: string; icon: typeof Bot | typeof User }> = {
  user: { bg: "bg-blue-600", text: "text-white", icon: User },
  agent: { bg: "bg-slate-700", text: "text-slate-100", icon: Bot },
  system: { bg: "bg-slate-800", text: "text-slate-400", icon: Bot },
};

const agentColors = [
  "border-blue-500",
  "border-violet-500",
  "border-pink-500",
  "border-orange-500",
  "border-teal-500",
  "border-lime-500",
  "border-cyan-500",
  "border-rose-500",
];

export function ChatBubble({
  message,
  delay = 0,
  className,
  showAvatar = true,
  maxWidth = "400px",
}: ChatBubbleProps) {
  const config = roleConfig[message.role];
  const Icon = config.icon;
  const agentBorder = message.agentId ? agentColors[(message.agentId - 1) % agentColors.length] : "";

  return (
    <motion.div
      className={cn(
        "flex gap-3",
        message.role === "user" ? "flex-row-reverse" : "flex-row",
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      {/* Avatar */}
      {showAvatar && (
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2",
            config.bg,
            agentBorder,
            message.role === "agent" && "bg-slate-800"
          )}
        >
          <Icon className="w-4 h-4" />
        </div>
      )}

      {/* Message bubble */}
      <div
        className={cn(
          "rounded-2xl px-4 py-2",
          config.bg,
          message.role === "user" ? "rounded-tr-sm" : "rounded-tl-sm",
          message.role === "agent" && "border-2 border-slate-600"
        )}
        style={{ maxWidth }}
      >
        {/* Agent label for agent messages */}
        {message.role === "agent" && message.agentId && (
          <span className="text-xs text-slate-400 font-medium mb-1 block">
            Agent {message.agentId}
          </span>
        )}

        {/* Message content */}
        <p className={cn("text-sm", config.text)}>{message.content}</p>
      </div>
    </motion.div>
  );
}

interface ChatFlowProps {
  messages: Message[];
  className?: string;
  speed?: number; // milliseconds between messages
}

export function ChatFlow({ messages, className, speed = 800 }: ChatFlowProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {messages.map((message, index) => (
        <ChatBubble
          key={message.id}
          message={message}
          delay={index * (speed / 1000)}
        />
      ))}
    </div>
  );
}

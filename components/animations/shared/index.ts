// Shared animation components

export { AgentNode } from "./AgentNode";
export type { AgentStatus, AgentRole } from "./AgentNode";

export { WorkingAgent } from "./WorkingAgent";
export type { AgentRole as WorkingAgentRole, AgentStatus as WorkingAgentStatus } from "./WorkingAgent";

export { WorkArtifact } from "./WorkArtifact";
export type { ArtifactType } from "./WorkArtifact";

export { CodeBlock } from "./CodeBlock";

export { ProgressBar } from "./ProgressBar";

export { ChatBubble } from "./ChatBubble";

export { BotAvatar, roleBotConfigs } from "./BotAvatar";

export { LazyAnimationWrapper, AnimationContainer, FullScreenProvider, useFullScreen } from "./LazyAnimationWrapper";

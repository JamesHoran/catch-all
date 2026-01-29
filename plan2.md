# AI Swarm Demo Animation Plan - Homepage Implementation

## Overview
Create an interactive landing page showcasing 16 animated demos representing AI Swarm use cases. Each demo will be a self-contained, performant animation using modern web technologies.

---

## Phase 1: Technical Foundation

### 1.1 Animation Technology Stack
**Primary Choice: Framer Motion + React**
- Built-in React hooks and components
- Gesture support (hover, tap, drag)
- Scroll-triggered animations
- SVG path animations for code diffs
- Timeline-based sequencing
- Zero dependencies on external animation files

**Secondary: CSS Keyframes + Tailwind**
- Simple looping animations (spinners, pulses)
- Particle effects
- Gradient animations
- Performance: GPU-accelerated transforms

**Avoid (for now):**
- Lottie JSON files (requires external tools to create)
- Video files (heavy, not interactive)
- GIFs (poor quality, large file size)

### 1.2 New Dependencies to Add
```json
{
  "dependencies": {
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.400.0",      // Icons
    "@react-three/fiber": "^8.0.0",  // Optional: 3D visualizations
    "@react-three/drei": "^9.0.0"    // Optional: 3D helpers
  }
}
```

---

## Phase 2: Homepage Architecture

### 2.1 Hero Section Layout
```
┌─────────────────────────────────────────────────────────┐
│                    AI SWARM                             │
│              Watch AI Agents Collaborate                │
│                                                          │
│  [CAROUSEL: 3 featured demos auto-rotating]            │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Active Demo Preview (Large)                    │   │
│  │  - Full animation playing                        │   │
│  │  - Narrative text overlay                        │   │
│  │  - "See All Demos" button                        │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### 2.2 Demo Grid Section
```
┌─────────────────────────────────────────────────────────┐
│                     All Demos                           │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐     │
│  │ 1  │ │ 2  │ │ 3  │ │ 4  │ │ 5  │ │ 6  │ │ 7  │ ... │
│  │    │ │    │ │    │ │    │ │    │ │    │ │    │     │
│  └────┘ └────┘ └────┘ └────┘ └────┘ └────┘ └────┘     │
│                                                          │
│  [Filters by Category]                                  │
│  □ Development □ Research □ Operations □ Content        │
└─────────────────────────────────────────────────────────┘
```

### 2.3 File Structure
```
app/
├── page.tsx                    # Homepage with hero + grid
├── layout.tsx                  # Root layout
├── globals.css                 # Global styles
components/
├── demos/
│   ├── DemoCard.tsx            # Individual demo card
│   ├── DemoGrid.tsx            # Grid of all demos
│   ├── HeroCarousel.tsx        # Hero section carousel
│   └── types.ts                # Demo data types
├── animations/
│   ├── shared/
│   │   ├── AgentNode.tsx       # Reusable agent visual
│   │   ├── CodeBlock.tsx       # Animated code display
│   │   ├── ProgressBar.tsx     # Animated progress
│   │   ├── ParticleField.tsx   # Background particles
│   │   └── ChatBubble.tsx      # Agent communication
│   ├── use-cases/
│   │   ├── MV PBuilder.tsx     # Demo 1
│   │   ├── ResearchEngine.tsx  # Demo 2
│   │   ├── BugHunt.tsx         # Demo 3
│   │   ├── DataPipeline.tsx    # Demo 4
│   │   ├── Migration.tsx       # Demo 5
│   │   ├── CompetitiveIntel.tsx# Demo 6
│   │   ├── ContentMachine.tsx  # Demo 7
│   │   ├── SupportSwarm.tsx    # Demo 8
│   │   ├── DevOpsTeam.tsx      # Demo 9
│   │   ├── LearningAccelerator.tsx # Demo 10
│   │   ├── DeepResearch.tsx    # Demo 11
│   │   ├── LiteratureReview.tsx # Demo 12
│   │   ├── MarketIntel.tsx     # Demo 13
│   │   ├── TechDocs.tsx        # Demo 14
│   │   ├── DueDiligence.tsx    # Demo 15
│   │   └── SwarmVisualizer.tsx # Demo 16 (Meta)
lib/
└── demo-data.ts                # Array of all demo configs
```

---

## Phase 3: Shared Animation Components

### 3.1 AgentNode Component
Visual representation of an AI agent:
- Circular node with icon/avatar
- Animated border glow when active
- Connection lines to other agents
- Activity state (idle, working, complete)

### 3.2 CodeBlock Component
Animated code editor:
- Syntax highlighted text
- Typing animation effect
- Line highlighting for changes
- Git diff styling (+/- indicators)

### 3.3 ProgressBar Component
Multi-stage progress indicator:
- Agent-specific progress bars
- Overall completion percentage
- Smooth fill animations
- Success checkmarks

### 3.4 ParticleField Component
Data transfer visualization:
- Particles flowing between agents
- Color-coded by data type
- Trails and glow effects
- Mouse interaction

---

## Phase 4: Demo Implementation Specifications

### Category 1: Development (Demos 1, 3, 5, 9)

#### Demo 1: 10-Minute MVP Builder
**Layout:** Split-screen (6 panels)
**Animation Sequence:**
1. Fade in all 6 panels
2. Sequential activation: Agent 1→6
3. Code typing animation in panels
4. Progress bars fill simultaneously
5. Success checkmarks cascade
6. Final: App preview appears

**Motion:**
- `staggerChildren` for sequential panel activation
- `layout` prop for smooth resizing
- `AnimatePresence` for panel transitions

#### Demo 3: Bug Hunt Squad
**Layout:** Radar/sonar interface (circular)
**Animation Sequence:**
1. Radar sweep animation (rotating line)
2. Red dots appear when bugs found
3. Agent nodes activate around perimeter
4. Lines connect to bugs
5. Red dots turn green (fixed)
6. Counter: "17 bugs found, 17 fixed"

**Motion:**
- `rotate` for radar sweep
- `scale` for bug discovery pop effect
- `strokeDashoffset` for radar ring

#### Demo 5: Migration Masters
**Layout:** Before/After code panels
**Animation Sequence:**
1. Old code fades in (left side)
2. Scanning effect moves across
3. Code transforms character by character
4. New code appears (right side)
5. Success indicators

**Motion:**
- `x` position for scanning line
- Text character-by-character reveal
- Background color transition (red→green)

#### Demo 9: DevOps Dream Team
**Layout:** Blueprint/layered architecture
**Animation Sequence:**
1. Base layer appears (infrastructure)
2. Each layer stacks with depth
3. Connection lines draw between layers
4. Status indicators turn green
5. Final: "Production Ready" badge

**Motion:**
- `zIndex` with 3D transforms
- `pathLength` for connection drawing
- `scale` with spring physics

---

### Category 2: Research (Demos 2, 11, 12, 13, 15)

#### Demo 2: Research Synthesis Engine
**Layout:** Mind map (central node, branching outward)
**Animation Sequence:**
1. Center node appears ("Research Topic")
2. Branches grow outward (tree animation)
3. Leaf nodes populate with source icons
4. Dots flow back to center (data collection)
5. Summary document compiles at bottom

**Motion:**
- `pathLength` for branch growth
- `scale` for node appearance
- Particles for data flow

#### Demo 11: Deep Research Agent
**Layout:** Expanding research tree
**Animation Sequence:**
1. Seed node at center
2. Branches grow in 8 directions (each agent)
3. Sources appear at branch tips (icons per source type)
4. Cross-reference lines appear between connected findings
5. Confidence score builds up

**Motion:**
- Branch growth with stagger
- Pulsing nodes for active research
- Drawing lines for cross-references

#### Demo 12: Literature Review Pro
**Layout:** Citation network graph
**Animation Sequence:**
1. Papers appear as nodes (size = citation count)
2. Citation lines draw between papers
3. Color coding: Seminal (blue), Recent (green)
4. Network highlights: "15 key papers"
5. Edges fade, key papers remain

**Motion:**
- Force-directed layout (spring physics)
- Node size animation
- Edge opacity transitions

#### Demo 13: Market Intelligence Gatherer
**Layout:** Dashboard assembling
**Animation Sequence:**
1. Grid lines draw (chart skeleton)
2. Data bars grow (market size)
3. Competitor logos appear
4. Price points populate
5. SWOT quadrants fill

**Motion:**
- Bar growth with spring
- Staggered element appearance
- Counter animation for numbers

#### Demo 15: Due Diligence Team
**Layout:** Scorecard filling
**Animation Sequence:**
1. Empty scorecard appears
2. Each row fills sequentially (8 rows)
3. Scores calculate with counter animation
4. Risk meter animates to level
5. Final recommendation appears

**Motion:**
- Height animation for row fill
- Counter tween for numbers
- Gauge needle rotation

---

### Category 3: Operations & Support (Demos 4, 6, 8, 14)

#### Demo 4: Data Pipeline Factory
**Layout:** Flowchart left-to-right
**Animation Sequence:**
1. Source nodes appear (APIs, DB, CSV)
2. Pipeline segments draw sequentially
3. Data packets flow through
4. Transformation nodes animate
5. Dashboard charts populate

**Motion:**
- Path drawing for pipeline
- Moving circles for data packets
- Bar chart growth

#### Demo 6: Competitive Intelligence Unit
**Layout:** Grid of browser windows
**Animation Sequence:**
1. 8 window frames appear
2. Content loads in each (placeholder UI)
3. Agents highlight elements
4. Data points extract and float to summary
5. Report compiles

**Motion:**
- Window stagger with spring
- Highlight box movements
- Floating elements to summary

#### Demo 8: Customer Support Swarm
**Layout:** Flow diagram (tiered levels)
**Animation Sequence:**
1. Customer message appears (top)
2. Routes through L0 → L1 → L2 → L3
3. Each level shows resolution rate
4. Knowledge base updates at bottom
5. Satisfaction score appears

**Motion:**
- Message token traveling down
- Progress bars per level
- Confetti on resolution

#### Demo 14: Technical Documentation Writer
**Layout:** Documentation site building
**Animation Sequence:**
1. Codebase tree appears (left)
2. Documentation tree grows (right)
3. Lines connect code to docs
4. Preview panel shows generated docs
5. "Deploy" button triggers success

**Motion:**
- Tree expansion animation
- Connection line drawing
- Fade in documentation preview

---

### Category 4: Content & Learning (Demos 7, 10)

#### Demo 7: Content Marketing Machine
**Layout:** Assembly line (horizontal)
**Animation Sequence:**
1. Raw topic enters (left)
2. Each station processes (7 stations)
3. Content transforms at each step
4. Published content exits right
5. Metrics chart updates

**Motion:**
- Content moving along conveyor
- Station activation (highlight/glow)
- Quality gate checks ✓

#### Demo 10: Learning Accelerator
**Layout:** Tree growing upward
**Animation Sequence:**
1. Skill assessment (base)
2. Knowledge gaps highlight (red)
3. Resources appear (book icons)
4. Progress bars fill
5. Tree grows with each completed module
6. Mastery badge appears

**Motion:**
- Tree growth from bottom
- Branch extension per module
- Leaf appearance (completed)

---

### Demo 16: Swarm Visualizer (Meta)
**Layout:** Network graph + real-time task preview
**Animation Sequence:**
1. Orchestrator node appears (center)
2. Agent nodes spawn around it
3. Task preview box shows actual work
4. Communication lines flash between agents
5. Task completes, success ripple

**Motion:**
- Network pulse from center
- Message tokens traveling edges
- Progress indicators per node

---

## Phase 5: Implementation Order

### Sprint 1: Foundation (Priority)
1. Install dependencies (framer-motion, lucide-react)
2. Create shared animation components
3. Build homepage layout with hero
4. Create DemoCard component
5. Set up demo-data.ts with all 16 configs

### Sprint 2: Simple Demos First
6. Demo 4 (Data Pipeline) - linear flow
7. Demo 7 (Content Machine) - assembly line
8. Demo 10 (Learning) - tree growth
9. Demo 8 (Support) - tiered flow

### Sprint 3: Medium Complexity
10. Demo 1 (MVP Builder) - split screen
11. Demo 3 (Bug Hunt) - radar interface
12. Demo 5 (Migration) - code transform
13. Demo 9 (DevOps) - layered blueprint
14. Demo 14 (Tech Docs) - two trees

### Sprint 4: Complex Network Graphs
15. Demo 2 (Research Engine) - mind map
16. Demo 11 (Deep Research) - 8-direction tree
17. Demo 12 (Literature Review) - citation graph
18. Demo 13 (Market Intel) - dashboard
19. Demo 15 (Due Diligence) - scorecard

### Sprint 5: Meta Demo & Polish
20. Demo 16 (Swarm Visualizer) - network + task preview
21. Responsive design mobile
22. Dark mode support
23. Performance optimization
24. Accessibility (reduced motion, ARIA)

---

## Phase 6: Component Specifications

### Demo Data Structure
```typescript
// lib/demo-data.ts
export interface DemoConfig {
  id: string;
  title: string;
  narrative: string;
  category: 'development' | 'research' | 'operations' | 'content';
  agentCount: number;
  component: React.ComponentType;
  featured: boolean; // For hero carousel
}

export const demos: DemoConfig[] = [
  {
    id: 'mvp-builder',
    title: 'The 10-Minute MVP Builder',
    narrative: 'Watch as 6 AI agents collaborate to build a full-stack app in 10 minutes',
    category: 'development',
    agentCount: 6,
    component: MVPBuilder,
    featured: true,
  },
  // ... 15 more
];
```

### DemoCard Component Interface
```typescript
interface DemoCardProps {
  demo: DemoConfig;
  onPlay?: () => void;
  size?: 'small' | 'medium' | 'large';
}
```

### HeroCarousel Component Interface
```typescript
interface HeroCarouselProps {
  demos: DemoConfig[]; // Only featured demos
  autoPlayInterval?: number; // Default 5000ms
}
```

---

## Phase 7: Styling Guidelines

### Color Palette (Tailwind)
```css
/* Agent Colors - One per agent for consistency */
--agent-1: #3b82f6; /* blue-500 */
--agent-2: #8b5cf6; /* violet-500 */
--agent-3: #ec4899; /* pink-500 */
--agent-4: #f97316; /* orange-500 */
--agent-5: #14b8a6; /* teal-500 */
--agent-6: #84cc16; /* lime-500 */
--agent-7: #06b6d4; /* cyan-500 */
--agent-8: #f43f5e; /* rose-500 */

/* Status Colors */
--success: #22c55e;
--warning: #eab308;
--error: #ef4444;
--info: #3b82f6;

/* Backgrounds */
--bg-primary: #0f172a;    /* slate-900 */
--bg-secondary: #1e293b;  /* slate-800 */
--bg-card: #334155;       /* slate-700 */
```

### Animation Timing
- Quick interactions: 150-300ms
- Standard transitions: 400-500ms
- Complex sequences: 800-1200ms
- Full demo loop: 3000-5000ms

---

## Phase 8: Performance Considerations

### Optimization Strategies
1. **Lazy Loading**
   - Use `next/dynamic` for demo components
   - Load demos on viewport intersection
   - Preload featured demos only

2. **Animation Performance**
   - Use `transform` and `opacity` (GPU accelerated)
   - Avoid animating `height`, `width` (use `layout` prop)
   - `will-change` sparingly
   - Pause off-screen animations

3. **Bundle Size**
   - Code-split each demo
   - Tree-shake unused icons
   - Consider `framer-motion lite` variants

4. **Accessibility**
   - `prefers-reduced-motion` media query
   - Pause button on all demos
   - ARIA labels for screen readers

---

## Phase 9: Quality Gates

After each Sprint, verify:
1. **Type Check**: `pnpm build` (Next.js typechecks)
2. **Lint**: `pnpm lint` (ESLint)
3. **Visual**: All animations smooth (60fps)
4. **Responsive**: Mobile, tablet, desktop
5. **Accessibility**: Keyboard navigation works

---

## Phase 10: Success Metrics

- [ ] All 16 demos implemented and functional
- [ ] Homepage loads in < 2 seconds
- [ ] Animations maintain 60fps on mid-range devices
- [ ] Mobile fully responsive
- [ ] Dark mode toggle works
- [ ] Reduced motion preference respected
- [ ] Bundle size < 500KB (gzipped)

---

## Next Steps

1. **Approve this plan** - Confirm approach and priorities
2. **Sprint 1 execution** - Set up foundation
3. **Iterative development** - Build demos by complexity
4. **Testing & polish** - Performance and accessibility
5. **Launch** - Deploy homepage with all demos
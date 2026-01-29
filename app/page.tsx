"use client";

import { useState } from "react";
import { HeroCarousel } from "@/components/demos/HeroCarousel";
import { DemoGrid } from "@/components/demos/DemoGrid";
import { DemoModal } from "@/components/demos/DemoModal";
import { TabDemo } from "@/components/demos/TabDemo";
import { demos, featuredDemos } from "@/lib/demo-data";
import type { DemoConfig } from "@/lib/demo-data";

export default function Home() {
  const [selectedDemo, setSelectedDemo] = useState<DemoConfig | null>(null);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <h1 className="text-xl font-bold text-white">AI Swarm</h1>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#demos" className="text-sm text-slate-300 hover:text-white transition-colors">
              Demos
            </a>
            <a href="#" className="text-sm text-slate-300 hover:text-white transition-colors">
              About
            </a>
            <a href="#" className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
              Get Started
            </a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 space-y-16">
        {/* Tabbed Hero Section */}
        <section className="space-y-6">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              One Prompt,{" "}
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-teal-400 bg-clip-text text-transparent">
                Infinite Possibilities
              </span>
            </h2>
            <p className="text-lg text-slate-400">
              Explore different AI swarm demos. Switch tabs to see how specialized agents collaborate across various use cases.
            </p>
          </div>

          <TabDemo defaultDemoId="swarm-launcher" />
        </section>

        {/* Original Hero Section */}
        <section className="space-y-6">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Watch AI Agents{" "}
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-teal-400 bg-clip-text text-transparent">
                Collaborate
              </span>
            </h2>
            <p className="text-lg text-slate-400">
              Experience the power of multi-agent AI systems. See how specialized agents work together to build, research, and solve complex problems.
            </p>
          </div>

          <HeroCarousel demos={featuredDemos} onDemoClick={setSelectedDemo} />
        </section>

        {/* Demo Grid Section */}
        <section id="demos" className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              All Demos
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Explore 16 different use cases where AI swarms demonstrate their collaborative power across development, research, operations, and content creation.
            </p>
          </div>

          <DemoGrid demos={demos} onDemoClick={setSelectedDemo} />
        </section>

        {/* CTA Section */}
        <section className="py-16 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 text-center space-y-6">
          <h2 className="text-3xl font-bold text-white">
            Ready to Build Your AI Swarm?
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Start building multi-agent systems today. Create powerful AI teams that collaborate to solve your toughest challenges.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="#"
              className="px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
            >
              Get Started
            </a>
            <a
              href="#"
              className="px-6 py-3 rounded-full border border-slate-600 text-white font-medium hover:bg-slate-800 transition-colors"
            >
              Learn More
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500">
          <p>© 2025 AI Swarm. Watch AI agents collaborate in real-time.</p>
        </div>
      </footer>

      {/* Demo Modal */}
      <DemoModal demo={selectedDemo} onClose={() => setSelectedDemo(null)} />
    </div>
  );
}

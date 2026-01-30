"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Check, Zap, Users, Code, Shield, BarChart3, Mail, FileText, Database, Lock, Building2, Plus, Star, Quote, Building } from "lucide-react";
import { SwarmLauncher } from "@/components/animations/use-cases/SwarmLauncher";
import { SpreadsheetData } from "@/components/animations/use-cases/SpreadsheetData";
import { ExcelAtScale } from "@/components/animations/use-cases/ExcelAtScale";

interface UseCase {
  icon: string;
  title: string;
  desc: string;
  popular?: boolean;
}

const useCases = [
  { icon: "📱", title: "Social Media", desc: "Automate posting and engagement", popular: true },
  { icon: "📧", title: "Email Automation", desc: "Handle outreach and responses", popular: false },
  { icon: "📊", title: "Stock Tracking", desc: "Monitor correlations and trends", popular: false },
  { icon: "📄", title: "Insurance Forms", desc: "Auto-fill applications", popular: false },
  { icon: "📑", title: "Excel Files", desc: "Process and analyze data", popular: true },
  { icon: "🔒", title: "Pen Testing", desc: "Automated security scans", popular: false },
  { icon: "🎯", title: "CRM Automation", desc: "Update records and outreach", popular: false },
  { icon: "⚡", title: "Custom Ninja", desc: "Build anything you need", popular: false },
];

const benefits = [
  {
    title: "Excel at Scale",
    desc: "Process 9 spreadsheets in parallel. Watch one AI agent multiply to handle entire workflows instantly.",
    icon: Code,
    demo: "excel",
  },
  {
    title: "Automate Without Code",
    desc: "Build powerful browser automations without writing a single line of code. Describe what you want in plain English and deploy in minutes.",
    icon: Shield,
    demo: "spreadsheet",
  },
  {
    title: "Scale Without Limits",
    desc: "Run from 1 to 10,000 agents simultaneously. Grow your operations infinitely without managing infrastructure or hiring.",
    icon: Zap,
    demo: "swarm",
  },
];

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  metric: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "LVL3.ai transformed our operations. We deployed 50 automations in the first week and saved over 200 hours per month.",
    author: "Sarah Chen",
    role: "VP of Operations, TechCorp",
    metric: "200+ hours saved/month",
  },
  {
    quote: "The AI agents adapt to website changes automatically. We've had zero broken scripts in 6 months, compared to constant issues with our previous automation tool.",
    author: "Michael Rodriguez",
    role: "CTO, DataFlow Inc",
    metric: "Zero maintenance required",
  },
  {
    quote: "We scaled from 100 to 10,000 concurrent automations without a single infrastructure change. LVL3.ai handles everything.",
    author: "Emily Watson",
    role: "Head of Engineering, ScaleUp",
    metric: "100x scale in 90 days",
  },
];

function CTAButton({ children, variant = "primary", className = "" }: { children: React.ReactNode; variant?: "primary" | "secondary"; className?: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
        variant === "primary"
          ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:shadow-lg hover:shadow-blue-500/30"
          : "border border-slate-600 text-white hover:bg-slate-800"
      } ${className}`}
    >
      {children}
    </motion.button>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
              <span className="text-white font-black text-xl">L3</span>
            </div>
            <span className="text-xl font-bold text-white">LVL3.AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#product" className="text-sm text-slate-400 hover:text-white transition-colors">Product</a>
            <a href="#use-cases" className="text-sm text-slate-400 hover:text-white transition-colors">Use Cases</a>
            <a href="#about" className="text-sm text-slate-400 hover:text-white transition-colors">About</a>
          </div>
          <a href="https://lvl3.ai" className="px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
            Start Free—No Credit Card
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center space-y-5">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              Automate at Scale
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-lg text-slate-400"
            >
              Build automations in minutes, not months. Scale to thousands of agents instantly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <CTAButton>
                Build Your First Ninja—Free
                <ArrowRight className="w-4 h-4" />
              </CTAButton>
              <CTAButton variant="secondary">
                <Play className="w-4 h-4" />
                See It Work
              </CTAButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="relative max-w-4xl mx-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-3xl blur-3xl" />
              <div className="relative rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm overflow-hidden">
                <SwarmLauncher />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-6 border-y border-slate-800/50 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Your Team Is Stuck on{" "}
              <span className="text-red-400">Autopilot</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="text-4xl font-black text-red-400 mb-2">87%</div>
                <div className="text-sm text-slate-400">burdened by repetitive tasks</div>
              </div>
              <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="text-4xl font-black text-orange-400 mb-2">20hrs</div>
                <div className="text-sm text-slate-400">lost per employee per week</div>
              </div>
              <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="text-4xl font-black text-yellow-400 mb-2">$60K</div>
                <div className="text-sm text-slate-400">annual cost per employee</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 px-6 border-b border-slate-800/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50">
              {["Acme Corp", "TechFlow", "DataSync", "CloudBase", "ScaleUp", "AutoMate"].map((company, i) => (
                <div key={i} className="text-xl font-bold text-slate-400">
                  {company}
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-12 pt-4">
              <div className="text-center">
                <div className="text-3xl font-black text-white">1M+</div>
                <div className="text-sm text-slate-500">Ninjas Deployed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-white">99.9%</div>
                <div className="text-sm text-slate-500">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-white">50+</div>
                <div className="text-sm text-slate-500">Countries</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section - NEW */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              What Our Customers Say
            </h2>
            <p className="text-lg text-slate-400">
              Trusted by operations teams worldwide to automate at scale
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 relative"
                >
                  <div className="absolute -top-3 -left-3">
                    <Quote className="w-6 h-6 text-blue-500 opacity-50" />
                  </div>
                  <p className="text-slate-300 mb-4 relative z-10 text-sm">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{testimonial.author.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div className="text-left">
                      <div className="text-white font-medium text-sm">{testimonial.author}</div>
                      <div className="text-slate-500 text-xs">{testimonial.metric}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Deploy a Proven Automation in Clicks
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="group p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer relative"
              >
                {useCase.popular && (
                  <div className="absolute -top-2 -right-2 px-2 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-medium flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    Popular
                  </div>
                )}
                <div className="text-4xl mb-3">{useCase.icon}</div>
                <h3 className="text-base font-semibold text-white">{useCase.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Three Ways LVL3.ai Saves You Time
            </h2>
          </motion.div>

          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`grid lg:grid-cols-2 gap-12 items-center mb-20 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {index % 2 === 0 ? (
                <>
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                      <benefit.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white">{benefit.title}</h3>
                    <p className="text-base text-slate-400">{benefit.desc}</p>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-2xl blur-2xl" />
                    <div className="relative rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden h-[400px]">
                      {benefit.demo === "excel" && <ExcelAtScale />}
                      {benefit.demo === "spreadsheet" && <SpreadsheetData />}
                      {benefit.demo === "swarm" && <SwarmLauncher />}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="relative order-2 lg:order-1">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-2xl blur-2xl" />
                    <div className="relative rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden h-[400px]">
                      {benefit.demo === "excel" && <ExcelAtScale />}
                      {benefit.demo === "spreadsheet" && <SpreadsheetData />}
                      {benefit.demo === "swarm" && <SwarmLauncher />}
                    </div>
                  </div>
                  <div className="space-y-4 order-1 lg:order-2">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                      <benefit.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white">{benefit.title}</h3>
                    <p className="text-base text-slate-400">{benefit.desc}</p>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section id="about" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Remove humans from{" "}
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                autopilot
              </span>
            </h2>
            <p className="text-lg text-slate-400">
              Intelligent agents handle the mundane. Humans focus on creativity and strategy.
            </p>
            <div className="flex flex-wrap justify-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-black text-white">10K+</div>
                <div className="text-sm text-slate-500">Ninjas Deployed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-white">99.9%</div>
                <div className="text-sm text-slate-500">Uptime SLA</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-white">24/7</div>
                <div className="text-sm text-slate-500">Always Working</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
            <div className="relative px-6 py-16 text-center">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Ready to Automate at Scale?
              </h2>
              <p className="text-lg text-blue-100 max-w-xl mx-auto mb-8">
                Join 10,000+ teams saving 20+ hours per week.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="px-8 py-3 rounded-full bg-white text-blue-600 font-bold hover:bg-blue-50 transition-colors">
                  Start Free
                </button>
                <button className="px-8 py-3 rounded-full border-2 border-white/30 text-white font-medium hover:bg-white/10 transition-colors">
                  Book a Demo
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                  <span className="text-white font-black text-xl">L3</span>
                </div>
                <span className="text-xl font-bold text-white">LVL3.AI</span>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Use Cases</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="https://lvl3.ai/docs" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">© 2025 LVL3.AI</p>
            <a href="mailto:contact@lvl3.ai" className="text-sm text-slate-400 hover:text-white transition-colors">
              contact@lvl3.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

import {
  Mail,
  FileText,
  CheckSquare,
  Search,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Zap,
  Shield,
  Clock,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    href: "/email",
    title: "Smart Email Generator",
    description: "Generate professional emails with customizable tone and audience targeting",
    icon: Mail,
    borderColor: "border-pastel-pink",
    bgColor: "bg-pastel-pink-light",
    iconColor: "text-pastel-pink",
  },
  {
    href: "/meeting",
    title: "Meeting Notes Summarizer",
    description: "Convert lengthy meeting notes into concise, actionable summaries",
    icon: FileText,
    borderColor: "border-pastel-teal",
    bgColor: "bg-pastel-teal-light",
    iconColor: "text-pastel-teal",
  },
  {
    href: "/tasks",
    title: "AI Task Planner",
    description: "Prioritize and schedule your tasks with AI-powered optimization",
    icon: CheckSquare,
    borderColor: "border-pastel-brown",
    bgColor: "bg-pastel-brown-light",
    iconColor: "text-pastel-brown",
  },
  {
    href: "/research",
    title: "Research Assistant",
    description: "Get key insights and summaries from complex topics instantly",
    icon: Search,
    borderColor: "border-pastel-orange",
    bgColor: "bg-pastel-orange-light",
    iconColor: "text-pastel-orange",
  },
  {
    href: "/chat",
    title: "AI Chatbot",
    description: "Interactive workplace assistant for all your questions and tasks",
    icon: MessageCircle,
    borderColor: "border-pastel-pink",
    bgColor: "bg-pastel-pink-light",
    iconColor: "text-pastel-pink",
  },
];

const stats = [
  { icon: Zap, label: "AI-Powered", value: "5 Tools", color: "text-pastel-orange" },
  { icon: Clock, label: "Time Saved", value: "Hours/Day", color: "text-pastel-teal" },
  { icon: Shield, label: "Responsible AI", value: "Built-in", color: "text-pastel-pink" },
];

export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={24} className="text-pastel-orange" />
          <span className="text-sm font-medium text-pastel-orange bg-pastel-orange-light px-3 py-1 rounded-full border border-pastel-orange">
            AI-Powered Workspace
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
          Welcome to <span className="gradient-text">WorkBuddy</span>
        </h1>
        <p className="text-text-secondary text-lg max-w-2xl">
          Your AI-powered productivity assistant. Automate emails, summarize meetings, plan tasks, and research — all in one place.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-card-bg rounded-2xl p-4 border-2 border-border-light flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-pastel-cream flex items-center justify-center">
              <stat.icon size={20} className={stat.color} />
            </div>
            <div>
              <p className="text-lg font-bold text-text-primary">{stat.value}</p>
              <p className="text-xs text-text-muted">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Feature Cards */}
      <h2 className="text-xl font-bold text-text-primary mb-4">Productivity Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {features.map((feature) => (
          <Link
            key={feature.href}
            href={feature.href}
            className={`card-hover bg-card-bg rounded-2xl p-6 border-2 ${feature.borderColor} group`}
          >
            <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4`}>
              <feature.icon size={24} className={feature.iconColor} />
            </div>
            <h3 className="font-bold text-text-primary mb-2 group-hover:text-pastel-orange transition-colors">
              {feature.title}
            </h3>
            <p className="text-sm text-text-secondary mb-4 leading-relaxed">
              {feature.description}
            </p>
            <div className="flex items-center text-sm font-medium text-pastel-orange">
              Get started <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="bg-card-bg rounded-2xl p-4 border-2 border-pastel-orange-light">
        <p className="text-xs text-text-muted text-center">
          ⚠️ <span className="font-semibold">Disclaimer:</span> AI-generated content may require human review. Always verify critical information before acting on it.
        </p>
      </div>
    </div>
  );
}

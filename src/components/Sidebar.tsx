"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Mail,
  FileText,
  CheckSquare,
  Search,
  MessageCircle,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, color: "border-pastel-orange" },
  { href: "/email", label: "Email Generator", icon: Mail, color: "border-pastel-pink" },
  { href: "/meeting", label: "Meeting Notes", icon: FileText, color: "border-pastel-teal" },
  { href: "/tasks", label: "Task Planner", icon: CheckSquare, color: "border-pastel-brown" },
  { href: "/research", label: "Research Assistant", icon: Search, color: "border-pastel-orange" },
  { href: "/chat", label: "AI Chat", icon: MessageCircle, color: "border-pastel-pink" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-white rounded-xl p-2 shadow-md border-2 border-pastel-orange"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-40 h-full w-64 bg-sidebar-bg border-r-2 border-pastel-orange-light flex flex-col transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b-2 border-pastel-orange-light">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pastel-orange to-pastel-pink flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-text-primary text-lg leading-tight">WorkBuddy</h1>
              <p className="text-xs text-text-muted">AI Assistant</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border-2 ${
                  isActive
                    ? `${item.color} bg-white shadow-sm text-text-primary`
                    : "border-transparent hover:border-pastel-orange-light hover:bg-white/50 text-text-secondary"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t-2 border-pastel-orange-light">
          <div className="bg-pastel-cream rounded-xl p-3 border-2 border-pastel-orange-light">
            <p className="text-xs text-text-muted leading-relaxed">
              ⚠️ AI-generated content may require human review
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

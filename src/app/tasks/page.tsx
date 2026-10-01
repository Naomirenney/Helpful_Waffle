"use client";

import { useState } from "react";
import { CheckSquare, Send, Copy, Check, RefreshCw, Plus, Trash2 } from "lucide-react";
import { LoadingDots } from "@/components/LoadingDots";
import { AIDisclaimer } from "@/components/AIDisclaimer";
import { generateAIResponse } from "@/lib/api";

export default function TaskPlanner() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState("");
  const [timeframe, setTimeframe] = useState("Daily");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask.trim()]);
      setNewTask("");
    }
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handlePlan = async () => {
    if (tasks.length === 0) return;
    setLoading(true);
    setError("");
    setResult("");
    try {
      const prompt = `Create a ${timeframe.toLowerCase()} task plan for the following tasks. For each task:
- Assign a priority level (High/Medium/Low) based on urgency and importance
- Suggest an optimal time slot
- Estimate duration
- Provide time optimization tips

Tasks:
${tasks.map((t, i) => `${i + 1}. ${t}`).join("\n")}

Please organize them into a structured, actionable schedule with clear time blocks. Use the Eisenhower Matrix (urgent/important) for prioritization.`;
      const response = await generateAIResponse(prompt, "task");
      setResult(response);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create plan");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-pastel-brown-light flex items-center justify-center border-2 border-pastel-brown">
          <CheckSquare size={24} className="text-pastel-brown" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">AI Task Planner</h1>
          <p className="text-sm text-text-secondary">Prioritize and schedule your tasks with AI optimization</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="bg-card-bg rounded-2xl p-6 border-2 border-pastel-brown">
          <h2 className="font-bold text-text-primary mb-4">Your Tasks</h2>

          {/* Add task */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              placeholder="Add a task..."
              className="flex-1 px-4 py-2.5 rounded-xl border-2 border-border-light bg-pastel-cream/50 text-text-primary placeholder:text-text-muted focus:border-pastel-brown focus:outline-none transition-colors text-sm"
            />
            <button
              onClick={addTask}
              disabled={!newTask.trim()}
              className="px-3 py-2.5 rounded-xl bg-pastel-brown text-white hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Plus size={18} />
            </button>
          </div>

          {/* Task list */}
          <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
            {tasks.length === 0 ? (
              <p className="text-sm text-text-muted text-center py-4">No tasks added yet</p>
            ) : (
              tasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-3 py-2 rounded-xl border-2 border-border-light bg-pastel-cream/30"
                >
                  <span className="text-sm text-text-primary">{task}</span>
                  <button
                    onClick={() => removeTask(index)}
                    className="text-text-muted hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Timeframe */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-secondary mb-2">Plan Type</label>
            <div className="flex gap-2">
              {["Daily", "Weekly"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                    timeframe === t
                      ? "border-pastel-brown bg-pastel-brown-light text-text-primary"
                      : "border-border-light text-text-secondary hover:border-pastel-brown-light"
                  }`}
                >
                  {t} Plan
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handlePlan}
            disabled={loading || tasks.length === 0}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-pastel-brown to-pastel-orange text-white rounded-xl font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <RefreshCw size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
            {loading ? "Planning..." : "Generate Plan"}
          </button>
        </div>

        {/* Output Panel */}
        <div className="bg-card-bg rounded-2xl p-6 border-2 border-pastel-brown-light">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-text-primary">Your Plan</h2>
            {result && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border-2 border-border-light text-xs font-medium text-text-secondary hover:border-pastel-brown transition-colors"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copied!" : "Copy"}
              </button>
            )}
          </div>

          {loading ? (
            <LoadingDots />
          ) : error ? (
            <div className="p-4 bg-red-50 rounded-xl border-2 border-red-200 text-red-600 text-sm">
              {error}
            </div>
          ) : result ? (
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-sm text-text-primary leading-relaxed bg-pastel-cream/50 rounded-xl p-4 border-2 border-border-light">
                {result}
              </div>
              <AIDisclaimer />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-text-muted">
              <CheckSquare size={40} className="mb-3 opacity-30" />
              <p className="text-sm">Your AI-generated plan will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

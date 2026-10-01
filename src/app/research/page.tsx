"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Search, Send, Copy, Check, RefreshCw } from "lucide-react";
import { LoadingDots } from "@/components/LoadingDots";
import { AIDisclaimer } from "@/components/AIDisclaimer";
import { generateAIResponse } from "@/lib/api";

const researchTypes = [
  "General Overview",
  "Industry Analysis",
  "Technical Deep-Dive",
  "Competitive Analysis",
  "Trend Report",
];

export default function ResearchAssistant() {
  const [topic, setTopic] = useState("");
  const [researchType, setResearchType] = useState("General Overview");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleResearch = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setError("");
    setResult("");
    try {
      const prompt = `Provide a ${researchType.toLowerCase()} on the following topic:

Topic: ${topic}

Please structure your response with:
1. **Executive Summary** - Brief overview of the topic
2. **Key Findings** - Main points and insights
3. **Detailed Analysis** - In-depth information
4. **Recommendations** - Actionable next steps
5. **Limitations** - What this analysis doesn't cover

Keep the information practical and actionable. Simplify complex concepts for quick understanding.`;
      const response = await generateAIResponse(prompt, "research");
      setResult(response);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to generate research");
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
        <div className="w-12 h-12 rounded-xl bg-pastel-orange-light flex items-center justify-center border-2 border-pastel-orange">
          <Search size={24} className="text-pastel-orange" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">AI Research Assistant</h1>
          <p className="text-sm text-text-secondary">Get key insights and summaries from complex topics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="bg-card-bg rounded-2xl p-6 border-2 border-pastel-orange">
          <h2 className="font-bold text-text-primary mb-4">Research Topic</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Topic</label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter your research topic or question..."
                rows={5}
                className="w-full px-4 py-3 rounded-xl border-2 border-border-light bg-pastel-cream/50 text-text-primary placeholder:text-text-muted focus:border-pastel-orange focus:outline-none transition-colors text-sm resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Research Type</label>
              <div className="flex flex-wrap gap-2">
                {researchTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setResearchType(type)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border-2 transition-all ${
                      researchType === type
                        ? "border-pastel-orange bg-pastel-orange-light text-text-primary"
                        : "border-border-light text-text-secondary hover:border-pastel-orange-light"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleResearch}
              disabled={loading || !topic.trim()}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-pastel-orange to-pastel-teal text-white rounded-xl font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <RefreshCw size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
              {loading ? "Researching..." : "Start Research"}
            </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="bg-card-bg rounded-2xl p-6 border-2 border-pastel-orange-light">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-text-primary">Research Results</h2>
            {result && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border-2 border-border-light text-xs font-medium text-text-secondary hover:border-pastel-orange transition-colors"
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
              <div className="prose prose-sm max-w-none text-text-primary leading-relaxed bg-pastel-cream/50 rounded-xl p-6 border-2 border-border-light prose-headings:text-text-primary prose-a:text-pastel-orange prose-strong:text-text-primary prose-ul:pl-4">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{result}</ReactMarkdown>
              </div>
              <AIDisclaimer />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-text-muted">
              <Search size={40} className="mb-3 opacity-30" />
              <p className="text-sm">Your research results will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

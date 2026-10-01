"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FileText, Send, Copy, Check, RefreshCw } from "lucide-react";
import { LoadingDots } from "@/components/LoadingDots";
import { AIDisclaimer } from "@/components/AIDisclaimer";
import { generateAIResponse } from "@/lib/api";

export default function MeetingNotes() {
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    if (!notes.trim()) return;
    setLoading(true);
    setError("");
    setResult("");
    try {
      const prompt = `Please summarize the following meeting notes. Organize the summary into these sections:

1. **Key Discussion Points** - Main topics discussed
2. **Decisions Made** - Any decisions reached
3. **Action Items** - Tasks assigned with responsible person if mentioned
4. **Deadlines** - Any mentioned deadlines or timelines
5. **Follow-up Items** - Things that need follow-up

Meeting Notes:
${notes}`;
      const response = await generateAIResponse(prompt, "meeting");
      setResult(response);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to summarize notes");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sampleNotes = `Team standup - Oct 1, 2026
Attendees: Sarah, Mike, Lisa, John

Sarah: Frontend redesign is 80% complete. Need design review by Friday.
Mike: Backend API migration to v2 is done. Will deploy to staging tomorrow.
Lisa: Client feedback from ABC Corp - they want the dashboard feature prioritized. Meeting scheduled for Thursday.
John: Security audit report is ready. Found 3 medium-priority items that need fixing before launch.

Decisions: Push launch date to Oct 15. Prioritize security fixes.
Next meeting: Wednesday 10am.`;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-pastel-teal-light flex items-center justify-center border-2 border-pastel-teal">
          <FileText size={24} className="text-pastel-teal" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Meeting Notes Summarizer</h1>
          <p className="text-sm text-text-secondary">Convert lengthy notes into concise, actionable summaries</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="bg-card-bg rounded-2xl p-6 border-2 border-pastel-teal">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-text-primary">Meeting Notes</h2>
            <button
              onClick={() => setNotes(sampleNotes)}
              className="text-xs text-pastel-teal font-medium hover:underline"
            >
              Load sample
            </button>
          </div>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Paste your meeting notes here..."
            rows={14}
            className="w-full px-4 py-3 rounded-xl border-2 border-border-light bg-pastel-cream/50 text-text-primary placeholder:text-text-muted focus:border-pastel-teal focus:outline-none transition-colors text-sm resize-none"
          />

          <button
            onClick={handleSummarize}
            disabled={loading || !notes.trim()}
            className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-pastel-teal to-pastel-pink text-white rounded-xl font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <RefreshCw size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
            {loading ? "Summarizing..." : "Summarize Notes"}
          </button>
        </div>

        {/* Output Panel */}
        <div className="bg-card-bg rounded-2xl p-6 border-2 border-pastel-teal-light">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-text-primary">Summary</h2>
            {result && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border-2 border-border-light text-xs font-medium text-text-secondary hover:border-pastel-teal transition-colors"
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
              <FileText size={40} className="mb-3 opacity-30" />
              <p className="text-sm">Your summary will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

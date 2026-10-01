"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Mail, Send, Copy, Check, RefreshCw } from "lucide-react";
import { LoadingDots } from "@/components/LoadingDots";
import { AIDisclaimer } from "@/components/AIDisclaimer";
import { generateAIResponse } from "@/lib/api";

const tones = ["Formal", "Informal", "Persuasive", "Friendly", "Urgent"];
const audiences = ["Client", "Manager", "Team Member", "Vendor", "HR"];

export default function EmailGenerator() {
  const [subject, setSubject] = useState("");
  const [context, setContext] = useState("");
  const [tone, setTone] = useState("Formal");
  const [audience, setAudience] = useState("Client");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!subject.trim() && !context.trim()) return;
    setLoading(true);
    setError("");
    setResult("");
    try {
      const prompt = `Generate a professional email with the following details:
- Subject/Topic: ${subject}
- Context/Key Points: ${context}
- Tone: ${tone}
- Audience: ${audience}

Please include a subject line, appropriate greeting, well-structured body, and professional sign-off. Make the email concise yet comprehensive.`;
      const response = await generateAIResponse(prompt, "email");
      setResult(response);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to generate email");
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
        <div className="w-12 h-12 rounded-xl bg-pastel-pink-light flex items-center justify-center border-2 border-pastel-pink">
          <Mail size={24} className="text-pastel-pink" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Smart Email Generator</h1>
          <p className="text-sm text-text-secondary">Generate context-based professional emails with AI</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="bg-card-bg rounded-2xl p-6 border-2 border-pastel-pink">
          <h2 className="font-bold text-text-primary mb-4">Email Details</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Subject / Topic</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Project deadline extension request"
                className="w-full px-4 py-3 rounded-xl border-2 border-border-light bg-pastel-cream/50 text-text-primary placeholder:text-text-muted focus:border-pastel-pink focus:outline-none transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Context / Key Points</label>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Describe what the email should cover..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border-2 border-border-light bg-pastel-cream/50 text-text-primary placeholder:text-text-muted focus:border-pastel-pink focus:outline-none transition-colors text-sm resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Tone</label>
              <div className="flex flex-wrap gap-2">
                {tones.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border-2 transition-all ${
                      tone === t
                        ? "border-pastel-pink bg-pastel-pink-light text-text-primary"
                        : "border-border-light text-text-secondary hover:border-pastel-pink-light"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Audience</label>
              <div className="flex flex-wrap gap-2">
                {audiences.map((a) => (
                  <button
                    key={a}
                    onClick={() => setAudience(a)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border-2 transition-all ${
                      audience === a
                        ? "border-pastel-pink bg-pastel-pink-light text-text-primary"
                        : "border-border-light text-text-secondary hover:border-pastel-pink-light"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || (!subject.trim() && !context.trim())}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-pastel-pink to-pastel-orange text-white rounded-xl font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <RefreshCw size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
              {loading ? "Generating..." : "Generate Email"}
            </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="bg-card-bg rounded-2xl p-6 border-2 border-pastel-pink-light">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-text-primary">Generated Email</h2>
            {result && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border-2 border-border-light text-xs font-medium text-text-secondary hover:border-pastel-pink transition-colors"
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
              <Mail size={40} className="mb-3 opacity-30" />
              <p className="text-sm">Your generated email will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

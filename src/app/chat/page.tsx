"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, RefreshCw, Trash2, Sparkles, User } from "lucide-react";
import { AIDisclaimer } from "@/components/AIDisclaimer";
import { generateAIResponse } from "@/lib/api";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi there! 👋 I'm your AI workplace assistant. I can help you with:\n\n• Drafting emails and messages\n• Answering work-related questions\n• Brainstorming ideas\n• Explaining complex topics\n• General productivity tips\n\nHow can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const conversationContext = messages
        .slice(-6)
        .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
        .join("\n");

      const prompt = `Previous conversation:\n${conversationContext}\n\nUser: ${userMessage}`;
      const response = await generateAIResponse(prompt, "chat");
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Chat cleared! How can I help you?",
      },
    ]);
  };

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-pastel-pink-light flex items-center justify-center border-2 border-pastel-pink">
            <MessageCircle size={24} className="text-pastel-pink" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">AI Chat Assistant</h1>
            <p className="text-sm text-text-secondary">Your interactive workplace assistant</p>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="flex items-center gap-1 px-3 py-2 rounded-xl border-2 border-border-light text-sm text-text-secondary hover:border-pastel-pink transition-colors"
        >
          <Trash2 size={14} />
          Clear
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-card-bg rounded-2xl border-2 border-pastel-pink overflow-hidden flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pastel-orange to-pastel-pink flex items-center justify-center shrink-0 mt-1">
                  <Sparkles size={14} className="text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-pastel-pink to-pastel-orange text-white rounded-br-md"
                    : "bg-pastel-cream border-2 border-border-light text-text-primary rounded-bl-md"
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-lg bg-pastel-teal-light border-2 border-pastel-teal flex items-center justify-center shrink-0 mt-1">
                  <User size={14} className="text-pastel-teal" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pastel-orange to-pastel-pink flex items-center justify-center shrink-0">
                <Sparkles size={14} className="text-white" />
              </div>
              <div className="bg-pastel-cream border-2 border-border-light rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-pastel-orange loading-dot" />
                  <div className="w-2 h-2 rounded-full bg-pastel-pink loading-dot" />
                  <div className="w-2 h-2 rounded-full bg-pastel-teal loading-dot" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Disclaimer */}
        <div className="px-4 pb-2">
          <AIDisclaimer />
        </div>

        {/* Input */}
        <div className="p-4 border-t-2 border-border-light">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder="Type your message..."
              disabled={loading}
              className="flex-1 px-4 py-3 rounded-xl border-2 border-border-light bg-pastel-cream/50 text-text-primary placeholder:text-text-muted focus:border-pastel-pink focus:outline-none transition-colors text-sm disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="px-4 py-3 rounded-xl bg-gradient-to-r from-pastel-pink to-pastel-orange text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <RefreshCw size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

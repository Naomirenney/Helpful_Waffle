import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function POST(request: NextRequest) {
  try {
    const { prompt, feature } = await request.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured. Please add it to your environment variables." },
        { status: 500 }
      );
    }

    const systemPrompts: Record<string, string> = {
      email: `You are a professional email writing assistant. Generate well-structured, contextually appropriate emails. Always include a subject line, greeting, body, and sign-off. Adapt your tone and language based on the specified audience and tone. Keep emails concise yet comprehensive.`,
      meeting: `You are a meeting notes analyst. Your job is to take raw meeting notes and produce a clean, organized summary. Always include: 1) Key Discussion Points 2) Decisions Made 3) Action Items (with owners if mentioned) 4) Deadlines 5) Follow-up items. Use bullet points and clear formatting.`,
      task: `You are an AI task planning assistant. Help users organize and prioritize their tasks. Create structured daily or weekly plans. Categorize tasks by urgency (urgent/important matrix). Suggest time blocks and optimization strategies. Always provide actionable, realistic schedules.`,
      research: `You are an AI research assistant. Summarize complex topics clearly. Provide key insights, main findings, and actionable recommendations. Break down information into digestible sections. Include relevant context and implications. Always cite limitations of AI-generated research.`,
      chat: `You are a helpful, professional AI workplace assistant. Answer questions clearly and concisely. Help with various workplace tasks. Be friendly but professional. If you're unsure about something, say so. Always aim to provide actionable advice.`,
    };

    const systemPrompt = systemPrompts[feature] || systemPrompts.chat;

    const response = await ai.interactions.create({
      model: "gemini-3.8-flash",
      input: `${systemPrompt}\n\nUser request: ${prompt}`,
    });

    // Handle both possible property casings from the SDK
    const text = response.output_text || response.outputText || "No response generated.";

    return NextResponse.json({ result: text });
  } catch (error: unknown) {
    console.error("Gemini API error:", error);
    const message = error instanceof Error ? error.message : "Failed to generate response";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import { AlertTriangle } from "lucide-react";

export function AIDisclaimer() {
  return (
    <div className="flex items-start gap-2 mt-4 p-3 bg-pastel-cream rounded-xl border-2 border-pastel-orange-light">
      <AlertTriangle size={16} className="text-pastel-orange mt-0.5 shrink-0" />
      <p className="text-xs text-text-muted leading-relaxed">
        <span className="font-semibold text-text-secondary">Disclaimer:</span> AI-generated content may require human review. Always verify critical information before acting on it.
      </p>
    </div>
  );
}

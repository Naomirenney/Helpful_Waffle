export function LoadingDots() {
  return (
    <div className="flex items-center justify-center gap-3 py-8">
      <div className="flex items-center gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-pastel-orange loading-dot" />
        <div className="w-2.5 h-2.5 rounded-full bg-pastel-pink loading-dot" />
        <div className="w-2.5 h-2.5 rounded-full bg-pastel-teal loading-dot" />
      </div>
      <span className="text-sm text-text-muted">Generating response...</span>
    </div>
  );
}

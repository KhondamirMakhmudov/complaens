import { cn } from "@/lib/utils";

export function Button({ className, type = "button", ...props }) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:pointer-events-none disabled:opacity-50",
        "h-10 px-4 py-2",
        className,
      )}
      {...props}
    />
  );
}

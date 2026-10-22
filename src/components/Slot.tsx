import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Slot({ className, size = 28 }: { className?: string; size?: number }) {
  return (
    <div className={cn("slot flex items-center justify-center rounded-lg", className)}>
      <Plus size={size} strokeWidth={1.5} />
    </div>
  );
}

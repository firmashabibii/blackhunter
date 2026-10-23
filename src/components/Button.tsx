import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean };

export function Button({ asChild = false, className, ...props }: ButtonProps) {
  const Component = asChild ? Slot : "button";
  return <Component className={cn("inline-flex min-h-11 shrink-0 items-center justify-center gap-2 cursor-pointer rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50", className)} {...props} />;
}
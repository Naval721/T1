import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:grayscale active:scale-95 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "!bg-black !text-white hover:!bg-gray-800 shadow-md hover:shadow-lg transition-colors",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md hover:shadow-lg",
        outline: "!bg-black !text-white hover:!bg-gray-800 border-2 !border-white/20 shadow-sm hover:shadow-md",
        secondary: "bg-gray-800 text-white hover:bg-gray-700 shadow-sm hover:shadow-md",
        ghost: "!bg-black !text-white hover:!bg-gray-800",
        link: "text-black underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-gray-900 to-black text-white shadow-lg hover:shadow-xl hover:scale-105",
        success: "bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg",
        warning: "bg-orange-500 text-white hover:bg-orange-600 shadow-md hover:shadow-lg",
        premium: "!bg-black !text-white shadow-xl hover:shadow-2xl hover:!bg-gray-800 relative overflow-hidden",
        glass: "bg-black/80 backdrop-blur-md border border-white/20 text-white hover:bg-black shadow-lg",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-10 text-base",
        xl: "h-16 rounded-xl px-12 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

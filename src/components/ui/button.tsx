import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent text-sm font-light whitespace-nowrap transition-all duration-300 outline-none select-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-black font-normal border-primary hover:bg-white hover:text-black hover:border-white shadow-none",
        outline:
          "backdrop-blur-sm bg-white/10 text-white border-white/30 hover:bg-primary hover:text-black hover:border-primary",
        glass:
          "backdrop-blur-sm bg-white/20 text-white border-white/40 hover:bg-ctMainColor hover:text-black hover:border-ctMainColor",
        secondary:
          "bg-midGray text-white border-white/15 hover:bg-white/15",
        ghost:
          "text-lightGray hover:text-white hover:bg-white/5 border-transparent",
        destructive:
          "bg-destructive/20 text-destructive border-destructive/40 hover:bg-destructive hover:text-white",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-3 text-sm gap-2 rounded-lg",
        sm: "h-9 px-4 py-2 text-xs gap-1.5 rounded-lg",
        lg: "h-13 px-8 py-4 text-base gap-2.5 rounded-xl",
        icon: "size-10 rounded-lg",
        "icon-sm": "size-8 rounded-lg",
        "icon-lg": "size-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

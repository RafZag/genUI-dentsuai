import * as React from "react"
import { cn } from "@/lib/utils"

export interface CardProps extends React.ComponentProps<"div"> {
  glowColor?: string;
}

function Card({
  className,
  glowColor,
  style,
  children,
  ...props
}: CardProps) {
  const dynamicStyle = glowColor
    ? {
        background: `radial-gradient(farthest-corner at 40px 40px, ${glowColor}40 0%, rgba(16,16,16,0.7) 50%)`,
        backgroundRepeat: "no-repeat",
        ...style,
      }
    : style

  return (
    <div
      data-slot="card"
      style={dynamicStyle}
      className={cn(
        "group/card relative flex flex-col overflow-visible rounded-2xl border border-white/15 bg-black/40 backdrop-blur-sm p-6 lg:p-8 text-card-foreground transition-all duration-300",
        glowColor && "hover:border-white/30",
        className
      )}
      {...props}
    >
      {glowColor && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 ease-out group-hover/card:opacity-100"
          style={{
            background: `radial-gradient(farthest-corner at 40px 40px, ${glowColor}50 0%, transparent 60%)`,
            backgroundRepeat: "no-repeat",
          }}
          aria-hidden="true"
        />
      )}
      <div className="relative z-10 flex h-full flex-col justify-between">
        {children}
      </div>
    </div>
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-2 pb-4", className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "text-xl lg:text-2xl font-semibold tracking-tight text-white",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm font-light text-lightGray leading-relaxed", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("self-start", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("flex-1", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center justify-between pt-4", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}

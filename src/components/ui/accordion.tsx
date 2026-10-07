import * as React from "react"
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { cn } from "@/lib/utils"

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-white/20 last:border-b-0", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex w-full">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger flex w-full items-center justify-between gap-4 py-6 lg:py-8 text-left text-lg lg:text-2xl font-light leading-tight transition-colors duration-300 outline-none cursor-pointer text-lightGray hover:text-white data-[state=open]:text-white",
          className
        )}
        {...props}
      >
        <span>{children}</span>
        <span
          data-slot="accordion-trigger-icon"
          className="text-[#adadad] text-2xl lg:text-3xl font-light leading-none shrink-0 transition-transform duration-300 group-aria-expanded/accordion-trigger:rotate-45 group-aria-expanded/accordion-trigger:text-primary"
          aria-hidden="true"
        >
          +
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="overflow-hidden transition-all duration-300 ease-out data-open:animate-accordion-down data-closed:animate-accordion-up pb-6"
      {...props}
    >
      <div
        className={cn(
          "text-base lg:text-lg rounded-2xl bg-[#141414] px-6 py-6 sm:px-8 sm:py-8 lg:py-10 leading-relaxed text-[#adadad] border border-white/5",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

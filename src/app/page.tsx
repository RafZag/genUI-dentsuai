import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background text-foreground">
      <div className="max-w-xl text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Next.js + Tailwind CSS + shadcn/ui
        </h1>
        <p className="text-muted-foreground text-lg">
          Your project is successfully initialized with TypeScript, App Router, Tailwind CSS v4, and shadcn/ui.
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="secondary" size="lg">Get Started</Button>
          <Button variant="outline" size="lg">Documentation</Button>
        </div>
      </div>
    </main>
  );
}

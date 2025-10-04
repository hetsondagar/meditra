import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
}

export const PageLayout = ({ title, subtitle, children, className }: PageLayoutProps) => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className={cn("container px-6 py-8 space-y-6", className)}>
        {(title || subtitle) && (
          <div className="space-y-1">
            {title ? (
              <h1 className="text-2xl font-brand tracking-[0.03em]" style={{ color: "hsl(var(--primary))" }}>
                {title}
              </h1>
            ) : null}
            {subtitle && (
              <p className="text-muted-foreground">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </main>
    </div>
  );
};

export default PageLayout;


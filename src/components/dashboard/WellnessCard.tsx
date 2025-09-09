import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface WellnessCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  variant?: "default" | "success" | "warning" | "info";
  trend?: "up" | "down" | "stable";
  className?: string;
}

export const WellnessCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  variant = "default",
  trend,
  className 
}: WellnessCardProps) => {
  const variants = {
    default: "bg-gradient-to-br from-teal-300 to-sky-300 dark:from-teal-500/30 dark:to-sky-500/30 border-border/30",
    success: "bg-gradient-to-br from-emerald-300 to-teal-300 dark:from-emerald-500/30 dark:to-teal-500/30 border-success/20",
    warning: "bg-gradient-to-br from-amber-200 to-orange-200 dark:from-amber-500/20 dark:to-orange-500/20 border-warning/30",
    info: "bg-gradient-to-br from-sky-200 to-cyan-200 dark:from-sky-500/20 dark:to-cyan-500/20 border-accent/30"
  };

  const iconVariants = {
    default: "text-primary",
    success: "text-white",
    warning: "text-warning-foreground",
    info: "text-secondary-dark"
  };

  return (
    <div className={cn(
      "border p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow",
      variants[variant],
      className
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className={cn(
          "p-3 rounded-xl shadow-soft",
          variant === "success" ? "bg-primary/20" : "bg-primary/10 dark:bg-primary/15"
        )}>
          <Icon className={cn("h-6 w-6", iconVariants[variant])} />
        </div>
        
        {trend && (
          <div className={cn(
            "px-2.5 py-1 rounded-full text-xs font-medium shadow-sm",
            trend === "up" ? "bg-emerald-900/10 text-emerald-700 dark:text-emerald-300" : 
            trend === "down" ? "bg-red-900/10 text-red-700 dark:text-red-300" : 
            "bg-white/30 text-foreground/80 dark:bg-white/10"
          )}>
            {trend === "up" ? "Improving" : trend === "down" ? "Needs attention" : "Stable"}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-medium text-card-foreground/80 text-sm">{title}</h3>
        <p className={cn(
          "text-2xl font-bold",
          variant === "success" ? "text-primary-foreground" : "text-card-foreground"
        )}>
          {value}
        </p>
        {subtitle && (
          <p className={cn(
            "text-sm",
            variant === "success" ? "text-primary-foreground/80" : "text-muted-foreground"
          )}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
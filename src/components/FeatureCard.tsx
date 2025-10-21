import type React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export default function FeatureCard({ icon, title, desc }: FeatureCardProps) {
  return (
    <div className="group rounded-2xl border border-border bg-card p-8 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
      <div className="mb-5 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-secondary group-hover:bg-accent/10 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
      <p className="text-base text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}

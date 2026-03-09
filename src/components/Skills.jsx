
import React from "react";

const SKILL_GROUPS = [
  {
    label: "Languages",
    icon: "λ",
    items: ["Python", "JavaScript", "TypeScript", "C++", "LaTeX"],
  },
  {
    label: "Web",
    icon: "∂",
    items: ["React", "Node.js", "Tailwind CSS", "Next.js", "REST APIs"],
  },
  {
    label: "Math",
    icon: "∑",
    items: ["Linear Algebra", "Real Analysis", "Probability", "Topology", "Number Theory"],
  },
  {
    label: "Tools",
    icon: "∇",
    items: ["Git", "Docker", "PostgreSQL", "NumPy", "Jupyter"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 border-t border-border">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader index="01" title="Skills" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.label}
              className="bg-surface border border-border rounded-lg p-5 hover:border-accent/40 transition-colors group"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-accent font-mono text-xl">{group.icon}</span>
                <span className="font-mono text-xs text-muted uppercase tracking-widest">
                  {group.label}
                </span>
              </div>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-sm text-light/70 group-hover:text-light/90 transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent-2 inline-block" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ index, title }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-xs text-accent">{index}</span>
      <h2 className="text-2xl font-light text-light">{title}</h2>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}
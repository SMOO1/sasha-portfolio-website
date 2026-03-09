import React from "react";

const CURRENT = {
  title: "Proof Assistant CLI",
  desc: "A command-line tool for checking simple propositional logic proofs and generating truth tables automatically.",
  tags: ["TypeScript", "Logic", "CLI"],
  eq: "p → q ≡ ¬p ∨ q",
  link: "#",
};

const FEATURED = {
  title: "Graph Theory Visualizer",
  desc: "Interactive tool to visualize graph algorithms — BFS, DFS, Dijkstra, and more. Built to help students build intuition.",
  tags: ["React", "D3.js", "Algorithms"],
  eq: "G = (V, E)",
  link: "#",
};

function ProjectCard({ project, label, labelColor }) {
  return (
    <a
      href={project.link}
      className="group bg-surface border border-border rounded-lg p-6 hover:border-accent/50 transition-all duration-300 block"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className={`font-mono text-xs uppercase tracking-widest ${labelColor}`}>
          {label}
        </span>
      </div>
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-light font-medium group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <span className="font-mono text-xs text-border group-hover:text-accent/50 transition-colors ml-2 shrink-0">
          ↗
        </span>
      </div>
      <div className="font-mono text-xs text-accent/60 bg-bg border border-border rounded px-3 py-1.5 mb-4 inline-block">
        {project.eq}
      </div>
      <p className="text-muted text-sm leading-relaxed mb-4">{project.desc}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs text-muted border border-border rounded px-2 py-0.5 group-hover:border-accent/30 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 border-t border-border">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ProjectCard project={CURRENT} label="// current project" labelColor="text-accent-2" />
          <ProjectCard project={FEATURED} label="// featured project" labelColor="text-accent" />
        </div>
      </div>
    </section>
  );
}
import React, { useState, useEffect } from "react";

const PROJECTS = [
  {
    label: "// current project",
    labelColor: "text-accent-2",
    title: "Receiptly",
    desc: "An accounting mobile app to keep track of spending. Receipts are scanned using OCR.",
    tags: ["Java", "Java Spring Boot"],
    images: ["/images/image1.png", "/images/image2.png","/images/image3.png"],
    displayMode: "side-by-side",
    link: "#",
  },
  {
    label: "// featured project",
    labelColor: "text-accent",
    title: "LegaLens",
    desc: "A legal contract analyzer. Using AI and RAG, predatory clauses are found and highlighted in your contracts.",
    tags: ["React", "Python", "Gemini", "RAG"],
    images: ["images/legalens3.png","images/legalens2.png","images/legalens4.png","images/legalens5.png","images/legalens1.png", "images/winner.png"],
    link: "#",
  },
];

export default function ProjectCarousel() {
  const [index, setIndex] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);
  const project = PROJECTS[index];

  // Reset image index when project changes
  useEffect(() => {
    setImgIndex(0);
  }, [index]);

  const hasImages = project.images && project.images.length > 0;
  const multipleImages = hasImages && project.images.length > 1;

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Dot indicators */}
      <div className="flex gap-2 mb-1">
        {PROJECTS.map((p, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`font-mono text-xs tracking-widest transition-colors ${
              i === index ? p.labelColor : "text-border hover:text-muted"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Card */}
      <a
        href={project.link}
        className="group bg-surface border border-border rounded-lg overflow-hidden hover:border-accent/50 transition-all duration-300 block"
      >
        {/* Image area */}
        <div className="relative w-full h-56 bg-bg border-b border-border overflow-hidden">
          {hasImages ? (
            project.displayMode === "side-by-side" ? (
              <div className="w-full h-full flex items-center justify-center gap-2 p-2">
                {project.images.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`${project.title} ${i + 1}`}
                    className="h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                ))}
              </div>
            ) : (
            <>
              <img
                src={project.images[imgIndex]}
                alt={`${project.title} ${imgIndex + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {multipleImages && (
                <>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setImgIndex((i) => (i - 1 + project.images.length) % project.images.length);
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-bg/70 border border-border rounded px-1.5 py-0.5 font-mono text-xs text-muted hover:text-light hover:border-muted transition-colors"
                  >
                    ←
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setImgIndex((i) => (i + 1) % project.images.length);
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-bg/70 border border-border rounded px-1.5 py-0.5 font-mono text-xs text-muted hover:text-light hover:border-muted transition-colors"
                  >
                    →
                  </button>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {project.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.preventDefault();
                          setImgIndex(i);
                        }}
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${
                          i === imgIndex ? "bg-accent" : "bg-border hover:bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
            )
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-mono text-xs text-border">// image coming soon</span>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-light font-medium group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <span className="font-mono text-xs text-border group-hover:text-accent/50 transition-colors ml-2 shrink-0">
              ↗
            </span>
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
        </div>
      </a>

      {/* Prev / Next */}
      <div className="flex gap-3 justify-end">
        <button
          onClick={() => setIndex((i) => (i - 1 + PROJECTS.length) % PROJECTS.length)}
          className="font-mono text-xs text-muted border border-border rounded px-3 py-1 hover:text-light hover:border-muted transition-colors"
        >
          ← prev
        </button>
        <button
          onClick={() => setIndex((i) => (i + 1) % PROJECTS.length)}
          className="font-mono text-xs text-muted border border-border rounded px-3 py-1 hover:text-light hover:border-muted transition-colors"
        >
          next →
        </button>
      </div>
    </div>
  );
}
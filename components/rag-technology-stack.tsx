import type { TechnologyStackItem } from "@/content/case-study";

function TechnologyIcon({
  icon,
}: {
  icon: TechnologyStackItem["icon"];
}) {
  const commonProps = {
    "aria-hidden": true,
    className: "rag-technology-stack__icon",
    fill: "none",
    focusable: "false" as const,
    viewBox: "0 0 32 32",
  };

  if (icon === "application") {
    return (
      <svg {...commonProps}>
        <rect height="24" rx="3" width="28" x="2" y="4" />
        <path d="M2 10h28M12 15l-4 4 4 4M20 15l4 4-4 4M18 13l-4 12" />
      </svg>
    );
  }

  if (icon === "ai") {
    return (
      <svg {...commonProps}>
        <path d="M13 5a5 5 0 0 0-8 4 5 5 0 0 0 0 8 5 5 0 0 0 8 7V5ZM19 7h4l2-2M19 13h7M19 19h4l3 3M19 25h5" />
        <circle cx="27" cy="5" r="2" />
        <circle cx="28" cy="13" r="2" />
        <circle cx="27" cy="23" r="2" />
        <circle cx="26" cy="25" r="2" />
        <path d="M9 9c2 0 4 1 4 3M8 17c3 0 5-1 5-3M9 22c1-2 2-3 4-3" />
      </svg>
    );
  }

  if (icon === "storage") {
    return (
      <svg {...commonProps}>
        <ellipse cx="16" cy="7" rx="11" ry="4" />
        <path d="M5 7v9c0 2 5 4 11 4s11-2 11-4V7M5 16v9c0 2 5 4 11 4s11-2 11-4v-9" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M7 3h12l7 7v19H7V3Z" />
      <path d="M19 3v8h7M11 16h11M11 21h11M11 26h8" />
    </svg>
  );
}

export function TechnologyStack({
  id,
  items,
  testId,
}: {
  id: string;
  items: readonly TechnologyStackItem[];
  testId?: string;
}) {
  const headingId = `${id}-title`;

  return (
    <section
      aria-labelledby={headingId}
      className="rag-technology-stack"
      data-testid={testId}
    >
      <h2
        className="rag-technology-stack__heading"
        id={headingId}
      >
        Technology stack
      </h2>
      <dl className="rag-technology-stack__grid">
        {items.map((item) => (
          <div className="rag-technology-stack__item" key={item.category}>
            <TechnologyIcon icon={item.icon} />
            <div>
              <dt>{item.category}</dt>
              <dd>{item.technologies}</dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}

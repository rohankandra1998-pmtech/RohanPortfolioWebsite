export type RichTextSegment = {
  text: string;
  strong?: boolean;
  emphasis?: boolean;
};

export type CaseStudyBlock =
  | {
      type: "paragraph";
      content: RichTextSegment[];
      sourceIndexes: number[];
    }
  | {
      type: "heading";
      level: 2 | 3 | 4 | 5;
      text: string;
      sourceIndexes: number[];
    }
  | {
      type: "list";
      ordered: boolean;
      items: RichTextSegment[][];
      sourceIndexes: number[];
    }
  | {
      type: "quote";
      content: RichTextSegment[];
      sourceIndexes: number[];
    }
  | {
      type: "code";
      text: string;
      sourceIndexes: number[];
    }
  | {
      type: "sequence";
      items: string[];
      sourceIndexes: number[];
    }
  | {
      type: "table";
      headers: string[];
      rows: string[][];
      sourceIndexes: number[];
    }
  | {
      type: "figure";
      number: number;
      variant: "standard" | "paired" | "portrait" | "wide";
      images: {
        src: string;
        alt: string;
        width: number;
        height: number;
      }[];
      caption: string;
      sourceIndexes: number[];
    };

export type CaseStudyOutlineEntry = {
  id: string;
  label: string;
  level: 1 | 2 | 3 | 4;
  ancestorIds: string[];
};

export type TechnologyStackItem = {
  category: string;
  technologies: string;
  icon: "application" | "ai" | "storage" | "document";
};

export function createCaseStudyHeadingId(text: string, occurrence = 1) {
  const baseId = text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return occurrence > 1 ? `${baseId}-${occurrence}` : baseId;
}

export function createCaseStudyOutline(
  blocks: CaseStudyBlock[],
): CaseStudyOutlineEntry[] {
  const entries: CaseStudyOutlineEntry[] = [
    {
      id: "overview",
      label: "Overview",
      level: 1,
      ancestorIds: [],
    },
  ];
  const headingCounts = new Map<string, number>();
  const ancestors: Partial<Record<1 | 2 | 3 | 4, string>> = {};

  for (const block of blocks) {
    if (block.type !== "heading") continue;

    const level = (block.level - 1) as 1 | 2 | 3 | 4;
    const occurrence = (headingCounts.get(block.text) ?? 0) + 1;
    headingCounts.set(block.text, occurrence);
    const id = createCaseStudyHeadingId(block.text, occurrence);
    const ancestorIds = Array.from({ length: level - 1 }, (_, index) => {
      return ancestors[(index + 1) as 1 | 2 | 3] ?? "";
    }).filter(Boolean);

    entries.push({
      id,
      label: block.text,
      level,
      ancestorIds,
    });
    ancestors[level] = id;
    for (let descendant = level + 1; descendant <= 4; descendant += 1) {
      delete ancestors[descendant as 2 | 3 | 4];
    }
  }

  return entries;
}

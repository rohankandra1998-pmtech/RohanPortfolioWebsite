import type {
  CaseStudyBlock,
  CaseStudyOutlineEntry,
  TechnologyStackItem,
} from "@/content/case-study";
import {
  launchGuardCaseStudyBlocks,
  launchGuardCaseStudyOutline,
  launchGuardTechnologyStack,
} from "@/content/launchguard";
import {
  ragCaseStudyBlocks,
  ragCaseStudyOutline,
  ragTechnologyStack,
} from "@/content/rag-knowledge-assistant";

export type RichArticleKey = keyof typeof richArticles;

type RichArticle = {
  blocks: CaseStudyBlock[];
  outline: CaseStudyOutlineEntry[];
  outlineAriaLabel: string;
  projectName: string;
  testId: string;
  technologyStack: readonly TechnologyStackItem[];
  technologyStackId: string;
  actions: {
    liveAriaLabel: string;
    liveLabel: string;
    repoAriaLabel: string;
    repoLabel: string;
  };
};

export const richArticles = {
  "rag-knowledge-assistant": {
    blocks: ragCaseStudyBlocks,
    outline: ragCaseStudyOutline,
    outlineAriaLabel: "RAG Knowledge Assistant case study outline",
    projectName: "RAG Knowledge Assistant",
    testId: "rag",
    technologyStack: ragTechnologyStack,
    technologyStackId: "rag-technology-stack",
    actions: {
      liveAriaLabel:
        "Try the RAG Knowledge Assistant live product, opens in a new tab",
      liveLabel: "Try live product",
      repoAriaLabel:
        "View the RAG Knowledge Assistant GitHub repository, opens in a new tab",
      repoLabel: "View GitHub repository",
    },
  },
  launchguard: {
    blocks: launchGuardCaseStudyBlocks,
    outline: launchGuardCaseStudyOutline,
    outlineAriaLabel: "LaunchGuard case study outline",
    projectName: "LaunchGuard",
    testId: "launchguard",
    technologyStack: launchGuardTechnologyStack,
    technologyStackId: "launchguard-technology-stack",
    actions: {
      liveAriaLabel: "Open LaunchGuard live product, opens in a new tab",
      liveLabel: "Open live product",
      repoAriaLabel:
        "View LaunchGuard GitHub repository, opens in a new tab",
      repoLabel: "View GitHub repository",
    },
  },
} as const satisfies Record<string, RichArticle>;

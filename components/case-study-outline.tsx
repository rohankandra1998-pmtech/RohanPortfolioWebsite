"use client";

import {
  type MouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { RagCaseStudyOutlineEntry } from "@/content/rag-knowledge-assistant";

type OutlineNode = RagCaseStudyOutlineEntry & {
  children: OutlineNode[];
};

const DESKTOP_QUERY = "(min-width: 1025px)";
const READING_LINE = 112;
const ACTIVATION_TOLERANCE = 2;
const SCROLL_KEYS = new Set([
  "ArrowDown",
  "ArrowUp",
  "End",
  "Home",
  "PageDown",
  "PageUp",
  " ",
]);

function buildOutlineTree(entries: RagCaseStudyOutlineEntry[]) {
  const roots: OutlineNode[] = [];
  const stack: OutlineNode[] = [];

  entries.forEach((entry) => {
    const node: OutlineNode = { ...entry, children: [] };

    while (stack.length >= entry.level) stack.pop();

    if (entry.level === 1) {
      roots.push(node);
    } else {
      stack[stack.length - 1]?.children.push(node);
    }

    stack.push(node);
  });

  return roots;
}

function OutlineList({
  activeId,
  ancestorIds,
  nodes,
  onNavigate,
}: {
  activeId: string;
  ancestorIds: Set<string>;
  nodes: OutlineNode[];
  onNavigate: (event: MouseEvent<HTMLAnchorElement>, id: string) => void;
}) {
  return (
    <ol className="rag-outline__list">
      {nodes.map((node) => {
        const isActive = node.id === activeId;
        const isAncestor = ancestorIds.has(node.id);

        return (
          <li
            className={`rag-outline__item rag-outline__item--level-${node.level}`}
            key={node.id}
          >
            <a
              aria-current={isActive ? "location" : undefined}
              className={`rag-outline__link ${
                isActive ? "rag-outline__link--active" : ""
              } ${isAncestor ? "rag-outline__link--ancestor" : ""}`}
              data-outline-id={node.id}
              href={`#${node.id}`}
              onClick={(event) => onNavigate(event, node.id)}
            >
              <span className="rag-outline__tick" aria-hidden="true" />
              <span className="rag-outline__label">{node.label}</span>
            </a>
            {node.children.length > 0 ? (
              <OutlineList
                activeId={activeId}
                ancestorIds={ancestorIds}
                nodes={node.children}
                onNavigate={onNavigate}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

export function CaseStudyOutline({
  entries,
}: {
  entries: RagCaseStudyOutlineEntry[];
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const pendingNavigationRef = useRef<string | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState("overview");
  const tree = useMemo(() => buildOutlineTree(entries), [entries]);
  const activeEntry =
    entries.find((entry) => entry.id === activeId) ?? entries[0];
  const ancestorIds = useMemo(
    () => new Set(activeEntry?.ancestorIds ?? []),
    [activeEntry],
  );

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY);
    const details = detailsRef.current;

    const syncDisclosure = () => {
      if (!details) return;
      details.open = media.matches;
    };

    syncDisclosure();
    media.addEventListener("change", syncDisclosure);
    return () => media.removeEventListener("change", syncDisclosure);
  }, []);

  useEffect(() => {
    const targets = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((target): target is HTMLElement => Boolean(target));
    let animationFrame = 0;

    const calculateActiveSection = () => {
      animationFrame = 0;
      const nearPageBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 8;

      if (nearPageBottom) {
        pendingNavigationRef.current = null;
        setActiveId(entries.at(-1)?.id ?? "overview");
        return;
      }

      if (pendingNavigationRef.current) {
        const pendingId = pendingNavigationRef.current;
        const pendingTarget = document.getElementById(pendingId);
        const pendingTop = pendingTarget?.getBoundingClientRect().top;
        if (typeof pendingTop === "number" && Math.abs(pendingTop - READING_LINE) > 8) {
          return;
        }
        pendingNavigationRef.current = null;
      }

      let current = targets[0];
      for (const target of targets) {
        if (
          target.getBoundingClientRect().top <=
          READING_LINE + ACTIVATION_TOLERANCE
        ) {
          current = target;
        } else {
          break;
        }
      }
      setActiveId(current?.id ?? "overview");
    };

    const scheduleActiveSection = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(calculateActiveSection);
      }
    };

    const clearPendingNavigation = () => {
      if (!pendingNavigationRef.current) return;
      pendingNavigationRef.current = null;
      scheduleActiveSection();
    };

    const handleScrollKey = (event: KeyboardEvent) => {
      if (SCROLL_KEYS.has(event.key)) clearPendingNavigation();
    };

    const navigateToHash = () => {
      const hashId = decodeURIComponent(window.location.hash.slice(1));
      const target = targets.find(({ id }) => id === hashId);
      if (!target) {
        clearPendingNavigation();
        return;
      }

      pendingNavigationRef.current = hashId;
      setActiveId(hashId);
      target.scrollIntoView({ behavior: "auto", block: "start" });
      target.focus({ preventScroll: true });
      scheduleActiveSection();
    };

    window.addEventListener("scroll", scheduleActiveSection, { passive: true });
    window.addEventListener("resize", scheduleActiveSection);
    window.addEventListener("scrollend", clearPendingNavigation);
    window.addEventListener("wheel", clearPendingNavigation, { passive: true });
    window.addEventListener("touchstart", clearPendingNavigation, {
      passive: true,
    });
    window.addEventListener("pointerdown", clearPendingNavigation, {
      passive: true,
    });
    window.addEventListener("keydown", handleScrollKey);
    window.addEventListener("hashchange", navigateToHash);
    window.addEventListener("popstate", navigateToHash);

    if (window.location.hash) {
      window.requestAnimationFrame(navigateToHash);
      window.addEventListener("load", navigateToHash, { once: true });
    } else {
      calculateActiveSection();
    }

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleActiveSection);
      window.removeEventListener("resize", scheduleActiveSection);
      window.removeEventListener("scrollend", clearPendingNavigation);
      window.removeEventListener("wheel", clearPendingNavigation);
      window.removeEventListener("touchstart", clearPendingNavigation);
      window.removeEventListener("pointerdown", clearPendingNavigation);
      window.removeEventListener("keydown", handleScrollKey);
      window.removeEventListener("hashchange", navigateToHash);
      window.removeEventListener("popstate", navigateToHash);
      window.removeEventListener("load", navigateToHash);
    };
  }, [entries]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const activeLink = viewport?.querySelector<HTMLElement>(
      `[data-outline-id="${CSS.escape(activeId)}"]`,
    );
    if (!viewport || !activeLink) return;

    const viewportRect = viewport.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    if (linkRect.top < viewportRect.top) {
      viewport.scrollTop -= viewportRect.top - linkRect.top + 8;
    } else if (linkRect.bottom > viewportRect.bottom) {
      viewport.scrollTop += linkRect.bottom - viewportRect.bottom + 8;
    }
  }, [activeId]);

  const handleNavigate = (
    event: MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isDesktop = window.matchMedia(DESKTOP_QUERY).matches;
    if (!isDesktop && detailsRef.current) {
      detailsRef.current.open = false;
    }
    pendingNavigationRef.current = id;
    target.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
    window.history.pushState(null, "", `#${id}`);
    target.focus({ preventScroll: true });
    setActiveId(id);
  };

  const handleToggle = () => {
    if (
      window.matchMedia(DESKTOP_QUERY).matches &&
      detailsRef.current &&
      !detailsRef.current.open
    ) {
      detailsRef.current.open = true;
    }
  };

  return (
    <aside className="rag-outline" data-testid="rag-case-study-outline">
      <nav aria-label="RAG case study outline">
        <details
          className="rag-outline-mobile"
          onToggle={handleToggle}
          open
          ref={detailsRef}
        >
          <summary className="rag-outline-mobile__summary">
            <span>On this page</span>
            <strong>{activeEntry?.label ?? "Overview"}</strong>
          </summary>
          <div className="rag-outline__viewport" ref={viewportRef}>
            <OutlineList
              activeId={activeId}
              ancestorIds={ancestorIds}
              nodes={tree}
              onNavigate={handleNavigate}
            />
          </div>
        </details>
      </nav>
    </aside>
  );
}

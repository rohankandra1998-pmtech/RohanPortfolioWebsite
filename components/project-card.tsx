import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/site";

export type ProjectCardContext = "home" | "work";

export function ProjectCard({
  project,
  priority = false,
  context,
}: {
  project: Project;
  priority?: boolean;
  context: ProjectCardContext;
}) {
  const cardImage = project.workCard?.image ?? project.image;
  const cardImageAlt = project.workCard?.imageAlt ?? project.imageAlt;
  const cardVariant = project.workCard?.variant;
  const homeSummary =
    context === "home" ? project.homeCard?.summary : undefined;
  const purpose =
    context === "work" ? project.workCard?.purpose : undefined;

  return (
    <article
      className={`project-card${
        cardVariant ? ` project-card--${cardVariant}` : ""
      }`}
      data-reveal
    >
      <div className="project-card__meta">{project.kicker}</div>
      <h3>{project.title}</h3>
      <Link
        aria-label={`Read ${project.title} case study`}
        className="project-card__image focus-ring"
        href={`/work/${project.slug}`}
      >
        <Image
          alt={cardImageAlt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          src={cardImage}
          style={
            cardVariant === "rag-purpose"
              ? { objectFit: "contain" }
              : undefined
          }
          unoptimized
        />
      </Link>
      {homeSummary ? (
        <p className="project-card__home-summary">{homeSummary}</p>
      ) : purpose ? (
        <div className="project-card__purpose">
          <p className="project-card__purpose-introduction">
            {purpose.introduction}
          </p>
          <p className="project-card__purpose-label">
            {purpose.simpleLabel}
          </p>
          <aside className="project-card__purpose-callout">
            <p>{purpose.callout}</p>
          </aside>
        </div>
      ) : (
        <p>{project.summary}</p>
      )}
      <Link className="arrow-link focus-ring" href={`/work/${project.slug}`}>
        read case study <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}

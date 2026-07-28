import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/site";

export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  return (
    <article className="project-card" data-reveal>
      <div className="project-card__meta">{project.kicker}</div>
      <h3>{project.title}</h3>
      <Link
        aria-label={`Read ${project.title} case study`}
        className="project-card__image focus-ring"
        href={`/work/${project.slug}`}
      >
        <Image
          alt={project.imageAlt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          src={project.image}
          unoptimized
        />
      </Link>
      <p>{project.summary}</p>
      <Link className="arrow-link focus-ring" href={`/work/${project.slug}`}>
        read case study <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}

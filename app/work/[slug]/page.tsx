import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyArticle } from "@/components/case-study-article";
import { CaseStudyOutline } from "@/components/case-study-outline";
import { RagProjectActions } from "@/components/rag-project-actions";
import { RagTechnologyStack } from "@/components/rag-technology-stack";
import {
  ragCaseStudyBlocks,
  ragCaseStudyOutline,
  ragTechnologyStack,
} from "@/content/rag-knowledge-assistant";
import { getProject, projects } from "@/content/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const pageTitle = project.caseStudyTitle ?? project.title;

  return {
    title: pageTitle,
    description: project.summary,
    openGraph: {
      title: `${pageTitle} — Rohan Singh Kandra`,
      description: project.summary,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const isRichArticle = project.richArticle === "rag-knowledge-assistant";

  return (
    <>
      <section
        className={`case-hero ${isRichArticle ? "case-hero--longform" : ""}`}
      >
        <div className="wrap">
          <p className="eyebrow" data-reveal>
            {project.kicker}
          </p>
          <h1 data-reveal>{project.caseStudyTitle ?? project.title}</h1>
          {!isRichArticle ? (
            <p className="case-hero__summary" data-reveal>
              {project.summary}
            </p>
          ) : null}
          {isRichArticle ? (
            <RagTechnologyStack items={ragTechnologyStack} />
          ) : (
            <div className="case-meta" data-reveal>
              <div>
                <span>Timeframe</span>
                <strong>{project.timeframe}</strong>
              </div>
              <div>
                <span>Organization</span>
                <strong>{project.organization}</strong>
              </div>
              <div>
                <span>Role</span>
                <strong>{project.role}</strong>
              </div>
              <div>
                <span>Team</span>
                <strong>{project.team}</strong>
              </div>
            </div>
          )}
          {isRichArticle ? (
            <RagProjectActions
              liveUrl={project.liveUrl}
              placement="hero"
              repoUrl={project.repoUrl}
            />
          ) : (
            <div className="case-links" data-reveal>
              {project.liveUrl ? (
                <a
                  className="button button--dark focus-ring"
                  href={project.liveUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  {project.slug === "ur-coursebot"
                    ? "Read the post"
                    : "Open live product"}{" "}
                  <span aria-hidden="true">→</span>
                </a>
              ) : null}
              {project.repoUrl ? (
                <a
                  className="button button--light focus-ring"
                  href={project.repoUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  View repository <span aria-hidden="true">→</span>
                </a>
              ) : null}
            </div>
          )}
        </div>
      </section>

      {isRichArticle ? (
        <section className="section section--longform-case">
          <div className="wrap rag-case-layout">
            <CaseStudyOutline entries={ragCaseStudyOutline} />
            <div className="rag-case-content">
              <CaseStudyArticle blocks={ragCaseStudyBlocks} />
            </div>
          </div>
          <div className="wrap rag-case-actions-row">
            <RagProjectActions
              liveUrl={project.liveUrl}
              placement="article-end"
              repoUrl={project.repoUrl}
            />
          </div>
        </section>
      ) : (
        <>
          <section className="case-cover">
            <div className="wrap">
              <figure data-reveal>
                <Image
                  alt={project.imageAlt}
                  fill
                  priority
                  sizes="100vw"
                  src={project.image}
                  unoptimized
                />
              </figure>
            </div>
          </section>

          <section className="section section--case-metrics">
            <div className="wrap metric-grid">
              {project.metrics.map((metric) => (
                <div data-reveal key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          </section>

          {project.sections.map((section, index) => (
            <section
              className={`section case-section ${
                index % 2 === 1 ? "case-section--tinted" : ""
              }`}
              key={section.title}
            >
              <div className="wrap case-section__grid">
                <div data-reveal>
                  <p className="eyebrow">{section.eyebrow}</p>
                  <h2>{section.title}</h2>
                </div>
                <div className="case-section__body" data-reveal>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets ? (
                    <ul>
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
              {section.media?.length ? (
                <div
                  className={`wrap case-media ${
                    section.media.length > 1 ? "case-media--grid" : ""
                  }`}
                >
                  {section.media.map((media) => (
                    <figure data-reveal key={media.src}>
                      <div className="case-media__image">
                        <Image
                          alt={media.alt}
                          fill
                          sizes={
                            section.media && section.media.length > 1
                              ? "(max-width: 768px) 100vw, 50vw"
                              : "100vw"
                          }
                          src={media.src}
                          unoptimized
                        />
                      </div>
                      <figcaption>{media.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              ) : null}
            </section>
          ))}
        </>
      )}

      <section className="section case-next">
        <div className="wrap">
          <p className="eyebrow">Keep exploring</p>
          <h2>More selected work</h2>
          <div className="case-next__links">
            {projects
              .filter((item) => item.slug !== project.slug)
              .map((item) => (
                <Link
                  className="case-next__link focus-ring"
                  href={`/work/${item.slug}`}
                  key={item.slug}
                >
                  <span>{item.kicker}</span>
                  <strong>{item.title}</strong>
                  <b aria-hidden="true">→</b>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}

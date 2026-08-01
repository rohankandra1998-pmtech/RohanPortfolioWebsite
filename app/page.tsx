import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Geist } from "next/font/google";
import { HomeMotion } from "@/components/home-motion";
import { ProjectCard } from "@/components/project-card";
import { contact, principles, projects, socials } from "@/content/site";
import "./home.css";

const homeFont = Geist({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-home",
});

export const metadata: Metadata = {
  description:
    "Portfolio of Rohan Singh Kandra: AI product evaluation, RAG systems, product discovery, analytics, and technical product management.",
};

function WordReveal({ children }: { children: string }) {
  return children.split(" ").map((word, index) => (
    <span
      className="home-word"
      data-home-word
      key={`${word}-${index}`}
    >
      {word}
      {index < children.split(" ").length - 1 ? " " : ""}
    </span>
  ));
}

export default function HomePage() {
  const statementMarker = "systems";
  const [statementStart, statementEnd = ""] =
    contact.statement.split(statementMarker);
  const marqueeProjects = [...projects, ...projects];

  return (
    <HomeMotion>
      <div className={`${homeFont.variable} home-page`}>
        <section className="home-hero">
          <div aria-hidden="true" className="home-hero__field">
            <span />
            <span />
            <span />
          </div>

          <div className="home-wrap home-hero__inner">
            <div className="home-hero__copy">
              <p className="home-kicker" data-home-intro>
                Based in {contact.location}
              </p>
              <h1 data-home-intro>Hey! I’m Rohan.</h1>
              <h2 data-home-intro>
                {statementStart}
                <span aria-hidden="true" className="home-inline-system-mark">
                  <svg fill="none" viewBox="0 0 160 56">
                    <circle cx="10" cy="10" fill="currentColor" r="4" />
                    <circle cx="10" cy="28" fill="currentColor" r="4" />
                    <circle cx="10" cy="46" fill="currentColor" r="4" />
                    <path
                      d="M16 10c25 0 26 18 52 18M16 28h52M16 46c25 0 26-18 52-18"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="3"
                    />
                    <circle
                      cx="76"
                      cy="28"
                      fill="var(--home-mint)"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                    <path
                      d="M86 28h58m0 0-12-10m12 10-12 10"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                    />
                  </svg>
                </span>{" "}
                {statementMarker}
                {statementEnd}
              </h2>
              <p className="home-hero__intro" data-home-intro>
                I’m a product manager and AI product builder with a foundation in
                technology consulting and data analytics. I like turning ambiguous
                workflows into products that make the evidence, tradeoffs, and
                next step clear.
              </p>
              <div className="home-hero__actions" data-home-intro>
                <Link className="home-button home-button--ink focus-ring" href="/work">
                  See my work <span aria-hidden="true">↗</span>
                </Link>
                <Link
                  className="home-button home-button--outline focus-ring"
                  href="/about"
                >
                  More about me <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div
          aria-label={`Selected work: ${projects
            .map((project) => project.title)
            .join(", ")}`}
          className="home-marquee"
        >
          <div aria-hidden="true" className="home-marquee__track">
            {marqueeProjects.map((project, index) => (
              <span className="home-marquee__item" key={`${project.slug}-${index}`}>
                <strong>{project.title}</strong>
                <i>{project.kicker}</i>
              </span>
            ))}
          </div>
        </div>

        <section className="home-chapter home-about">
          <div className="home-wrap home-about__grid">
            <article className="home-about__intro" data-home-panel>
              <p className="home-kicker">A little about me</p>
              <h2>Consulting roots, product mind, builder energy.</h2>
              <p>
                I started by building analytics systems for enterprise teams.
                Over time, the question that kept pulling me upstream was not only
                “How do we build this?” but “What should we build, for whom, and
                what evidence would make us confident?”
              </p>
            </article>

            <figure className="home-about__portrait" data-home-panel>
              <Image
                alt="Rohan Singh Kandra in graduation attire outside the Eastman Theatre"
                fill
                sizes="(max-width: 820px) 100vw, 40vw"
                src="/images/rohan-graduation.jpeg"
                unoptimized
              />
              <figcaption>{contact.name}</figcaption>
            </figure>

            <article
              className="home-about__more"
              data-home-panel
              data-home-word-section
            >
              <p className="home-about__reveal-copy">
                <WordReveal>
                  That path led through an MBA, product discovery, early-stage
                  delivery, and hands-on AI products. Off the clock, I’m usually
                  at the gym, on a hike, planning a trip, listening to music,
                  looking at sneakers, or saying hello to a dog.
                </WordReveal>
              </p>
              <Link className="home-text-link focus-ring" href="/about">
                more about me <span aria-hidden="true">↗</span>
              </Link>
            </article>
          </div>
        </section>

        <section className="home-chapter home-work">
          <div className="home-wrap home-work__layout">
            <header className="home-work__heading">
              <p className="home-kicker">Things I’ve made</p>
              <h2>A few favorites</h2>
            </header>

            <div className="home-work__stack" data-home-stack>
              {projects.map((project, index) => (
                <div
                  className="home-work-card"
                  key={project.slug}
                  style={{ "--home-card-index": index } as React.CSSProperties}
                >
                  <ProjectCard
                    context="home"
                    priority={index === 0}
                    project={project}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="home-experience">
          <div className="home-wrap home-experience__inner">
            <div className="home-experience__heading" data-home-experience>
              <p className="home-kicker">The path so far</p>
              <h2>Experience</h2>
            </div>
            <div className="home-experience__proof" data-home-experience>
              <p className="home-experience__summary">
                <strong>4+ years</strong>
                <span>
                  {" "}
                  across product management, AI, analytics, and consulting,
                  shipping 0-to-1 products for early-stage teams and modernizing
                  enterprise systems across healthcare, supply chain, utilities,
                  and insurance.
                </span>
              </p>
              <Link
                className="home-button home-button--ink focus-ring"
                href="/experience"
              >
                Explore my experience <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="home-chapter home-principles">
          <div className="home-wrap">
            <header className="home-section-heading">
              <p className="home-kicker">How I build</p>
              <h2>Principles I ship by</h2>
            </header>

            <div className="home-accordion">
              {principles.map((principle) => (
                <article
                  className="home-accordion__item focus-ring"
                  key={principle.number}
                  tabIndex={0}
                >
                  <span>{principle.number}</span>
                  <div>
                    <h3>{principle.title}</h3>
                    <p>{principle.body}</p>
                  </div>
                </article>
              ))}
            </div>

            <p className="home-principles__link">
              <Link className="home-text-link focus-ring" href="/thoughts">
                read more thoughts <span aria-hidden="true">↗</span>
              </Link>
            </p>
          </div>
        </section>

        <section className="home-connect">
          <div className="home-wrap home-connect__inner">
            <p className="home-kicker">Let’s connect</p>
            <h2>
              Say hi — I love a clear problem{" "}
              <em>(and a strong cup of coffee)</em>.
            </h2>
            <div className="home-connect__links">
              <Link className="home-button home-button--ink focus-ring" href="/contact">
                Send me a message <span aria-hidden="true">↗</span>
              </Link>
              {socials.slice(0, 2).map((link) => (
                <a
                  className="home-button home-button--outline focus-ring"
                  href={link.href}
                  key={link.label}
                  rel="noreferrer"
                  target="_blank"
                >
                  {link.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
            <p className="home-connect__signature">— Rohan</p>
          </div>
        </section>
      </div>
    </HomeMotion>
  );
}

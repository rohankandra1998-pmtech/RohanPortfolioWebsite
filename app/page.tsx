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
                <span aria-hidden="true" className="home-inline-image">
                  <Image
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 560px) 72px, 132px"
                    src="/images/projects/launchguard-overview.webp"
                    unoptimized
                  />
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

            <figure className="home-hero__visual" data-home-float>
              <div className="home-hero__visual-frame">
                <Image
                  alt={projects[0].imageAlt}
                  fill
                  priority
                  sizes="(max-width: 820px) 88vw, 34vw"
                  src={projects[0].image}
                  unoptimized
                />
              </div>
              <figcaption>
                <span>{projects[0].title}</span>
                <span>{projects[0].kicker}</span>
              </figcaption>
            </figure>

            <div className="home-hero__quick-links" data-home-intro>
              <a
                className="home-quick-link focus-ring"
                href={projects[0].liveUrl}
                rel="noreferrer"
                target="_blank"
              >
                <span>Explore</span>
                <strong>LaunchGuard</strong>
                <b aria-hidden="true">↗</b>
              </a>
              <a
                className="home-quick-link focus-ring"
                href={projects[1].liveUrl}
                rel="noreferrer"
                target="_blank"
              >
                <span>Try the</span>
                <strong>RAG Assistant</strong>
                <b aria-hidden="true">↗</b>
              </a>
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
            <div>
              <p className="home-kicker">The path so far</p>
              <h2>Experience</h2>
            </div>
            <div>
              <p>
                Product discovery, AI workflows, enterprise analytics,
                stakeholder alignment, and an enduring habit of making the
                complicated clear.
              </p>
              <Link className="home-button home-button--cream focus-ring" href="/experience">
                Experience <span aria-hidden="true">↗</span>
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

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import {
  contact,
  principles,
  projects,
  socials,
} from "@/content/site";

export const metadata: Metadata = {
  description:
    "Portfolio of Rohan Singh Kandra: AI product evaluation, RAG systems, product discovery, analytics, and technical product management.",
};

const currentCards = [
  {
    eyebrow: "Building",
    title: "LaunchGuard",
    body: "Turning AI evaluation evidence into clearer failure patterns and better prompt versions.",
  },
  {
    eyebrow: "Completed",
    title: "STEM MBA · ’26",
    body: "Product management, strategy, and analytics at Simon Business School.",
  },
  {
    eyebrow: "Recently",
    title: "Vivify Solutions",
    body: "Product discovery, MVP definition, workflow automation, and cross-functional delivery.",
  },
  {
    eyebrow: "Based",
    title: "San Francisco Bay Area",
    body: "Exploring product roles where AI, trust, data, and useful workflows meet.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero__canvas" aria-hidden="true">
          <span className="data-chip data-chip--one">
            <small>discovery interviews</small>
            <strong>25+</strong>
          </span>
          <span className="data-chip data-chip--two">
            <small>survey signals</small>
            <strong>500+</strong>
          </span>
          <span className="data-code data-code--one">
            evidence = review(outputs)
            <br />
            patterns = analyze(failures)
            <br />
            prompt = improve(patterns)
          </span>
          <span className="data-chip data-chip--three">
            <small>acceptance criteria</small>
            <strong>150+</strong>
          </span>
          <span className="data-line data-line--one" />
          <span className="data-line data-line--two" />
        </div>

        <div className="wrap hero__content">
          <p className="hero__location" data-reveal>
            Based in {contact.location}
          </p>
          <h1 data-reveal>Hey! I’m Rohan.</h1>
          <h2 data-reveal>{contact.statement}</h2>
          <p className="hero__intro" data-reveal>
            I’m a product manager and AI product builder with a foundation in
            technology consulting and data analytics. I like turning ambiguous
            workflows into products that make the evidence, tradeoffs, and next
            step clear.
          </p>
          <div className="hero__links" data-reveal>
            <Link className="button button--dark focus-ring" href="/work">
              See my work <span aria-hidden="true">→</span>
            </Link>
            <Link className="button button--light focus-ring" href="/about">
              More about me <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="hero__quick-links" data-reveal>
            <a
              className="quick-link focus-ring"
              href={projects[0].liveUrl}
              rel="noreferrer"
              target="_blank"
            >
              <span>Explore</span>
              <strong>LaunchGuard</strong>
              <b aria-hidden="true">→</b>
            </a>
            <a
              className="quick-link focus-ring"
              href={projects[1].liveUrl}
              rel="noreferrer"
              target="_blank"
            >
              <span>Try the</span>
              <strong>RAG Assistant</strong>
              <b aria-hidden="true">→</b>
            </a>
          </div>
        </div>
        <span className="scroll-cue" aria-hidden="true">
          scroll
        </span>
      </section>

      <section className="section section--about-preview">
        <div className="wrap about-preview">
          <div data-reveal>
            <p className="eyebrow">A little about me</p>
            <h2>Consulting roots, product mind, builder energy.</h2>
            <p>
              I started by building analytics systems for enterprise teams.
              Over time, the question that kept pulling me upstream was not only
              “How do we build this?” but “What should we build, for whom, and
              what evidence would make us confident?”
            </p>
            <p>
              That path led through an MBA, product discovery, early-stage
              delivery, and hands-on AI products. Off the clock, I’m usually at
              the gym, on a hike, planning a trip, listening to music, looking
              at sneakers, or saying hello to a dog.
            </p>
            <Link className="arrow-link focus-ring" href="/about">
              more about me <span aria-hidden="true">→</span>
            </Link>
          </div>
          <figure className="portrait-frame" data-reveal>
            <Image
              alt="Rohan Singh Kandra in graduation attire outside the Eastman Theatre"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 42vw"
              src="/images/rohan-graduation.jpeg"
              unoptimized
            />
          </figure>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">What I’m up to right now</p>
          <h2>Currently</h2>
          <div className="now-grid">
            {currentCards.map((card) => (
              <article className="now-card" data-reveal key={card.title}>
                <p>{card.eyebrow}</p>
                <h3>{card.title}</h3>
                <div className="now-card__rule" />
                <p>{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--work">
        <div className="wrap">
          <p className="eyebrow">Things I’ve made</p>
          <h2>A few favorites</h2>
          <div className="project-grid">
            {projects.map((project, index) => (
              <ProjectCard
                context="home"
                key={project.slug}
                priority={index === 0}
                project={project}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">How I build</p>
          <h2>Principles I ship by</h2>
          <div className="principles">
            {principles.map((principle) => (
              <article className="principle" data-reveal key={principle.number}>
                <span>{principle.number}</span>
                <div>
                  <h3>{principle.title}</h3>
                  <p>{principle.body}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="section-link">
            <Link className="arrow-link focus-ring" href="/thoughts">
              read more thoughts <span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </section>

      <section className="section connect-section">
        <div className="wrap connect">
          <p className="eyebrow">Let’s connect</p>
          <h2>
            Say hi — I love a clear problem{" "}
            <em>(and a strong cup of coffee)</em>.
          </h2>
          <div className="connect__links">
            <Link className="button button--dark focus-ring" href="/contact">
              Send me a message <span aria-hidden="true">→</span>
            </Link>
            {socials.slice(0, 2).map((link) => (
              <a
                className="button button--light focus-ring"
                href={link.href}
                key={link.label}
                rel="noreferrer"
                target="_blank"
              >
                {link.label} <span aria-hidden="true">→</span>
              </a>
            ))}
          </div>
          <p className="signature">— Rohan</p>
        </div>
      </section>
    </>
  );
}

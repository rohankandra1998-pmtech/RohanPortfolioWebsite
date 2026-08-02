import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { skillGroups } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Rohan Kandra’s path from analytics and technology consulting to product management and AI product building.",
};

export default function AboutPage() {
  return (
    <>
      <section className="page-head">
        <div className="wrap page-head__grid">
          <div data-reveal>
            <p className="eyebrow eyebrow--dot">About</p>
            <h1>Curiosity is how I move from ambiguity to action.</h1>
            <p className="page-head__lead">
              I’m most useful when the system is complicated, the evidence is
              scattered, and the team needs a product story everyone can act on.
            </p>
          </div>
          <figure className="portrait-frame portrait-frame--about" data-reveal>
            <Image
              alt="Rohan Singh Kandra at his University of Rochester graduation"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 38vw"
              src="/images/rohan-graduation.jpeg"
              unoptimized
            />
          </figure>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap prose-layout">
          <aside className="prose-layout__label" data-reveal>
            The path here
          </aside>
          <div className="prose" data-reveal>
            <p className="prose__lead">
              My first product lessons arrived through data work: every
              dashboard has a user, every metric implies a decision, and every
              technical shortcut eventually becomes part of someone’s
              workflow.
            </p>
            <p>
              At DXC, VNB, and PwC, I worked across reporting automation,
              embedded analytics, data security, supply-chain visibility, and
              enterprise knowledge retrieval. I learned to translate across
              client teams, data engineers, designers, leadership, and the
              people expected to use the result.
            </p>
            <p>
              At Simon Business School and Vivify Solutions, I moved further
              upstream into product discovery and delivery: customer
              interviews, market analysis, personas, journey maps, MVP scope,
              PRDs, roadmaps, user stories, acceptance criteria, Figma flows,
              sprint planning, and backlog decisions.
            </p>
            <p>
              Today I’m especially interested in AI products where trust must
              be designed into the workflow. LaunchGuard explores structured
              human evaluation and prompt improvement. The RAG Knowledge
              Assistant makes retrieval evidence and citations visible. Both
              reflect the same product belief: people trust complex systems
              when they can understand what happened and what to do next.
            </p>
            <blockquote>
              Product management is the practice of connecting user need,
              business value, and technical feasibility—then making the tradeoff
              legible to the whole team.
            </blockquote>
            <p>
              Off the clock, I make time for fitness, hiking, travel, music,
              sneakers, and dogs. I also like building small tools because a
              working prototype tends to sharpen the question faster than
              another abstract debate.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">What I work with</p>
          <h2>Skills & tools</h2>
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <article className="skill-group" data-reveal key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="section-link">
            Have a problem where this mix could help?{" "}
            <Link className="arrow-link focus-ring" href="/contact">
              Reach out <span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

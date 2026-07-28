import type { Metadata } from "next";
import Link from "next/link";
import { experiences } from "@/content/site";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Rohan Kandra’s experience across product management, AI, analytics, consulting, and workflow automation.",
};

const impactStories = [
  {
    number: "01",
    title: "From broad idea to funded next step",
    body:
      "Led discovery for a women’s wellness and productivity app through 25+ interviews, 500+ survey responses, competitive analysis, market sizing, personas, and MVP prioritization. The client signed a roughly $40K development SOW after a $4K discovery engagement.",
  },
  {
    number: "02",
    title: "A national-scale cross-functional build",
    body:
      "Coordinated database, consulting, management, design, and integration partners while leading six embedded dashboards across 150M rows for eSanjeevani OPD. The work included more than 150 tracked action items.",
  },
  {
    number: "03",
    title: "An alert before the dashboard",
    body:
      "After a stakeholder explained that KPI problems were discovered too late, proposed and implemented 50+ automated alerts. The source materials report 55% faster mitigation and 14 days less response time.",
  },
  {
    number: "04",
    title: "Leadership through capability",
    body:
      "Built learning roadmaps, used meeting shadowing and reverse knowledge transfer, and coached interns and client resources so they could own technical work and explain it independently.",
  },
];

export default function ExperiencePage() {
  return (
    <>
      <section className="page-head page-head--experience">
        <div className="wrap" data-reveal>
          <p className="eyebrow eyebrow--dot">The path so far</p>
          <h1>Experience</h1>
          <p className="page-head__lead">
            Product discovery, AI workflows, enterprise analytics, stakeholder
            alignment, and an enduring habit of making the complicated clear.
          </p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap experience-timeline">
          {experiences.map((experience) => (
            <article
              className="experience-entry"
              data-reveal
              key={experience.company}
            >
              <span
                aria-hidden="true"
                className="experience-entry__marker"
              />
              <div className="experience-entry__content">
                <div className="experience-entry__heading">
                  <h2>{experience.role}</h2>
                  <p className="experience-entry__period">{experience.period}</p>
                </div>
                <p className="experience-entry__company">
                  {experience.company} <span aria-hidden="true">·</span>{" "}
                  {experience.location}
                </p>
                <p className="experience-entry__summary">
                  {experience.summary}
                </p>
                <ul className="experience-entry__highlights">
                  {experience.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <ul
                  aria-label={`${experience.company} capabilities`}
                  className="experience-entry__skills"
                >
                  {experience.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">Stories behind the roles</p>
          <h2>Selected impact</h2>
          <div className="research-list">
            {impactStories.map((story) => (
              <article className="research-row" data-reveal key={story.number}>
                <span>{story.number}</span>
                <div>
                  <h3>{story.title}</h3>
                  <p>{story.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">Education</p>
          <h2>Degrees & certificates</h2>
          <div className="education-grid">
            <article data-reveal>
              <h3>Master of Business Administration</h3>
              <p>STEM-designated program</p>
              <p>Simon Business School · University of Rochester · 2024–2026</p>
              <span>Merit scholarship</span>
            </article>
            <article data-reveal>
              <h3>B.Tech. Electronics & Communication Engineering</h3>
              <p>Vellore Institute of Technology · 2016–2020</p>
              <span>Debate Society · Toastmasters · U&I</span>
            </article>
            <article data-reveal>
              <h3>Microsoft credentials</h3>
              <p>Power BI Data Analyst · Azure Fundamentals</p>
              <span>DA-100 · AZ-900</span>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">Recognition</p>
          <h2>A wall of small wins</h2>
          <div className="wins-grid" data-reveal>
            <div>
              <h3>Professional</h3>
              <p>PwC Customer Recognition Award · 2024</p>
              <p>VNB Spot Award · 2023</p>
              <p>DXC Champs Award · 2022</p>
            </div>
            <div>
              <h3>Leadership & service</h3>
              <p>Associate Product Manager · Simon PM Labs</p>
              <p>Debate Society of VIT · novice and parliamentary wins</p>
              <p>Toastmasters International VIT · U&I volunteer</p>
            </div>
          </div>
          <p className="section-link">
            <Link className="arrow-link focus-ring" href="/work">
              See selected product work <span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

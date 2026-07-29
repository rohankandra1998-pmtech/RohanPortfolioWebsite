import type { Metadata } from "next";
import Image from "next/image";
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

const simonLeadershipHighlights = [
  "Led product discovery and strategy for an AI-powered learning assistant serving 12,000+ students by conducting primary market research, user interviews, product-market-fit analysis, and Jobs-to-Be-Done research, increasing student engagement and professor adoption by 40%.",
  "Identified and prioritized high-value product opportunities by developing student and faculty personas, analyzing customer pain points, conducting competitive research, and creating opportunity maps, enabling the team to focus feature development on the most important user needs and workflows.",
  "Drove continuous product improvement by translating user feedback and research insights into actionable feature recommendations and collaborating with engineering and university stakeholders to evaluate feasibility, align customer needs with technical constraints, and guide roadmap decisions throughout the product lifecycle.",
] as const;

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
                className={`experience-entry__marker experience-entry__marker--${experience.logoVariant}`}
              >
                <Image
                  alt=""
                  className="experience-entry__logo"
                  height={80}
                  sizes="(max-width: 560px) 42px, (max-width: 1024px) 48px, 56px"
                  src={experience.logoSrc}
                  unoptimized
                  width={80}
                />
              </span>
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

      <section className="section" id="education">
        <div className="wrap">
          <p className="eyebrow eyebrow--dot">Education</p>
          <h2>Education & certifications</h2>

          <div className="education-panel" data-reveal>
            <article className="education-degree education-degree--mba">
              <header className="education-degree__header">
                <span
                  aria-hidden="true"
                  className="education-degree__logo-medallion education-degree__logo-medallion--simon"
                >
                  <Image
                    alt=""
                    className="education-degree__logo"
                    height={72}
                    sizes="(max-width: 560px) 52px, 64px"
                    src="/images/education/university-of-rochester-logo.png"
                    unoptimized
                    width={72}
                  />
                </span>
                <div>
                  <h3>Master of Business Administration</h3>
                  <p>STEM-designated program · June 2024 – May 2026</p>
                  <p>
                    Simon Business School · University of Rochester ·
                    Rochester, New York
                  </p>
                  <p className="education-degree__accent">
                    Merit Scholarship (45%)
                  </p>
                </div>
              </header>

              <div className="education-degree__section">
                <p className="education-degree__label">Leadership</p>
                <p className="education-degree__role">
                  <strong>Associate Product Manager</strong> · Simon Product
                  Management Club (SPMC)
                </p>
                <ul className="education-degree__leadership">
                  {simonLeadershipHighlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>

              <div className="education-degree__section">
                <p className="education-degree__label">Campus involvement</p>
                <p>
                  Simon Product Management Club · Simon Marketing Association ·
                  Simon Volunteers · Simon Pride Alliance
                </p>
              </div>
            </article>

            <article className="education-degree">
              <header className="education-degree__header">
                <span
                  aria-hidden="true"
                  className="education-degree__logo-medallion"
                >
                  <Image
                    alt=""
                    className="education-degree__logo"
                    height={72}
                    sizes="(max-width: 560px) 52px, 64px"
                    src="/images/education/vellore-institute-of-technology-logo.svg"
                    unoptimized
                    width={72}
                  />
                </span>
                <div>
                  <h3>Bachelor of Technology</h3>
                  <p className="education-degree__specialization">
                    Electronics & Communication Engineering
                  </p>
                  <p>July 2016 – June 2020</p>
                  <p>Vellore Institute of Technology · Vellore, India</p>
                </div>
              </header>

              <div className="education-degree__section">
                <p className="education-degree__label">Activities</p>
                <p>
                  Debate Society of VIT · Toastmasters International VIT · U&I NGO
                </p>
                <p>
                  Volunteered with U&I, an NGO providing educational support to
                  children from underprivileged backgrounds.
                </p>
                <p>
                  Contributed content to Toastmasters International VIT’s annual
                  magazine while developing public-speaking and communication
                  skills.
                </p>
              </div>

              <div className="education-degree__section">
                <p className="education-degree__label">Accolades</p>
                <div className="education-accolade">
                  <svg
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M8 4h8v5a4 4 0 0 1-8 0V4Zm0 2H5v1a4 4 0 0 0 4 4m7-5h3v1a4 4 0 0 1-4 4m-3 2v4m-4 0h8"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.7"
                    />
                  </svg>
                  <p>
                    Novice Title — MS Ramaiah College of Law, 2017 (British Parliamentary)
                  </p>
                </div>
                <div className="education-accolade">
                  <svg
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M8.5 18.5C5.8 16.5 4.2 13.1 5 9.8m10.5 8.7c2.7-2 4.3-5.4 3.5-8.7M7.2 8.2 5.4 6.4m1.4 5.3-2.3-.8m3.9 3.7-2.1.5m10.5-6.9 1.8-1.8m-1.4 5.3 2.3-.8m-3.9 3.7 2.1.5M9 20h6"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.7"
                    />
                  </svg>
                  <p>Riviera 2018 — Asian Parliamentary</p>
                </div>
              </div>
            </article>
          </div>

          <div className="certifications-panel" data-reveal>
            <p className="education-degree__label">
              Microsoft certifications
            </p>
            <div className="certifications-grid">
              <article className="certification">
                <span aria-hidden="true" className="certification__icon">
                  <svg fill="none" viewBox="0 0 32 32">
                    <path
                      d="M5 24h6V13H5v11Zm8 0h6V8h-6v16Zm8 0h6V4h-6v20Z"
                      stroke="currentColor"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                    />
                  </svg>
                </span>
                <div>
                  <h3>Power BI Data Analyst Associate</h3>
                  <p>DA-100</p>
                </div>
              </article>
              <article className="certification">
                <span aria-hidden="true" className="certification__icon">
                  <svg fill="none" viewBox="0 0 32 32">
                    <path
                      d="M9.5 24.5h14a5.5 5.5 0 0 0 .5-11 8 8 0 0 0-15.3-1.7 6.4 6.4 0 0 0 .8 12.7Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                    />
                  </svg>
                </span>
                <div>
                  <h3>Microsoft Azure Fundamentals</h3>
                  <p>AZ-900</p>
                </div>
              </article>
            </div>
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

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { experiences } from "@/content/site";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Rohan Kandra’s experience across product management, AI, analytics, consulting, and workflow automation.",
};

const simonLeadershipHighlights = [
  "Led product discovery and strategy for an AI-powered learning assistant serving 12,000+ students by conducting primary market research, user interviews, product-market-fit analysis, and Jobs-to-Be-Done research, increasing student engagement and professor adoption by 40%.",
  "Identified and prioritized high-value product opportunities by developing student and faculty personas, analyzing customer pain points, conducting competitive research, and creating opportunity maps, enabling the team to focus feature development on the most important user needs and workflows.",
  "Drove continuous product improvement by translating user feedback and research insights into actionable feature recommendations and collaborating with engineering and university stakeholders to evaluate feasibility, align customer needs with technical constraints, and guide roadmap decisions throughout the product lifecycle.",
] as const;

const professionalAwards = [
  {
    company: "PwC",
    title: "PwC Customer Recognition Award",
    year: "2024",
    description: "Recognized for delivering impact and driving client value.",
    logoSrc: "/images/experience/pwc-logo.svg",
    logoVariant: "standard",
  },
  {
    company: "VNB Consulting Services",
    title: "VNB Spot Award",
    year: "2023",
    description: "Awarded for going above and beyond in key initiatives.",
    logoSrc: "/images/experience/vnb-consulting-logo.png",
    logoVariant: "wide",
  },
  {
    company: "DXC Technology",
    title: "DXC Champs Award",
    year: "2022",
    description: "Recognized for outstanding performance and teamwork.",
    logoSrc: "/images/experience/dxc-technology-logo.svg",
    logoVariant: "wide",
  },
] as const;

const recognitionStats = [
  {
    value: "3",
    label: "Awards",
    detail: "Earned",
  },
  {
    value: "3",
    label: "Organizations",
    detail: "Recognized",
  },
  {
    value: "2022–2024",
    label: "Award spans",
    detail: "Three consecutive years",
  },
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

      <section className="section" id="education">
        <div className="wrap">
          <p className="eyebrow eyebrow--dot">Education</p>
          <h2>Education & Certifications</h2>

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
                  <p className="education-degree__specialization">
                    STEM-designated program
                  </p>
                  <p className="education-degree__date">
                    June 2024 – May 2026
                  </p>
                  <p>Simon Business School · University of Rochester</p>
                  <p>Rochester, New York</p>
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
                  <p className="education-degree__date">
                    July 2016 – June 2020
                  </p>
                  <p>Vellore Institute of Technology</p>
                  <p>Vellore, India</p>
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
              Microsoft Certifications
            </p>
            <div className="certifications-grid">
              <article className="certification">
                <span className="certification__logo-wrap">
                  <Image
                    alt=""
                    className="certification__logo"
                    height={600}
                    sizes="(max-width: 360px) 60px, (max-width: 560px) 68px, 76px"
                    src="/images/certifications/power-bi-data-analyst-associate-logo.png"
                    unoptimized
                    width={600}
                  />
                </span>
                <div>
                  <h3>
                    <a
                      aria-label="Power BI Data Analyst Associate credential on Credly (opens in a new tab)"
                      className="certification__link"
                      href="https://www.credly.com/badges/2ec73ddb-8e09-49e8-a0d6-6c6cc0936443/public_url"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span className="certification__link-label">
                        Power BI Data Analyst Associate
                      </span>
                      <span
                        aria-hidden="true"
                        className="certification__link-arrow"
                      >
                        ↗︎
                      </span>
                    </a>
                  </h3>
                  <p>DA-100</p>
                </div>
              </article>
              <article className="certification">
                <span className="certification__logo-wrap">
                  <Image
                    alt=""
                    className="certification__logo"
                    height={600}
                    sizes="(max-width: 360px) 60px, (max-width: 560px) 68px, 76px"
                    src="/images/certifications/microsoft-azure-fundamentals-logo.png"
                    unoptimized
                    width={600}
                  />
                </span>
                <div>
                  <h3>
                    <a
                      aria-label="Microsoft Azure Fundamentals credential on Credly (opens in a new tab)"
                      className="certification__link"
                      href="https://www.credly.com/badges/5ce48d65-119d-433c-992d-352763ed8857?source=linked_in_profile"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span className="certification__link-label">
                        Microsoft Azure Fundamentals
                      </span>
                      <span
                        aria-hidden="true"
                        className="certification__link-arrow"
                      >
                        ↗︎
                      </span>
                    </a>
                  </h3>
                  <p>AZ-900</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="recognition">
        <div className="wrap">
          <p className="eyebrow eyebrow--dot">Recognition</p>
          <h2>A wall of small wins</h2>
          <div className="recognition-grid" data-reveal>
            <div className="recognition-awards">
              <div className="recognition-awards__intro">
                <h3>Professional recognition</h3>
                <p>
                  Honored to be recognized by teams and organizations I’ve had
                  the privilege to work with.
                </p>
              </div>

              <ul className="recognition-award-list">
                {professionalAwards.map((award) => (
                  <li className="recognition-award" key={award.title}>
                    <span
                      className={`recognition-award__logo-wrap recognition-award__logo-wrap--${award.logoVariant}`}
                    >
                      <Image
                        alt=""
                        className="recognition-award__logo"
                        height={72}
                        sizes="(max-width: 560px) 54px, 72px"
                        src={award.logoSrc}
                        unoptimized
                        width={72}
                      />
                    </span>
                    <span
                      aria-hidden="true"
                      className="recognition-award__accent"
                    />
                    <div className="recognition-award__content">
                      <h4 className="recognition-award__heading">
                        {award.title}{" "}
                        <span className="recognition-award__year">
                          <span aria-hidden="true">·</span> {award.year}
                        </span>
                      </h4>
                      <p>{award.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <dl className="recognition-stats">
              {recognitionStats.map((stat) => (
                <div className="recognition-stat" key={stat.label}>
                  <dt className="recognition-stat__value">{stat.value}</dt>
                  <dd>
                    <span className="recognition-stat__label">
                      {stat.label}
                    </span>
                    <span className="recognition-stat__detail">
                      {stat.detail}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <article className="company-feature" data-reveal>
            <div className="company-feature__content">
              <p className="company-feature__eyebrow">Company feature</p>
              <h3 className="company-feature__title">
                Featured on Vivify Solutions’ team page
              </h3>
              <div className="company-feature__body">
                <p>
                  Featured on Vivify Solutions’ official team page as a Product
                  Manager, highlighting my work across product discovery,
                  product vision and roadmap, backlog prioritization, sprint
                  planning, and cross-functional execution.
                </p>
                <p>
                  The profile also recognizes my 4+ years of experience across
                  product development, data analytics, and consulting, alongside
                  my MBA studies at Simon Business School focused on Product
                  Management and Strategy.
                </p>
              </div>
            </div>

            <figure className="company-feature__media">
              <div className="company-feature__image-frame">
                <Image
                  alt="Vivify Solutions team page featuring Rohan Singh Kandra as Product Manager"
                  className="company-feature__image"
                  height={874}
                  sizes="(max-width: 820px) calc(100vw - 80px), (max-width: 560px) calc(100vw - 56px), 60vw"
                  src="/images/recognition/vivify-team-page-feature.png"
                  unoptimized
                  width={888}
                />
              </div>
              <figcaption className="company-feature__caption">
                Snapshot of Vivify Solutions’ official team page.
              </figcaption>
            </figure>
          </article>
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

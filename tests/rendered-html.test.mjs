import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), "utf8");
}

test("portfolio includes every public route and project case study", async () => {
  const [home, about, experience, work, thoughts, contact, projects] =
    await Promise.all([
      source("app/page.tsx"),
      source("app/about/page.tsx"),
      source("app/experience/page.tsx"),
      source("app/work/page.tsx"),
      source("app/thoughts/page.tsx"),
      source("app/contact/page.tsx"),
      source("content/site.ts"),
    ]);

  assert.match(home, /A few favorites/);
  assert.match(about, /Curiosity is how I move from ambiguity to action/);
  assert.match(experience, /Stories behind the roles/);
  assert.match(work, /Products shaped through evidence/);
  assert.match(thoughts, /Notes to self/);
  assert.match(contact, /Say hi/);
  assert.match(projects, /slug: "launchguard"/);
  assert.match(projects, /slug: "rag-knowledge-assistant"/);
  assert.match(projects, /slug: "ur-coursebot"/);
});

test("metadata, accessibility, and privacy safeguards are present", async () => {
  const [layout, shell, css, packageJson] = await Promise.all([
    source("app/layout.tsx"),
    source("components/site-shell.tsx"),
    source("app/globals.css"),
    source("package.json"),
  ]);

  assert.match(layout, /application\/ld\+json/);
  assert.match(layout, /Skip to main content/);
  assert.match(layout, /og\.png/);
  assert.match(shell, /aria-label="Primary navigation"/);
  assert.match(shell, /aria-expanded/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /:focus-visible/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});

test("global branding uses the supplied logo and canonical contact name", async () => {
  const [layout, shell] = await Promise.all([
    source("app/layout.tsx"),
    source("components/site-shell.tsx"),
    access(new URL("public/images/branding/rohan-logo.png", root)),
    access(new URL("app/icon.png", root)),
    access(new URL("app/apple-icon.png", root)),
  ]);

  assert.match(shell, /\{contact\.name\}/);
  assert.match(shell, /\/images\/branding\/rohan-logo\.png/);
  assert.doesNotMatch(shell, /Rohan\.Kandra/);
  assert.doesNotMatch(layout, /rohan-graduation\.jpeg/);
});

test("header social links use accessible official icon marks", async () => {
  const [shell, socialData, packageJson] = await Promise.all([
    source("components/site-shell.tsx"),
    source("content/site.ts"),
    source("package.json"),
  ]);

  assert.match(shell, /socials\.slice\(0,\s*2\)\.map/);
  assert.match(socialData, /label: "LinkedIn"/);
  assert.match(socialData, /label: "GitHub"/);
  assert.match(shell, /aria-label=\{`\$\{link\.label\} profile`\}/);
  assert.match(shell, /<SocialIcon label=\{link\.label\} \/>/);
  assert.equal(shell.match(/<svg/g)?.length, 2);
  assert.equal(shell.match(/<svg[\s\S]*?aria-hidden="true"/g)?.length, 2);
  assert.equal(shell.match(/focusable="false"/g)?.length, 2);
  assert.match(shell, /target="_blank"/);
  assert.match(shell, /rel="noreferrer"/);
  assert.doesNotMatch(shell, /\n\s*\{link\.label\}\n\s*<\/a>/);
  assert.doesNotMatch(packageJson, /octicons|react-icons|lucide/);
});

test("sticky header exposes a semantic active route and subtle visual boundary", async () => {
  const [shell, css] = await Promise.all([
    source("components/site-shell.tsx"),
    source("app/globals.css"),
  ]);
  const activeDotRule = css.match(/\.nav-link::after\s*\{([^}]*)\}/)?.[1] ?? "";

  assert.match(shell, /pathname === item\.href \? "nav-link--active" : ""/);
  assert.match(
    shell,
    /aria-current=\{pathname === item\.href \? "page" : undefined\}/,
  );
  assert.match(
    css,
    /\.site-nav\s*\{[\s\S]*?border-bottom:\s*1px solid var\(--line\)/,
  );
  assert.match(
    activeDotRule,
    /background:\s*var\(--accent\)/,
  );
  assert.match(activeDotRule, /border-radius:\s*50%/);
  assert.match(css, /\.nav-link--active::after\s*\{[\s\S]*?opacity:\s*1/);
  assert.doesNotMatch(css, /\.nav-link:hover::after/);
  assert.doesNotMatch(activeDotRule, /background:\s*var\(--ink\)/);
  assert.doesNotMatch(activeDotRule, /scaleX\(/);
});

test("experience uses a route-scoped orange theme and masked logo treatment", async () => {
  const [shell, css] = await Promise.all([
    source("components/site-shell.tsx"),
    source("app/globals.css"),
  ]);

  assert.match(shell, /pathname === "\/experience" \? "experience" : "default"/);
  assert.match(shell, /data-page-theme=\{pageTheme\}/);
  assert.match(shell, /className="brand__mark"/);
  assert.match(shell, /className="brand__logo-mask"/);
  assert.match(shell, /src="\/images\/branding\/rohan-logo\.png"/);
  assert.match(
    css,
    /\.site-shell\[data-page-theme="experience"\]\s*\{[\s\S]*?--accent:\s*#e25e2c;[\s\S]*?--accent-dark:\s*#b0431a;[\s\S]*?--accent-soft:\s*#fbe7dc;/i,
  );
  assert.match(
    css,
    /\.site-shell\[data-page-theme="experience"\] \.brand__logo-mask\s*\{[\s\S]*?background-color:\s*var\(--accent\)/,
  );
  assert.match(
    css,
    /mask:\s*url\("\/images\/branding\/rohan-logo\.png"\)/,
  );
  assert.doesNotMatch(css, /\.brand__logo\s*\{[^}]*filter:/);
});

test("experience renders the editorial timeline with semantic accomplishments and skills", async () => {
  const [experience, content] = await Promise.all([
    source("app/experience/page.tsx"),
    source("content/site.ts"),
  ]);

  assert.match(experience, /className="page-head page-head--experience"/);
  assert.match(experience, /className="eyebrow eyebrow--dot"/);
  assert.match(experience, /className="wrap experience-timeline"/);
  assert.match(experience, /experiences\.map\(\(experience\) =>/);
  assert.match(
    experience,
    /className=\{`experience-entry__marker experience-entry__marker--\$\{experience\.logoVariant\}`\}/,
  );
  assert.doesNotMatch(experience, /timeline-row__meta/);
  assert.match(
    experience,
    /<ul className="experience-entry__highlights">[\s\S]*?experience\.highlights\.map[\s\S]*?<li key=\{highlight\}>/,
  );
  assert.match(
    experience,
    /<ul[\s\S]*?className="experience-entry__skills"[\s\S]*?experience\.skills\.map[\s\S]*?<li key=\{skill\}>/,
  );
  assert.match(content, /export type Experience = \{[\s\S]*?skills: string\[\];/);
  assert.equal(content.match(/\n    skills: \[/g)?.length, 4);
  assert.match(experience, /Selected impact/);
  assert.match(experience, /Education/);
  assert.match(experience, /Recognition/);
});

test("experience timeline uses four local, accessible logo medallions", async () => {
  const [experience, content, css] = await Promise.all([
    source("app/experience/page.tsx"),
    source("content/site.ts"),
    source("app/globals.css"),
  ]);
  const experienceType =
    content.match(/export type Experience = \{([\s\S]*?)\n\};/)?.[1] ?? "";
  const experienceData =
    content.match(
      /export const experiences: Experience\[\] = \[([\s\S]*?)\n\];/,
    )?.[1] ?? "";
  const logoPaths = [
    ...experienceData.matchAll(/logoSrc: "([^"]+)"/g),
  ].map((match) => match[1]);
  const markerRule =
    css.match(/\.experience-entry__marker\s*\{([^}]*)\}/)?.[1] ?? "";
  const logoRule =
    css.match(/(?:^|\n)\.experience-entry__logo\s*\{([^}]*)\}/)?.[1] ?? "";
  const timelineRule =
    css.match(/\.experience-timeline::before\s*\{([^}]*)\}/)?.[1] ?? "";
  const entryRule =
    css.match(/\.experience-entry\s*\{([^}]*)\}/)?.[1] ?? "";
  const markerMarkup =
    experience.match(
      /<span[\s\S]*?className=\{`experience-entry__marker[\s\S]*?<\/span>/,
    )?.[0] ?? "";

  assert.match(experienceType, /logoSrc: string;/);
  assert.match(experienceType, /logoVariant: ExperienceLogoVariant;/);
  assert.match(
    content,
    /export type ExperienceLogoVariant = "standard" \| "wide" \| "compact";/,
  );
  assert.equal(experienceData.match(/\n    company: "/g)?.length, 4);
  assert.equal(logoPaths.length, 4);
  assert.equal(new Set(logoPaths).size, 4);

  for (const logoPath of logoPaths) {
    assert.match(logoPath, /^\/images\/experience\//);
    assert.doesNotMatch(logoPath, /https?:|data:|base64/i);
    await access(new URL(`public${logoPath}`, root));
  }

  assert.match(experience, /import Image from "next\/image";/);
  assert.match(experience, /src=\{experience\.logoSrc\}/);
  assert.match(
    experience,
    /experience-entry__marker--\$\{experience\.logoVariant\}/,
  );
  assert.match(experience, /experiences\.map\(\(experience\) =>/);
  assert.doesNotMatch(experience, /switch\s*\(\s*experience\.company/);
  assert.match(markerMarkup, /aria-hidden="true"/);
  assert.match(markerMarkup, /<Image[\s\S]*?alt=""/);
  assert.doesNotMatch(markerMarkup, /<(?:a|button)\b/);

  assert.match(logoRule, /object-fit:\s*contain/);
  assert.match(markerRule, /background:\s*var\(--card\)/);
  assert.match(markerRule, /border:\s*2px solid var\(--accent\)/);
  assert.match(markerRule, /border-radius:\s*50%/);
  assert.match(markerRule, /height:\s*(?:5[2-9]|[6-9]\d)px/);
  assert.match(markerRule, /overflow:\s*hidden/);
  assert.match(timelineRule, /left:\s*28px/);
  assert.match(entryRule, /padding:\s*24px 0 74px 82px/);
  assert.match(
    css,
    /@media \(max-width: 1024px\)[\s\S]*?\.experience-timeline::before\s*\{[\s\S]*?left:\s*24px[\s\S]*?\.experience-entry__marker\s*\{[\s\S]*?height:\s*48px[\s\S]*?width:\s*48px/,
  );
  assert.match(
    css,
    /@media \(max-width: 560px\)[\s\S]*?\.experience-timeline::before\s*\{[\s\S]*?left:\s*21px[\s\S]*?\.experience-entry\s*\{[\s\S]*?padding:\s*20px 0 60px 60px[\s\S]*?\.experience-entry__marker\s*\{[\s\S]*?height:\s*42px[\s\S]*?width:\s*42px/,
  );
});

test("education and certifications use verifiable credentials, supplied logos, and exact leadership content", async () => {
  const [experience, css] = await Promise.all([
    source("app/experience/page.tsx"),
    source("app/globals.css"),
    access(
      new URL(
        "public/images/education/university-of-rochester-logo.png",
        root,
      ),
    ),
    access(
      new URL(
        "public/images/education/vellore-institute-of-technology-logo.svg",
        root,
      ),
    ),
    access(
      new URL(
        "public/images/certifications/power-bi-data-analyst-associate-logo.png",
        root,
      ),
    ),
    access(
      new URL(
        "public/images/certifications/microsoft-azure-fundamentals-logo.png",
        root,
      ),
    ),
  ]);
  const leadershipData =
    experience.match(
      /const simonLeadershipHighlights = \[([\s\S]*?)\] as const;/,
    )?.[1] ?? "";
  const logoMedallionRule =
    css.match(/\.education-degree__logo-medallion\s*\{([^}]*)\}/)?.[1] ?? "";
  const exactLeadershipHighlights = [
    "Led product discovery and strategy for an AI-powered learning assistant serving 12,000+ students by conducting primary market research, user interviews, product-market-fit analysis, and Jobs-to-Be-Done research, increasing student engagement and professor adoption by 40%.",
    "Identified and prioritized high-value product opportunities by developing student and faculty personas, analyzing customer pain points, conducting competitive research, and creating opportunity maps, enabling the team to focus feature development on the most important user needs and workflows.",
    "Drove continuous product improvement by translating user feedback and research insights into actionable feature recommendations and collaborating with engineering and university stakeholders to evaluate feasibility, align customer needs with technical constraints, and guide roadmap decisions throughout the product lifecycle.",
  ];

  assert.match(experience, /<h2>Education & Certifications<\/h2>/);
  assert.match(experience, />\s*Microsoft Certifications\s*</);
  assert.match(
    experience,
    /<p className="eyebrow eyebrow--dot">Education<\/p>/,
  );
  assert.match(
    experience,
    /<Image[\s\S]*?alt=""[\s\S]*?src="\/images\/education\/university-of-rochester-logo\.png"/,
  );
  assert.match(
    experience,
    /education-degree__logo-medallion--simon/,
  );
  assert.match(
    experience,
    /<Image[\s\S]*?alt=""[\s\S]*?src="\/images\/education\/vellore-institute-of-technology-logo\.svg"/,
  );
  assert.match(
    experience,
    /<p className="education-degree__date">\s*June 2024 – May 2026\s*<\/p>/,
  );
  assert.match(
    experience,
    /<p className="education-degree__date">\s*July 2016 – June 2020\s*<\/p>/,
  );
  assert.match(
    experience,
    /<p>Simon Business School · University of Rochester<\/p>\s*<p>Rochester, New York<\/p>/,
  );
  assert.match(
    experience,
    /<p>Vellore Institute of Technology<\/p>\s*<p>Vellore, India<\/p>/,
  );
  assert.match(
    experience,
    /href="https:\/\/www\.credly\.com\/badges\/2ec73ddb-8e09-49e8-a0d6-6c6cc0936443\/public_url"/,
  );
  assert.match(
    experience,
    /href="https:\/\/www\.credly\.com\/badges\/5ce48d65-119d-433c-992d-352763ed8857\?source=linked_in_profile"/,
  );
  assert.equal(
    experience.match(/rel="noopener noreferrer"\s*target="_blank"/g)?.length,
    2,
  );
  assert.equal(
    experience.match(/aria-label="[^"]*credential on Credly \(opens in a new tab\)"/g)?.length,
    2,
  );
  assert.match(
    experience,
    /src="\/images\/certifications\/power-bi-data-analyst-associate-logo\.png"/,
  );
  assert.match(
    experience,
    /src="\/images\/certifications\/microsoft-azure-fundamentals-logo\.png"/,
  );
  assert.equal(
    experience.match(/className="certification__logo"/g)?.length,
    2,
  );
  assert.equal(
    experience.match(/className="certification__logo-wrap"/g)?.length,
    2,
  );
  assert.doesNotMatch(
    experience,
    /className="certification__icon"|<article className="certification">[\s\S]*?<svg/,
  );
  assert.equal(leadershipData.match(/\n  "/g)?.length, 3);
  assert.match(
    experience,
    /<ul className="education-degree__leadership">[\s\S]*?simonLeadershipHighlights\.map[\s\S]*?<li key=\{highlight\}>\{highlight\}<\/li>/,
  );
  for (const highlight of exactLeadershipHighlights) {
    assert.ok(experience.includes(highlight), `Missing exact bullet: ${highlight}`);
  }

  for (const requiredContent of [
    "Merit Scholarship (45%)",
    "Simon Pride Alliance",
    "U&I NGO",
    "Novice Title",
    "British Parliamentary",
    "Riviera 2018",
    "Asian Parliamentary",
    "Power BI Data Analyst Associate",
    "DA-100",
    "Microsoft Azure Fundamentals",
    "AZ-900",
  ]) {
    assert.ok(experience.includes(requiredContent), `Missing: ${requiredContent}`);
  }

  assert.doesNotMatch(experience, /className="education-grid"/);
  assert.doesNotMatch(css, /\.education-grid/);
  assert.match(
    css,
    /\.education-panel\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0,\s*1\.15fr\) minmax\(0,\s*1fr\)/,
  );
  assert.match(
    css,
    /@media \(max-width: 820px\)[\s\S]*?\.education-panel\s*\{[\s\S]*?grid-template-columns:\s*1fr/,
  );
  assert.match(
    css,
    /@media \(max-width: 560px\)[\s\S]*?\.certifications-grid\s*\{[\s\S]*?grid-template-columns:\s*1fr/,
  );
  assert.match(
    css,
    /\.education-degree__date[\s\S]*?font-weight:\s*500/,
  );
  assert.match(
    css,
    /\.certification__logo\s*\{[\s\S]*?object-fit:\s*contain/,
  );
  assert.match(
    css,
    /\.certification__link:focus-visible\s*\{[\s\S]*?outline:\s*2px solid var\(--accent\)/,
  );
  assert.match(
    css,
    /\.certification__link-label\s*\{[\s\S]*?border-bottom:\s*1px solid/,
  );
  assert.match(
    css,
    /\.certification__link-arrow\s*\{[\s\S]*?transition:\s*transform 0\.3s var\(--ease\)/,
  );
  assert.match(
    css,
    /(?:^|\n)\.education-degree__logo\s*\{[\s\S]*?object-fit:\s*contain/,
  );
  assert.match(logoMedallionRule, /background:\s*transparent/);
  assert.match(
    logoMedallionRule,
    /border:\s*1px solid rgba\(226,\s*94,\s*44,\s*0\.2\)/,
  );
  assert.match(
    css,
    /\.education-degree__logo-medallion--simon\s*\{[\s\S]*?padding:\s*0/,
  );
});

test("recognition uses an asymmetric professional awards showcase", async () => {
  const [experience, css] = await Promise.all([
    source("app/experience/page.tsx"),
    source("app/globals.css"),
  ]);
  const recognitionSection =
    experience.match(
      /<section className="section" id="recognition">\s*<div className="wrap">\s*<p className="eyebrow">Recognition<\/p>[\s\S]*?<\/section>/,
    )?.[0] ?? "";
  const awardsData =
    experience.match(
      /const professionalAwards = \[([\s\S]*?)\] as const;/,
    )?.[1] ?? "";
  const statsData =
    experience.match(
      /const recognitionStats = \[([\s\S]*?)\] as const;/,
    )?.[1] ?? "";

  assert.match(recognitionSection, /A wall of small wins/);
  assert.match(recognitionSection, /Professional recognition/);
  assert.match(
    recognitionSection,
    /professionalAwards\.map\(\(award\) =>/,
  );
  assert.match(recognitionSection, /recognitionStats\.map\(\(stat\) =>/);
  assert.match(recognitionSection, /<dl className="recognition-stats">/);

  for (const requiredContent of [
    "PwC Customer Recognition Award",
    "2024",
    "Recognized for delivering impact and driving client value.",
    "VNB Spot Award",
    "2023",
    "Awarded for going above and beyond in key initiatives.",
    "DXC Champs Award",
    "2022",
    "Recognized for outstanding performance and teamwork.",
  ]) {
    assert.ok(awardsData.includes(requiredContent), `Missing: ${requiredContent}`);
  }

  for (const requiredContent of [
    "3",
    "Awards",
    "Earned",
    "Organizations",
    "Recognized",
    "2022–2024",
    "Award spans",
    "Three consecutive years",
  ]) {
    assert.ok(statsData.includes(requiredContent), `Missing: ${requiredContent}`);
  }

  for (const logoPath of [
    "/images/experience/pwc-logo.svg",
    "/images/experience/vnb-consulting-logo.png",
    "/images/experience/dxc-technology-logo.svg",
  ]) {
    assert.ok(awardsData.includes(logoPath), `Missing logo: ${logoPath}`);
    await access(new URL(`public${logoPath}`, root));
  }

  assert.match(recognitionSection, /src=\{award\.logoSrc\}/);
  assert.match(
    recognitionSection,
    /<Image[\s\S]*?alt=""[\s\S]*?className="recognition-award__logo"/,
  );
  assert.match(
    recognitionSection,
    /className="arrow-link focus-ring" href="\/work"/,
  );
  assert.doesNotMatch(recognitionSection, /Leadership & service/);
  assert.doesNotMatch(
    recognitionSection,
    /Associate Product Manager · Simon PM Labs/,
  );
  assert.doesNotMatch(
    recognitionSection,
    /Debate Society of VIT · novice and parliamentary wins/,
  );
  assert.doesNotMatch(
    recognitionSection,
    /Toastmasters International VIT · U&I volunteer/,
  );
  assert.doesNotMatch(experience, /className="wins-grid"/);
  assert.doesNotMatch(css, /\.wins-grid/);

  assert.match(
    css,
    /\.recognition-grid\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0,\s*2\.05fr\) minmax\(240px,\s*0\.95fr\)/,
  );
  assert.match(
    css,
    /\.recognition-award__logo\s*\{[\s\S]*?object-fit:\s*contain/,
  );
  assert.match(
    css,
    /\.recognition-award__accent\s*\{[\s\S]*?background:\s*var\(--accent\)/,
  );
  assert.match(
    css,
    /@media \(max-width: 820px\)[\s\S]*?\.recognition-grid\s*\{[\s\S]*?grid-template-columns:\s*1fr[\s\S]*?\.recognition-stats\s*\{[\s\S]*?grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/,
  );
  assert.match(
    css,
    /@media \(max-width: 560px\)[\s\S]*?\.recognition-stats\s*\{[\s\S]*?grid-template-columns:\s*1fr/,
  );
});

test("experience content expands each role with source-backed resume details", async () => {
  const [content, experiencePage] = await Promise.all([
    source("content/site.ts"),
    source("app/experience/page.tsx"),
  ]);
  const experienceData =
    content.match(
      /export const experiences: Experience\[\] = \[([\s\S]*?)\n\];/,
    )?.[1] ?? "";

  assert.equal(experienceData.match(/\n    company: "/g)?.length, 4);
  assert.equal(experienceData.match(/\n    highlights: \[/g)?.length, 4);
  assert.equal(experienceData.match(/\n    skills: \[/g)?.length, 4);
  assert.doesNotMatch(experienceData, /company: "Unicloud"/i);

  assert.match(content, /6 MVP product features/);
  assert.match(content, /5K\+ weekly active users/);
  assert.match(content, /4\.5 parent CSAT/);
  assert.match(content, /62% lesson completion/);
  assert.match(content, /6-stage user journey/);
  assert.match(content, /1,000\+ survey responses/);
  assert.match(content, /9M target market/);
  assert.match(content, /20\+ questions and blockers/);
  assert.match(content, /15\+ Jira tickets/);

  assert.match(content, /40\+ monthly BI troubleshooting tasks/);
  assert.match(content, /10\+ weekly bugs or logic modifications/);
  assert.match(content, /30\+ technical documents/);
  assert.match(content, /500\+ end users/);
  assert.match(content, /Coached and guided 30\+/);

  assert.match(content, /1,500 UGI employees/);
  assert.match(content, /Paginated Reports/);
  assert.match(content, /learning the technology within 5 days/);
  assert.match(content, /Power BI Embedded API/);
  assert.match(content, /300M patients/);
  assert.match(content, /Star Schema/);
  assert.match(content, /Snowflake Schema/);

  assert.match(content, /build 2 data-driven Power BI dashboards/);
  assert.match(content, /cutting manual tasks by 90%/);
  assert.match(content, /500\+ employees/);

  assert.match(
    experiencePage,
    /experiences\.map\(\(experience\) =>[\s\S]*?experience\.highlights\.map[\s\S]*?experience\.skills\.map/,
  );
  const timelineSource =
    experiencePage.match(
      /<div className="wrap experience-timeline">([\s\S]*?)<\/section>/,
    )?.[1] ?? "";
  assert.doesNotMatch(
    timelineSource,
    /Vivify Solutions Inc|PwC|VNB Consulting Services|DXC Technology/,
  );
});

test("experience highlights use verbatim master-resume wording and preserve skills", async () => {
  const content = await source("content/site.ts");

  for (const resumeWording of [
    "Drove MVP delivery for an entrepreneurship app by defining 3 epics, 50+ user stories, and 150+ acceptance criteria in Jira",
    "Authored a Product Requirements Document (PRD) for an entrepreneurship app redesign",
    "Shipped a 0-1 financial literacy app for children",
    "Led end-to-end product discovery for a women's wellness and productivity app within 7 weeks",
    "Designed an AI-powered workflow to automate daily standups and follow-up reminders",
    "Developed and managed the end-to-end product lifecycle of 7 reports for Unilever's business unit",
    "Accelerated mitigation efforts by 55% by building 50+ automated email alerts using Power Automate",
    "Deployed a Generative AI conversational RAG assistant for PwC's internal team",
    "Directed a significant upgrade in data security for 1,500 UGI employees",
    "Led creation of 6 reports / dashboards and collaborated with the integration team",
    "Executed 150+ action items as the key liaison",
    "Automated key performance indicator (KPI) reporting by collaborating with a cross-functional global team",
    "Created and managed a Manager Dashboard / Proof of Concept using Power BI",
  ]) {
    assert.ok(content.includes(resumeWording), `Missing: ${resumeWording}`);
  }

  assert.doesNotMatch(
    content,
    /the source materials report 30% faster time-to-market/,
  );
  assert.doesNotMatch(
    content,
    /Managed the lifecycle of 7 supply-chain reports/,
  );
  assert.doesNotMatch(
    content,
    /Built two Power BI dashboards for Marsh Inc\./,
  );

  for (const existingSkill of [
    "Product discovery",
    "User stories",
    "Acceptance criteria",
    "Market research",
    "Figma",
    "AI workflow automation",
    "Product analytics",
    "Stakeholder management",
    "Power BI",
    "Power Automate",
    "RAG",
    "Supply-chain analytics",
    "Business intelligence",
    "Row-level security",
    "Embedded analytics",
    "MySQL",
    "Data modelling",
    "Dashboard automation",
    "KPI reporting",
    "Data analytics",
    "Proof of concept",
  ]) {
    assert.match(content, new RegExp(`"${existingSkill}"`));
  }
});

test("experience periods render as responsive soft-orange date pills", async () => {
  const [experience, css] = await Promise.all([
    source("app/experience/page.tsx"),
    source("app/globals.css"),
  ]);
  const periodRule =
    css.match(/\.experience-entry__period\s*\{([^}]*)\}/)?.[1] ?? "";
  const responsivePeriodRule =
    css.match(
      /@media \(max-width: 820px\)[\s\S]*?\.experience-entry__period\s*\{([^}]*)\}/,
    )?.[1] ?? "";

  assert.match(
    experience,
    /<p className="experience-entry__period">\{experience\.period\}<\/p>/,
  );
  assert.doesNotMatch(
    experience,
    /Jun 2025|Oct 2022|Aug 2021|Sep 2020/,
  );
  assert.doesNotMatch(
    experience,
    /<(?:button|a)[^>]*className="experience-entry__period"/,
  );

  assert.match(periodRule, /background:\s*var\(--accent-soft\)/);
  assert.match(periodRule, /color:\s*var\(--accent-dark\)/);
  assert.match(periodRule, /display:\s*inline-flex/);
  assert.match(periodRule, /font-weight:\s*600/);
  assert.match(periodRule, /justify-self:\s*end/);
  assert.match(periodRule, /border-radius:\s*(?:1[0-2]|0\.\d+)px/);
  assert.match(periodRule, /padding:\s*\d+px \d+px/);
  assert.match(periodRule, /white-space:\s*nowrap/);

  assert.match(responsivePeriodRule, /justify-self:\s*start/);
  assert.match(responsivePeriodRule, /white-space:\s*nowrap/);
  assert.match(
    css,
    /\.site-shell\[data-page-theme="experience"\]\s*\{[\s\S]*?--accent:\s*#E25E2C;[\s\S]*?--accent-dark:\s*#B0431A;[\s\S]*?--accent-soft:\s*#FBE7DC;/,
  );
});

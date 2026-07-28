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
  assert.match(experience, /className="experience-entry__marker"/);
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

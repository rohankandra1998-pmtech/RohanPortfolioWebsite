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
  assert.match(experience, /Education & Certifications/);
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

  assert.match(shell, /pathname === "\/experience"/);
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
    /\.site-shell\[data-page-theme="experience"\] \.brand__logo-mask,[\s\S]*?\.site-shell\[data-page-theme="work"\] \.brand__logo-mask\s*\{[\s\S]*?background-color:\s*var\(--accent\)/,
  );
  assert.match(
    css,
    /mask:\s*url\("\/images\/branding\/rohan-logo\.png"\)/,
  );
  assert.doesNotMatch(css, /\.brand__logo\s*\{[^}]*filter:/);
});

test("work uses a route-scoped raspberry theme across index and case-study routes", async () => {
  const [shell, css, work] = await Promise.all([
    source("components/site-shell.tsx"),
    source("app/globals.css"),
    source("app/work/page.tsx"),
  ]);
  const hoverBorderRule =
    css.match(/\.project-card__image:hover::after\s*\{([^}]*)\}/)?.[1] ?? "";

  assert.match(
    shell,
    /pathname === "\/work" \|\| pathname\.startsWith\("\/work\/"\)/,
  );
  assert.match(
    css,
    /\.site-shell\[data-page-theme="work"\]\s*\{[\s\S]*?--accent:\s*#DD4F86;[\s\S]*?--accent-dark:\s*#B63A69;[\s\S]*?--accent-soft:\s*#FBE7EF;/,
  );
  assert.match(
    css,
    /\.site-shell\[data-page-theme="experience"\] \.brand__logo,[\s\S]*?\.site-shell\[data-page-theme="work"\] \.brand__logo\s*\{[\s\S]*?visibility:\s*hidden/,
  );
  assert.match(
    css,
    /\.site-shell\[data-page-theme="experience"\] \.brand__logo-mask,[\s\S]*?\.site-shell\[data-page-theme="work"\] \.brand__logo-mask\s*\{[\s\S]*?background-color:\s*var\(--accent\)/,
  );
  assert.match(work, /className="page-head page-head--work"/);
  assert.match(work, /className="eyebrow eyebrow--dot"/);
  assert.doesNotMatch(css, /rgba\(63,\s*125,\s*104,\s*0\.4\)/);
  assert.match(hoverBorderRule, /var\(--accent\)/);
});

test("LaunchGuard and RAG cards use project-specific purpose content with a shared presentation", async () => {
  const [card, projects, home, work, css] = await Promise.all([
    source("components/project-card.tsx"),
    source("content/site.ts"),
    source("app/page.tsx"),
    source("app/work/page.tsx"),
    source("app/globals.css"),
  ]);
  const launchGuardProject =
    projects.match(
      /slug: "launchguard",([\s\S]*?)slug: "rag-knowledge-assistant"/,
    )?.[1] ?? "";
  const ragProject =
    projects.match(
      /slug: "rag-knowledge-assistant",([\s\S]*?)slug: "ur-coursebot"/,
    )?.[1] ?? "";
  const purposeIntroduction =
    "The RAG Knowledge Assistant is designed to transform static PDF documents into a conversational, searchable, and traceable knowledge base. It uses semantic retrieval and large language models to help users find relevant information without manually searching through every document, while grounding each response in retrieved evidence and providing citations that allow the answer to be verified.";
  const purposeCallout =
    "The application helps people ask questions of their documents and receive answers that are not only easy to understand, but also supported by identifiable source evidence.";
  const technicalSummary =
    "The RAG Knowledge Assistant is a full-stack conversational Retrieval-Augmented Generation application built with Python, Streamlit, OpenAI, LangChain, and ChromaDB. Users upload PDF documents, which are processed through page-level extraction, adjacent-page context preservation, semantic chunking, embedding generation, duplicate detection, and persistent vector storage. When a question is asked, the system rewrites context-dependent follow-ups, retrieves the ten most semantically similar chunks, reranks them using an LLM, and sends the five strongest passages to a grounded answer-generation prompt. The resulting response is limited to the uploaded document context, includes inline source citations, and can be audited through source, retrieval, reranking, response-time, and token-usage information. Its purpose is to reduce the friction of finding and interpreting knowledge contained in large document collections while improving the traceability and trustworthiness of AI-generated answers.";
  const genericSummary =
    "A conversational document assistant that ingests PDFs, retrieves and reranks relevant evidence, and answers with inline citations and transparent retrieval details.";
  const launchGuardIntroduction =
    "LaunchGuard is a human-centered AI evaluation workspace that helps teams test prompts across realistic and difficult scenarios, review outputs against explicit Good, Average, and Bad criteria, identify recurring failure patterns, and create evidence-based improvements. It brings versioned prompts, reusable Golden Datasets, model execution, human review, Error Analysis, Prompt Proposals, and evaluation history into one traceable workflow, helping teams determine whether an AI feature is reliable enough to release and understand exactly why each prompt change was made.";
  const launchGuardCallout =
    "LaunchGuard helps teams move beyond checking whether a few AI responses “look good.” It provides a repeatable way to test an AI prompt, understand where and why it fails, improve it using human-confirmed evidence, and retest the new version against the same benchmark.";

  assert.match(
    projects,
    /export type ProjectWorkCard = \{[\s\S]*?imageAspectRatio\?: string;[\s\S]*?purpose\?: \{[\s\S]*?introduction: string;[\s\S]*?simpleLabel: string;[\s\S]*?callout: string;/,
  );
  assert.match(
    projects,
    /export type ProjectHomeCard = \{\s*summary: string;\s*\};/,
  );
  assert.match(projects, /homeCard\?: ProjectHomeCard/);
  assert.match(projects, /workCard\?: ProjectWorkCard/);
  assert.equal(projects.match(/\n    homeCard: \{/g)?.length, 1);
  assert.equal(projects.split(technicalSummary).length - 1, 1);
  assert.equal(projects.split(genericSummary).length - 1, 1);
  assert.ok(ragProject.includes(technicalSummary));
  assert.match(
    launchGuardProject,
    /workCard: \{[\s\S]*?variant: "purpose"[\s\S]*?purpose: \{/,
  );
  assert.match(
    launchGuardProject,
    /workCard: \{[\s\S]*?image:\s*"\/images\/projects\/launchguard\/figure-01-project-overview\.png"/,
  );
  assert.doesNotMatch(
    launchGuardProject.match(/workCard: \{([\s\S]*?)\n    \},/)?.[1] ?? "",
    /\/images\/projects\/launchguard-golden-dataset\.png/,
  );
  assert.match(
    launchGuardProject,
    /imageAlt:\s*"LaunchGuard Project Overview showing prompt management, test coverage, review status, and evaluation progress"/,
  );
  assert.match(launchGuardProject, /imageAspectRatio: "1194 \/ 852"/);
  assert.match(
    ragProject,
    /workCard: \{[\s\S]*?variant: "purpose"[\s\S]*?purpose: \{/,
  );
  assert.match(
    ragProject,
    /image:\s*"\/images\/projects\/rag-knowledge-assistant\/figure-01-grounded-response-interface\.png"/,
  );
  assert.match(
    ragProject,
    /imageAlt:\s*"RAG Knowledge Assistant chat interface showing a grounded response, answer evidence, and source cards"/,
  );
  assert.equal(projects.split(launchGuardIntroduction).length - 1, 1);
  assert.equal(projects.split(launchGuardCallout).length - 1, 1);
  assert.equal(projects.split(purposeIntroduction).length - 1, 1);
  assert.equal(projects.split('"In simpler terms:"').length - 1, 2);
  assert.equal(projects.split(purposeCallout).length - 1, 1);
  assert.match(
    card,
    /export type ProjectCardContext = "home" \| "work";/,
  );
  assert.match(card, /context: ProjectCardContext;/);
  assert.match(card, /project\.workCard\?\.image \?\? project\.image/);
  assert.match(card, /project\.workCard\?\.imageAlt \?\? project\.imageAlt/);
  assert.match(
    card,
    /context === "home" \? project\.homeCard\?\.summary : undefined/,
  );
  assert.match(
    card,
    /context === "work" \? project\.workCard\?\.purpose : undefined/,
  );
  assert.match(
    card,
    /homeSummary \? \(\s*<p className="project-card__home-summary">\{homeSummary\}<\/p>\s*\) : purpose \? \(/,
  );
  assert.match(card, /project-card--\$\{cardVariant\}/);
  assert.match(
    card,
    /cardVariant === "purpose"[\s\S]*\? \{ objectFit: "contain" \}/,
  );
  assert.match(
    card,
    /project\.workCard\?\.imageAspectRatio[\s\S]*\? \{ aspectRatio: project\.workCard\.imageAspectRatio \}/,
  );
  assert.match(card, /className="project-card__purpose-introduction"/);
  assert.match(card, /className="project-card__purpose-label"/);
  assert.match(card, /<aside className="project-card__purpose-callout">/);
  assert.match(card, /\) : \(\s*<p>\{project\.summary\}<\/p>/);
  assert.match(card, /read case study <span aria-hidden="true">/);
  assert.doesNotMatch(card, /use client|usePathname|window\.location|location\.pathname/);
  assert.doesNotMatch(card, /figcaption/i);
  assert.match(home, /<ProjectCard[\s\S]*?context="home"/);
  assert.match(work, /<ProjectCard[\s\S]*?context="work"/);
  assert.match(work, /projects\.map\(\(project, index\) =>/);
  assert.equal(
    `${home}\n${work}`.match(/<ProjectCard/g)?.length,
    2,
  );
  assert.match(
    css,
    /\.project-card__image\s*\{[\s\S]*?aspect-ratio:\s*16 \/ 10/,
  );
  assert.match(
    css,
    /\.project-card--purpose \.project-card__image\s*\{[\s\S]*?aspect-ratio:\s*1943 \/ 932/,
  );
  await access(
    new URL(
      "public/images/projects/launchguard/figure-01-project-overview.png",
      root,
    ),
  );
  assert.match(
    css,
    /\.project-card__image img\s*\{[\s\S]*?object-fit:\s*contain/,
  );
  assert.match(
    css,
    /\.project-card__purpose-callout\s*\{[\s\S]*?background:\s*var\(--accent-soft\)[\s\S]*?border-left:\s*3px solid var\(--accent\)/,
  );
  assert.match(
    css,
    /\.project-card__home-summary\s*\{[\s\S]*?color:\s*var\(--muted\)[\s\S]*?font-size:\s*0\.96rem[\s\S]*?line-height:\s*1\.7[\s\S]*?margin-bottom:\s*8px[\s\S]*?max-width:\s*610px/,
  );
  const homeSummaryRule =
    css.match(/\.project-card__home-summary\s*\{([^}]*)\}/)?.[1] ?? "";
  assert.doesNotMatch(
    homeSummaryRule,
    /(?:^|\n)\s*(?:background(?:-color)?|border-left|font-weight|-webkit-line-clamp|overflow(?:-[xy])?|height)\s*:/,
  );
});

test("rich case studies share reusable article, outline, stack, and action components", async () => {
  const [route, registry, renderer, outline, actions, stack, rag, projects, css] =
    await Promise.all([
      source("app/work/[slug]/page.tsx"),
      source("content/rich-articles.ts"),
      source("components/case-study-article.tsx"),
      source("components/case-study-outline.tsx"),
      source("components/rag-project-actions.tsx"),
      source("components/rag-technology-stack.tsx"),
      source("content/rag-knowledge-assistant.ts"),
      source("content/site.ts"),
      source("app/globals.css"),
    ]);

  assert.match(route, /richArticles\[project\.richArticle\]/);
  assert.match(route, /<CaseStudyArticle[\s\S]*blocks=\{richArticle\.blocks\}/);
  assert.match(route, /<CaseStudyOutline[\s\S]*entries=\{richArticle\.outline\}/);
  assert.match(route, /<TechnologyStack[\s\S]*items=\{richArticle\.technologyStack\}/);
  assert.equal(route.match(/<ProjectActions/g)?.length, 2);
  assert.match(route, /placement="hero"/);
  assert.match(route, /placement="article-end"/);

  assert.match(registry, /"rag-knowledge-assistant": \{/);
  assert.match(registry, /launchguard: \{/);
  assert.match(registry, /blocks: ragCaseStudyBlocks/);
  assert.match(registry, /blocks: launchGuardCaseStudyBlocks/);
  assert.match(registry, /RAG Knowledge Assistant case study outline/);
  assert.match(registry, /LaunchGuard case study outline/);
  assert.match(registry, /Open LaunchGuard live product, opens in a new tab/);
  assert.match(registry, /View LaunchGuard GitHub repository, opens in a new tab/);
  assert.doesNotMatch(
    registry.match(/launchguard: \{([\s\S]*?)\n  \},\n\} as const/)?.[1] ?? "",
    /Try the RAG|RAG Knowledge Assistant project links/,
  );

  assert.match(actions, /projectName: string/);
  assert.match(actions, /liveLabel: string/);
  assert.match(actions, /repoLabel: string/);
  assert.match(actions, /aria-label=\{\`\$\{projectName\} project links\`\}/);
  assert.equal(actions.match(/target="_blank"/g)?.length, 2);
  assert.equal(actions.match(/rel="noreferrer"/g)?.length, 2);
  assert.match(stack, /items: readonly TechnologyStackItem\[\]/);
  assert.match(stack, /const headingId = \`\$\{id\}-title\`/);

  assert.match(renderer, /CaseStudyBlock/);
  assert.match(renderer, /createCaseStudyHeadingId\(block\.text, occurrence\)/);
  assert.match(renderer, /block\.level === 4/);
  assert.match(renderer, /<h5 id=\{id\}/);
  assert.match(renderer, /block\.type === "table"/);
  assert.match(renderer, /<thead>/);
  assert.match(renderer, /scope="col"/);
  assert.match(renderer, /className="longform-case__table-wrap"/);
  assert.match(renderer, /block\.type === "sequence"/);
  assert.match(renderer, /block\.type === "code"/);
  assert.match(renderer, /<figure/);

  assert.match(outline, /type \{ CaseStudyOutlineEntry \}/);
  assert.match(outline, /ariaLabel: string/);
  assert.match(outline, /aria-label=\{ariaLabel\}/);
  assert.match(outline, /aria-current=\{isActive \? "location" : undefined\}/);
  assert.match(outline, /ancestorIds\.has\(node\.id\)/);
  assert.match(outline, /window\.addEventListener\("scroll", scheduleActiveSection/);
  assert.match(outline, /viewport\.scrollTop [+-]=/);
  assert.match(outline, /target\.focus\(\{ preventScroll: true \}\)/);

  assert.match(rag, /createCaseStudyOutline\(ragCaseStudyBlocks\)/);
  assert.equal(rag.match(/"type": "figure"/g)?.length, 10);
  assert.match(projects, /richArticle: "rag-knowledge-assistant"/);
  assert.match(projects, /https:\/\/ragknowledgeassistant\.streamlit\.app\//);
  assert.match(
    projects,
    /https:\/\/github\.com\/rohankandra1998-pmtech\/rag-knowledge-assistant/,
  );
  assert.match(css, /\.rag-outline__item--level-4/);
  assert.match(css, /\.longform-case h5/);
  assert.match(css, /\.longform-case__table-wrap/);
  assert.match(css, /overflow-x:\s*auto/);
});

test("LaunchGuard is a complete source-faithful long-form case study", async () => {
  const [launchguard, registry, projects, renderer, css] = await Promise.all([
    source("content/launchguard.ts"),
    source("content/rich-articles.ts"),
    source("content/site.ts"),
    source("components/case-study-article.tsx"),
    source("app/globals.css"),
  ]);
  const blocksJson =
    launchguard.match(
      /export const launchGuardCaseStudyBlocks: CaseStudyBlock\[\] = ([\s\S]*?);\n\nexport const launchGuardCaseStudyOutline/,
    )?.[1] ?? "[]";
  const stackJson =
    launchguard.match(
      /export const launchGuardTechnologyStack =\s*([\s\S]*?) as const satisfies/,
    )?.[1] ?? "[]";
  const blocks = JSON.parse(blocksJson);
  const technologyStack = JSON.parse(stackJson);
  const figures = blocks.filter((block) => block.type === "figure");
  const headings = blocks.filter((block) => block.type === "heading");
  const text = JSON.stringify(blocks);
  const figureEight = figures.find((figure) => figure.number === 8);
  const exactCaptions = [
    "Figure 1 LaunchGuard’s Project Overview brings prompt management, test coverage, human review, and evaluation progress into one connected workspace.",
    "Figure 2 A LaunchGuard workspace can contain multiple AI evaluation projects, each with its own context, prompts, test cases, reviews, and improvement history.",
    "Figure 3 Prompt Versions preserve earlier system prompts and their evaluation history instead of overwriting the instructions that produced previous results.",
    "Figure 4 The variable-aware Prompt Builder connects structured variable definitions to placeholders inside a versioned system prompt.",
    "Figure 5 The Final Prompt Preview shows the exact compiled system instruction after defaults and test-specific variable values are resolved.",
    "Figure 6 Evaluation Criteria translate broad quality goals into explicit Good, Average, and Bad standards that reviewers can apply consistently",
    "Figure 7 The Golden Dataset combines realistic, edge, ambiguous, missing-context, adversarial, and tone-sensitive cases into a reusable evaluation benchmark.",
    "Figure 8 LaunchGuard proposes distinct test cases with case types and testing rationales, while the user decides which suggestions become part of the benchmark.",
    "Figure 9 The review workspace keeps the user input, generated response, Prompt Version, model, and runtime variable context available during evaluation.",
    "Figure 10 Reviewers score each output separately across every criterion and record qualitative evidence explaining what succeeded or failed.",
    "Figure 11 Error Analysis consolidates human-confirmed failures into severity-ranked behavioral patterns and distinguishes observed behavior from its likely cause.",
    "Figure 12 Every recommended prompt change is connected to human ratings, failed criteria, representative test cases, and reviewer evidence.",
    "Figure 13 The Prompt Proposal compares the current and proposed system prompts side by side and summarizes the evaluation evidence behind the revision.",
    "Figure 14 Each proposed modification identifies the exact before-and-after wording, its expected impact, and the failure evidence supporting the change.",
  ];

  assert.match(projects, /slug: "launchguard"[\s\S]*?richArticle: "launchguard"/);
  assert.match(
    projects,
    /LaunchGuard: A Human-Centered System for Testing, Evaluating, and Improving AI Prompts/,
  );
  assert.match(registry, /launchguard: \{[\s\S]*?blocks: launchGuardCaseStudyBlocks/);
  assert.equal(technologyStack.length, 4);
  assert.deepEqual(
    technologyStack.map((item) => item.category),
    ["Application", "Database & Backend", "AI & Validation", "Deployment"],
  );
  assert.equal(figures.length, 14);
  assert.equal(
    figures.reduce((count, figure) => count + figure.images.length, 0),
    15,
  );
  assert.equal(figureEight.images.length, 2);
  assert.equal(figureEight.variant, "paired");
  assert.equal(headings.length, 130);
  assert.ok(headings.some((heading) => heading.level === 5));
  assert.ok(blocks.some((block) => block.type === "table"));
  assert.ok(blocks.some((block) => block.type === "code"));
  assert.ok(blocks.some((block) => block.type === "sequence"));
  assert.equal(
    blocks.find((block) => block.type === "table")?.headers.join("|"),
    "Criterion|Rating",
  );
  assert.deepEqual(
    blocks.find((block) => block.type === "table")?.rows,
    [
      ["Policy Compliance", "Bad"],
      ["Clarity", "Good"],
      ["Tone", "Good"],
      ["Capability Transparency", "Bad"],
    ],
  );
  assert.deepEqual(
    figures.map((figure) => figure.caption),
    exactCaptions,
  );

  for (const sourceText of [
    "Building an AI feature is relatively easy. Making that feature reliable enough to release is much harder.",
    "Step 6: A human reviews each generated response",
    "Database-Level Consistency Protections",
    "LaunchGuard turns prompt engineering from an informal writing exercise into a traceable, testable, and continuously improving product-development process.",
    "{{refund_policy}}",
    "OPENAI_PRODUCT_MODEL = gpt-4.1",
    "The Core Purpose of LaunchGuard",
  ]) {
    assert.ok(
      text.includes(sourceText),
      "Missing exact source text: " + sourceText,
    );
  }

  for (const imagePath of figures.flatMap((figure) =>
    figure.images.map((image) => image.src),
  )) {
    await access(new URL("public" + imagePath, root));
    assert.equal(text.split(imagePath).length - 1, 1);
  }

  assert.match(launchguard, /paragraphCount": 1493/);
  assert.match(launchguard, /nonEmptyParagraphCount": 1475/);
  assert.match(launchguard, /imageCount": 15/);
  assert.match(launchguard, /figureCount": 14/);
  assert.match(launchguard, /tableCount": 1/);
  assert.match(renderer, /<h5 id=\{id\}/);
  assert.match(renderer, /<table>/);
  assert.match(css, /\.longform-figure--paired/);
  assert.match(
    css,
    /@media \(max-width: 820px\)[\s\S]*?\.longform-figure--paired \.longform-figure__images\s*\{[\s\S]*?grid-template-columns:\s*1fr/,
  );
});

test("LaunchGuard outline is generated from every source heading at the matching depth", async () => {
  const [launchguard, shared, outline, route] = await Promise.all([
    source("content/launchguard.ts"),
    source("content/case-study.ts"),
    source("components/case-study-outline.tsx"),
    source("app/work/[slug]/page.tsx"),
  ]);
  const blocksJson =
    launchguard.match(
      /export const launchGuardCaseStudyBlocks: CaseStudyBlock\[\] = ([\s\S]*?);\n\nexport const launchGuardCaseStudyOutline/,
    )?.[1] ?? "[]";
  const blocks = JSON.parse(blocksJson);
  const headings = blocks.filter((block) => block.type === "heading");

  assert.equal(headings.length, 130);
  assert.equal(headings[0].text, "1. What Does LaunchGuard Do?");
  assert.equal(headings.at(-1).text, "The Core Purpose of LaunchGuard");
  assert.deepEqual(
    [...new Set(headings.map((heading) => heading.level))],
    [2, 3, 4, 5],
  );
  assert.match(launchguard, /createCaseStudyOutline\(launchGuardCaseStudyBlocks\)/);
  assert.match(shared, /label: "Overview"/);
  assert.match(shared, /const level = \(block\.level - 1\) as 1 \| 2 \| 3 \| 4/);
  assert.match(shared, /createCaseStudyHeadingId\(block\.text, occurrence\)/);
  assert.match(
    shared,
    /occurrence > 1 \? \x60\$\{baseId\}-\$\{occurrence\}\x60 : baseId/,
  );
  assert.match(outline, /rag-outline__item--level-\$\{node\.level\}/);
  assert.match(outline, /activeEntry\?\.ancestorIds/);
  assert.match(route, /ariaLabel=\{richArticle\.outlineAriaLabel\}/);
});

test("experience renders the editorial timeline with semantic accomplishments and skills", async () => {
  const [experience, content, css] = await Promise.all([
    source("app/experience/page.tsx"),
    source("content/site.ts"),
    source("app/globals.css"),
  ]);
  const timelineIndex = experience.indexOf(
    '<div className="wrap experience-timeline">',
  );
  const timelineSectionEnd = experience.indexOf("</section>", timelineIndex);
  const educationIndex = experience.indexOf(
    '<section className="section" id="education">',
  );
  const recognitionIndex = experience.indexOf(
    '<section className="section" id="recognition">',
  );
  const timelineToEducation = experience.slice(
    timelineSectionEnd,
    educationIndex,
  );

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
  assert.doesNotMatch(experience, /Stories behind the roles/);
  assert.doesNotMatch(experience, /Selected impact/);
  assert.doesNotMatch(experience, /impactStories/);
  assert.doesNotMatch(experience, /const impactStories/);
  assert.doesNotMatch(experience, /className="research-list"/);
  assert.doesNotMatch(experience, /className="research-row"/);
  assert.doesNotMatch(css, /\.research-list/);
  assert.doesNotMatch(css, /\.research-row/);
  assert.ok(
    timelineIndex < timelineSectionEnd &&
      timelineSectionEnd < educationIndex &&
      educationIndex < recognitionIndex,
    "Expected Experience timeline, Education, then Recognition",
  );
  assert.doesNotMatch(
    timelineToEducation,
    /Stories behind the roles|Selected impact/,
  );
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
    access(
      new URL(
        "public/images/recognition/vivify-team-page-feature.png",
        root,
      ),
    ),
  ]);
  const recognitionSection =
    experience.match(
      /<section className="section" id="recognition">\s*<div className="wrap">\s*<p className="eyebrow eyebrow--dot">Recognition<\/p>[\s\S]*?<\/section>/,
    )?.[0] ?? "";
  const awardsData =
    experience.match(
      /const professionalAwards = \[([\s\S]*?)\] as const;/,
    )?.[1] ?? "";
  const statsData =
    experience.match(
      /const recognitionStats = \[([\s\S]*?)\] as const;/,
    )?.[1] ?? "";
  const companyFeature =
    recognitionSection.match(
      /<article className="company-feature"[\s\S]*?<\/article>/,
    )?.[0] ?? "";
  const normalizedCompanyFeature = companyFeature.replace(/\s+/g, " ");
  const recognitionGridIndex = recognitionSection.indexOf(
    '<div className="recognition-grid"',
  );
  const companyFeatureIndex = recognitionSection.indexOf(
    '<article className="company-feature"',
  );
  const sectionLinkIndex = recognitionSection.indexOf(
    '<p className="section-link">',
  );

  assert.match(recognitionSection, /A wall of small wins/);
  assert.match(
    recognitionSection,
    /<p className="eyebrow eyebrow--dot">Recognition<\/p>/,
  );
  assert.match(recognitionSection, /Professional recognition/);
  assert.match(
    recognitionSection,
    /professionalAwards\.map\(\(award\) =>/,
  );
  assert.match(recognitionSection, /recognitionStats\.map\(\(stat\) =>/);
  assert.match(recognitionSection, /<dl className="recognition-stats">/);
  assert.equal(awardsData.match(/\n    company: "/g)?.length, 3);
  assert.ok(
    recognitionGridIndex < companyFeatureIndex &&
      companyFeatureIndex < sectionLinkIndex,
    "Expected recognition-grid, company-feature, then section-link",
  );

  for (const requiredFeatureContent of [
    "Company feature",
    "Featured on Vivify Solutions’ team page",
    "Product Manager",
    "product discovery",
    "product vision and roadmap",
    "backlog prioritization",
    "sprint planning",
    "cross-functional execution",
    "4+ years",
    "Simon Business School",
  ]) {
    assert.ok(
      normalizedCompanyFeature.includes(requiredFeatureContent),
      `Missing company feature content: ${requiredFeatureContent}`,
    );
  }

  assert.match(companyFeature, /^<article className="company-feature"/);
  assert.match(
    companyFeature,
    /<Image[\s\S]*?alt="Vivify Solutions team page featuring Rohan Singh Kandra as Product Manager"[\s\S]*?src="\/images\/recognition\/vivify-team-page-feature\.png"/,
  );
  assert.doesNotMatch(companyFeature, /https?:\/\/|<a\b/);

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
  assert.match(
    css,
    /\.company-feature\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0,\s*0\.68fr\) minmax\(0,\s*1fr\)/,
  );
  assert.match(
    css,
    /@media \(max-width: 820px\)[\s\S]*?\.company-feature\s*\{[\s\S]*?grid-template-columns:\s*1fr/,
  );
  assert.match(
    css,
    /\.company-feature__image\s*\{[\s\S]*?object-fit:\s*contain/,
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

  assert.match(content, /6 MVP features/);
  assert.match(content, /5K\+ weekly active users/);
  assert.match(content, /4\.5 parent CSAT/);
  assert.match(content, /62% lesson completion/);
  assert.match(content, /6-stage user journey/);
  assert.match(content, /1,000\+ survey responses/);
  assert.match(content, /9M target market/);
  assert.match(content, /20\+ questions and blockers/);
  assert.match(content, /15\+ Jira tickets/);

  assert.match(content, /40\+ monthly BI troubleshooting tasks/);
  assert.match(content, /10\+ weekly bugs and logic modifications/);
  assert.match(content, /30\+ technical documents/);
  assert.match(content, /500\+ end business users/);
  assert.match(content, /Coached and guided 30\+/);

  assert.match(content, /1,500 UGI employees/);
  assert.match(content, /Paginated Reports/);
  assert.match(content, /mastering the technology in five days/);
  assert.match(content, /Power BI Embedded API/);
  assert.match(content, /300M patients/);
  assert.match(content, /Star and Snowflake schemas/);

  assert.match(content, /design and implement 2 data-driven Power BI dashboards/);
  assert.match(content, /reducing time spent on manual Excel reporting by 90%/);
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
    "Drove MVP delivery for Business Builderz, a mobile-first entrepreneurship learning app, by defining 3 epics, 50+ user stories, and 150+ acceptance criteria in Jira",
    "Authored a Product Requirements Document (PRD) for the Business Builderz entrepreneurship mobile app redesign",
    "Shipped a 0-1 financial literacy app for children",
    "Led end-to-end product discovery for a women's wellness and productivity app within 7 weeks",
    "Designed an AI-powered workflow to automate daily standups and follow-up reminders",
    "Developed and managed the end-to-end product lifecycle of 7 Power BI reports for Hindustan Unilever’s South Warehousing Division",
    "Built 50+ automated email alerts using Power Automate (Robotic Process Automation tool)",
    "Deployed a Generative AI conversational RAG assistant for PwC's internal team",
    "Directed a significant upgrade in data security for 1,500 UGI employees",
    "Spearheaded the end-to-end development of six Power BI dashboards from scratch",
    "Led the successful execution of 150+ action items by serving as the key liaison",
    "Modernized and automated key performance indicator (KPI) reporting for Marsh Inc.",
    "Created and managed a Manager Dashboard as a proof of concept (PoC) using Power BI",
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

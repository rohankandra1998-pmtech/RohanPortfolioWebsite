import Image from "next/image";
import type {
  RagCaseStudyBlock,
  RichTextSegment,
} from "@/content/rag-knowledge-assistant";
import { createRagCaseStudyHeadingId } from "@/content/rag-knowledge-assistant";

function RichText({ content }: { content: RichTextSegment[] }) {
  return content.map((segment, index) => {
    let rendered: React.ReactNode = segment.text;

    if (segment.emphasis) {
      rendered = <em>{rendered}</em>;
    }
    if (segment.strong) {
      rendered = <strong>{rendered}</strong>;
    }

    return <span key={`${index}-${segment.text}`}>{rendered}</span>;
  });
}

export function CaseStudyArticle({
  blocks,
}: {
  blocks: RagCaseStudyBlock[];
}) {
  return (
    <article
      className="longform-case"
      data-testid="rag-rich-article"
      id="overview"
      tabIndex={-1}
    >
      {blocks.map((block) => {
        const key = `${block.type}-${block.sourceIndexes.join("-")}`;

        if (block.type === "heading") {
          if (block.level === 2) {
            return (
              <h2
                className="longform-case__major-heading"
                id={createRagCaseStudyHeadingId(block.text)}
                key={key}
                tabIndex={-1}
              >
                {block.text}
              </h2>
            );
          }
          if (block.level === 3) {
            return (
              <h3
                id={createRagCaseStudyHeadingId(block.text)}
                key={key}
                tabIndex={-1}
              >
                {block.text}
              </h3>
            );
          }
          return (
            <h4
              id={createRagCaseStudyHeadingId(block.text)}
              key={key}
              tabIndex={-1}
            >
              {block.text}
            </h4>
          );
        }

        if (block.type === "paragraph") {
          return (
            <p key={key}>
              <RichText content={block.content} />
            </p>
          );
        }

        if (block.type === "list") {
          const List = block.ordered ? "ol" : "ul";
          return (
            <List key={key}>
              {block.items.map((item, index) => (
                <li key={`${key}-${index}`}>
                  <RichText content={item} />
                </li>
              ))}
            </List>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote key={key}>
              <RichText content={block.content} />
            </blockquote>
          );
        }

        if (block.type === "code") {
          return (
            <pre className="longform-case__code" key={key}>
              <code>{block.text}</code>
            </pre>
          );
        }

        if (block.type === "sequence") {
          return (
            <div className="longform-case__sequence" key={key}>
              {block.items.map((item) => (
                <code key={item}>{item}</code>
              ))}
            </div>
          );
        }

        return (
          <figure
            className={`longform-figure longform-figure--${block.variant}`}
            data-figure={block.number}
            key={key}
          >
            <div className="longform-figure__images">
              {block.images.map((image) => (
                <div className="longform-figure__image" key={image.src}>
                  <Image
                    alt={image.alt}
                    height={image.height}
                    sizes={
                      block.variant === "paired"
                        ? "(max-width: 768px) 100vw, 50vw"
                        : "(max-width: 1100px) 100vw, 1100px"
                    }
                    src={image.src}
                    unoptimized
                    width={image.width}
                  />
                </div>
              ))}
            </div>
            <figcaption>{block.caption}</figcaption>
          </figure>
        );
      })}
    </article>
  );
}

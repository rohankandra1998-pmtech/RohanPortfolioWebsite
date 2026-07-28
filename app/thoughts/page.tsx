import type { Metadata } from "next";
import { writing } from "@/content/site";

export const metadata: Metadata = {
  title: "Thoughts",
  description:
    "Published notes and works in progress from Rohan Kandra on AI products, evaluation, RAG, and product discovery.",
};

export default function ThoughtsPage() {
  return (
    <>
      <section className="page-head">
        <div className="wrap" data-reveal>
          <p className="eyebrow">Notes to self</p>
          <h1>Thoughts</h1>
          <p className="page-head__lead">
            Field notes on products, evidence, AI quality, and the systems behind
            the interface. Published work is linked; unfinished ideas are
            labeled honestly.
          </p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap writing-list">
          {writing.map((entry) => {
            const content = (
              <>
                <span className="writing-row__status">{entry.status}</span>
                <div>
                  <h2>{entry.title}</h2>
                  <p>{entry.summary}</p>
                </div>
                <b aria-hidden="true">{entry.href ? "→" : "—"}</b>
              </>
            );

            return entry.href ? (
              <a
                className="writing-row focus-ring"
                data-reveal
                href={entry.href}
                key={entry.title}
                rel="noreferrer"
                target="_blank"
              >
                {content}
              </a>
            ) : (
              <article className="writing-row" data-reveal key={entry.title}>
                {content}
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}

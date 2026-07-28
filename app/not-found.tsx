import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-head not-found">
      <div className="wrap">
        <p className="eyebrow">404</p>
        <h1>This path doesn’t exist.</h1>
        <p className="page-head__lead">
          The useful next step is back at the beginning.
        </p>
        <Link className="button button--dark focus-ring" href="/">
          Go home <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

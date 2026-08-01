type ProjectActionsProps = {
  liveAriaLabel?: string;
  liveLabel: string;
  liveUrl?: string;
  projectName: string;
  repoAriaLabel?: string;
  repoLabel: string;
  repoUrl?: string;
  placement?: "hero" | "article-end";
};

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      className="rag-project-actions__github-icon"
      focusable="false"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-3.06.56-3.703-1.294-3.703-1.294-.5-1.271-1.221-1.61-1.221-1.61-.998-.682.076-.668.076-.668 1.104.078 1.685 1.133 1.685 1.133.98 1.68 2.572 1.195 3.2.914.1-.71.384-1.195.698-1.47-2.442-.277-5.007-1.221-5.007-5.432 0-1.2.428-2.181 1.132-2.95-.114-.278-.49-1.396.107-2.91 0 0 .923-.295 3.025 1.127A10.514 10.514 0 0 1 12 6.948a10.5 10.5 0 0 1 2.752.37c2.1-1.423 3.022-1.127 3.022-1.127.6 1.515.223 2.633.11 2.911.705.769 1.13 1.75 1.13 2.95 0 4.22-2.57 5.151-5.02 5.423.394.34.746 1.012.746 2.04 0 1.473-.013 2.66-.013 3.022 0 .29.21.623.762.52C19.853 20.976 23 16.865 23 12c0-6.077-4.923-11-11-11z"
      />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden="true"
      className="rag-project-actions__external-icon"
      fill="none"
      focusable="false"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="M14 5h5v5" />
      <path d="m12 12 7-7" />
      <path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

export function ProjectActions({
  liveAriaLabel,
  liveLabel,
  liveUrl,
  projectName,
  repoAriaLabel,
  repoLabel,
  repoUrl,
  placement = "hero",
}: ProjectActionsProps) {
  if (!liveUrl && !repoUrl) return null;

  return (
    <nav
      aria-label={`${projectName} project links`}
      className={`rag-project-actions rag-project-actions--${placement}`}
      data-reveal
    >
      {liveUrl ? (
        <a
          aria-label={
            liveAriaLabel ??
            `${liveLabel} for ${projectName}, opens in a new tab`
          }
          className="button button--dark focus-ring rag-project-actions__link rag-project-actions__link--primary"
          href={liveUrl}
          rel="noreferrer"
          target="_blank"
        >
          <span>{liveLabel}</span>
          <ExternalLinkIcon />
        </a>
      ) : null}
      {repoUrl ? (
        <a
          aria-label={
            repoAriaLabel ??
            `${repoLabel} for ${projectName}, opens in a new tab`
          }
          className="button button--light focus-ring rag-project-actions__link rag-project-actions__link--secondary"
          href={repoUrl}
          rel="noreferrer"
          target="_blank"
        >
          <GitHubIcon />
          <span>{repoLabel}</span>
          <ExternalLinkIcon />
        </a>
      ) : null}
    </nav>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { contact, navigation, socials } from "@/content/site";

function LinkedInIcon() {
  return (
    <svg
      aria-hidden="true"
      className="social-icon"
      focusable="false"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 4.127 0c0 1.14-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      className="social-icon"
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

function SocialIcon({ label }: { label: string }) {
  switch (label) {
    case "LinkedIn":
      return <LinkedInIcon />;
    case "GitHub":
      return <GitHubIcon />;
    default:
      return null;
  }
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      nodes.forEach((node) => node.setAttribute("data-revealed", "true"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <>
      <header className="site-nav">
        <div className="site-nav__inner">
          <Link
            aria-label={`${contact.name} home`}
            className="brand focus-ring"
            href="/"
          >
            <Image
              alt=""
              className="brand__logo"
              height={36}
              priority
              src="/images/branding/rohan-logo.png"
              unoptimized
              width={31}
            />
            <span className="brand__name">{contact.name}</span>
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navigation.map((item) => (
              <Link
                className={`nav-link focus-ring ${
                  pathname === item.href ? "nav-link--active" : ""
                }`}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="nav-actions">
            <div className="social-links">
              {socials.slice(0, 2).map((link) => (
                <a
                  aria-label={`${link.label} profile`}
                  className="social-link focus-ring"
                  href={link.href}
                  key={link.label}
                  rel="noreferrer"
                  target="_blank"
                  title={link.label}
                >
                  <SocialIcon label={link.label} />
                </a>
              ))}
            </div>
            <button
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Menu"}
              className="menu-button focus-ring"
              onClick={() => setMenuOpen((value) => !value)}
              type="button"
            >
              <span>{menuOpen ? "Close" : "Menu"}</span>
              <span aria-hidden="true" className="menu-button__mark">
                {menuOpen ? "×" : "+"}
              </span>
            </button>
          </div>
        </div>
      </header>

      <nav
        aria-label="Mobile navigation"
        className={`mobile-nav ${menuOpen ? "mobile-nav--open" : ""}`}
      >
        {navigation.map((item, index) => (
          <Link
            className="mobile-nav__link focus-ring"
            href={item.href}
            key={item.href}
            onClick={() => setMenuOpen(false)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="wrap site-footer__inner">
          <span>made with care</span>
          <span>© 2026 {contact.name}</span>
        </div>
      </footer>
    </>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { contact, navigation, socials } from "@/content/site";

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
          <Link className="brand focus-ring" href="/" aria-label="Rohan Kandra home">
            Rohan.Kandra
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
            {socials.slice(0, 2).map((link) => (
              <a
                className="social-link focus-ring"
                href={link.href}
                key={link.label}
                rel="noreferrer"
                target="_blank"
              >
                {link.label}
              </a>
            ))}
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

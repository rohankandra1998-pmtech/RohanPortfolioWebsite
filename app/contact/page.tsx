import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { contact, socials } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Rohan Singh Kandra about product management, AI products, and technical product opportunities.",
};

export default function ContactPage() {
  return (
    <>
      <section className="page-head">
        <div className="wrap" data-reveal>
          <p className="eyebrow">Let’s connect</p>
          <h1>Say hi!</h1>
          <p className="page-head__lead">
            Write your note below and it will open in your own email app.
          </p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap contact-grid">
          <ContactForm />
          <aside className="contact-aside" data-reveal>
            <p className="eyebrow">Prefer something else?</p>
            <a className="contact-direct focus-ring" href={`mailto:${contact.email}`}>
              <span>Email</span>
              <strong>{contact.email}</strong>
              <b aria-hidden="true">→</b>
            </a>
            {socials.slice(0, 2).map((link) => (
              <a
                className="contact-direct focus-ring"
                href={link.href}
                key={link.label}
                rel="noreferrer"
                target="_blank"
              >
                <span>{link.label}</span>
                <strong>Open profile</strong>
                <b aria-hidden="true">→</b>
              </a>
            ))}
            <p className="contact-location">
              {contact.location}
              <br />
              Open to product and AI product conversations.
            </p>
            <p className="signature">— Rohan</p>
          </aside>
        </div>
      </section>
    </>
  );
}

"use client";

import { FormEvent, useState } from "react";
import { contact } from "@/content/site";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = encodeURIComponent(
      `Portfolio hello from ${name || "a visitor"}`,
    );
    const body = encodeURIComponent(
      `${message}\n\nFrom: ${name}\nReply to: ${email}`,
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <label>
        <span>Your name</span>
        <input
          autoComplete="name"
          name="name"
          onChange={(event) => setName(event.target.value)}
          required
          value={name}
        />
      </label>
      <label>
        <span>Your email</span>
        <input
          autoComplete="email"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          required
          type="email"
          value={email}
        />
        <small>So I know where to reply.</small>
      </label>
      <label>
        <span>Message</span>
        <textarea
          name="message"
          onChange={(event) => setMessage(event.target.value)}
          required
          rows={7}
          value={message}
        />
      </label>
      <button className="button button--dark focus-ring" type="submit">
        Send message <span aria-hidden="true">→</span>
      </button>
      <p className="form-note">
        This opens your email app. Nothing is stored on this website.
      </p>
    </form>
  );
}

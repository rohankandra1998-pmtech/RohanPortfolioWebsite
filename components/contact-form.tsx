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
    <div className="contact-note-wrap" data-reveal>
      <form className="contact-form contact-note" onSubmit={submit}>
        <span aria-hidden="true" className="contact-note__tape" />
        <span aria-hidden="true" className="contact-note__pin">
          <span />
        </span>
        <label className="contact-form__field">
          <span>Your name</span>
          <input
            autoComplete="name"
            name="name"
            onChange={(event) => setName(event.target.value)}
            placeholder="Jane Doe"
            required
            value={name}
          />
        </label>
        <label className="contact-form__field">
          <span>Your email</span>
          <input
            autoComplete="email"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
            type="email"
            value={email}
          />
          <small>So I know where to reply.</small>
        </label>
        <label className="contact-form__field contact-form__field--message">
          <span>Message</span>
          <textarea
            name="message"
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Tell me who you are and what you're building. :)"
            required
            rows={4}
            value={message}
          />
        </label>
        <button className="button button--contact focus-ring" type="submit">
          Send message
          <svg
            aria-hidden="true"
            className="button--contact__send"
            focusable="false"
            viewBox="0 0 18 18"
          >
            <path
              d="M15.8 2.2 8.9 15.8l-1.7-5-5-1.7 13.6-6.9Z"
              fill="none"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="m7.2 10.8 4-4"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
            />
          </svg>
        </button>
        <svg
          aria-hidden="true"
          className="contact-note__pencil"
          focusable="false"
          viewBox="0 0 90 250"
        >
          <defs>
            <filter id="pencil-shadow" x="-40%" y="-10%" width="180%" height="130%">
              <feDropShadow
                dx="5"
                dy="7"
                floodColor="#4b315f"
                floodOpacity=".18"
                stdDeviation="5"
              />
            </filter>
            <linearGradient id="pencil-barrel" x1="0" x2="1">
              <stop offset="0" stopColor="#cbb9df" />
              <stop offset=".48" stopColor="#a98bc7" />
              <stop offset="1" stopColor="#8060a0" />
            </linearGradient>
            <linearGradient id="pencil-wood" x1="0" x2="1">
              <stop offset="0" stopColor="#f4d8a9" />
              <stop offset=".55" stopColor="#d7ad76" />
              <stop offset="1" stopColor="#b98a58" />
            </linearGradient>
          </defs>
          <g filter="url(#pencil-shadow)">
            <path d="M24 222 22 57l23-38 23 38-2 165Z" fill="url(#pencil-barrel)" />
            <path d="m22 57 23-38 23 38-23 16Z" fill="url(#pencil-wood)" />
            <path d="m39 29 6-10 7 11-7 5Z" fill="#303039" />
            <path d="m22 57 23 16v149H24Z" fill="#bda5d5" opacity=".72" />
            <path d="m45 73 23-16-2 165H45Z" fill="#76508f" opacity=".42" />
            <path d="M24 222h42l-7 13H31Z" fill="#73518f" />
            <path d="M31 235h28v7H31Z" fill="#59406e" />
          </g>
        </svg>
      </form>
      <p className="form-note">
        This opens your email app. Nothing is stored on this website.
      </p>
    </div>
  );
}

'use client';

import { useState } from 'react';
import styles from './Contact.module.css';
import { FadeIn } from '../components/FadeIn';

// ── Add your social links here ────────────────────────────────────────────────
const socials = [
  { name: 'Email', handle: 'rikkicasupanan.dev@gmail.com', href: 'mailto:rikkicasupanan.dev@gmail.com' },
  { name: 'GitHub', handle: '@Rikkayyy', href: 'https://github.com/Rikkayyy' },
  { name: 'Instagram', handle: '@rikki.casupanan', href: 'https://instagram.com/rikki.casupanan' },
  { name: 'LinkedIn', handle: 'Rikki Casupanan', href: 'https://linkedin.com/in/rikkicasupanan' },
];

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed to send');
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.noise} />

      <main className={styles.main}>

        {/* Heading */}
        <p className={styles.eyebrow}>Contact</p>
        <h1 className={styles.heading}>Get in<br />Touch</h1>
        <p className={styles.subheading}>
          Whether it&apos;s a project, a collaboration, or just to say hello —
          I&apos;d love to hear from you.
        </p>

        {/* Form */}
        <FadeIn delay={300}>
          {status === 'sent' ? (
            <p className={styles.success}>
              Thanks for reaching out — I&apos;ll get back to you soon.
            </p>
          ) : status === 'error' ? (
            <p className={styles.error}>
              Something went wrong. Please try again or email me directly.
            </p>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={styles.input}
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={styles.input}
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className={styles.textarea}
                  placeholder="What's on your mind?"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className={styles.submit}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending…' : 'Send Message →'}
              </button>
            </form>
          )}
        </FadeIn>

        {/* Divider */}
        <FadeIn delay={100}>
          <div className={styles.divider} />
        </FadeIn>

        {/* Social links */}
        <FadeIn delay={150}>
          <p className={styles.socialsLabel}>Find me at</p>
          <div className={styles.socials}>
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                className={styles.socialLink}
                target={s.href.startsWith('mailto') ? undefined : '_blank'}
                rel={s.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              >
                <span className={styles.socialName}>{s.name}</span>
                <span className={styles.socialHandle}>{s.handle}</span>
                <span className={styles.socialArrow}>→</span>
              </a>
            ))}
          </div>
        </FadeIn>

        {/* End mark */}
        <div className={styles.end}>
          <div className={styles.endLine} />
          <span className={styles.endLabel}>End of Contact</span>
          <div className={styles.endLine} />
        </div>

      </main>
    </div>
  );
}

import type { Metadata } from 'next';
import styles from './About.module.css';
import { FadeIn } from '../components/FadeIn';

export const metadata: Metadata = {
  title: 'About',
  description: 'Rikki Casupanan — Software Developer in Houston, TX. Experience, education, and skills.',
};

export default function AboutPage() {
  // ── Edit your facts here ──────────────────────────────────────────────────
  const facts = [
    { key: 'Based in',      value: 'Houston, Texas' },
    { key: 'Currently',     value: 'Software Developer I — Piping Technology & Products (Sep 2026 – Present)' },
    { key: 'Previously',    value: 'AI Intern — Piping Technology & Products (Jul – Sep 2026)' },
    { key: 'Education',     value: 'M.S. Computer Science — Georgia Tech (Aug 2026 – May 2028)' },
    { key: '',              value: 'B.S. Computer Science, Cum Laude — University of Houston (2020 – 2025)' },
    { key: 'Certification', value: 'AWS Certified Cloud Practitioner (Nov 2025)' },
  ];

  // ── Edit your skills here ─────────────────────────────────────────────────
  const devSkills = [
    { label: 'Languages',              skills: ['C++', 'C#', 'Java', 'JavaScript/TypeScript', 'Python', 'R', 'SQL'] },
    { label: 'Frameworks & Libraries', skills: ['ASP.NET Core', 'Express', 'Maven', 'Next.js', 'Node.js', 'React', 'Spring Boot', 'Tailwind CSS'] },
    { label: 'Databases & Storage',    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Supabase', 'AWS S3'] },
    { label: 'Tools & Platforms',      skills: ['AWS', 'Docker', 'GitHub', 'VS Code'] },
  ];

  const links = [
    { label: 'Resume (PDF)', href: '/Rikki-Casupanan-Resume.pdf' },
    { label: 'GitHub',       href: 'https://github.com/Rikkayyy' },
    { label: 'LinkedIn',     href: 'https://linkedin.com/in/rikkicasupanan' },
    { label: 'Email',        href: 'mailto:rikkicasupanan.dev@gmail.com' },
  ];

  const photoSkills = [
    'Portrait', 'Landscape', 'Lightroom',
  ];

  return (
    <div className={styles.page}>
      <div className={styles.noise} />

      <main className={styles.main}>

        {/* Heading */}
        <p className={styles.eyebrow}>About</p>
        <h1 className={styles.heading}>Rikki<br />Casupanan</h1>

        {/* Bio — replace with your own words */}
        <FadeIn delay={250}>
          <p className={styles.bio}>
            I&apos;m a software developer at Piping Technology &amp; Products in Houston, Texas, and an
            MS Computer Science student at Georgia Tech. I build full-stack apps — most recently CardSync,
            a personal finance app built with Spring Boot, React, and PostgreSQL. I have a passion for
            building applications that solve real-world problems in healthcare, energy, or technology.
            Outside of code I take photos: portraits, light, plants, and clouds have been catching my eye lately.
          </p>
          <nav className={styles.links} aria-label="Resume and profiles">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={styles.link}
                {...(link.href.startsWith('http') || link.href.endsWith('.pdf')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {link.label} →
              </a>
            ))}
          </nav>
        </FadeIn>

        <FadeIn delay={350}>
          <div className={styles.divider} />
        </FadeIn>

        {/* Currently */}
        <FadeIn delay={100}>
          <section className={styles.section}>
            <p className={styles.sectionLabel}>Currently</p>
            <div className={styles.facts}>
              {facts.map((f) => (
                <div key={f.value} className={styles.fact}>
                  <span className={styles.factKey}>{f.key}</span>
                  <span className={styles.factValue}>{f.value}</span>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Dev skills */}
        <FadeIn delay={100}>
          <section className={styles.section}>
            <p className={styles.sectionLabel}>Development</p>
            <div className={styles.skillGroups}>
              {devSkills.map((group) => (
                <div key={group.label} className={styles.skillGroup}>
                  <p className={styles.skillGroupLabel}>{group.label}</p>
                  <div className={styles.skills}>
                    {group.skills.map((s) => (
                      <span key={s} className={styles.skill}>{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Photo skills */}
        <FadeIn delay={100}>
          <section className={styles.section}>
            <p className={styles.sectionLabel}>Photography</p>
            <div className={styles.skills}>
              {photoSkills.map((s) => (
                <span key={s} className={styles.skill}>{s}</span>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* End mark */}
        <div className={styles.end}>
          <div className={styles.endLine} />
          <span className={styles.endLabel}>End of About</span>
          <div className={styles.endLine} />
        </div>

        <p className={styles.privacy}>
          This site collects anonymous analytics.
        </p>

      </main>
    </div>
  );
}

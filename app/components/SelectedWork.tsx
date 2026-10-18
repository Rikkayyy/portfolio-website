import Link from 'next/link';
import styles from './SelectedWork.module.css';
import { FEATURED } from '../data/featured';

// Server-rendered summary below the landing hero — readable without JS or hover.
export function SelectedWork() {
  return (
    <section id="work" className={styles.section} aria-labelledby="work-heading">
      <div className={styles.inner}>

        <p className={styles.eyebrow}>Selected Work</p>
        <h2 id="work-heading" className={styles.intro}>
          I build full-stack web apps with Java/Spring Boot, React, TypeScript, and PostgreSQL.
        </h2>
        <p className={styles.current}>
          Currently Software Developer I at Piping Technology &amp; Products in Houston, TX.
          MS Computer Science at Georgia Tech; BS Computer Science, University of Houston (Cum Laude).
        </p>

        <ol className={styles.list}>
          {FEATURED.map((proj, i) => (
            <li key={proj.slug} className={styles.item}>
              <div className={styles.itemHeader}>
                <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className={styles.title}>{proj.title}</h3>
                <span className={styles.period}>{proj.period}</span>
              </div>

              <ul className={styles.points}>
                {proj.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              <div className={styles.footer}>
                <div className={styles.tech}>
                  {proj.tech.map((t) => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                </div>
                <div className={styles.links}>
                  {proj.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      {link.label} →
                    </a>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <nav className={styles.more} aria-label="More">
          <Link href="/projects" className={styles.moreLink}>All projects →</Link>
          <Link href="/about" className={styles.moreLink}>About →</Link>
          <a href="mailto:rikkicasupanan.dev@gmail.com" className={styles.moreLink}>Email →</a>
          <Link href="/gallery" className={styles.photoLink}>I also shoot photos →</Link>
        </nav>

      </div>
    </section>
  );
}

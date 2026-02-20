import styles from './About.module.css';
import { FadeIn } from '../components/FadeIn';

export default function AboutPage() {
  // ── Edit your facts here ──────────────────────────────────────────────────
  const facts = [
    { key: 'Based in', value: 'Houston, Texas' },
    { key: 'Currently', value: 'Open to new opportunities' },
    { key: 'Background', value: 'Software development & photography' },
    { key: 'Education', value: 'B.S. Computer Science — University of Houston' },
  ];

  // ── Edit your skills here ─────────────────────────────────────────────────
  const devSkills = [
    { label: 'Languages',             skills: ['Python', 'C++', 'JavaScript', 'HTML/CSS', 'R', 'SQL', 'TypeScript'] },
    { label: 'Frameworks & Libraries', skills: ['React', 'Next.js', 'Node.js', 'Express', 'Jest', 'Tailwind CSS'] },
    { label: 'Databases & Storage',   skills: ['MySQL', 'MongoDB', 'Supabase', 'AWS S3'] },
    { label: 'Tools & Platforms',     skills: ['GitHub', 'VS Code', 'PyCharm', 'Jupyter', 'Jenkins', 'WSL'] },
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
            I&apos;m a developer and photographer based in Houston, Texas.
            I build things for the web and make photographs that try to
            say something — often about light, time, and the spaces people leave behind.
            Both practices share the same obsession: finding the right frame.
          </p>
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
                <div key={f.key} className={styles.fact}>
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

      </main>
    </div>
  );
}

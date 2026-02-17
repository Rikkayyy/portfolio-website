import Link from 'next/link';
import styles from './Projects.module.css';

// ── Add projects here ────────────────────────────────────────────────────────
const projects = [
  {
    num: '01',
    title: 'E-Commerce Platform',
    year: '2024',
    description: 'Full-stack e-commerce with real-time inventory, payment processing, and an admin dashboard.',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    num: '02',
    title: 'Task Management App',
    year: '2024',
    description: 'Collaborative task tool with drag-and-drop interface and real-time updates via websockets.',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    num: '03',
    title: 'Weather Dashboard',
    year: '2023',
    description: '7-day forecasts with interactive maps and location-based alerts across multiple weather APIs.',
    technologies: ['Vue.js', 'Chart.js', 'OpenWeatherMap'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    num: '04',
    title: 'Social Analytics',
    year: '2023',
    description: 'Cross-platform social media metrics with engagement tracking and data visualizations.',
    technologies: ['Python', 'Django', 'D3.js', 'PostgreSQL'],
    githubUrl: 'https://github.com',
  },
  {
    num: '05',
    title: 'Portfolio CMS',
    year: '2022',
    description: 'Headless CMS for portfolio sites with markdown support, image optimization, and SEO tools.',
    technologies: ['Next.js', 'GraphQL', 'Prisma', 'TypeScript'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    num: '06',
    title: 'Fitness Tracker',
    year: '2022',
    description: 'Mobile-first workout logging with progress charts and personalized recommendations.',
    technologies: ['React Native', 'Firebase', 'TypeScript'],
    liveUrl: 'https://example.com',
  },
];

export default function ProjectsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.noise} />

      {/* Fixed nav */}
      <nav className={styles.nav}>
        <Link href="/" className={styles.backBtn}>← Back</Link>
        <span className={styles.navName}>Rikki</span>
        <span className={styles.navLabel}>Projects</span>
      </nav>

      <main className={styles.main}>

        {/* Masthead */}
        <header className={styles.masthead}>
          <p className={styles.mastheadEyebrow}>Development</p>
          <h1 className={styles.mastheadTitle}>Projects</h1>
        </header>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Card grid */}
        <div className={styles.grid}>
          {projects.map((proj) => (
            <article key={proj.num} className={styles.card}>

              {/* Glow overlay */}
              <div className={styles.cardGlow} aria-hidden="true" />

              {/* Top accent bar */}
              <div className={styles.cardAccent} aria-hidden="true" />

              {/* Card content */}
              <div className={styles.cardBody}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardNum}>{proj.num}</span>
                  <span className={styles.cardYear}>{proj.year}</span>
                </div>

                <h2 className={styles.cardTitle}>{proj.title}</h2>

                <p className={styles.cardDesc}>{proj.description}</p>

                <div className={styles.techList}>
                  {proj.technologies.map((tech) => (
                    <span key={tech} className={styles.techTag}>{tech}</span>
                  ))}
                </div>
              </div>

              {/* Footer links */}
              {(proj.liveUrl || proj.githubUrl) && (
                <div className={styles.cardFooter}>
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      Live →
                    </a>
                  )}
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      GitHub →
                    </a>
                  )}
                </div>
              )}

            </article>
          ))}
        </div>

        {/* End mark */}
        <div className={styles.end}>
          <div className={styles.endLine} />
          <span className={styles.endLabel}>End of Projects</span>
          <div className={styles.endLine} />
        </div>

      </main>
    </div>
  );
}

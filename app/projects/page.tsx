import styles from './Projects.module.css';
import { supabase } from '@/lib/supabase';
import type { Project } from '@/types/supabase';

async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('display_order');

  if (error) {
    console.error('Failed to fetch projects:', error.message);
    return [];
  }

  return data ?? [];
}

// Zero-pad an index to produce '01', '02', etc.
function toNum(i: number) {
  return String(i + 1).padStart(2, '0');
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className={styles.page}>
      <div className={styles.noise} />

      <main className={styles.main}>

        {/* Masthead */}
        <header className={styles.masthead}>
          <p className={styles.mastheadEyebrow}>Development</p>
          <h1 className={styles.mastheadTitle}>Projects</h1>
        </header>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Empty state */}
        {projects.length === 0 && (
          <p style={{ padding: '4rem 2.5rem', color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>
            No projects published yet.
          </p>
        )}

        {/* Card grid */}
        {projects.length > 0 && (
          <div className={styles.grid}>
            {projects.map((proj, i) => (
              <article
                key={proj.id}
                className={styles.card}
                style={{ '--card-delay': `${i * 80}ms` } as React.CSSProperties}
              >

                {/* Glow overlay */}
                <div className={styles.cardGlow} aria-hidden="true" />

                {/* Top accent bar */}
                <div className={styles.cardAccent} aria-hidden="true" />

                {/* Card content */}
                <div className={styles.cardBody}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardNum}>{toNum(i)}</span>
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
                {(proj.live_url || proj.github_url) && (
                  <div className={styles.cardFooter}>
                    {proj.live_url && (
                      <a
                        href={proj.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                      >
                        Live →
                      </a>
                    )}
                    {proj.github_url && (
                      <a
                        href={proj.github_url}
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
        )}

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

import Image from 'next/image';
import styles from './Gallery.module.css';
import { FadeIn } from '../components/FadeIn';
import { supabase } from '@/lib/supabase';
import type { PublicationWithPhotos } from '@/types/supabase';

// ── Artist statement ───────────────────────────────────────────────────────────
// Replace this with your own words. Shown in the "Statement" section above the
// gallery series. It stays hardcoded here since it describes you, not a series.
const STATEMENT = `A visual journal exploring light, space, and the human form.
Each series is a meditation on a singular subject — an attempt
to distill the complexity of a moment into something essential
and still.`;

async function getPublications(): Promise<PublicationWithPhotos[]> {
  const { data, error } = await supabase
    .from('publications')
    .select(`
      *,
      photos (*)
    `)
    .eq('visible', true)
    .order('display_order')
    .order('display_order', { referencedTable: 'photos' });

  if (error) {
    console.error('Failed to fetch publications:', error.message);
    return [];
  }

  return (data ?? []) as PublicationWithPhotos[];
}

export default async function GalleryPage() {
  const publications = await getPublications();

  return (
    <div className={styles.page}>
      <div className={styles.noise} />

      <main className={styles.main}>

        {/* Masthead */}
        <header className={styles.masthead}>
          <p className={styles.mastheadEyebrow}>Photography</p>
          <h1 className={styles.mastheadTitle}>Gallery</h1>
        </header>

        {/* Table of contents */}
        {publications.length > 0 && (
          <FadeIn delay={200}>
            <section className={styles.toc}>
              <p className={styles.tocLabel}>Contents</p>
              {publications.map((pub) => (
                <a key={pub.id} href={`#${pub.id}`} className={styles.tocRow}>
                  <span className={styles.tocNum}>{pub.num}</span>
                  <span className={styles.tocDash}>—</span>
                  <span className={styles.tocTitle}>{pub.title}</span>
                  <span className={styles.tocRule} />
                  <span className={styles.tocYear}>{pub.year}</span>
                  <span className={styles.tocArrow}>→</span>
                </a>
              ))}
            </section>
          </FadeIn>
        )}

        {/* Artist statement */}
        <FadeIn delay={350}>
          <section className={styles.statement}>
            <p className={styles.statementLabel}>Statement</p>
            <p className={styles.statementText}>{STATEMENT}</p>
          </section>
        </FadeIn>

        {/* Red accent divider */}
        <FadeIn delay={450}>
          <div className={styles.divider} />
        </FadeIn>

        {/* Empty state */}
        {publications.length === 0 && (
          <p style={{ padding: '4rem 2.5rem', color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>
            No series published yet.
          </p>
        )}

        {/* Publication sections */}
        {publications.map((pub) => (
          <FadeIn key={pub.id}>
            <section id={pub.id} className={styles.section}>
              <div className={styles.pubLayout}>

                {/* Essay / caption column */}
                <div className={styles.textCol}>
                  <span className={styles.textGhost} aria-hidden="true">{pub.num}</span>
                  <span className={styles.textNum}>{pub.num}</span>
                  <h2 className={styles.textTitle}>{pub.title}</h2>
                  {pub.essay && <p className={styles.textEssay}>{pub.essay}</p>}
                  <span className={styles.textYear}>{pub.year}</span>
                </div>

                {/* Photos column */}
                <div className={styles.photosCol}>
                  {pub.photos.map((photo) => (
                    <div key={photo.id} className={styles.cell}>
                      <Image
                        src={photo.image_url}
                        alt={photo.alt ?? ''}
                        width={0}
                        height={0}
                        quality={90}
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ))}
                </div>

              </div>
            </section>
          </FadeIn>
        ))}

        {/* End mark */}
        <div className={styles.end}>
          <div className={styles.endLine} />
          <span className={styles.endLabel}>End of Gallery</span>
          <div className={styles.endLine} />
        </div>

      </main>
    </div>
  );
}

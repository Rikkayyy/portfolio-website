import Image from 'next/image';
import Link from 'next/link';
import styles from './Gallery.module.css';

// ── Add publications here ──────────────────────────────────────────────────
// Each publication is a named series with its own section on the page.
// The table of contents at the top links to each one automatically.
const publications = [
  {
    id: 'series-i',
    num: '01',
    title: 'Series I',
    year: '2024',
    // Replace with your own essay or caption for this series
    essay: `A visual journal exploring light, space, and the human form.
Each series is a meditation on a singular subject — an attempt
to distill the complexity of a moment into something essential
and still.`,
    photos: [
      { src: '/portrait-photo.jpg', alt: 'Portrait' },
      { src: '/portrait-photo-two.jpg', alt: 'Portrait' },
    ],
  },
  // {
  //   id: 'series-ii',
  //   num: '02',
  //   title: 'Series II',
  //   year: '2025',
  //   essay: `Your essay here.`,
  //   photos: [
  //     { src: '/your-photo.jpg', alt: '...' },
  //   ],
  // },
];

export default function GalleryPage() {
  return (
    <div className={styles.page}>
      <div className={styles.noise} />

      {/* Fixed nav */}
      <nav className={styles.nav}>
        <Link href="/" className={styles.backBtn}>← Back</Link>
        <span className={styles.navName}>Rikki</span>
        <span className={styles.navLabel}>Gallery</span>
      </nav>

      <main className={styles.main}>

        {/* Masthead */}
        <header className={styles.masthead}>
          <p className={styles.mastheadEyebrow}>Photography</p>
          <h1 className={styles.mastheadTitle}>Gallery</h1>
        </header>

        {/* Table of contents */}
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

        {/* Artist statement */}
        <section className={styles.statement}>
          <p className={styles.statementLabel}>Statement</p>
          <p className={styles.statementText}>
            {/* Replace this with your own words */}
            A visual journal exploring light, space, and the human form.
            Each series is a meditation on a singular subject — an attempt
            to distill the complexity of a moment into something essential
            and still.
          </p>
        </section>

        {/* Red accent divider */}
        <div className={styles.divider} />

        {/* Publication sections */}
        {publications.map((pub) => (
          <section key={pub.id} id={pub.id} className={styles.section}>
            <div className={styles.pubLayout}>

              {/* Essay / caption column */}
              <div className={styles.textCol}>
                <span className={styles.textGhost} aria-hidden="true">{pub.num}</span>
                <span className={styles.textNum}>{pub.num}</span>
                <h2 className={styles.textTitle}>{pub.title}</h2>
                <p className={styles.textEssay}>{pub.essay}</p>
                <span className={styles.textYear}>{pub.year}</span>
              </div>

              {/* Photos column */}
              <div className={styles.photosCol}>
                {pub.photos.map((photo, i) => (
                  <div key={i} className={styles.cell}>
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      quality={100}
                      style={{ objectFit: 'cover' }}
                      sizes="50vw"
                    />
                  </div>
                ))}
              </div>

            </div>
          </section>
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

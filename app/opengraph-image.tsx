import { ImageResponse } from 'next/og';
import { FEATURED } from './data/featured';

export const alt = 'Rikki Casupanan — Software Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Link-preview card, generated at build time. Matches the developer side of the landing page.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'radial-gradient(ellipse at 80% 20%, #0a2a33 0%, #040d12 60%)',
          color: '#e0f4f8',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 22, letterSpacing: 8, color: '#00e5ff', textTransform: 'uppercase' }}>
            rikkicasupanan.com
          </div>
          <div style={{ fontSize: 84, fontWeight: 700, marginTop: 24, color: '#f2f2f2' }}>
            Rikki Casupanan
          </div>
          <div style={{ fontSize: 36, marginTop: 12, color: 'rgba(224, 244, 248, 0.75)' }}>
            Software Developer · MS CS @ Georgia Tech
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {FEATURED.map((proj) => (
            <div key={proj.slug} style={{ display: 'flex', fontSize: 26 }}>
              <span style={{ color: '#00e5ff', marginRight: 16 }}>▶</span>
              <span style={{ color: '#f2f2f2', fontWeight: 700, marginRight: 16 }}>{proj.title}</span>
              <span style={{ color: 'rgba(224, 244, 248, 0.55)' }}>{proj.tagline}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}

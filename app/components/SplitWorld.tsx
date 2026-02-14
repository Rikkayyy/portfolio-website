'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './SplitWorld.module.css';

type WorldState = 'default' | 'photo-hover' | 'dev-hover' | 'entering-photo' | 'entering-dev';
type CursorType = 'default' | 'photo' | 'dev' | 'enter';

const SPLIT = {
  'default':        { photo: '50%', dev: '50%', divider: '50%' },
  'photo-hover':    { photo: '68%', dev: '32%', divider: '68%' },
  'dev-hover':      { photo: '32%', dev: '68%', divider: '32%' },
  'entering-photo': { photo: '100%', dev: '0%',  divider: '100%' },
  'entering-dev':   { photo: '0%',  dev: '100%', divider: '0%'   },
} as const;

export function SplitWorld() {
  const router = useRouter();
  const [worldState, setWorldState] = useState<WorldState>('default');
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<CursorType>('default');

  // Load-in opacity (replaces CSS animation fill for togglable elements)
  const [dividerVisible,    setDividerVisible]    = useState(false);
  const [centerNameVisible, setCenterNameVisible] = useState(false);
  const [hintVisible,       setHintVisible]       = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setDividerVisible(true),    400);
    const t2 = setTimeout(() => setCenterNameVisible(true), 600);
    const t3 = setTimeout(() => setHintVisible(true),      1000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  const isEntering = worldState === 'entering-photo' || worldState === 'entering-dev';
  const split = SPLIT[worldState];

  // Cursor class
  const cursorClass = [
    styles.cursor,
    cursorType === 'photo' ? styles.cursorPhoto : '',
    cursorType === 'dev'   ? styles.cursorDev   : '',
    cursorType === 'enter' ? styles.cursorEnter : '',
  ].filter(Boolean).join(' ');

  // Derived opacity values
  const dividerOp    = dividerVisible    && !isEntering             ? 1 : 0;
  const centerNameOp = centerNameVisible && !isEntering             ? 1 : 0;
  const hintOp       = hintVisible       && worldState === 'default' ? 1 : 0;
  const backOp       = isEntering                                    ? 1 : 0;

  const photoLabelOp = worldState === 'default' || worldState === 'photo-hover' ? 1 : 0;
  const devLabelOp   = worldState === 'default' || worldState === 'dev-hover'   ? 1 : 0;

  // Event handlers
  const onPhotoEnter = useCallback(() => {
    if (!isEntering) { setWorldState('photo-hover'); setCursorType('photo'); }
  }, [isEntering]);

  const onPhotoLeave = useCallback(() => {
    if (worldState === 'photo-hover') setWorldState('default');
    setCursorType('default');
  }, [worldState]);

  const onDevEnter = useCallback(() => {
    if (!isEntering) { setWorldState('dev-hover'); setCursorType('dev'); }
  }, [isEntering]);

  const onDevLeave = useCallback(() => {
    if (worldState === 'dev-hover') setWorldState('default');
    setCursorType('default');
  }, [worldState]);

  const onEnterBtnEnter = useCallback(() => setCursorType('enter'), []);
  const onEnterBtnLeave = useCallback(() => setCursorType('default'), []);

  const handleEnterPhoto = (e: React.MouseEvent) => {
    e.preventDefault();
    setWorldState('entering-photo');
    setCursorType('default');
    setTimeout(() => router.push('/gallery'), 900);
  };

  const handleEnterDev = (e: React.MouseEvent) => {
    e.preventDefault();
    setWorldState('entering-dev');
    setCursorType('default');
    setTimeout(() => router.push('/projects'), 900);
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    setWorldState('default');
    setCursorType('default');
  };

  return (
    <div className={styles.container}>
      {/* Custom cursor */}
      <div className={cursorClass} style={{ left: cursorPos.x, top: cursorPos.y }} />

      {/* Noise overlay */}
      <div className={styles.noise} />

      {/* Center name */}
      <div
        className={styles.centerName}
        style={{ opacity: centerNameOp, transition: 'opacity 0.4s' }}
      >
        <span className={styles.centerNameText}>Rikki Casupanan</span>
      </div>

      {/* Hint */}
      <div
        className={styles.hint}
        style={{ opacity: hintOp, transition: 'opacity 0.4s' }}
      >
        <p className={styles.hintText}>
          <span className={styles.hintArrow}>←</span>
          hover to explore
          <span className={styles.hintArrow}>→</span>
        </p>
      </div>

      {/* Back button */}
      <a
        href="#"
        className={styles.backBtn}
        style={{ opacity: backOp, pointerEvents: backOp ? 'all' : 'none', transition: 'opacity 0.4s, color 0.3s, border-color 0.3s' }}
        onClick={handleBack}
        onMouseEnter={onEnterBtnEnter}
        onMouseLeave={() => setCursorType('default')}
      >
        ← Back
      </a>

      {/* Split world */}
      <div className={styles.world}>

        {/* Divider */}
        <div
          className={styles.divider}
          style={{ left: split.divider, opacity: dividerOp, transition: 'left 0.65s cubic-bezier(0.77, 0, 0.175, 1), opacity 0.4s ease' }}
        />

        {/* ── Photography side ── */}
        <div
          className={`${styles.side} ${styles.sidePhoto}`}
          style={{ width: split.photo }}
          onMouseEnter={onPhotoEnter}
          onMouseLeave={onPhotoLeave}
        >
          {/* Scene geometry */}
          <div className={styles.photoScene}>
            <div className={styles.photoPanel} />
            <div className={styles.photoStrip} />
            <div className={`${styles.photoRule} ${styles.pr1}`} />
            <div className={`${styles.photoRule} ${styles.pr2}`} />
            <div className={`${styles.photoRule} ${styles.pr3}`} />
            <div className={styles.photoGhost}>P</div>
          </div>

          {/* Decorative chrome */}
          <div className={styles.photoYear}>2023 — 2025</div>
          <div className={styles.photoIdx}>01</div>

          {/* Stacked photo cards */}
          <div className={styles.photoCards}>
            <div className={styles.pcardShadow}>
              <Image
                src="/portrait-photo-two.jpg"
                alt="Portrait photograph"
                fill
                quality={100}
                style={{ objectFit: 'cover' }}
                sizes="26vw"
              />
            </div>
            <div className={styles.pcardMain}>
              <Image
                src="/portrait-photo.jpg"
                alt="Portrait photograph"
                fill
                quality={100}
                style={{ objectFit: 'cover' }}
                sizes="26vw"
              />
              <div className={styles.pcardMeta}>
                <span className={styles.pcardMetaTitle}>Series I</span>
                <span className={styles.pcardMetaNum}>01/12</span>
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className={styles.photoContent}>
            <span className={styles.photoEyebrow}>Visual Storytelling</span>
            <h2 className={styles.photoTitle}>
              Photo&shy;graphy
              <span className={styles.subItalic}>through the frame</span>
            </h2>
            <p className={styles.photoDesc}>Landscapes &nbsp;·&nbsp; Portraits &nbsp;·&nbsp; Fine Art Prints</p>
            <a
              href="/gallery"
              className={styles.enterBtn}
              onClick={handleEnterPhoto}
              onMouseEnter={onEnterBtnEnter}
              onMouseLeave={onEnterBtnLeave}
            >
              <span className={styles.btnFill} />
              <span className={styles.btnText}>Enter Gallery →</span>
            </a>
          </div>

          <span className={styles.sideLabel} style={{ opacity: photoLabelOp, transition: 'opacity 0.4s' }}>
            Photography
          </span>
        </div>

        {/* ── Developer side ── */}
        <div
          className={`${styles.side} ${styles.sideDev}`}
          style={{ width: split.dev }}
          onMouseEnter={onDevEnter}
          onMouseLeave={onDevLeave}
        >
          <div className={styles.devBgLayer} />
          <div className={styles.devGrid} />

          <div className={styles.codeRain}>
            <span className={styles.codeStream}>const build = () =&gt; create() → deploy → iterate → refine →</span>
            <span className={styles.codeStream}>npm run dev → localhost:3000 → hot reload → typescript →</span>
            <span className={styles.codeStream}>supabase.from(&apos;projects&apos;).select(&apos;*&apos;) → data → render →</span>
            <span className={styles.codeStream}>async function render() &#123; return &lt;Component /&gt; &#125; export →</span>
            <span className={styles.codeStream}>git commit -m &quot;craft&quot; → push origin main → CI/CD →</span>
            <span className={styles.codeStream}>tailwind → components → layout → responsive → ship →</span>
            <span className={styles.codeStream}>import &#123; useState &#125; from &apos;react&apos; → state → effect →</span>
          </div>

          <div className={styles.devScanline} />

          <div className={styles.devContent}>
            <div className={styles.terminal}>
              <div className={styles.terminalBar}>
                <div className={styles.termDot} />
                <div className={styles.termDot} />
                <div className={styles.termDot} />
                <span className={styles.termTitle}>rikki ~ portfolio</span>
              </div>
              <div className={styles.terminalBody}>
                <span className={styles.termLine}>
                  <span className={styles.termPrompt}>~ </span>
                  <span className={styles.termCmd}>npm run dev</span>
                </span>
                <span className={styles.termLine}>
                  <span className={styles.termOut}>▶ Next.js 15 ready</span>
                </span>
                <span className={styles.termLine}>
                  <span className={styles.termOut}>▶ Supabase connected</span>
                </span>
                <span className={styles.termLine}>
                  <span className={styles.termSuccess}>✓ localhost:3000</span>
                </span>
                <span className={styles.termLine}>
                  <span className={styles.termPrompt}>~ </span>
                  <span className={styles.termCursor} />
                </span>
              </div>
            </div>

            <span className={styles.devEyebrow}>Full-Stack Development</span>
            <h2 className={styles.devTitle}>
              Devel&shy;oper
              <em>through the code</em>
            </h2>
            <p className={styles.devSub}>Next.js · TypeScript · Supabase · Stripe</p>
            <a
              href="/projects"
              className={styles.enterBtnDev}
              onClick={handleEnterDev}
              onMouseEnter={onEnterBtnEnter}
              onMouseLeave={onEnterBtnLeave}
            >
              Enter Projects →
            </a>
          </div>

          <span className={styles.sideLabel} style={{ opacity: devLabelOp, transition: 'opacity 0.4s' }}>
            Developer
          </span>
        </div>

      </div>
    </div>
  );
}

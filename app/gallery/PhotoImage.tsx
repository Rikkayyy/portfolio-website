'use client';

import Image from 'next/image';
import { useState } from 'react';
import styles from './Gallery.module.css';

export function PhotoImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`${styles.imgWrap} ${loaded ? styles.imgLoaded : ''}`}>
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        quality={90}
        sizes="(max-width: 768px) 100vw, 40vw"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

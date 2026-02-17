'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './NavBar.module.css';

const navLinks = [
  { name: 'Gallery', href: '/gallery', dot: '#ff3500' },
  { name: 'Projects', href: '/projects', dot: '#00e5ff' },
  { name: 'About', href: '/about', dot: '#ff3500' },
  { name: 'Contact', href: '/contact', dot: '#00e5ff' },
];

// Pages that manage their own nav
const EXCLUDED = ['/'];

export const NavBar: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (EXCLUDED.includes(pathname)) return null;

  return (
    <>
      <nav className={`${styles.nav} ${isScrolled ? styles.navScrolled : ''}`}>
        {/* Brand */}
        <Link href="/" className={styles.brand}>Home</Link>

        {/* Desktop links */}
        <div className={styles.links}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.link} ${pathname === link.href ? styles.linkActive : ''}`}
              style={{ '--dot-color': link.dot } as React.CSSProperties}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className={styles.mobileBtn}
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <rect width="16" height="1.5" fill="currentColor" />
            <rect y="5.25" width="16" height="1.5" fill="currentColor" />
            <rect y="10.5" width="16" height="1.5" fill="currentColor" />
          </svg>
        </button>
      </nav>

      {/* Mobile full-screen drawer */}
      <div className={`${styles.drawer} ${mobileOpen ? styles.drawerOpen : ''}`}>
        <button
          className={styles.drawerClose}
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          Close ×
        </button>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${styles.drawerLink} ${pathname === link.href ? styles.drawerLinkActive : ''}`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </>
  );
};

// Featured work shown on the home page. Keep in sync with the resume.

export type FeaturedLink = { label: string; href: string };

export type FeaturedProject = {
  slug: string;
  title: string;
  tagline: string;        // one line, used on the landing terminal
  period: string;
  points: string[];
  tech: string[];
  links: FeaturedLink[];
};

export const FEATURED: FeaturedProject[] = [
  {
    slug: 'cardsync',
    title: 'CardSync',
    tagline: 'Full-stack finance app · Plaid sync across 3 banks',
    period: 'Aug 2026 – Present',
    points: [
      'Combines 242+ real bank and card transactions from 3 banks using Plaid API cursor-based sync.',
      'Transfer detection pairs equal, opposite-sign transactions within 3 days across banks, so money moved between accounts doesn’t count as spending.',
      'Spring Security + JWT + BCrypt login; bank tokens encrypted with AES-256-GCM.',
    ],
    tech: ['Java', 'Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'Plaid API'],
    links: [
      { label: 'Live', href: 'https://card-sync-steel.vercel.app' },
      { label: 'GitHub', href: 'https://github.com/Rikkayyy/CardSync' },
    ],
  },
  {
    slug: 'rose-tea-house',
    title: 'Rose Tea House',
    tagline: 'Freelance production site · Next.js + AWS Amplify',
    period: 'Aug 2025 – Apr 2026',
    points: [
      'Freelance production website built with React, Next.js, and Tailwind CSS.',
      'AWS Amplify CI/CD with IAM and environment-based config.',
    ],
    tech: ['React', 'Next.js', 'Tailwind CSS', 'AWS Amplify'],
    links: [
      { label: 'Live', href: 'https://roseteahouse.com' },
    ],
  },
  {
    slug: 'hiregauge',
    title: 'HireGauge — Open-Source PR',
    tagline: 'Merged fix for two silent bugs in an AI resume parser',
    period: 'Jul 2026',
    points: [
      'Found and fixed two silent bugs in an AI resume parser: URLs corrupted by PDF text extraction, and missed non-hyperlinked personal websites.',
      'Added 4 unit tests; merged after maintainer code review.',
    ],
    tech: ['Python', 'pytest'],
    links: [
      { label: 'Pull Request', href: 'https://github.com/AdvancedUno/HireGauge/pull/52' },
    ],
  },
];

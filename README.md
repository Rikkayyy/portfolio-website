# rikkicasupanan.com

Personal site of Rikki Casupanan, Software Developer. It shows my software projects first, with a photography gallery as a secondary section. It's a Next.js 16 app with server-rendered content, a Supabase-backed admin panel for managing projects and photos, and a generated Open Graph card for link previews.

🔗 **Live:** [rikkicasupanan.com](https://rikkicasupanan.com)

## ✨ Features

### Site
- **Split landing + selected work** - Animated developer / photography split hero, followed by a server-rendered summary of featured projects (readable without JavaScript and on mobile)
- **Projects** - Project cards loaded from Supabase, ordered by `display_order`
- **Photography Gallery** - Photo series stored in Supabase Storage
- **About** - Role, education, skills, and resume download
- **Contact** - Contact form that sends email via Resend
- **Responsive** - Stacked, touch-friendly layout on phones
- **Metadata** - Per-page titles, Open Graph / Twitter tags, and a generated preview image (`app/opengraph-image.tsx`)

### Admin
- **Supabase Auth** - Admin routes protected by `proxy.ts` (Next.js 16's replacement for `middleware.ts`)
- **Content management** - Add, edit, and reorder projects and photos without code changes
- **Visitor analytics** - Anonymous page-view tracking with an admin view

## 🛠 Tech Stack

**Frontend:** Next.js 16 (App Router) • React 19 • TypeScript • Tailwind CSS 4 • CSS Modules

**Backend:** Supabase (PostgreSQL, Auth, Storage) • Server Actions • Route Handlers • Resend

**Deployment:** Vercel

## 📁 Project Structure

```
portfolio-website/
├── app/
│   ├── page.tsx          # Home: SplitWorld hero + SelectedWork section
│   ├── data/featured.ts  # Featured projects shown on the home page
│   ├── opengraph-image.tsx
│   ├── about/  contact/  gallery/  projects/
│   ├── admin/            # Admin dashboard & login
│   ├── api/              # contact, upload-photo
│   └── components/       # SplitWorld, SelectedWork, NavBar, ...
├── lib/                  # Supabase clients
├── types/                # Supabase table types
├── database/             # SQL schema
├── public/               # Images and resume PDF
└── proxy.ts              # Auth guard for /admin
```

## 🚀 Local Development

### Prerequisites
- Node.js 20+ and npm
- A Supabase project

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables** in `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   RESEND_API_KEY=your-resend-key
   ```

3. **Set up the database:** in the Supabase SQL Editor, run `supabase-migration.sql`.

4. **Run the dev server:**
   ```bash
   npm run dev
   ```
   Visit [http://localhost:3000](http://localhost:3000).

## 📦 Database Tables

- **projects** - Title, year, description, technologies, GitHub / live URLs, `display_order`, `visible`
- **publications** - Photo series (title, year, essay)
- **photos** - Images belonging to a publication
- **page_views** - Anonymous visit analytics

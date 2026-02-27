# Portfolio Website 

A modern, full-stack portfolio website featuring dynamic content management, photography gallery, and an admin dashboard. Built with Next.js 15, TypeScript, Tailwind CSS, and Supabase.

🔗 **[Live Demo](#)** <!-- Add your Vercel URL here -->
testing preview deployment recommendation

## ✨ Features

### Frontend
- **Dynamic Project Showcase** - Display portfolio projects with detailed descriptions and images
- **Photography Gallery** - Curated photo collection with responsive grid layout
- **About Page** - Personal introduction and background
- **Contact Section** - Easy way for visitors to get in touch
- **Smooth Animations** - Fade-in effects and polished transitions
- **Fully Responsive** - Optimized for all device sizes

### Backend & Admin
- **Secure Authentication** - Protected admin routes with Supabase Auth
- **Content Management System** - Add, edit, and delete projects and photos without touching code
- **Admin Dashboard** - Intuitive interface for managing all content
- **Database Integration** - PostgreSQL database via Supabase
- **Type-Safe API** - Server actions with full TypeScript support

## 🛠 Tech Stack

**Frontend:** Next.js 15 (App Router) • React • TypeScript • Tailwind CSS

**Backend:** Supabase (PostgreSQL + Auth) • Server Actions

**Deployment:** Vercel

**Dev Tools:** ESLint • PostCSS

## 🏗 Architecture Highlights

- **App Router** - Leveraging Next.js 15's latest routing system with server components
- **Server-Side Rendering** - Dynamic content with optimal performance
- **Type Safety** - Full TypeScript implementation with Supabase type generation
- **Middleware Authentication** - Protected admin routes at the edge
- **Modular Components** - Reusable UI components with CSS modules

## 📁 Project Structure

```
portfolio-website/
├── app/                  # Next.js app directory (routes & pages)
│   ├── about/           # About page
│   ├── admin/           # Admin dashboard & authentication
│   ├── components/      # Reusable UI components
│   ├── contact/         # Contact page
│   ├── gallery/         # Photography gallery
│   └── projects/        # Projects showcase
├── lib/                 # Supabase client utilities
├── types/               # TypeScript type definitions
├── database/            # Database schema and migrations
└── middleware.ts        # Auth middleware for protected routes
```

## 🚀 Local Development

### Prerequisites
- Node.js 18+ and npm
- Supabase account ([sign up free](https://supabase.com))

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   
   Create a `.env.local` file with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

3. **Set up database:**
   - Go to your [Supabase Dashboard](https://app.supabase.com)
   - Navigate to SQL Editor
   - Run `database/schema.sql` to create tables

4. **Run development server:**
   ```bash
   npm run dev
   ```
   
   Visit [http://localhost:3000](http://localhost:3000)

## 📦 Database Schema

- **projects** - Portfolio projects with title, description, images, and links
- **photography** - Photo gallery items with images and metadata

## 🌐 Deployment

Optimized for one-click deployment on Vercel:

1. Push to GitHub
2. Import to [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

Vercel automatically detects Next.js configuration and provides:
- Automatic HTTPS
- Global CDN
- Edge Functions
- Preview deployments for PRs

---

Built with Next.js 15 and modern web technologies.

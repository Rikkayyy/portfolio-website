# Portfolio Website

A modern portfolio website built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Supabase

Your Supabase configuration is already set up in `.env.local`. The database schema and seed data are in the `database/` folder.

#### Set up your database:

1. Go to your [Supabase Dashboard](https://app.supabase.com/project/qjwhnslncsbqqxkwjrqk)
2. Navigate to the SQL Editor
3. Run the schema: Copy and paste the contents of `database/schema.sql` and execute
4. Run the seed data (optional): Copy and paste the contents of `database/seed.sql` and execute

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
portfolio-website/
├── app/                  # Next.js app directory
├── lib/                  # Utility libraries (Supabase client)
├── types/                # TypeScript type definitions
├── database/             # Database schema and seed files
├── public/               # Static assets
└── .env.local           # Environment variables (Supabase keys)
```

## Database Tables

- **projects**: Store your portfolio projects
- **photography**: Store your photography portfolio

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## Deployment to Vercel

This project is optimized for deployment on Vercel (made by the creators of Next.js).

### Quick Deploy

1. **Push to Git** (GitHub, GitLab, or Bitbucket):
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign up/login
   - Click "Add New..." → "Project"
   - Import your repository
   - Vercel auto-detects Next.js - no configuration needed!

3. **Add Environment Variables**:
   - During import, add these variables (or add later in Project Settings → Environment Variables):
     - `NEXT_PUBLIC_SUPABASE_URL` → Your Supabase project URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Your Supabase anon key
   - Get these from your [Supabase Dashboard](https://app.supabase.com/project/qjwhnslncsbqqxkwjrqk/settings/api)

4. **Deploy**:
   - Click "Deploy"
   - Your site will be live at `https://your-project.vercel.app`

### Features You Get

- ✅ Automatic deployments on every git push
- ✅ Preview deployments for every branch/PR
- ✅ Global CDN for fast loading worldwide
- ✅ Automatic HTTPS
- ✅ Zero configuration needed
- ✅ Analytics and Web Vitals monitoring

### Custom Domain (Optional)

1. In Vercel dashboard, go to your project → Settings → Domains
2. Add your custom domain and follow DNS configuration steps

## Next Steps

1. Run the database schema and seed files in your Supabase dashboard
2. Start building your pages (about, projects, photography, contact)
3. Add your own content and images
4. Customize the design to match your style
5. Deploy to Vercel following the steps above

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

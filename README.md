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
- **Deployment**: Vercel (recommended)

## Next Steps

1. Run the database schema and seed files in your Supabase dashboard
2. Start building your pages (about, projects, photography, contact)
3. Add your own content and images
4. Customize the design to match your style

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

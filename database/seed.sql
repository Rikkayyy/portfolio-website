-- Insert sample projects
INSERT INTO projects (title, description, technologies, github_url, live_url, image_url, featured) VALUES
(
  'E-commerce Platform',
  'Full-stack e-commerce solution with Next.js, TypeScript, and Stripe integration. Features include product catalog, shopping cart, secure payments, order management, and admin dashboard.',
  ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'PostgreSQL', 'Prisma'],
  'https://github.com/yourusername/ecommerce-platform',
  'https://ecommerce-demo.vercel.app',
  '/images/projects/ecommerce.jpg',
  TRUE
),
(
  'Task Management App',
  'Real-time task management application with team collaboration features. Built with React and Node.js, featuring real-time updates, drag-and-drop functionality, and team workspaces.',
  ARRAY['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express', 'Material-UI'],
  'https://github.com/yourusername/task-manager',
  'https://task-manager-demo.vercel.app',
  '/images/projects/task-manager.jpg',
  TRUE
),
(
  'Photography Portfolio CMS',
  'Custom content management system for photographers with image optimization and gallery management. Features automatic image resizing, metadata extraction, and SEO optimization.',
  ARRAY['Next.js', 'Sanity', 'Cloudinary', 'Vercel', 'TypeScript'],
  'https://github.com/yourusername/photo-cms',
  'https://photo-cms-demo.vercel.app',
  '/images/projects/photo-cms.jpg',
  FALSE
),
(
  'AI Chat Application',
  'Modern chat application with AI-powered responses using OpenAI GPT. Features include real-time messaging, conversation history, and customizable AI personalities.',
  ARRAY['Next.js', 'OpenAI API', 'WebSocket', 'Redis', 'Tailwind CSS'],
  'https://github.com/yourusername/ai-chat',
  'https://ai-chat-demo.vercel.app',
  '/images/projects/ai-chat.jpg',
  TRUE
);

-- Insert sample photography
INSERT INTO photography (title, description, category, location, camera, lens, settings, image_url, thumbnail_url, featured) VALUES
(
  'Golden Hour Portrait',
  'Beautiful portrait session during golden hour in San Francisco. The warm, soft light creates a dreamy atmosphere perfect for capturing natural expressions and emotions.',
  'Portrait',
  'San Francisco, CA',
  'Canon EOS R5',
  '85mm f/1.4',
  'f/1.8, 1/200s, ISO 200',
  '/images/photography/golden-hour-portrait.jpg',
  '/images/photography/thumbs/golden-hour-portrait.jpg',
  TRUE
),
(
  'Yosemite Valley Sunrise',
  'Breathtaking sunrise over Yosemite Valley captured from Tunnel View. The morning mist and golden light illuminate the iconic granite cliffs and El Capitan.',
  'Landscape',
  'Yosemite National Park, CA',
  'Canon EOS R5',
  '24-70mm f/2.8',
  'f/8, 1/60s, ISO 100',
  '/images/photography/yosemite-sunrise.jpg',
  '/images/photography/thumbs/yosemite-sunrise.jpg',
  TRUE
),
(
  'Urban Life in NYC',
  'Candid street photography capturing the energy and diversity of New York City. This shot perfectly encapsulates the rush and vibrancy of urban life.',
  'Street',
  'New York City, NY',
  'Canon EOS R6',
  '35mm f/1.8',
  'f/2.8, 1/125s, ISO 400',
  '/images/photography/nyc-street.jpg',
  '/images/photography/thumbs/nyc-street.jpg',
  FALSE
),
(
  'Intimate Wedding Ceremony',
  'Beautiful intimate wedding ceremony in Napa Valley. Captured the emotional moment of the couple''s first kiss as husband and wife surrounded by their closest family.',
  'Wedding',
  'Napa Valley, CA',
  'Canon EOS R5',
  '70-200mm f/2.8',
  'f/2.8, 1/250s, ISO 800',
  '/images/photography/napa-wedding.jpg',
  '/images/photography/thumbs/napa-wedding.jpg',
  TRUE
),
(
  'Modern Architecture Lines',
  'Abstract architectural photography focusing on the geometric patterns and lines of contemporary building design. The interplay of light and shadow creates dynamic compositions.',
  'Architecture',
  'Los Angeles, CA',
  'Canon EOS R6',
  '16-35mm f/2.8',
  'f/11, 1/30s, ISO 100',
  '/images/photography/la-architecture.jpg',
  '/images/photography/thumbs/la-architecture.jpg',
  FALSE
),
(
  'Night Sky at Big Sur',
  'Long exposure capturing the Milky Way over the dramatic Big Sur coastline. The combination of stars, cliffs, and ocean creates a stunning celestial landscape.',
  'Landscape',
  'Big Sur, CA',
  'Canon EOS R5',
  '14mm f/1.8',
  'f/2, 20s, ISO 3200',
  '/images/photography/big-sur-stars.jpg',
  '/images/photography/thumbs/big-sur-stars.jpg',
  TRUE
);

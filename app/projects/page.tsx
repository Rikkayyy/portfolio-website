import { ProjectCard } from '../components/ProjectCard';

export default function ProjectsPage() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard. Features include product search, shopping cart, and order tracking.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop",
      technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true,
    },
    {
      title: "Task Management App",
      description: "Collaborative task management tool with drag-and-drop interface, team collaboration features, and real-time updates. Built for modern agile teams.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Redux"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true,
    },
    {
      title: "Weather Dashboard",
      description: "Beautiful weather application with 7-day forecasts, interactive maps, and location-based alerts. Integrates multiple weather APIs for accurate predictions.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop",
      technologies: ["Vue.js", "OpenWeatherMap API", "Chart.js", "CSS3"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      title: "Social Media Analytics",
      description: "Comprehensive analytics platform for social media metrics. Track engagement, growth, and audience insights across multiple platforms with beautiful data visualizations.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      technologies: ["Python", "Django", "React", "D3.js", "PostgreSQL"],
      githubUrl: "https://github.com",
    },
    {
      title: "Portfolio CMS",
      description: "Headless CMS built specifically for portfolio websites. Easy content management with markdown support, image optimization, and SEO tools.",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop",
      technologies: ["Next.js", "GraphQL", "Prisma", "TypeScript"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      title: "Fitness Tracker",
      description: "Mobile-first fitness tracking application with workout logging, progress charts, and personalized workout recommendations based on user goals.",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop",
      technologies: ["React Native", "Firebase", "TypeScript", "Redux"],
      liveUrl: "https://example.com",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
            My Projects
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A collection of projects I've built, showcasing my skills in web development, design, and problem-solving.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              image={project.image}
              technologies={project.technologies}
              liveUrl={project.liveUrl}
              githubUrl={project.githubUrl}
              featured={project.featured}
            />
          ))}
        </div>

        {/* Back to Home Link */}
        <div className="text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

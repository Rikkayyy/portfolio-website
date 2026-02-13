import { supabase } from '@/lib/supabase';

export default async function Home() {
  // Test Supabase connection by fetching featured projects
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .eq('featured', true)
    .limit(3);

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <main className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Welcome to Your Portfolio</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Built with Next.js, TypeScript, Tailwind CSS, and Supabase
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Getting Started</h2>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">✅ Next.js Setup Complete</h3>
              <p className="text-gray-600 dark:text-gray-400">Your project is running with TypeScript and Tailwind CSS</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">✅ Supabase Installed</h3>
              <p className="text-gray-600 dark:text-gray-400">Supabase client is configured and ready to use</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">📋 Next Step: Set Up Database</h3>
              <ol className="list-decimal list-inside text-gray-600 dark:text-gray-400 space-y-2 mt-2">
                <li>Go to your <a href="https://app.supabase.com/project/qjwhnslncsbqqxkwjrqk" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Supabase Dashboard</a></li>
                <li>Open the SQL Editor</li>
                <li>Run the contents of <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">database/schema.sql</code></li>
                <li>Run the contents of <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">database/seed.sql</code> (optional sample data)</li>
              </ol>
            </div>
          </div>
        </div>

        {projects && projects.length > 0 ? (
          <div>
            <h2 className="text-3xl font-bold mb-6">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Database Not Set Up Yet</h3>
            <p className="text-gray-700 dark:text-gray-300">
              {error ? `Error: ${error.message}` : 'Run the database schema and seed files to see your content here.'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

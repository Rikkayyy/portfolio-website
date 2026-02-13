import { PolaroidCard } from '../components/PolaroidCard';

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Polaroid Gallery
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            A collection of memories in instant film style
          </p>
        </div>

        {/* Gallery Grid - scattered polaroid effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12">
          <div className="flex justify-center">
            <PolaroidCard
              image="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=400&h=400&fit=crop"
              caption="Mountain Views"
              alt="Beautiful mountain landscape"
              rotation={-2}
              className="w-64 hover:z-10"
            />
          </div>

          <div className="flex justify-center">
            <PolaroidCard
              image="https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=400&h=400&fit=crop"
              caption="City Lights"
              alt="Urban cityscape at night"
              rotation={3}
              className="w-64 hover:z-10"
            />
          </div>

          <div className="flex justify-center">
            <PolaroidCard
              image="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=400&fit=crop"
              caption="Wanderlust"
              alt="Scenic travel destination"
              rotation={-1}
              className="w-64 hover:z-10"
            />
          </div>

          <div className="flex justify-center">
            <PolaroidCard
              image="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=400&fit=crop"
              caption="Nature Calls"
              alt="Peaceful nature scene"
              rotation={2}
              className="w-64 hover:z-10"
            />
          </div>

          <div className="flex justify-center">
            <PolaroidCard
              image="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop"
              caption="Golden Hour"
              alt="Beautiful sunset"
              rotation={-3}
              className="w-64 hover:z-10"
            />
          </div>

          <div className="flex justify-center">
            <PolaroidCard
              image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop"
              caption="Beach Days"
              alt="Tropical beach scene"
              rotation={1}
              className="w-64 hover:z-10"
            />
          </div>

          <div className="flex justify-center">
            <PolaroidCard
              image="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop"
              caption="Ocean Breeze"
              alt="Ocean waves"
              rotation={-2}
              className="w-64 hover:z-10"
            />
          </div>

          <div className="flex justify-center">
            <PolaroidCard
              image="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=400&fit=crop"
              caption="Adventure Awaits"
              alt="Mountain hiking trail"
              rotation={2}
              className="w-64 hover:z-10"
            />
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="text-center mt-16">
          <a
            href="/"
            className="inline-block px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:scale-105 transition-transform"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

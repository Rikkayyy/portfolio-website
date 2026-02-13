import React from 'react';

interface PolaroidCardProps {
  image: string;
  caption?: string;
  alt?: string;
  rotation?: number;
  className?: string;
}

export const PolaroidCard: React.FC<PolaroidCardProps> = ({
  image,
  caption,
  alt = 'Polaroid image',
  rotation = 0,
  className = '',
}) => {
  return (
    <div
      className={`
        group relative
        bg-white dark:bg-gray-100
        p-3 pb-12
        shadow-lg hover:shadow-2xl
        transition-all duration-300 ease-out
        hover:-translate-y-2
        ${className}
      `}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {/* Image container */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-200">
        <img
          src={image}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Caption area - the bottom white space like real polaroid */}
      {caption && (
        <div className="mt-3 flex items-center justify-center">
          <p className="text-center text-sm font-handwriting text-gray-800 md:text-base">
            {caption}
          </p>
        </div>
      )}

      {/* Tape effect overlay (optional decorative element) */}
      <div className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 bg-white/30 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100" 
           style={{
             clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)'
           }}
      />
    </div>
  );
};

'use client'

import { useState } from 'react'

interface ProductImageGalleryProps {
  images: { url: string; altText: string | null }[]
  title: string
}

export default function ProductImageGallery({ images, title }: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  return (
    <div className="space-y-4">
      <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-border relative">
        {images.length > 0 ? (
          <img
            src={images[selectedImageIndex]?.url}
            alt={images[selectedImageIndex]?.altText || title}
            className="w-full h-full object-contain p-6"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="material-symbols-outlined text-primary/20 text-8xl">inventory_2</span>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                selectedImageIndex === index ? 'border-primary' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img
                src={image.url}
                alt={image.altText || `${title} ${index + 1}`}
                className="w-full h-full object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

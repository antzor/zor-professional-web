'use client'

import { useLanguage } from '@/providers/LanguageProvider'

interface ProductVideoProps {
  videoUrl: string
  videoTitleHr?: string
  videoTitleEn?: string
}

export default function ProductVideo({ videoUrl, videoTitleHr, videoTitleEn }: ProductVideoProps) {
  const { language } = useLanguage()
  const title = language === 'hr' ? videoTitleHr : videoTitleEn

  // Convert YouTube watch URLs to embed format
  let embedUrl = videoUrl
  if (videoUrl.includes('youtube.com/watch')) {
    const url = new URL(videoUrl)
    const videoId = url.searchParams.get('v')
    if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`
  } else if (videoUrl.includes('youtu.be/')) {
    const videoId = videoUrl.split('youtu.be/')[1]?.split('?')[0]
    if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`
  }

  return (
    <div className="py-12 border-t border-gray-200">
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-8">{title}</h2>
      )}
      <div className="aspect-video rounded-xl overflow-hidden bg-gray-100">
        <iframe
          src={embedUrl}
          title={title || 'Product video'}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}

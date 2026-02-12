import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <span className="material-symbols-outlined text-gray-200 text-[120px] mb-4 block">search_off</span>
        <h1 className="text-4xl font-black text-gray-900 mb-2">404</h1>
        <p className="text-gray-500 text-lg mb-6">Page not found</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-light transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Home
        </Link>
      </div>
    </div>
  )
}

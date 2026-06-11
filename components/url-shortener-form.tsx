'use client'

import { useState } from 'react'
import { createUrl } from '@/lib/api/urls'

export default function UrlShortenerForm() {
  const [url, setUrl] = useState('')
  const [customAlias, setCustomAlias] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [showAlias, setShowAlias] = useState(false)

  const handleShorten = async () => {
    if (!url.trim()) return
    setLoading(true)
    setError('')
    setShortUrl('')

    try {
      const res = await createUrl(url.trim(), customAlias.trim() || undefined)
      setShortUrl(res.data.shortUrl)
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong. Try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Premium Input Card */}
      <div className="w-full rounded-3xl p-6 md:p-8 flex flex-col gap-4 shadow-xl dark:shadow-2xl bg-white border border-zinc-200 dark:bg-zinc-900/50 dark:border-zinc-800 backdrop-blur-xl transition-all">
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <input
            type="url"
            placeholder="Paste your long URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleShorten()}
            className="flex-1 min-w-0 h-12 px-4 text-sm rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 dark:bg-zinc-950/50 dark:border-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-300 dark:focus:ring-zinc-300 transition-all"
          />
          <button
            onClick={handleShorten}
            disabled={loading || !url.trim()}
            className="h-12 px-6 text-sm font-semibold rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] shrink-0"
          >
            {loading ? "Shortening..." : "Shorten URL"}
          </button>
        </div>
        
        <button
          onClick={() => setShowAlias(!showAlias)}
          className="self-start text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          {showAlias ? "− Hide custom alias" : "+ Add custom alias (optional)"}
        </button>
        
        {showAlias && (
          <input
            type="text"
            placeholder="e.g. my-link (letters and numbers only)"
            value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value)}
            className="h-12 w-full px-4 text-sm rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 dark:bg-zinc-950/50 dark:border-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-300 dark:focus:ring-zinc-300 transition-all animate-in fade-in slide-in-from-top-2"
          />
        )}
        
        {error && <p className="text-sm font-medium text-red-500 mt-1">{error}</p>}
      </div>

      {/* Premium Result Card Section */}
      {shortUrl && (
        <div className="w-full bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-5 py-4 flex items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="min-w-0">
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Your short link</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline truncate block"
            >
              {shortUrl}
            </a>
          </div>
          <button
            onClick={handleCopy}
            className="shrink-0 h-10 px-5 text-xs font-bold uppercase tracking-wider rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all active:scale-[0.95]"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  )
}
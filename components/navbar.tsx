'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import ThemeToggle from '@/components/theme-toggle'

export default function Navbar() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <header className="sticky top-0 z-50 w-full h-16 bg-[var(--color-canvas)] border-b border-[var(--color-hairline)] flex items-center justify-center">
      <div className="flex items-center justify-between w-full max-w-[1200px] px-8">

        <Link href="/" className="no-underline flex items-center gap-2">
          <span style={{
            fontFamily: '"Cal Sans", Inter, sans-serif',
            fontSize: '24px',
            fontWeight: 600,
            letterSpacing: '-1px',
            color: 'var(--color-ink)',
            lineHeight: 1,
          }}>
            LinkForge
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {/* <a
            href="https://github.com/karmpluswin/Linkforge"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 h-10 px-4 text-sm font-semibold no-underline rounded-lg border border-[var(--color-hairline)] bg-[var(--color-canvas)] text-[var(--color-ink)] hover:bg-[var(--color-surface-soft)] transition-colors"
          >
            <Star size={15} strokeWidth={2.5} />
            GitHub
          </a> */}

          {mounted && <ThemeToggle />}
        </div>

      </div>
    </header>
  )
}
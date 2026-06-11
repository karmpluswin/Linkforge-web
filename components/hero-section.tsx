'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { AuroraText } from '@/components/ui/aurora-text'
import { LineShadowText } from '@/components/ui/line-shadow-text'

export default function HeroSection() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const shadowColor = mounted && resolvedTheme === 'dark' ? 'white' : 'black'

  return (
    <>
      <h1 className="text-5xl md:text-7xl font-semibold leading-none tracking-tight text-center text-zinc-900 dark:text-zinc-50 m-0">
        Your <AuroraText>Favourite</AuroraText> URL{' '}
        {mounted ? (
          <LineShadowText className="italic" shadowColor={shadowColor}>
            shortener
          </LineShadowText>
        ) : (
          <span className="italic">Shortener</span>
        )}
      </h1>

      <p className="text-base text-zinc-500 dark:text-zinc-400 text-center max-w-md leading-relaxed m-0">
        Turn long URLs into short, trackable links. Free forever. No account needed to shorten.
      </p>
    </>
  )
}
'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { flushSync } from 'react-dom'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (!document.startViewTransition) {
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
      return
    }

    document.startViewTransition(() => {
      flushSync(() => {
        setTheme(
          resolvedTheme === 'dark'
            ? 'light'
            : 'dark'
        )
      })
    })
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="
        relative
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        border
        border-zinc-200
        dark:border-zinc-800
        bg-white
        dark:bg-zinc-950
        transition-colors
      "
    >
      <Sun
        className="
          h-5
          w-5
          rotate-0
          scale-100
          transition-all
          dark:-rotate-90
          dark:scale-0
        "
      />

      <Moon
        className="
          absolute
          h-5
          w-5
          rotate-90
          scale-0
          transition-all
          dark:rotate-0
          dark:scale-100
        "
      />
    </button>
  )
}
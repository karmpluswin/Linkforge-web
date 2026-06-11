'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Star, Sun, Moon } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Analytics', href: '/dashboard' },
  { label: 'Docs', href: 'https://linkforge-fayx.onrender.com/api-docs', external: true },
]

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  // Design System Tokens (Hardcoded for inline mapping)
  const isDark = mounted && theme === 'dark'
  const colors = {
    canvas: isDark ? '#101010' : '#ffffff', // surface-dark vs canvas
    ink: isDark ? '#ffffff' : '#111111',
    muted: isDark ? '#a1a1aa' : '#6b7280', // on-dark-soft vs muted
    surfaceSoft: isDark ? '#1a1a1a' : '#f8f9fa',
    hairline: isDark ? '#242424' : '#e5e7eb',
    primary: isDark ? '#ffffff' : '#111111',
    onPrimary: isDark ? '#111111' : '#ffffff',
    primaryActive: isDark ? '#e5e7eb' : '#242424',
  }

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      width: '100%',
      height: '64px', // From {component.top-nav}
      backgroundColor: colors.canvas,
      borderBottom: `1px solid ${colors.hairline}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center', // Centering logic for the max-width container below
    }}>
      
      {/* 1200px Max-Width Grid Constraint from Layout Specs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '1200px',
        padding: '0 32px',
      }}>
        
        {/* Logo Section */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontFamily: '"Cal Sans", Inter, sans-serif',
            fontSize: '18px',
            fontWeight: 600,
            letterSpacing: '-0.5px', // Brand voice tracking requirement
            color: colors.ink,
          }}>
            LinkForge
          </span>
        </Link>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              style={{
                padding: '8px 14px',
                fontFamily: 'Inter, sans-serif', // Inter required for UI type
                fontSize: '14px',
                fontWeight: 500, // {typography.nav-link} requirement
                color: colors.muted,
                textDecoration: 'none',
                borderRadius: '8px', // {rounded.md}
                transition: 'color 0.15s ease, background-color 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.ink
                e.currentTarget.style.backgroundColor = colors.surfaceSoft
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.muted
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

          {/* GitHub Link mapped to {component.button-secondary} */}
          <a
            href="https://github.com/karmpluswin/Linkforge"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              height: '40px',
              padding: '0 16px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontWeight: 600, // {typography.button} weight
              color: colors.ink,
              textDecoration: 'none',
              backgroundColor: colors.canvas,
              border: `1px solid ${colors.hairline}`,
              borderRadius: '8px', // {rounded.md}
              transition: 'background-color 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.surfaceSoft
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.canvas
            }}
          >
            <Star size={15} strokeWidth={2.5} />
            GitHub
          </a>

          {/* Theme Toggle mapped to {component.button-icon-circular} */}
          {mounted && (
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '9999px', // {rounded.full} specific to icon buttons
                border: `1px solid ${colors.hairline}`,
                backgroundColor: colors.canvas,
                color: colors.ink,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.surfaceSoft
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.canvas
              }}
            >
              {theme === 'dark' ? <Sun size={15} strokeWidth={2.5} /> : <Moon size={15} strokeWidth={2.5} />}
            </button>
          )}

          {/* Login mapped to {component.button-primary} */}
          <Link
            href="/login"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '40px',
              padding: '0 20px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontWeight: 600, // {typography.button} requirement
              color: colors.onPrimary,
              backgroundColor: colors.primary,
              textDecoration: 'none',
              borderRadius: '8px', // {rounded.md}
              transition: 'background-color 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.primaryActive
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.primary
            }}
          >
            Login
          </Link>

        </div>
      </div>
    </header>
  )
}
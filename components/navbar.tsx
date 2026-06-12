"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";

const NAV_LINKS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Analytics", href: "/dashboard" },
  {
    label: "Docs",
    href: "https://linkforge-fayx.onrender.com/api-docs",
    external: true,
  },
];

export default function Navbar() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Design System Tokens (Hardcoded for inline mapping)
  const isDark = mounted && resolvedTheme === "dark";
  const colors = {
    canvas: isDark ? "#101010" : "#ffffff", // surface-dark vs canvas
    ink: isDark ? "#ffffff" : "#111111",
    muted: isDark ? "#a1a1aa" : "#6b7280", // on-dark-soft vs muted
    surfaceSoft: isDark ? "#1a1a1a" : "#f8f9fa",
    hairline: isDark ? "#242424" : "#e5e7eb",
    primary: isDark ? "#ffffff" : "#111111",
    onPrimary: isDark ? "#111111" : "#ffffff",
    primaryActive: isDark ? "#e5e7eb" : "#242424",
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
        height: "64px", // From {component.top-nav}
        backgroundColor: colors.canvas,
        borderBottom: `1px solid ${colors.hairline}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center", // Centering logic for the max-width container below
      }}
    >
      {/* 1200px Max-Width Grid Constraint from Layout Specs */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "1200px",
          padding: "0 32px",
        }}
      >
        {/* Logo Section */}
        <Link
          href="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontFamily: '"Cal Sans", Inter, sans-serif',
              fontSize: "24px",
              fontWeight: 600,
              letterSpacing: "-1px",
              color: colors.ink,
              lineHeight: 1,
            }}
          >
            LinkForge
          </span>
        </Link>

        {/* Navigation Links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              style={{
                padding: "8px 14px",
                fontFamily: "Inter, sans-serif", // Inter required for UI type
                fontSize: "14px",
                fontWeight: 500, // {typography.nav-link} requirement
                color: colors.muted,
                textDecoration: "none",
                borderRadius: "8px", // {rounded.md}
                transition: "color 0.15s ease, background-color 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.ink;
                e.currentTarget.style.backgroundColor = colors.surfaceSoft;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.muted;
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions Section */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* GitHub Link mapped to {component.button-secondary} */}
          <a
            href="https://github.com/karmpluswin/Linkforge"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              height: "40px",
              padding: "0 16px",
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: 600, // {typography.button} weight
              color: colors.ink,
              textDecoration: "none",
              backgroundColor: colors.canvas,
              border: `1px solid ${colors.hairline}`,
              borderRadius: "8px", // {rounded.md}
              transition: "background-color 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.surfaceSoft;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.canvas;
            }}
          >
            <Star size={15} strokeWidth={2.5} />
            GitHub
          </a>

          {/* Theme Toggle mapped to {component.button-icon-circular} */}
          {mounted && <ThemeToggle />}

          {/* Login mapped to {component.button-primary} */}
          <Link
            href="/login"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "40px",
              padding: "0 20px",
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: 600, // {typography.button} requirement
              color: colors.onPrimary,
              backgroundColor: colors.primary,
              textDecoration: "none",
              borderRadius: "8px", // {rounded.md}
              transition: "background-color 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.primaryActive;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.primary;
            }}
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}

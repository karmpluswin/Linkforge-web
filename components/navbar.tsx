"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";


export default function Navbar() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const colors = {
    canvas: isDark ? "#101010" : "#ffffff",
    ink: isDark ? "#ffffff" : "#111111",
    muted: isDark ? "#a1a1aa" : "#6b7280", 
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
        height: "64px",
        backgroundColor: colors.canvas,
        borderBottom: `1px solid ${colors.hairline}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center", 
      }}
    >

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

        {/* Actions Section */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>

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
              fontWeight: 600,
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

          {mounted && <ThemeToggle />}

        </div>
      </div>
    </header>
  );
}

"use client";

import { useState } from "react";
import { createPublicUrl } from "@/lib/api/urls";

export default function UrlShortenerForm() {
  const [url, setUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [showAlias, setShowAlias] = useState(false);

  const handleShorten = async () => {
    console.log("Button clicked");
    if (!url.trim()) return;

    setLoading(true);
    setError("");
    setShortUrl("");

    try {
      const res = await createPublicUrl(
        url.trim(),
        customAlias.trim() || undefined,
      );

      setShortUrl(res.data.shortUrl);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div
      style={{
        width: "100%",
        background: "var(--color-surface-card)",
        border: "1px solid var(--color-hairline)",
        borderRadius: "16px",
        padding: "clamp(16px, 4vw, 24px)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        margin: "0px 12px"
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <input
          type="url"
          placeholder="Paste your long URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleShorten()}
          style={{
            flex: 1,
            height: "44px",
            padding: "0 14px",
            width: "100%",
            minWidth: "0",
            fontSize: "14px",
            border: "1px solid var(--color-hairline)",
            borderRadius: "8px",
            background: "var(--color-canvas)",
            color: "var(--color-ink)",
            outline: "none",
          }}
        />

        <button
          onClick={handleShorten}
          disabled={loading || !url.trim()}
          style={{
            height: "44px",
            padding: "0 20px",
            fontSize: "14px",
            minWidth: "160px",
            fontWeight: 600,
            color: "var(--color-on-primary)",
            background:
              loading || !url.trim()
                ? "var(--color-muted)"
                : "var(--color-primary)",
            border: "none",
            borderRadius: "8px",
            cursor: loading || !url.trim() ? "not-allowed" : "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </div>

      <button
        onClick={() => setShowAlias(!showAlias)}
        style={{
          alignSelf: "flex-start",
          fontSize: "13px",
          fontWeight: 500,
          color: "var(--color-muted)",
          background: "var(--color-canvas)",
          border: "1px solid var(--color-hairline)",
          borderRadius: "999px",
          padding: "8px 14px",
          cursor: "pointer",
          transition: "all 0.15s ease",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span
          style={{
            fontSize: "16px",
            lineHeight: 1,
            fontWeight: 600,
          }}
        >
          {showAlias ? "−" : "+"}
        </span>

        {showAlias ? "Hide custom alias" : "Add custom alias"}
      </button>

      <div
        style={{
          maxHeight: showAlias ? "60px" : "0px",
          opacity: showAlias ? 1 : 0,
          overflow: "hidden",
          transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <input
          type="text"
          placeholder="e.g. my-link"
          value={customAlias}
          onChange={(e) => setCustomAlias(e.target.value)}
          style={{
            width: "100%",
            height: "44px",
            padding: "0 14px",
            fontSize: "14px",
            border: "1px solid var(--color-hairline)",
            borderRadius: "8px",
            background: "var(--color-canvas)",
            color: "var(--color-ink)",
            outline: "none",
            marginTop: "8px",
          }}
        />
      </div>

      {error && (
        <p
          style={{
            fontSize: "13px",
            color: "var(--color-error)",
            margin: 0,
          }}
        >
          {error}
        </p>
      )}

      {shortUrl && (
        <div
          style={{
            width: "100%",
            background: "var(--color-canvas)",
            border: "1px solid var(--color-hairline)",
            borderRadius: "12px",
            padding: "16px 20px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "12px",
                color: "var(--color-muted)",
                margin: "0 0 4px 0",
              }}
            >
              Your short link
            </p>

            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "15px",
                fontWeight: 500,
                color: "var(--color-accent)",
                textDecoration: "none",
                wordBreak: "break-all",
              }}
            >
              {shortUrl}
            </a>
          </div>

          <button
            onClick={handleCopy}
            style={{
              height: "36px",
              padding: "0 16px",
              fontSize: "13px",
              fontWeight: 600,
              color: copied ? "var(--color-success)" : "var(--color-ink)",
              background: "var(--color-surface-card)",
              border: "1px solid var(--color-hairline)",
              borderRadius: "8px",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}

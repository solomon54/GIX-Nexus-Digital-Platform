"use client";

import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    try {
      console.error("[GIX Nexus] Unhandled error boundary:", error);
    } catch {
      // noop
    }
  }, [error]);

  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
        background:
          "linear-gradient(180deg, #0B3B60 0%, #0A2444 55%, #07111C 100%)",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 440 }}>
        <div
          style={{
            width: 72,
            height: 72,
            margin: "0 auto 24px",
            borderRadius: "50%",
            border: "2px solid rgba(34,211,238,0.3)",
            background: "rgba(34,211,238,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
          </svg>
        </div>

        <h1
          style={{
            color: "#FFFFFF",
            margin: 0,
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "-0.01em",
          }}
        >
          Something went wrong
        </h1>
        <p
          style={{
            marginTop: 8,
            marginBottom: 0,
            color: "#94a3b8",
            lineHeight: 1.55,
            fontSize: 15,
          }}
        >
          The application hit an unexpected error. You can safely try again —
          your data hasn&apos;t been lost.
        </p>
        <p
          style={{
            marginTop: 4,
            marginBottom: 0,
            color: "rgba(148,163,184,0.7)",
            lineHeight: 1.55,
            fontSize: 13,
          }}
          lang="am"
        >
          የተጠበቀ የሆነ ስህተት ተፈጥሯል። እባክዎ እንደገና ይሞክሩ።
        </p>

        <div
          style={{
            marginTop: 32,
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            onClick={reset}
            style={{
              minHeight: 44,
              padding: "10px 22px",
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              background: "linear-gradient(135deg, #0EA5C9 0%, #22D3EE 100%)",
              color: "#0D1B3E",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Try again
          </button>
          <a
            href="/en"
            style={{
              minHeight: 44,
              padding: "10px 22px",
              borderRadius: 10,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(34,211,238,0.25)",
              background: "transparent",
              color: "rgba(200,225,245,0.85)",
              fontSize: 14,
              fontWeight: 500,
              textDecoration: "none",
              cursor: "pointer",
              boxSizing: "border-box",
            }}
          >
            Go to home
          </a>
        </div>
      </div>
    </div>
  );
}

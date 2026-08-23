'use client'
import React from 'react'

// Injects SVG icons next to each nav link via CSS attribute selectors.
// No hooks needed — purely static styles injected once on mount.
export default function NavIconStyles() {
  return (
    <style>{`
      /* ── Nav link icons via attribute selectors ──────────────── */
      .nav__link { position: relative; padding-left: 36px !important; }

      .nav__link[id="nav-users"]::before              { content: ""; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='none' stroke='%2394a3b8' stroke-width='1.5' viewBox='0 0 24 24'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E"); }
      .nav__link[id="nav-services"]::before           { content: ""; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='none' stroke='%2394a3b8' stroke-width='1.5' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='3'/%3E%3Cpath d='M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83'/%3E%3C/svg%3E"); }
      .nav__link[id="nav-sectors"]::before            { content: ""; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='none' stroke='%2394a3b8' stroke-width='1.5' viewBox='0 0 24 24'%3E%3Crect x='2' y='7' width='20' height='14' rx='2'/%3E%3Cpath d='M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16'/%3E%3C/svg%3E"); }
      .nav__link[id="nav-future-objectives"]::before  { content: ""; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='none' stroke='%2394a3b8' stroke-width='1.5' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Ccircle cx='12' cy='12' r='6'/%3E%3Ccircle cx='12' cy='12' r='2'/%3E%3C/svg%3E"); }
      .nav__link[id="nav-media"]::before              { content: ""; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='none' stroke='%2394a3b8' stroke-width='1.5' viewBox='0 0 24 24'%3E%3Crect x='3' y='3' width='18' height='18' rx='2'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpath d='m21 15-5-5L5 21'/%3E%3C/svg%3E"); }
      .nav__link[id="nav-pages"]::before              { content: ""; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='none' stroke='%2394a3b8' stroke-width='1.5' viewBox='0 0 24 24'%3E%3Cpath d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'/%3E%3Cpolyline points='14 2 14 8 20 8'/%3E%3C/svg%3E"); }
      .nav__link[id="nav-news"]::before               { content: ""; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='none' stroke='%2394a3b8' stroke-width='1.5' viewBox='0 0 24 24'%3E%3Cpath d='M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2'/%3E%3C/svg%3E"); }
      .nav__link[id="nav-projects"]::before           { content: ""; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='none' stroke='%2394a3b8' stroke-width='1.5' viewBox='0 0 24 24'%3E%3Cpath d='M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z'/%3E%3C/svg%3E"); }
      .nav__link[id="nav-testimonials"]::before       { content: ""; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='none' stroke='%2394a3b8' stroke-width='1.5' viewBox='0 0 24 24'%3E%3Cpath d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/%3E%3C/svg%3E"); }
      .nav__link[id="nav-team-members"]::before       { content: ""; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='none' stroke='%2394a3b8' stroke-width='1.5' viewBox='0 0 24 24'%3E%3Cpath d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='9' cy='7' r='4'/%3E%3Cpath d='M23 21v-2a4 4 0 0 0-3-3.87'/%3E%3Cpath d='M16 3.13a4 4 0 0 1 0 7.75'/%3E%3C/svg%3E"); }
      .nav__link[id="nav-service-inquiries"]::before  { content: ""; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='none' stroke='%2394a3b8' stroke-width='1.5' viewBox='0 0 24 24'%3E%3Cpath d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'/%3E%3Cpolyline points='22,6 12,13 2,6'/%3E%3C/svg%3E"); }

      /* Common icon positioning */
      .nav__link::before {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        width: 15px;
        height: 15px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 15px 15px;
        opacity: 0.65;
        transition: opacity 0.15s, filter 0.15s;
        pointer-events: none;
      }

      /* Active and hover states — brighten icon */
      .nav__link:hover::before,
      .nav__link[aria-current="page"]::before {
        opacity: 1;
        filter: brightness(0) saturate(100%) invert(77%) sepia(48%) saturate(400%) hue-rotate(152deg) brightness(103%) contrast(97%);
      }
    `}</style>
  )
}

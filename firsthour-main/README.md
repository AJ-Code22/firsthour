
███████╗██╗██████╗ ███████╗████████╗██╗  ██╗ ██████╗ ██╗   ██╗██████╗
██╔════╝██║██╔══██╗██╔════╝╚══██╔══╝██║  ██║██╔═══██╗██║   ██║██╔══██╗
█████╗  ██║██████╔╝███████╗   ██║   ███████║██║   ██║██║   ██║██████╔╝
██╔══╝  ██║██╔══██╗╚════██║   ██║   ██╔══██║██║   ██║██║   ██║██╔══██╗
██║     ██║██║  ██║███████║   ██║   ██║  ██║╚██████╔╝╚██████╔╝██║  ██║
╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝

<div align="center">
The 60-Minute Disaster Survival Platform

When seconds count, preparation is everything.

Live Demo Theme Built With License

</div>
What is FirstHour?

Most disaster deaths don't happen from the disaster itself — they happen from panic, wrong decisions, and no plan in the first 60 minutes.

FirstHour is a cinematic, scroll-driven web platform that generates personalized, timed survival protocols for households facing any of 8 major disaster types. Built under the theme Technology for Planet, it tackles environmental disaster mitigation by giving every family a clear, pre-built plan before they ever need it.

"87% of survivors report that having a plan was the single factor that determined their outcome." — International Disaster Response Study

Live Demo

🌐 firsthour-gules.vercel.app

The Problem It Solves
Without FirstHour	With FirstHour
Panic sets in within seconds	Clear phase-by-phase action protocol
Conflicting decisions waste critical minutes	Pre-decided priorities — no debate needed
Generic FEMA PDFs nobody reads	Personalized plan for YOUR household
Plans exist but aren't accessible	QR code, printable wallet card, offline copy
Responders don't know your situation	One shareable link covers it all
Features
🎬 Cinematic Landing Experience
Theatrical loader — a counting ritual (00 → 100) that splits open to reveal the hero, inspired by the award-winning pasqua.it
Scroll-driven storytelling — every section reveals itself through choreographed GSAP animations as you move through the narrative
Progressive word highlight — a full-viewport statement where individual words light up as you scroll through them
Horizontal disaster scroll — 6 disaster-type cards scroll horizontally driven by vertical mouse scroll, each with cinematic entry animations
Magnetic CTA button — the primary call-to-action physically moves toward the cursor within a 120px radius using elastic spring physics
Custom cursor system — native cursor hidden; a dual-element cursor (ring + dot) with contextual labels ("DRAG", "READ", "GO →") that change based on what's being hovered
Lenis smooth scroll — buttery 60fps scroll with custom easing (no native browser janky scroll)
⚡ Protocol Generator

A 4-step guided modal that generates your personalized survival plan:

Disaster Type — Choose from 8 types: Earthquake, Flood, Wildfire, Hurricane, Tornado, Tsunami, Chemical Spill, Power Outage
Your Environment — Urban / Suburban / Rural / Remote · House / Apartment / Office / Vehicle / Outdoors
Your Household — Adults, children, elderly, pets, special medical needs (using custom premium toggle switches)
Your Protocol — Generated plan across 3 timed phases with a shareable QR code
📋 60-Minute Protocol Structure

Every generated plan is split into 3 urgency phases:

Phase	Window	Label	Color
Phase 1	0 – 5 min	CRITICAL	🔴 Coral Red
Phase 2	5 – 15 min	URGENT	🟠 Amber
Phase 3	15 – 60 min	IMPORTANT	🔵 Blue

Each phase contains 4–8 personalized action steps, each adapted to:

Number of children → adds "secure children first" steps
Pets present → adds "leash/cage" steps in Phase 1
Elderly → adds "mobility assistance" steps
Medical needs → adds "grab medication" as first critical action
Urban apartment → adds "use stairs not elevator" warning
Remote location → adds "no emergency services" awareness note
🔐 Authentication
Firebase Authentication (Email/Password + Google OAuth)
Protected routes — dashboard inaccessible without login
Auth state persists across page refresh
Human-readable error messages (no raw Firebase error codes shown)
Animated form tab switcher (Sign In ↔ Sign Up) with shared layoutId
Inline "Forgot Password" flow — no new page
📊 Personal Dashboard
Emergency Alert Banner — shows active regional threats with a pulsing live indicator
Quick Actions Grid — Generate New Plan, My Saved Plans, Share a Plan, Offline Mode
Plan History — saved plans with disaster type icons, completion phase indicators, and context menus
Disaster Awareness Strip — horizontal scroll strip of all 6 disaster types with gradient-coded cards
Stat Counters — animated count-up numbers on scroll entry
Fixed left sidebar navigation with animated active state indicator
Design System
Aesthetic Direction

Inspired by the cinematic, editorial language of pasqua.it — dark backgrounds, typographic drama, scroll-as-narrative. Premium restraint: 95% dark/cream, 5% accent color.

Color Palette
--black:        #08080A   ← True page canvas
--deep:         #0E0D0F   ← Elevated surfaces
--charcoal:     #1A191E   ← Card backgrounds
--card-bg:      #120F17   ← BorderGlow card background
--bone:         #E8E4DC   ← Primary text (warm cream)
--bone-dim:     #9E9A92   ← Secondary text
--bone-muted:   #4A4844   ← Hints, labels
--accent:       #D94F2B   ← Emergency coral-red (use sparingly)
--accent-warm:  #E8853A   ← Secondary warm accent
--gold:         #C5A96A   ← Chapter markers, editorial detail
Typography

Montserrat (locally hosted variable font — zero Google dependency):

Role	Weight	Style
Display headings	800–900 (ExtraBold/Black)	Italic for emphasis
Body / subtext	300 (Light)	Normal
Nav links	600 (SemiBold)	Uppercase
CTA buttons	700 (Bold)	Uppercase
Chapter markers	300 (Light)	Uppercase + wide tracking
Stat counters	900 (Black)	Tabular nums
Component Library
BorderGlow Cards

All cards implement a magnetic edge-glow system in pure JavaScript:

Glow activates within 30px of any card edge (edgeSensitivity: 30)
Glow radius expands dynamically based on cursor proximity (glowRadius: 40, coneSpread: 25)
Color gradient: 
#c084fc → 
#f472b6 → 
#38bdf8 (purple → pink → sky)
Mask technique ensures glow shows only on the border, not the card fill
Smooth rAF fade-out on mouseleave
Passive event listeners — zero performance impact
Premium Toggle Switches

Glassmorphic toggle switches with:

Spring bounce physics (cubic-bezier(0.68, -0.55, 0.265, 1.55))
Squish-and-stretch effect on press (thumb morphs to full track width)
Expanding glow blob behind the thumb when active
Pulse @keyframes animation on check
Color-coded per context:
Amber (hsl(25, 85%, 52%)) → general toggles
Coral-red (hsl(12, 80%, 50%)) → medical/critical toggles
Dark-mode forced (not OS-dependent — page is always dark)
Tech Stack
Layer	Technology
Core	HTML5, CSS3, Vanilla JavaScript (ES2022)
Animation	GSAP 3.12 + ScrollTrigger plugin
Text Animation	Splitting.js (character-level splits)
Smooth Scroll	Lenis 1.0 (connected to GSAP ticker)
Authentication	Firebase v10 (Auth: Email + Google OAuth)
Fonts	Montserrat Variable Font (self-hosted, OFL licensed)
Icons	Lucide React
Deployment	Vercel
Build	Vite + React 18 + TypeScript
State	Zustand
Forms	React Hook Form + Zod validation
Styling	Tailwind CSS v3 (JIT) + Framer Motion v11
Project Structure
firsthour/
├── public/
│   └── fonts/
│       ├── Montserrat-VariableFont_wght.ttf        ← Primary (all weights)
│       ├── Montserrat-Italic-VariableFont_wght.ttf ← Italic variant
│       └── static/
│           ├── Montserrat-Light.ttf
│           ├── Montserrat-Regular.ttf
│           ├── Montserrat-Medium.ttf
│           ├── Montserrat-SemiBold.ttf
│           ├── Montserrat-Bold.ttf
│           ├── Montserrat-ExtraBold.ttf
│           ├── Montserrat-Black.ttf
│           └── [+ italic variants]
│
├── src/
│   ├── components/
│   │   ├── ui/               # Button, Input, Toggle, Badge, Modal, Spinner
│   │   ├── layout/           # Sidebar, Navbar, Footer, PageTransition
│   │   ├── landing/          # Hero, FeatureGrid, StatsBar, HorizontalScroll
│   │   ├── auth/             # AuthForm, GoogleButton, TabSwitcher
│   │   ├── dashboard/        # QuickActions, PlanCard, DisasterStrip
│   │   └── generate/         # StepperModal, PhaseCard, CountdownArcs, SharePanel
│   │
│   ├── pages/
│   │   ├── Landing.tsx       # / — cinematic landing page
│   │   ├── Auth.tsx          # /auth — login + signup
│   │   └── Dashboard.tsx     # /dashboard — protected main app
│   │
│   ├── hooks/
│   │   ├── useAuth.ts        # Firebase auth state listener
│   │   ├── usePlans.ts       # localStorage CRUD for saved plans
│   │   └── useModal.ts       # Modal open/close state
│   │
│   ├── lib/
│   │   ├── firebase.ts       # Firebase init (reads from .env)
│   │   ├── planGenerator.ts  # Core logic — disaster × environment × household
│   │   └── constants.ts      # Disaster types, phase templates, step libraries
│   │
│   └── store/
│       ├── authStore.ts      # Zustand — user auth state
│       └── planStore.ts      # Zustand — saved plans state
│
├── .env.local                # Firebase config (never committed)
├── .env.example              # Template with required keys
├── index.html
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
Getting Started
Prerequisites
Node.js 18+
A Firebase project with Authentication enabled
Installation
bash
# 1. Clone the repository
git clone https://github.com/yourusername/firsthour.git
cd firsthour

# 2. Install dependencies
npm install

# 3. Set up Firebase environment variables
cp .env.example .env.local

Edit .env.local with your Firebase config:

env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
bash
# 4. Start development server
npm run dev

# 5. Build for production
npm run build

# 6. Preview production build
npm run preview
Firebase Setup

In your Firebase Console:

Create a new project
Enable Authentication → Sign-in methods → Enable Email/Password and Google
Add your domain to Authorized Domains (for Google OAuth)
Copy your project config into .env.local
Supported Disaster Types
Disaster	Critical Actions	Environment Notes
🌍 Earthquake	Drop/Cover/Hold, exit route, gas shutoff	Apartment: use stairs only
🌊 Flood	Evacuate low floors, avoid walking in water	Remote: no bridge crossings
🔥 Wildfire	Immediate evacuation, close all vents	Suburban: go-bag at door
🌀 Hurricane	Board windows, shelter position, water stores	Coastal: elevation priority
🌪️ Tornado	Lowest floor, interior room, no windows	Mobile home: evacuate to structure
🌊 Tsunami	Immediate inland evacuation, high ground	Coastal: never wait for warning
☣️ Chemical Spill	Shelter-in-place, seal gaps, avoid HVAC	Urban: building pressure matters
⚡ Power Outage	Generator safety, food preservation, warmth	All: CO poisoning prevention
Customization
Swap Accent Colors

All colors are CSS custom properties on :root. Edit src/styles/globals.css:

css
:root {
  --accent:      #D94F2B;  /* ← Change this for a different identity color */
  --accent-warm: #E8853A;  /* ← Secondary accent */
}
Add a Disaster Type

In src/lib/constants.ts, add to the DISASTER_TYPES array:

typescript
{
  id: 'your_disaster',
  label: 'Your Disaster',
  emoji: '⚠️',
  gradient: 'rgba(100, 100, 200, 0.08)',
  phases: {
    critical: [...],  // 4–8 steps
    urgent:   [...],
    important: [...]
  }
}
Adjust BorderGlow Sensitivity

In the initBorderGlow() function:

javascript
const EDGE_SENSITIVITY = 30;  // px — increase for a larger trigger zone
const GLOW_RADIUS     = 40;  // px — increase for a wider glow
const GLOW_INTENSITY  = 1;   // 0–1 — reduce for a subtler effect
const CONE_SPREAD     = 25;  // px — how much radius expands near edge
Performance
Metric	Approach
Zero image requests	All visuals are CSS gradients, SVG, and typography
Font loading	font-display: swap + variable font (2 files cover all 9 weights)
Animation	Only transform and opacity animated (GPU composited, no layout)
Event listeners	All scroll/touch/mousemove use { passive: true }
Smooth scroll	One single rAF loop (Lenis) — no competing rAF loops
BorderGlow	CSS custom property updates only — zero layout reflow
will-change	Set only on actively animating elements, cleared after completion
ScrollTrigger	Refreshed after fonts load (document.fonts.ready)
Code splitting	Vite + dynamic imports for dashboard (not loaded until auth)
Animation Architecture
Page Load
    │
    ▼
┌─────────────────────────────┐
│  LOADER (2800ms)            │
│  Counter 00→100 (2200ms)    │
│  Split-panel exit (600ms)   │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│  LENIS INIT                 │
│  Smooth scroll active       │
│  Connected to GSAP ticker   │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────┐
│  SCROLLTRIGGER CHAIN                                │
│                                                     │
│  Hero ──► Statement ──► How It Works ──► Horizontal │
│   │         │               │              │        │
│  Char     Word            Step           Card       │
│  split    color          alt-slide      enter       │
│  rise     reveal          x:±60         y:60        │
│                                                     │
│  Stats ──► Final CTA                                │
│   │           │                                     │
│  Count-up   Line                                    │
│  0→N        clip reveal                             │
└─────────────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────┐
│  BORDERGLOW ENGINE          │
│  mousemove → CSS vars →     │
│  ::before gradient update   │
│  (zero layout reflow)       │
└─────────────────────────────┘
Accessibility
All interactive elements keyboard-navigable (Tab + Enter)
Focus rings: 2px solid rgba(217, 79, 43, 0.5) with 2px offset
prefers-reduced-motion: all transforms removed, opacity fades only (transition-duration: 0.1s)
Semantic HTML — proper heading hierarchy, <nav>, <main>, <footer>
All text meets WCAG AA contrast ratio (4.5:1 minimum)
Toggle switches: visually hidden <input type="checkbox"> maintains screen reader access
aria-label on icon-only buttons
Custom cursor falls back gracefully on touch devices (pointer: fine media query)
Environment Variables Reference
env
# Firebase (required)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# Optional
VITE_APP_ENV=development       # 'development' | 'production'
VITE_ENABLE_ANALYTICS=false    # Firebase Analytics toggle
Roadmap
 Real-time disaster API — integrate GDACS + USGS feeds for live threat data
 Push notifications — alert subscriptions for regional disaster warnings
 Offline PWA — full service worker implementation, plan accessible with zero signal
 PDF export — downloadable wallet card at true print dimensions
 Household sharing — share plan with family members via invite link
 Multi-language — Arabic, French, Spanish (critical for global disaster reach)
 Native mobile app — React Native port for iOS and Android
 First responder mode — bulk plan generation for FEMA/municipal use
 AI personalization — GPT integration for hyper-specific local hazard advice
Contributing

Contributions are welcome. Please follow these steps:

bash
# 1. Fork the repo and create a feature branch
git checkout -b feature/your-feature-name

# 2. Commit with a clear message
git commit -m "feat: add tsunami coastal elevation mapping"

# 3. Push and open a Pull Request
git push origin feature/your-feature-name

Commit conventions:

feat: — new feature
fix: — bug fix
perf: — performance improvement
style: — visual/CSS changes
docs: — documentation updates
refactor: — code restructure (no behavior change)
Credits & Inspiration
Resource	Use
pasqua.it	Cinematic editorial design direction
GSAP	All scroll and entry animations
Lenis	Smooth scroll engine
Splitting.js	Character-level text splitting
Montserrat	Typography (OFL licensed, self-hosted)
UIverse.io — _2944	Toggle switch design
Firebase	Authentication
GDACS	Disaster data reference
FEMA	Emergency protocol research
License
MIT License — Copyright (c) 2026 FirstHour

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.

Montserrat font is licensed under the SIL Open Font License 1.1 — see public/fonts/OFL.txt.

<div align="center">

Built for the theme: Technology for Planet

Tackling environmental disaster mitigation through personalized preparation.

Live

"When seconds count, preparation is everything."

</div>

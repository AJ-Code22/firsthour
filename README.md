<div align="center">

The First 60 Minutes, Planned Minute by Minute.

Live Demo Theme Stack Font Deployed

<br/>

"Most disaster deaths happen in hour one — not from the disaster itself, but from panic and wrong decisions."

</div>
Table of Contents
Overview
Live Demo
What It Does
The 60-Minute Protocol
Design System
Tech Stack
Project Structure
Getting Started
Supported Disasters
Performance
Accessibility
Customization
Roadmap
Overview

FirstHour is a cinematic, scroll-driven disaster preparedness platform built under the theme Technology for Planet. It turns standard disaster advice into an exact, minute-by-minute survival cadence tailored to your home, location, and household.

The name says everything: the first hour is when lives are saved or lost. FirstHour gives every family a personalized, shareable, offline-ready protocol — generated in 30 seconds — before they ever need it.

This is not a pamphlet. It is not a checklist. It is a precision survival instrument wrapped in a premium, award-quality web experience.

Live Demo

🌐 firsthour.netlify.app

Route	Description
/	Cinematic landing page
/auth	Sign in / Sign up (Firebase)
/dashboard	Protected — personal plan hub
What It Does
The Problem

The majority of preventable disaster deaths happen not from the event itself, but from the chaos of the first 60 minutes — wrong decisions, conflicting priorities, and no pre-agreed plan.

The Solution

In under 30 seconds, FirstHour asks you three things:

What threat are you preparing for? (8 disaster types)
Where are you? (environment type + building type)
Who is with you? (adults, children, elderly, pets, medical needs)

It then generates a structured, phased survival protocol — personalized to your exact household — that you can save, share as a QR code, print as a wallet card, or store offline.

The 60-Minute Protocol

Every plan is structured across three urgency phases:

 ┌─────────────────────────────────────────────────┐
 │  PHASE 1  ·  0 – 5 min  ·  ██████  CRITICAL    │
 │  Survive the initial event. No thinking. Act.   │
 ├─────────────────────────────────────────────────┤
 │  PHASE 2  ·  5 – 15 min  ·  █████   URGENT     │
 │  Immediate response. Secure people and exits.   │
 ├─────────────────────────────────────────────────┤
 │  PHASE 3  ·  15 – 60 min  ·  ████  IMPORTANT   │
 │  Stabilize, evacuate, or shelter in place.      │
 └─────────────────────────────────────────────────┘

Each phase contains 4–8 action steps, personalised by:

Household Factor	Example Step Added
Children present	"Secure children before anything else" → Phase 1, Step 1
Pets present	"Leash/cage pet — do this in Phase 1 or leave without"
Elderly / mobility needs	"Mobility assistance route — no stairs assumption"
Medical needs	"Grab medication bag — this is Step 1, non-negotiable"
Urban apartment	"Use stairs only — elevators will fail or be occupied"
Remote location	"Do not expect emergency services for 60+ minutes"
Design System

Animation Architecture
Loader → Hero Sequence
Browser load
     │
     ▼
┌──────────────────────────────────┐
│  LOADER  (total: 2800ms)         │
│                                  │
│  0ms    → Counter starts 00→100  │
│  2200ms → Counter completes      │
│  2500ms → Counter fades out      │
│  2600ms → "FIRSTHOUR" slams in   │
│  2800ms → Screen splits in two   │
│           Top half slides UP     │
│           Bottom half slides DOWN│
│           Hero revealed behind   │
└──────────────┬───────────────────┘
               │
               ▼
        Lenis initialises
        GSAP ticker connected
               │
               ▼
┌──────────────────────────────────────────────────────────┐
│  SCROLLTRIGGER CHAIN                                     │
│                                                          │
│  §1 Hero ────────────► Char-by-char clip rise           │
│                         (Splitting.js + GSAP stagger)   │
│  §2 Statement ────────► Word-by-word color reveal        │
│                         (scrub:true, 200vh pin)          │
│  §3 How It Works ─────► Step cards alternate x:±60      │
│                         ClipPath line reveals            │
│  §4 Horizontal Scroll ► Strip x:0 → -500vw via scrub    │
│                         Card entry y:60→0 per card       │
│  §5 Stats ────────────► Count-up 0→N on viewport entry  │
│  §6 Final CTA ────────► Per-line clipPath reveal         │
│                         Magnetic button spring physics   │
└──────────────────────────────────────────────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│  BORDERGLOW ENGINE               │
│  mousemove → CSS custom props    │
│  ::before gradient (border only) │
│  rAF fade-out on mouseleave      │
│  Zero layout reflow              │
└──────────────────────────────────┘

Getting Started
Prerequisites
Node.js 18+
npm or pnpm
A Firebase project (free tier is sufficient)
Installation
bash
# Clone
git clone https://github.com/yourusername/firsthour.git
cd firsthour

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local

Edit .env.local:

env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
bash
# Development
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
Netlify Deployment

The repo includes a netlify.toml for SPA redirect rules:

toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

Push to your linked repo — Netlify auto-deploys on every commit.

Firebase Setup
Go to Firebase Console → Create project
Authentication → Sign-in method → Enable:
✅ Email / Password
✅ Google
Authorized Domains → Add firsthour.netlify.app (and localhost)
Project Settings → Copy your web app config into .env.local

Firebase error codes are mapped to human language — users never see raw codes:

Firebase Code	Message Shown
auth/wrong-password	"Incorrect password. Try again."
auth/user-not-found	"No account with this email."
auth/email-already-in-use	"Email already registered."
auth/weak-password	"Use 8+ characters with a number."
auth/network-request-failed	"Check your connection."
Supported Disasters
#	Type	Critical Window	Key Phase 1 Action
1	🌍 Earthquake	0–90 seconds	Drop, cover, hold on
2	🌊 Flood	0–5 minutes	Evacuate low floors immediately
3	🔥 Wildfire	0–3 minutes	Leave — do not gather belongings
4	🌀 Hurricane	Pre-event	Board + shelter position
5	🌪️ Tornado	0–60 seconds	Lowest floor, interior room
6	🌊 Tsunami	0–2 minutes	Move inland and uphill, now
7	☣️ Chemical Spill	0–5 minutes	Shelter-in-place, seal all gaps
8	⚡ Power Outage	0–15 minutes	CO safety, food preservation
Components
BorderGlow Cards

A pure JavaScript magnetic edge-glow system applied to every card on the site. No library required.

javascript
// Physics parameters (matches react-bits BorderGlow API)
const EDGE_SENSITIVITY = 30;   // px — trigger zone from card edge
const GLOW_RADIUS      = 40;   // px — base glow size
const GLOW_INTENSITY   = 1;    // 0–1 — brightness multiplier
const CONE_SPREAD      = 25;   // px — radius expansion near edge

// Colors: purple → pink → sky blue
// #c084fc → #f472b6 → #38bdf8

The glow renders via a ::before pseudo-element with a CSS mask — only the card border glows, never the fill. All updates are CSS custom property writes — zero layout reflow.

Premium Toggle Switches

Spring-physics toggle switches for all household option inputs:

OFF state    ○────────    (dark track, grey thumb)
             │
   [click]   │  squish → thumb stretches to full track width
             │
ON state     ────────●    (coloured glow track, white thumb)
                          + pulse @keyframes on check
                          + expanding glow blob behind thumb



<div align="center">

Built for the theme — Technology for Planet

Tackling environmental disaster mitigation through household-level preparation.

<br/>

Visit

<br/>

"The first 60 minutes, planned minute by minute."

</div>




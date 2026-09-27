import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { TechText } from '../components/TechText';
import {
  ShieldCheck, Clock, CheckCircle2,
  AlertTriangle, Package, HelpCircle, Download,
  Compass, MapPin, Layers, WifiOff, ArrowRight,
  MountainSnow, Flame, CloudRain, Zap, Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { cn } from '../lib/utils';
import AccordionGallery from '../components/reactbits/AccordionGallery';
import CurvedLoop from '../components/reactbits/CurvedLoop';
import DriftWall from '../components/reactbits/DriftWall';
import CompassRing from '../components/reactbits/CompassRing';
import { useBorderGlowGroup } from '../components/reactbits/useBorderGlowGroup';
import {
  CURVED_LOOP_TEXT,
  DRIFT_TILES,
  GALLERY_ACCORDION_ITEMS,
  GALLERY_ENTRIES
} from '../lib/landingContent';

export default function Landing() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeHazardTab, setActiveHazardTab] = useState('earthquake');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const glowRef = useBorderGlowGroup<HTMLDivElement>({ edgeSensitivity: 34, coneSpread: 26 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onDarkNav = !scrolled;

  const hazardDetails: Record<string, { title: string; subtitle: string; phases: string[]; advice: string }> = {
    earthquake: {
      title: 'Rupture & Structural Isolation',
      subtitle: 'Focus: immediate crush-injury prevention, gas main shutdown, and aftershock readiness.',
      phases: [
        '0–5m: Drop, cover, and hold beneath a load-bearing core; pull on boots against shattered glass.',
        '5–15m: Sniff for mercaptan sulfur gas leak; isolate the electrical panel to stop short-circuit fires.',
        '15–60m: Fill bathtubs with a potable reserve before mains pressure drops; stage the go-bag at your primary egress.'
      ],
      advice: 'Never exit a multi-storey building during active ground motion — falling facade masonry is a leading cause of injury after the shaking stops.'
    },
    wildfire: {
      title: 'Rapid Ember Storm & Corridor Egress',
      subtitle: 'Focus: structure perimeter wetting, particulate defense, and vehicle staging.',
      phases: [
        '0–5m: Wear tightly woven natural fibres; fit N95 respirators; back the car into the driveway with keys in the ignition.',
        '5–15m: Switch on interior and exterior lighting for aerial visibility; close every interior door.',
        '15–60m: Evacuate along your pre-mapped secondary corridor; send a coordinate ping to your out-of-area contact.'
      ],
      advice: 'Synthetic fabrics can melt onto skin under radiant heat. Wear tightly woven natural fibres instead.'
    },
    flood: {
      title: 'Flash Inundation & Hydrostatic Defense',
      subtitle: 'Focus: vertical evacuation, breaker isolation, and clean drinking-water caching.',
      phases: [
        '0–5m: Move household members to the second storey or roofline; do not enter basements.',
        '5–15m: Disconnect main power only if you are standing on dry ground; secure filters and dry food pouches.',
        '15–60m: Signal with a high-lumen strobe; monitor NOAA weather frequencies for the next release window.'
      ],
      advice: 'Six inches of moving water is enough to knock an adult down, and twelve inches can float a passenger vehicle off the road.'
    },
    power_outage: {
      title: 'Grid Collapse & Thermal Islanding',
      subtitle: 'Focus: surge protection, thermal fortress room selection, and 72-hour caloric pacing.',
      phases: [
        '0–5m: Unplug sensitive electronics; inventory LED headlamps and battery banks; avoid candles.',
        '5–15m: Isolate one south-facing room with thermal blankets to trap metabolic heat.',
        '15–60m: Crack faucets to prevent frozen pipe bursts; tune an analog FRS radio to Channel 1.'
      ],
      advice: 'Never run a combustion generator indoors or within 20 feet of a window — carbon monoxide is odourless and lethal.'
    }
  };

  const faqs = [
    {
      q: 'Why is the first hour treated as its own phase?',
      a: 'Emergency guidance from FEMA and the Red Cross is organised around the minutes before outside help can reach you. FirstHour takes that same assumption and turns it into a timed sequence, so decisions are already made before you have to make them under pressure.'
    },
    {
      q: 'Does FirstHour work when cell towers and internet go down?',
      a: 'Yes. Every plan you generate is stored in your browser’s local storage and can be exported as a printable dossier, a wallet card, or a QR code. Nothing in the plan needs a network connection to be read.'
    },
    {
      q: 'How is a plan tailored to my household?',
      a: 'You answer four short sets of questions: the disaster threat, your environment and building type, who lives with you, and any prescriptions or mobility needs. The generator sequences the steps around those answers, so a high-rise apartment plan reads differently from a rural house plan.'
    },
    {
      q: 'Can I print or share my plan with my family?',
      a: 'Yes. Each plan generates a compact wallet card and a QR code. Anyone in the household can scan the code to load the full protocol into their own browser, with no account required for viewing.'
    }
  ];

  const activeEntry = GALLERY_ENTRIES[galleryIndex] ?? GALLERY_ENTRIES[0];

  return (
    <div
      ref={glowRef}
      className="min-h-screen w-full overflow-x-hidden bg-palette-cream text-text-primary selection:bg-palette-sage selection:text-white"
    >
      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={cn(
          'fixed top-0 z-50 flex w-full items-center justify-between px-6 py-4 transition-all duration-300',
          scrolled
            ? 'border-b border-[rgba(139,154,110,0.25)] bg-palette-cream/90 shadow-sm backdrop-blur-md'
            : 'border-transparent bg-transparent'
        )}
      >
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex cursor-pointer items-center gap-2.5 transition-all hover:opacity-80"
        >
          <img
            src={onDarkNav ? '/logo-mark-light.png' : '/logo-mark.png'}
            alt=""
            className="h-7 w-auto"
          />
          <span
            className={cn(
              'text-[19px] font-extrabold tracking-tight',
              onDarkNav ? 'text-[#F3EFE6]' : 'text-text-primary'
            )}
          >
            FirstHour
          </span>
        </div>

        <div
          className={cn(
            'nav-link hidden items-center gap-6 text-[12px] uppercase md:flex',
            onDarkNav ? 'text-[#C4CDB4]' : 'text-text-secondary'
          )}
        >
          {[
            { href: '#chapters', label: 'Chapters' },
            { href: '#how-it-works', label: 'Cadence' },
            { href: '#hazards', label: 'Hazards' },
            { href: '#checklist', label: 'Go-Bag' },
            { href: '#faq', label: 'FAQ' }
          ].map(link => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'transition-colors',
                onDarkNav ? 'hover:text-white' : 'hover:text-text-primary'
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/auth')}
            className={cn(
              'nav-link px-3 py-1.5 text-[12px] uppercase transition-colors',
              onDarkNav ? 'text-[#C4CDB4] hover:text-white' : 'text-text-secondary hover:text-text-primary'
            )}
          >
            Sign In
          </button>
          <Button size="sm" onClick={() => navigate('/auth')}>
            Generate Protocol
          </Button>
        </div>
      </motion.nav>

      {/* ═══ HERO — drifting wall behind the wordmark, compass ring centre ═══ */}
      <section className="relative isolate flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[var(--dusk-900)] px-6 pb-20 pt-32">
        {/* Drifting photo wall */}
        <div className="absolute inset-0 z-0">
          <DriftWall
            items={DRIFT_TILES}
            columns={6}
            tileWidth={178}
            tileHeight={118}
            gap={16}
            radius={12}
            tilt={15}
            turn={-12}
            depth={150}
            speed={30}
            direction="up"
            variance={0.5}
            parallax={0.5}
            lift={52}
            fade={0.5}
            dim={0.72}
            overlayColor="#0d1309"
          />
        </div>

        {/* Legibility veil — light enough that the wall is still readable */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_68%_58%_at_50%_46%,rgba(11,17,8,0.34)_0%,rgba(11,17,8,0.74)_58%,rgba(9,13,6,0.95)_100%)]" />

        {/* Content */}
        <div className="relative z-10 flex w-full flex-col items-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-2 inline-flex items-center gap-2.5 rounded-full border border-[rgba(183,200,148,0.35)] bg-[rgba(183,200,148,0.1)] px-4 py-1.5 text-[10px] text-[#DDE6C9] backdrop-blur-sm"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B7C894] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#B7C894]" />
            </span>
            Household emergency cadence
          </motion.div>

          {/* Wordmark with the compass instrument seated behind it */}
          <div className="relative my-1 h-[130px] w-full max-w-5xl sm:h-[170px] md:h-[210px] lg:h-[248px]">
            <div className="pointer-events-none absolute inset-0 z-0 grid place-items-center">
              <div className="opacity-70 scale-[0.5] sm:scale-[0.68] lg:scale-[0.86]">
                <CompassRing size={460} tilt={60} accent="#B7C894" />
              </div>
            </div>
            <TechText
              text="FIRSTHOUR"
              fontWeight={800}
              fontSize={120}
              reveal="letter"
              dashLength={4}
              dashGap={2}
              specks={16}
              fontFamily="'Montserrat', sans-serif"
              color="#C3D4A0"
              accentColor="#B7C894"
              letterSpacing={-0.03}
              reach={220}
              softness={0.7}
              strokeWidth={1.6}
              speed={1}
              lineStyle="dashed"
              selection={false}
              labels={false}
              draggable
              sweep
            />
          </div>

          {/* The two grounded lines that carry the hero */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative z-10 max-w-[760px] rounded-[36px] bg-[radial-gradient(ellipse_75%_125%_at_50%_50%,rgba(9,13,6,0.82)_0%,rgba(9,13,6,0.58)_58%,transparent_100%)] px-6 py-6 text-center"
          >
            <h2 className="mb-4 text-[26px] leading-[1.2] text-[#F3EFE6] md:text-[38px]">
              The first 60 minutes determine survival.{' '}
              <span className="italic font-extrabold text-[#C3D4A0]">Panic happens without a plan.</span>
            </h2>
            <p className="text-[15px] text-[#C9CFC0] md:text-[17px]">
              Standard disaster advice is generic and chaotic. FirstHour equips your family with an exact,
              minute-by-minute survival cadence tailored to your home, location, and loved ones.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative z-10 mt-8 flex flex-col items-center gap-3.5 sm:flex-row"
          >
            <Button size="lg" onClick={() => navigate('/auth')}>
              Generate My Survival Plan
            </Button>
            <button
              onClick={() => document.getElementById('chapters')?.scrollIntoView({ behavior: 'smooth' })}
              className="cta-label inline-flex h-13 items-center gap-2 rounded-[12px] border border-[rgba(243,239,230,0.28)] px-7 py-3.5 text-[12px] text-[#F3EFE6] transition-colors hover:border-[#B7C894] hover:bg-[rgba(183,200,148,0.12)]"
            >
              See the five chapters <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>

          {/* Grounded product facts — replaces the old user-count proof bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-[#98A389]"
          >
            <span className="inline-flex items-center gap-2">
              <Layers className="h-3.5 w-3.5 text-[#B7C894]" /> Three timed phases
            </span>
            <span className="inline-flex items-center gap-2">
              <WifiOff className="h-3.5 w-3.5 text-[#B7C894]" /> Works with no signal
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-[#B7C894]" /> Built around your address
            </span>
          </motion.div>
        </div>

        {/* bottom fade into the cream page */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-24 bg-gradient-to-b from-transparent to-palette-cream" />
      </section>

      {/* Capability strip */}
      <section className="border-b border-[rgba(139,154,110,0.25)] bg-palette-sand/60 py-5">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 text-xs text-text-secondary">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-palette-sage" />
            <span className="font-semibold text-text-primary">TIMED WINDOWS:</span>
            <span>0–5 min · 5–15 min · 15–60 min</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-palette-sage" />
            <span className="font-semibold text-text-primary">WHY IT MATTERS:</span>
            <span>Outside help rarely arrives inside the first hour</span>
          </div>
          <div className="flex items-center gap-2">
            <Download className="h-4 w-4 text-palette-sage" />
            <span className="font-semibold text-text-primary">EXPORT:</span>
            <span>Print, wallet card, or QR — no account needed to read</span>
          </div>
        </div>
      </section>

      {/* ═══ CHAPTERS — AccordionGallery + linked detail panel ═══ */}
      <section id="chapters" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="eyebrow mb-3 inline-flex items-center gap-2 rounded-full bg-palette-sage/15 px-3 py-1 text-[10px] text-palette-sage">
            <Compass className="h-3.5 w-3.5" /> Five chapters of the first hour
          </div>
          <h2 className="text-[34px] leading-tight text-text-primary md:text-[46px]">
            How the hour actually unfolds
          </h2>
          <p className="mt-4 text-[16px] text-text-secondary">
            Each panel is one stage of the same hour. Hover, tap, or arrow between them to read what
            your household is doing at that moment.
          </p>
        </div>

        {/* Accordion gallery */}
        <div className="border-glow-card overflow-hidden rounded-[28px] border border-[rgba(139,154,110,0.25)] bg-[var(--dusk-800)] p-3 shadow-soft sm:p-4">
          <AccordionGallery
            items={GALLERY_ACCORDION_ITEMS}
            defaultIndex={0}
            expandRatio={0.52}
            trigger="hover"
            accentColor="#B7C894"
            overlayColor="#0d1309"
            textColor="#F3EFE6"
            height={430}
            gap={10}
            radius={16}
            parallax={0.5}
            tilt={9}
            duration={0.6}
            ease="power3.out"
            onActiveChange={setGalleryIndex}
          />
        </div>

        {/* Detail panel — driven by the expanded panel above */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="border-glow-card flex min-h-[220px] flex-col justify-between rounded-[28px] border border-[rgba(139,154,110,0.28)] bg-[#FFFFFF] p-8 shadow-card md:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEntry.index}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span className="stat-figure rounded-xl bg-palette-sage px-3 py-1 text-[15px] text-[#F7F2EB]">
                    {activeEntry.index}
                  </span>
                  <span className="eyebrow text-[10px] text-palette-sage">{activeEntry.represents}</span>
                </div>
                <h3 className="mb-1 text-[28px] text-text-primary md:text-[34px]">{activeEntry.title}</h3>
                <p className="mb-4 text-[14px] font-medium italic text-palette-sage">
                  {activeEntry.subCaption}
                </p>
                <p className="max-w-2xl text-[15px] text-text-secondary">{activeEntry.body}</p>
              </motion.div>
            </AnimatePresence>

            {/* Chapter progress rail */}
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {GALLERY_ENTRIES.map((entry, i) => (
                <button
                  key={entry.index}
                  onClick={() => setGalleryIndex(i)}
                  aria-label={`Show chapter ${entry.index}: ${entry.title}`}
                  aria-current={i === galleryIndex ? 'true' : undefined}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    i === galleryIndex
                      ? 'w-10 bg-palette-sage'
                      : 'w-5 bg-palette-sage/25 hover:bg-palette-sage/50'
                  )}
                />
              ))}
              <span className="eyebrow ml-2 text-[10px] text-text-muted">
                {activeEntry.index} / {String(GALLERY_ENTRIES.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Chapter rail */}
          <div className="border-glow-card rounded-[28px] border border-[rgba(139,154,110,0.28)] bg-[#FFFFFF] p-6 shadow-card md:p-7">
            <div className="eyebrow mb-4 text-[10px] text-text-muted">Chapter index</div>
            <div className="flex flex-col gap-1.5">
              {GALLERY_ENTRIES.map((entry, i) => {
                const isActive = i === galleryIndex;
                return (
                  <button
                    key={entry.index}
                    onClick={() => setGalleryIndex(i)}
                    className={cn(
                      'flex items-center justify-between rounded-xl px-3 py-2.5 text-left text-[14px] transition-all',
                      isActive
                        ? 'bg-palette-sage/12 font-semibold text-text-primary ring-1 ring-palette-sage/40'
                        : 'text-text-secondary hover:bg-palette-sand/60 hover:text-text-primary'
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span className="stat-figure text-[12px] text-palette-sage">{entry.index}</span>
                      <span>{entry.title}</span>
                    </span>
                    <span className="text-[11px] uppercase tracking-wider text-text-muted">
                      {entry.represents.split(' ').slice(-1)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CURVED LOOP MARQUEE ═══ */}
      <section className="relative overflow-hidden bg-[var(--dusk-900)] py-10">
        <CurvedLoop
          marqueeText={CURVED_LOOP_TEXT}
          speed={1.4}
          curveAmount={230}
          direction="left"
          interactive
        />
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="eyebrow mb-3 inline-flex items-center gap-2 rounded-full bg-palette-sage/15 px-3 py-1 text-[10px] text-palette-sage">
            <Clock className="h-3.5 w-3.5" /> Minute-by-minute cadence
          </div>
          <h2 className="text-[34px] leading-tight text-text-primary md:text-[46px]">
            Three timed phases. Zero guesswork.
          </h2>
          <p className="mt-4 text-[16px] text-text-secondary">
            In an emergency, adrenaline narrows your decision-making. FirstHour replaces hesitation
            with three clear operational windows.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              phase: 'Phase 01',
              window: '0–5 Minutes',
              title: 'Immediate Life Preservation',
              body: 'Neutralise the acute physical threat. Get your household under load-bearing cover, pull on thick-soled shoes, and run a rapid roll call.',
              steps: [
                'Protect the head and airway first',
                'Deploy headlamps and safety eyewear',
                'Muster at the primary safe point'
              ],
              goal: 'Goal: everyone accounted for'
            },
            {
              phase: 'Phase 02',
              window: '5–15 Minutes',
              title: 'Secondary Threat Neutralisation',
              body: 'Secondary hazards — fire, gas, severed power lines — cause more harm than the initial shock. Secure the perimeter before anything else.',
              steps: [
                'Check the gas meter and turn the shutoff 90°',
                'Isolate the breaker to prevent short-circuit fires',
                'Preserve water-heater stores for drinking'
              ],
              goal: 'Goal: structure stabilised'
            },
            {
              phase: 'Phase 03',
              window: '15–60 Minutes',
              title: 'Evacuation or Fortification',
              body: 'Make the decisive binary call: leave via a mapped secondary corridor, or hold in place for a 72-hour autonomous stretch.',
              steps: [
                'Stage go-bags, trauma kit and pet carriers',
                'Send a checkpoint message to an out-of-area contact',
                'Monitor NOAA frequencies and start transit'
              ],
              goal: 'Goal: self-sufficient for 72 hours'
            }
          ].map(card => (
            <div
              key={card.phase}
              className="border-glow-card flex flex-col justify-between rounded-[28px] border border-[rgba(139,154,110,0.3)] bg-[#FFFFFF] p-8 shadow-card transition-transform hover:-translate-y-1"
            >
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <span className="eyebrow rounded-xl bg-palette-sage px-3 py-1 text-[10px] font-semibold text-[#F7F2EB]">
                    {card.phase}
                  </span>
                  <span className="stat-figure text-[12px] text-text-muted">{card.window}</span>
                </div>
                <h3 className="mb-3 text-[20px] text-text-primary md:text-[22px]">{card.title}</h3>
                <p className="mb-6 text-[14px] text-text-secondary">{card.body}</p>

                <ul className="space-y-2.5 border-t border-[rgba(139,154,110,0.18)] pt-4 text-xs text-text-secondary">
                  {card.steps.map(step => (
                    <li key={step} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-palette-sage" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 border-t border-[rgba(139,154,110,0.15)] pt-4 text-[12px] font-semibold text-palette-sage">
                {card.goal}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ HAZARD MATRIX ═══ */}
      <section id="hazards" className="border-y border-[rgba(139,154,110,0.25)] bg-palette-sand/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <div className="eyebrow mb-3 inline-flex items-center gap-2 rounded-full bg-palette-sage/15 px-3 py-1 text-[10px] text-palette-sage">
              <Compass className="h-3.5 w-3.5" /> Tailored hazard matrix
            </div>
            <h2 className="text-[34px] leading-tight text-text-primary md:text-[44px]">
              One interface. Every catastrophe.
            </h2>
            <p className="mt-3 text-[15px] text-text-secondary">
              Different crises demand opposing behaviours. Pick a disaster below to see the protocol
              shape FirstHour generates for it.
            </p>
          </div>

          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {[
              { id: 'earthquake', label: 'Earthquake (M7+)', Icon: MountainSnow },
              { id: 'wildfire', label: 'Wildfire Ember Storm', Icon: Flame },
              { id: 'flood', label: 'Flash Flood & Inundation', Icon: CloudRain },
              { id: 'power_outage', label: 'Grid Blackout (72hr)', Icon: Zap }
            ].map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setActiveHazardTab(id)}
                className={cn(
                  'flex cursor-pointer items-center gap-2.5 rounded-2xl px-5 py-3 text-sm font-semibold transition-all',
                  activeHazardTab === id
                    ? 'scale-105 bg-palette-sage text-[#F7F2EB] shadow-md'
                    : 'border border-[rgba(139,154,110,0.25)] bg-[#FFFFFF] text-text-secondary hover:border-palette-sage hover:text-text-primary'
                )}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
                <span>{label}</span>
              </button>
            ))}
          </div>

          <div className="border-glow-card mx-auto max-w-4xl rounded-[28px] border border-[rgba(139,154,110,0.3)] bg-[#FFFFFF] p-8 shadow-card md:p-12">
            <div className="mb-6 flex flex-col justify-between gap-4 border-b border-[rgba(139,154,110,0.2)] pb-6 md:flex-row md:items-center">
              <div>
                <span className="eyebrow text-[10px] text-palette-sage">Selected protocol blueprint</span>
                <h3 className="mt-1 text-[26px] text-text-primary md:text-[32px]">
                  {hazardDetails[activeHazardTab].title}
                </h3>
                <p className="mt-1 text-sm text-text-secondary">
                  {hazardDetails[activeHazardTab].subtitle}
                </p>
              </div>
              <Button size="sm" onClick={() => navigate('/auth')}>
                Generate This Plan
              </Button>
            </div>

            <div className="mb-8 space-y-4">
              {hazardDetails[activeHazardTab].phases.map((phaseText, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 rounded-2xl border border-[rgba(139,154,110,0.2)] bg-palette-sand/40 p-4"
                >
                  <div className="stat-figure flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-palette-sage text-[12px] text-white">
                    0{idx + 1}
                  </div>
                  <p className="text-[14px] text-text-primary">{phaseText}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-palette-sage/40 bg-palette-cream/70 p-5">
              <AlertTriangle className="h-6 w-6 shrink-0 text-palette-sage" />
              <div className="text-xs text-text-secondary">
                <span className="font-bold text-text-primary">Safety note: </span>
                {hazardDetails[activeHazardTab].advice}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ GO-BAG ═══ */}
      <section id="checklist" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="eyebrow mb-3 inline-flex items-center gap-2 rounded-full bg-palette-sage/15 px-3 py-1 text-[10px] text-palette-sage">
              <Package className="h-3.5 w-3.5" /> Hardware &amp; rations
            </div>
            <h2 className="text-[34px] leading-tight text-text-primary md:text-[46px]">
              The 72-hour survival go-bag matrix
            </h2>
            <p className="mt-4 text-[16px] text-text-secondary">
              When an evacuation order lands you have seconds, not minutes. FirstHour walks through
              your supply caches so nothing essential is left behind.
            </p>

            <div className="mt-8 space-y-4">
              {[
                {
                  title: 'Water extraction & filtration',
                  desc: 'A hollow-fibre membrane filter plus purification tablets, covering three litres per person per day.'
                },
                {
                  title: 'Nutritional caloric density',
                  desc: 'Vacuum-sealed emergency food bars around 3,600 kcal, chosen so they do not provoke thirst.'
                },
                {
                  title: 'Trauma & wound care',
                  desc: 'Tourniquet, haemostatic gauze, chest seals and burn hydrogel — the items that buy time until help arrives.'
                },
                {
                  title: 'Analog comms & power',
                  desc: 'Hand-crank NOAA weather radio, solar battery bank, and a pre-programmed FRS handset.'
                }
              ].map(item => (
                <div
                  key={item.title}
                  className="border-glow-card flex gap-4 rounded-[22px] border border-[rgba(139,154,110,0.2)] bg-palette-sand/40 p-4"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-palette-sage text-white">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-semibold text-text-primary">{item.title}</h4>
                    <p className="mt-0.5 text-[13px] text-text-secondary">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button size="lg" onClick={() => navigate('/auth')}>
                Build my household go-bag
              </Button>
            </div>
          </div>

          <div className="border-glow-card rounded-[28px] border border-[rgba(139,154,110,0.3)] bg-[#FFFFFF] p-8 shadow-card">
            <div className="mb-6 flex items-center justify-between border-b border-[rgba(139,154,110,0.2)] pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-palette-sand text-palette-sage">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg text-text-primary">Example pack</h3>
                  <span className="text-xs text-text-muted">Staged at the primary home exit</span>
                </div>
              </div>
              <span className="eyebrow rounded-full bg-palette-sage/20 px-3 py-1 text-[10px] font-bold text-palette-sage">
                Sample layout
              </span>
            </div>

            <div className="space-y-3 text-xs">
              {[
                { name: 'Tourniquet & trauma dressing', weight: '0.8 lbs' },
                { name: 'Squeeze filter + 2L water pouch', weight: '0.6 lbs' },
                { name: '3,600 kcal ration bars', weight: '1.5 lbs' },
                { name: 'Hand-crank NOAA radio & torch', weight: '1.1 lbs' },
                { name: 'Waterproof wallet (deeds, cash, passports)', weight: '0.4 lbs' },
                { name: 'Pet harness & 3-day kibble cache', weight: '1.8 lbs' }
              ].map(item => (
                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-xl border border-[rgba(139,154,110,0.18)] bg-palette-sand/30 p-3"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-palette-sage" />
                    <span className="font-medium text-text-primary">{item.name}</span>
                  </div>
                  <span className="stat-figure text-text-muted">{item.weight}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between rounded-xl border border-[rgba(139,154,110,0.25)] bg-palette-cream p-4 text-xs">
              <span className="text-text-secondary">
                Typical total weight: <strong className="text-text-primary">6.2 lbs</strong>
              </span>
              <span className="font-semibold text-palette-sage">Keep it under 15 lbs to carry comfortably</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ DESIGN PRINCIPLES (replaces the fabricated statistics wall) ═══ */}
      <section id="science" className="border-y border-[rgba(139,154,110,0.25)] bg-palette-sand/50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="text-[32px] leading-tight text-text-primary md:text-[42px]">
              Four numbers the product is built on
            </h2>
            <p className="mt-3 text-[15px] text-text-secondary">
              These are design parameters, not research findings — they describe how FirstHour
              structures a plan.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                figure: '60',
                unit: 'min',
                label: 'Covered window',
                body: 'The hour before organised help typically reaches a household, split into three timed phases.'
              },
              {
                figure: '3',
                unit: 'phases',
                label: 'Cadence structure',
                body: '0–5, 5–15 and 15–60 minutes, each with its own goal and a short list of actions.'
              },
              {
                figure: '72',
                unit: 'hrs',
                label: 'Self-sufficiency target',
                body: 'The go-bag matrix is sized for three days of water, food, power and comms without resupply.'
              },
              {
                figure: '0',
                unit: 'bars',
                label: 'Signal required',
                body: 'Plans cache in local storage and export to print or QR, so they stay readable offline.'
              }
            ].map(stat => (
              <div
                key={stat.figure}
                className="border-glow-card rounded-[28px] border border-[rgba(139,154,110,0.25)] bg-[#FFFFFF] p-6 text-center shadow-card"
              >
                <div className="stat-figure mb-2 text-[46px] leading-none text-palette-sage">
                  {stat.figure}
                  <span className="ml-1 text-[15px] font-medium tracking-normal text-text-muted">
                    {stat.unit}
                  </span>
                </div>
                <div className="mb-1 text-sm font-semibold text-text-primary">{stat.label}</div>
                <p className="text-xs text-text-secondary">{stat.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="py-24 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 text-center"
          >
            <div className="eyebrow mb-3 inline-flex items-center gap-2 rounded-full bg-palette-sage/15 px-3 py-1 text-[10px] text-palette-sage">
              <HelpCircle className="h-3.5 w-3.5" /> Clarity &amp; protocols
            </div>
            <h2 className="text-[32px] leading-tight text-text-primary md:text-[40px]">
              Frequently asked questions
            </h2>
          </motion.div>

          <div className="flex flex-col gap-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -3 }}
                  className="border-glow-card cursor-pointer rounded-[22px] border border-[rgba(139,154,110,0.25)] bg-[#FFFFFF] px-7 py-6 shadow-sm transition-shadow hover:shadow-md"
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                >
                  <div className="flex items-start justify-between gap-6">
                    <h3 className="text-[15.5px] font-semibold leading-relaxed text-text-primary transition-colors md:text-[16.5px]">
                      {faq.q}
                    </h3>
                    <motion.span
                      aria-hidden
                      animate={isOpen ? { rotate: 180, scale: 1.08 } : { rotate: 0, scale: 1 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center"
                    >
                      <span className="absolute h-[2px] w-3.5 rounded-full bg-palette-sage" />
                      <motion.span
                        className="absolute h-[2px] w-3.5 rounded-full bg-palette-sage"
                        animate={{ rotate: isOpen ? 0 : 90, opacity: isOpen ? 0 : 1 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      />
                    </motion.span>
                  </div>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 border-t border-[rgba(139,154,110,0.18)] pt-4 text-[15px] leading-relaxed text-text-secondary">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="relative flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="border-glow-card relative mx-auto max-w-3xl overflow-hidden rounded-[32px] border border-palette-sage/40 bg-palette-sand/70 p-10 shadow-soft md:p-16">
          <div className="pointer-events-none absolute -right-16 -top-16 opacity-40">
            <CompassRing size={260} tilt={62} accent="#8B9A6E" pulse={false} />
          </div>
          <span className="eyebrow mb-3 block text-[10px] font-bold text-palette-sage">
            Start with the hour that matters
          </span>
          <h2 className="mb-4 text-[32px] leading-tight text-text-primary md:text-[46px]">
            Build your household&apos;s first hour
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-[16px] text-text-secondary">
            Answer four short sets of questions and FirstHour writes the minute-by-minute cadence for
            your home, then exports it as a wallet card you can print or share.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" onClick={() => navigate('/auth')}>
              Generate My Survival Protocol
            </Button>
            <Button size="lg" variant="secondary" onClick={() => navigate('/auth')}>
              Create an account
            </Button>
          </div>
          <p className="mt-4 text-xs text-text-muted">
            No card required · Works offline once generated · Printable wallet card included
          </p>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="flex items-center justify-between border-t border-[rgba(139,154,110,0.18)] px-8 py-[40px]">
        <span className="flex items-center gap-2.5">
          <img src="/logo-mark.png" alt="" className="h-6 w-auto opacity-70" />
          <span className="text-[14px] font-extrabold tracking-tight text-text-muted">FirstHour</span>
        </span>
        <span className="eyebrow text-[10px] text-text-muted opacity-60">
          Emergency preparedness platform
        </span>
      </footer>
    </div>
  );
}

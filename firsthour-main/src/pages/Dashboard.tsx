import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { usePlanStore, type SurvivalPlan } from '../store/planStore';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, Share2, Download, LogOut, CheckCircle2, Circle, 
  ShieldCheck, Radio, PhoneCall, Package, Plus,
  ChevronRight, ArrowLeft, RefreshCw, Printer, Clock, Search, ArrowRight
} from 'lucide-react';
import { GenerateModal } from '../components/generate/GenerateModal';
import { Button } from '../components/ui/Button';
import ToggleSwitch from '../components/ui/ToggleSwitch';
import CompassRing from '../components/reactbits/CompassRing';
import CurvedLoop from '../components/reactbits/CurvedLoop';
import { useBorderGlowGroup } from '../components/reactbits/useBorderGlowGroup';
import { DISASTER_TYPES } from '../lib/constants';
import { CURVED_LOOP_TEXT } from '../lib/landingContent';
import { EMERGENCY_NOTES, EMERGENCY_REGIONS, UNIVERSAL_SERVICES } from '../lib/emergencyNumbers';

export default function Dashboard() {
  const { user, logout } = useAuthStore();
  const { plans, toggleStep, deletePlan, resetDefaultPlans } = usePlanStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'home' | 'plans' | 'supplies' | 'contacts'>('home');
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [viewingPlanId, setViewingPlanId] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState<string | null>(null);
  const [needsMobilityHelp, setNeedsMobilityHelp] = useState(false);
  const [hasPets, setHasPets] = useState(true);
  const [hasMedicalStock, setHasMedicalStock] = useState(false);
  const [contactRegion, setContactRegion] = useState(EMERGENCY_REGIONS[0].id);
  const [contactQuery, setContactQuery] = useState('');
  const glowRef = useBorderGlowGroup<HTMLDivElement>({ edgeSensitivity: 32, coneSpread: 24, glowRadius: 44 });

  if (!user) {
    navigate('/auth');
    return null;
  }

  const viewingPlan = plans.find(p => p.id === viewingPlanId);

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  // Calculate completion percentage across all plans
  const totalSteps = plans.reduce((acc, p) => acc + p.phases.reduce((pAcc, ph) => pAcc + ph.steps.length, 0), 0);
  const completedSteps = plans.reduce((acc, p) => acc + p.phases.reduce((pAcc, ph) => pAcc + ph.steps.filter(s => s.completed).length, 0), 0);
  const readinessPercent = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  const activeRegion = EMERGENCY_REGIONS.find(r => r.id === contactRegion) ?? EMERGENCY_REGIONS[0];
  const directoryQuery = contactQuery.trim().toLowerCase();
  const directoryRows = directoryQuery
    ? EMERGENCY_REGIONS.flatMap(r => r.rows).filter(r => r.country.toLowerCase().includes(directoryQuery))
    : activeRegion.rows;

  return (
    <div
      ref={glowRef}
      className="flex h-screen w-full overflow-hidden bg-palette-cream text-text-primary"
    >
      {/* SIDEBAR */}
      <aside className="hidden w-[260px] flex-col border-r border-[rgba(139,154,110,0.25)] bg-palette-sand/70 md:flex">
        <div className="border-b border-[rgba(139,154,110,0.2)] p-6">
          <div
            onClick={() => navigate('/')}
            className="flex cursor-pointer items-center gap-2.5 transition-opacity hover:opacity-80"
          >
            <img src="/logo-mark.png" alt="" className="h-7 w-auto" />
            <span className="text-[19px] font-extrabold tracking-tight text-text-primary">FirstHour</span>
          </div>
          <span className="eyebrow mt-2 block text-[10px] text-text-muted">Command &amp; readiness</span>
        </div>

        <nav className="flex flex-1 flex-col gap-1.5 px-4 py-5">
          {[
            { id: 'home', label: 'Command Center', icon: ShieldCheck },
            { id: 'plans', label: 'Survival Protocols', icon: Zap, count: plans.length },
            { id: 'supplies', label: '72-Hour Go-Bag Audit', icon: Package },
            { id: 'contacts', label: 'Emergency Numbers', icon: PhoneCall },
          ].map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id && !viewingPlanId;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id as any); setViewingPlanId(null); }}
                className={`relative flex items-center justify-between rounded-xl px-3.5 py-2.5 text-[14px] font-medium transition-all cursor-pointer ${
                  isActive 
                    ? 'text-text-primary bg-[#FFFFFF] shadow-sm border border-[rgba(139,154,110,0.3)]' 
                    : 'text-text-secondary hover:bg-palette-sand hover:text-text-primary'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 ${isActive ? 'text-palette-sage' : 'text-text-muted'}`} />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span className="rounded-full bg-palette-sage/20 px-2 py-0.5 text-[11px] font-bold text-palette-sage">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}

          <div className="mt-6 pt-4 border-t border-[rgba(139,154,110,0.2)]">
            <button 
              onClick={() => setIsGenerateOpen(true)}
              className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-palette-sage px-4 py-3 text-sm font-semibold text-[#F7F2EB] shadow-[0_4px_14px_rgba(139,154,110,0.3)] hover:bg-[#78875C] transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4" /> Generate New Plan
            </button>
          </div>
        </nav>

        {/* User Card & Sign Out */}
        <div className="p-4 border-t border-[rgba(139,154,110,0.2)] bg-palette-cream/40">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-palette-sage text-white font-bold text-sm">
              {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col truncate">
              <span className="text-sm font-semibold text-text-primary truncate">{user.displayName || 'Authorized Responder'}</span>
              <span className="text-[11px] text-text-muted truncate">{user.email}</span>
            </div>
          </div>
          <button 
            onClick={handleSignOut} 
            className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-text-muted hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign out of platform
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-[rgba(139,154,110,0.25)] bg-[#FFFFFF] px-6 md:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 md:hidden"
            >
              <img src="/logo-mark.png" alt="" className="h-6 w-auto" />
              <span className="text-[16px] font-extrabold tracking-tight text-text-primary">FirstHour</span>
            </button>
            <div className="h-4 w-px bg-palette-grey md:hidden" />
            <h1 className="text-[17px] md:text-[19px] font-semibold text-text-primary">
              {viewingPlan 
                ? 'Survival Protocol Dossier' 
                : activeTab === 'home' 
                  ? `Command Center · ${user.displayName || 'Chief Responder'}`
                  : activeTab === 'plans' 
                    ? 'Active Survival Protocols' 
                    : activeTab === 'supplies'
                      ? '72-Hour Supply Audit'
                      : 'Emergency Numbers'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-palette-sage/30 bg-palette-sand/40 px-3 py-1 text-xs text-text-secondary">
              <span className="h-2 w-2 rounded-full bg-palette-sage animate-pulse" />
              <span>Offline Cache Active</span>
            </div>
            <Button size="sm" onClick={() => setIsGenerateOpen(true)}>
              <Plus className="mr-1 h-3.5 w-3.5" /> New Protocol
            </Button>
          </div>
        </header>

        {/* Scrollable Workspace */}
        <div className="flex-1 overflow-y-auto px-6 py-8 md:px-9 md:py-10">
          {viewingPlan ? (
            <PlanView 
              plan={viewingPlan} 
              onBack={() => setViewingPlanId(null)} 
              toggleStep={toggleStep}
              onShare={() => setShowShareModal(viewingPlan.id)}
            />
          ) : activeTab === 'home' ? (
            <div className="mx-auto flex max-w-6xl flex-col gap-10">
              {/* Emergency Advisory Strip */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl border border-[rgba(139,154,110,0.35)] bg-palette-sand p-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-palette-sage text-white">
                    <Radio className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-palette-sage">Why this hour matters</span>
                    </div>
                    <p className="text-[13px] font-medium text-text-primary">
                      Outside help rarely arrives inside the first hour, so the plan you save here does
                      the work until it does.
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsGenerateOpen(true)}
                  className="text-xs font-semibold text-palette-sage hover:underline shrink-0"
                >
                  Audit Household Plan <ArrowRight className="ml-1 inline h-3.5 w-3.5" strokeWidth={2.2} />
                </button>
              </motion.div>

              {/* Readiness instrument — the command centre dial */}
              <div className="border-glow-card relative flex flex-col items-center gap-6 overflow-hidden rounded-[28px] border border-[rgba(139,154,110,0.25)] bg-[var(--dusk-800)] p-6 shadow-card sm:flex-row sm:justify-between md:p-8">
                <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-palette-sage/15 blur-3xl" />
                <div className="relative z-[1] max-w-md">
                  <div className="eyebrow text-[10px] text-[#B7C894]">Readiness score</div>
                  <h2 className="mt-2 text-[24px] leading-tight text-[#F3EFE6] md:text-[30px]">
                    Your household cadence
                  </h2>
                  <p className="mt-3 text-[13px] text-[#B9C1AE]">
                    Counted from the steps you have already verified across every saved protocol. Tick
                    a step inside a plan and this dial moves with you.
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <span className="flex items-baseline gap-1.5">
                      <span className="stat-figure text-[30px] text-[#F3EFE6]">{completedSteps}</span>
                      <span className="text-[14px] text-[#98A389]">/ {totalSteps} steps verified</span>
                    </span>
                    <span className="flex items-baseline gap-1.5">
                      <span className="stat-figure text-[30px] text-[#F3EFE6]">{plans.length}</span>
                      <span className="text-[14px] text-[#98A389]">protocols saved</span>
                    </span>
                  </div>

                  <div className="mt-6 h-1.5 w-full max-w-sm overflow-hidden rounded-full bg-[rgba(243,239,230,0.14)]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${readinessPercent}%` }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full bg-[#B7C894]"
                    />
                  </div>
                </div>

                <div className="relative z-[1] shrink-0 scale-[0.78] sm:scale-90 lg:scale-100">
                  <CompassRing
                    size={272}
                    tilt={58}
                    accent="#B7C894"
                    value={readinessPercent}
                    label={`${readinessPercent}%`}
                    sublabel="ready"
                  />
                </div>
              </div>

              {/* Status Overview Cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {/* Active Plans */}
                <div className="border-glow-card flex flex-col gap-5 rounded-[26px] border border-[rgba(139,154,110,0.25)] bg-[#FFFFFF] p-7 shadow-card">
                  <div className="flex items-center justify-between text-text-muted">
                    <span className="eyebrow text-[10px] font-semibold">Active protocols</span>
                    <Zap className="h-5 w-5 text-palette-sage" />
                  </div>
                  <div>
                    <div className="stat-figure text-[36px] leading-none text-text-primary">{plans.length}</div>
                    <p className="mt-2.5 text-[13.5px] text-text-secondary">
                      Hazard-specific plans saved to this device
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('plans')}
                    className="cursor-pointer text-left text-[12.5px] font-semibold text-palette-sage hover:underline"
                  >
                    View all protocols <ArrowRight className="ml-1 inline h-3.5 w-3.5" strokeWidth={2.2} />
                  </button>
                </div>

                {/* 60-Minute Cadence */}
                <div className="border-glow-card flex flex-col gap-5 rounded-[26px] border border-[rgba(139,154,110,0.25)] bg-[#FFFFFF] p-7 shadow-card">
                  <div className="flex items-center justify-between text-text-muted">
                    <span className="eyebrow text-[10px] font-semibold">Timed phases</span>
                    <Clock className="h-5 w-5 text-palette-sage" />
                  </div>
                  <div>
                    <div className="stat-figure text-[36px] leading-none text-text-primary">3</div>
                    <p className="mt-2.5 text-[13.5px] text-text-secondary">
                      0–5 min · 5–15 min · 15–60 min, each with its own goal
                    </p>
                  </div>
                  <p className="eyebrow text-[10px] text-text-muted">Every step has one owner</p>
                </div>

                {/* Offline Sync */}
                <div className="border-glow-card flex flex-col gap-5 rounded-[26px] border border-[rgba(139,154,110,0.25)] bg-[#FFFFFF] p-7 shadow-card">
                  <div className="flex items-center justify-between text-text-muted">
                    <span className="eyebrow text-[10px] font-semibold">Offline access</span>
                    <Download className="h-5 w-5 text-palette-sage" />
                  </div>
                  <div>
                    <div className="stat-figure text-[26px] leading-none text-text-primary">Ready</div>
                    <p className="mt-2.5 text-[13.5px] text-text-secondary">
                      Stored on this device and exportable as print or QR
                    </p>
                  </div>
                  <p className="eyebrow text-[10px] text-text-muted">No signal required</p>
                </div>
              </div>

              {/* Your Survival Plans (Comprehensive List) */}
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-[22px] text-text-primary md:text-[26px]">Household survival protocols</h2>
                    <p className="mt-1.5 text-[14px] text-text-secondary">
                      One timed cadence per hazard, written for the people and building you entered.
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Button variant="ghost" size="sm" onClick={resetDefaultPlans}>
                      <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Reset
                    </Button>
                    <Button size="sm" onClick={() => setIsGenerateOpen(true)}>
                      <Plus className="mr-1.5 h-3.5 w-3.5" /> Add protocol
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4">
                  {plans.map(plan => {
                    const disaster = DISASTER_TYPES.find(d => d.id === plan.disasterType);
                    const completedInPlan = plan.phases.reduce((acc, ph) => acc + ph.steps.filter(s => s.completed).length, 0);
                    const totalInPlan = plan.phases.reduce((acc, ph) => acc + ph.steps.length, 0);
                    const percent = totalInPlan > 0 ? Math.round((completedInPlan / totalInPlan) * 100) : 0;

                    return (
                      <div 
                        key={plan.id}
                        onClick={() => setViewingPlanId(plan.id)}
                        className="border-glow-card group flex cursor-pointer flex-col gap-6 rounded-[26px] border border-[rgba(139,154,110,0.25)] bg-[#FFFFFF] p-6 shadow-card transition-all hover:border-palette-sage hover:shadow-soft md:p-7 lg:flex-row lg:items-center"
                      >
                        <div className="flex min-w-0 flex-1 items-start gap-5">
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] border border-[rgba(139,154,110,0.2)] bg-palette-sand text-palette-sage">
                            {(() => { const Icon = disaster?.icon || Zap; return <Icon className="h-6 w-6" strokeWidth={1.8} />; })()}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-[17px] font-semibold leading-snug text-text-primary transition-colors group-hover:text-palette-sage md:text-[18px]">
                              {plan.title}
                            </h3>
                            <p className="mt-2 text-[13.5px] text-text-secondary">{plan.subtitle}</p>
                            <div className="mt-3.5 flex flex-wrap items-center gap-2">
                              <span className="rounded-full bg-palette-sand px-3 py-1 text-[11px] font-medium text-text-secondary">
                                {plan.phases.length} phases
                              </span>
                              <span className="rounded-full bg-palette-sand px-3 py-1 text-[11px] font-medium text-text-secondary">
                                {totalInPlan} steps
                              </span>
                              <span className="rounded-full bg-palette-sage/15 px-3 py-1 text-[11px] font-semibold text-palette-sage">
                                {percent}% verified
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex shrink-0 flex-col gap-3.5 border-t border-[rgba(139,154,110,0.15)] pt-5 lg:w-[310px] lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
                          <div className="flex items-center justify-between">
                            <span className="eyebrow text-[10px] text-text-muted">Progress</span>
                            <span className="stat-figure text-[13px] text-text-secondary">
                              {completedInPlan} / {totalInPlan}
                            </span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-palette-grey">
                            <div className="h-full rounded-full bg-palette-sage" style={{ width: `${percent}%` }} />
                          </div>

                        <div
                          className="flex items-center gap-2 [&_button]:shrink-0 [&_button]:whitespace-nowrap"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button 
                            variant="secondary" 
                            size="sm"
                            onClick={() => setShowShareModal(plan.id)}
                          >
                            <Share2 className="h-3.5 w-3.5" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => deletePlan(plan.id)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            Delete
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => setViewingPlanId(plan.id)}
                          >
                            Open protocol <ChevronRight className="ml-1 h-3.5 w-3.5" />
                          </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Emergency Preparedness Modules */}
              <div className="grid gap-6 lg:grid-cols-2">
                {/* 72-Hour Supply Kit Audit */}
                <div className="border-glow-card rounded-[26px] border border-[rgba(139,154,110,0.25)] bg-[#FFFFFF] p-7 shadow-card">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-palette-sand text-palette-sage">
                        <Package className="h-[18px] w-[18px]" />
                      </div>
                      <h3 className="text-[19px] text-text-primary">Go-bag supplies</h3>
                    </div>
                    <span className="shrink-0 rounded-full bg-palette-sand px-3 py-1 text-[11px] font-medium text-text-muted">
                      Example
                    </span>
                  </div>
                  <p className="mb-5 text-[13.5px] text-text-secondary">
                    The categories worth covering at your primary exit. Swap these examples for what you
                    actually have on hand.
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {[
                      { item: 'Water filter & 6L reservoir', ready: true },
                      { item: '3,600 kcal emergency rations', ready: true },
                      { item: 'Hand-crank NOAA radio & torch', ready: true },
                      { item: 'Trauma dressing & tourniquet', ready: true },
                      { item: 'Waterproof document canister', ready: false }
                    ].map((g, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-4 rounded-xl bg-palette-sand/40 px-4 py-3"
                      >
                        <span className="text-[13.5px] text-text-primary">{g.item}</span>
                        <span
                          className={`shrink-0 text-[11px] font-bold uppercase tracking-wider ${
                            g.ready ? 'text-palette-sage' : 'text-amber-700'
                          }`}
                        >
                          {g.ready ? 'Staged' : 'Missing'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Analog Communications Plan */}
                <div className="border-glow-card rounded-[24px] border border-[rgba(139,154,110,0.25)] bg-[#FFFFFF] p-6 shadow-card">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-palette-sand text-palette-sage">
                        <PhoneCall className="h-4 w-4" />
                      </div>
                      <h3 className="text-[19px] text-text-primary">Zero-cellular comms</h3>
                    </div>
                    <span className="shrink-0 rounded-full bg-palette-sand px-3 py-1 text-[11px] font-medium text-text-muted">
                      Template
                    </span>
                  </div>
                  <p className="mb-5 text-[13.5px] text-text-secondary">
                    For when cell towers jam. Replace the placeholders with your own contacts and rally
                    point.
                  </p>
                  <div className="flex flex-col gap-2.5">
                    <div className="rounded-xl border border-[rgba(139,154,110,0.2)] bg-palette-cream px-4 py-3.5">
                      <div className="text-[13.5px] font-semibold text-text-primary">Out-of-area anchor</div>
                      <div className="mt-1 text-[13px] text-text-secondary">
                        A contact outside your region — SMS only
                      </div>
                    </div>
                    <div className="rounded-xl border border-[rgba(139,154,110,0.2)] bg-palette-cream px-4 py-3.5">
                      <div className="text-[13.5px] font-semibold text-text-primary">Local rally point</div>
                      <div className="mt-1 text-[13px] text-text-secondary">
                        A walking-distance meeting spot for the household
                      </div>
                    </div>
                    <div className="rounded-xl border border-[rgba(139,154,110,0.2)] bg-palette-cream px-4 py-3.5">
                      <div className="text-[13.5px] font-semibold text-text-primary">FRS / GMRS channel</div>
                      <div className="mt-1 text-[13px] text-text-secondary">
                        Channel 1 (462.5625 MHz) · top of every hour for 10 minutes
                      </div>
                    </div>
                  </div>
                </div>

                {/* Household profile — interactive switches */}
                <div className="border-glow-card flex flex-col rounded-[26px] border border-[rgba(139,154,110,0.25)] bg-[#FFFFFF] p-7 shadow-card lg:col-span-2">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-palette-sand text-palette-sage">
                      <CheckCircle2 className="h-[18px] w-[18px]" />
                    </div>
                    <h3 className="text-[19px] text-text-primary">Household profile</h3>
                  </div>
                  <p className="mb-6 max-w-2xl text-[13.5px] text-text-secondary">
                    These switches change which steps the plan generator writes into new protocols.
                  </p>

                  <div className="grid gap-x-12 md:grid-cols-3">
                  <div className="toggle-row">
                    <label className="toggle-label" htmlFor="dash-mobility">
                      <span className="toggle-text">Mobility assistance</span>
                      <span className="toggle-hint">Slower evacuation pacing</span>
                    </label>
                    <ToggleSwitch
                      id="dash-mobility"
                      checked={needsMobilityHelp}
                      onChange={setNeedsMobilityHelp}
                      hue={25}
                      saturation="85%"
                      lightness="52%"
                    />
                  </div>

                  <div className="toggle-row">
                    <label className="toggle-label" htmlFor="dash-pets">
                      <span className="toggle-text">Companion animals</span>
                      <span className="toggle-hint">Carrier and food staging</span>
                    </label>
                    <ToggleSwitch
                      id="dash-pets"
                      checked={hasPets}
                      onChange={setHasPets}
                      hue={25}
                      saturation="85%"
                      lightness="52%"
                    />
                  </div>

                  <div className="toggle-row !border-b-0">
                    <label className="toggle-label" htmlFor="dash-medical">
                      <span className="toggle-text">Critical medication</span>
                      <span className="toggle-hint">Adds a prescription grab step</span>
                    </label>
                    <ToggleSwitch
                      id="dash-medical"
                      checked={hasMedicalStock}
                      onChange={setHasMedicalStock}
                      hue={12}
                      saturation="80%"
                      lightness="50%"
                    />
                  </div>
                  </div>
                </div>
              </div>

              {/* Marquee band */}
              <div className="relative overflow-hidden rounded-[28px] bg-[var(--dusk-900)] py-6">
                <CurvedLoop
                  marqueeText={CURVED_LOOP_TEXT}
                  speed={1.1}
                  curveAmount={180}
                  direction="left"
                  interactive
                />
              </div>
            </div>
          ) : activeTab === 'plans' ? (
            /* PLANS TAB */
            <div className="flex flex-col gap-4 max-w-5xl mx-auto">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-[24px] font-serif italic text-text-primary">All Survival Protocols</h2>
                  <p className="text-[14px] text-text-secondary">Review, edit, and drill your customized disaster plans.</p>
                </div>
                <Button onClick={() => setIsGenerateOpen(true)}>
                  <Plus className="mr-1 h-4 w-4" /> Create New Plan
                </Button>
              </div>

              <div className="grid gap-3">
                {plans.map(plan => (
                  <div 
                    key={plan.id}
                    onClick={() => setViewingPlanId(plan.id)}                      className="border-glow-card flex cursor-pointer items-center justify-between rounded-[24px] border border-[rgba(139,154,110,0.25)] bg-[#FFFFFF] p-5 shadow-sm transition-all hover:border-palette-sage hover:shadow-md"
                  >
                    <div>
                      <h3 className="text-[17px] font-semibold text-text-primary">{plan.title}</h3>
                      <p className="text-[13px] text-text-secondary mt-1">{plan.subtitle}</p>
                      <div className="text-xs text-text-muted mt-2">
                        {plan.phases.reduce((acc, ph) => acc + ph.steps.length, 0)} total action steps across 3 phases
                      </div>
                    </div>
                    <Button variant="secondary" size="sm">
                      Open Plan <ArrowRight className="ml-1 inline h-3.5 w-3.5" strokeWidth={2.2} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ) : activeTab === 'supplies' ? (
            /* SUPPLIES TAB */
            <div className="flex flex-col gap-6 max-w-4xl mx-auto">
              <div>
                <h2 className="text-[24px] font-serif italic text-text-primary">72-Hour Survival Go-Bag Inventory</h2>
                <p className="text-[14px] text-text-secondary">Standard FEMA / Red Cross disaster supply checklist tailored for immediate evacuation.</p>
              </div>

              <div className="grid gap-4">
                {[
                  { cat: "Water & Hydration", items: ["1 Gallon per person per day (3-day minimum)", "Sawyer Squeeze or LifeStraw filter", "Potable Aqua iodine water purification tablets"] },
                  { cat: "Food & Sustenance", items: ["3,600 kcal non-perishable survival food bars", "Manual can opener and metal mess kit", "Electrolyte hydration powder packs"] },
                  { cat: "First Aid & Trauma", items: ["Combat Application Tourniquet (CAT Gen 7)", "QuikClot hemostatic gauze dressing", "Emergency splint, burn gel, and antibiotic ointment"] },
                  { cat: "Tools & Shelter", items: ["Emergency Mylar thermal bivvy blankets", "Multi-tool with pliers and wire cutter", "Duct tape, paracord (50 ft), and stormproof matches"] },
                  { cat: "Communication & Power", items: ["Hand-crank AM/FM/NOAA weather radio", "High-capacity power bank with solar charging", "Loud emergency signaling whistle"] },
                ].map((section, idx) => (
                  <div key={idx} className="border-glow-card rounded-[24px] border border-[rgba(139,154,110,0.25)] bg-[#FFFFFF] p-6 shadow-sm">
                    <h3 className="font-serif italic text-[18px] text-text-primary mb-3">{section.cat}</h3>
                    <div className="space-y-2.5">
                      {section.items.map((item, itemIdx) => (
                        <label key={itemIdx} className="flex items-center gap-3 p-2.5 rounded-xl bg-palette-sand/30 hover:bg-palette-sand/50 transition-colors cursor-pointer">
                          <input type="checkbox" defaultChecked={itemIdx < 2} className="h-4 w-4 rounded border-palette-sage text-palette-sage focus:ring-palette-sage" />
                          <span className="text-[14px] text-text-primary">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* CONTACTS TAB */
            <div className="mx-auto flex max-w-5xl flex-col gap-9">
              <div>
                <h2 className="text-[22px] text-text-primary md:text-[26px]">Emergency numbers</h2>
                <p className="mt-1.5 max-w-2xl text-[14px] text-text-secondary">
                  Keep a printed copy in every vehicle glovebox and go-bag. Numbers below are dialled
                  from the country listed, not from abroad.
                </p>
              </div>

              {/* Always-useful lines */}
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {UNIVERSAL_SERVICES.map(service => (
                  <div
                    key={service.number}
                    className="border-glow-card rounded-[24px] border border-[rgba(139,154,110,0.25)] bg-[#FFFFFF] p-6 shadow-card"
                  >
                    <div className="eyebrow text-[10px] text-palette-sage">{service.title}</div>
                    <div className="stat-figure my-2 whitespace-nowrap text-[21px] leading-none tracking-tight text-text-primary">
                      {service.number}
                    </div>
                    <p className="text-[12.5px] text-text-secondary">{service.desc}</p>
                  </div>
                ))}
              </div>

              {/* Region filter */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  {EMERGENCY_REGIONS.map(region => {
                    const isActive = !directoryQuery && region.id === activeRegion.id;
                    return (
                      <button
                        key={region.id}
                        onClick={() => {
                          setContactRegion(region.id);
                          setContactQuery('');
                        }}
                        className={`cursor-pointer rounded-xl px-4 py-2 text-[13px] font-medium transition-all ${
                          isActive
                            ? 'bg-palette-sage text-[#F7F2EB] shadow-sm'
                            : 'border border-[rgba(139,154,110,0.25)] bg-[#FFFFFF] text-text-secondary hover:border-palette-sage hover:text-text-primary'
                        }`}
                      >
                        {region.name}
                      </button>
                    );
                  })}
                </div>

                {/* Directory table */}
                <div className="border-glow-card overflow-hidden rounded-[26px] border border-[rgba(139,154,110,0.25)] bg-[#FFFFFF] shadow-card">
                  <div className="flex items-center gap-3 border-b border-[rgba(139,154,110,0.2)] px-6 py-4">
                    <Search className="h-4 w-4 shrink-0 text-text-muted" />
                    <input
                      value={contactQuery}
                      onChange={e => setContactQuery(e.target.value)}
                      placeholder="Search every country in the directory…"
                      className="w-full bg-transparent text-[14px] text-text-primary outline-none placeholder:text-text-muted/70"
                      aria-label="Search emergency numbers by country"
                    />
                    <span className="shrink-0 text-[12px] text-text-muted">
                      {directoryQuery ? `${directoryRows.length} match${directoryRows.length === 1 ? '' : 'es'}` : activeRegion.name}
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[620px] border-collapse text-left">
                      <thead>
                        <tr className="bg-palette-sand/40">
                          {['Country', 'All-in-one', 'Police', 'Ambulance', 'Fire'].map(head => (
                            <th
                              key={head}
                              className="px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted first:pl-6 last:pr-6"
                            >
                              {head}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {directoryRows.map(row => (
                          <tr
                            key={row.country}
                            className="border-t border-[rgba(28,34,22,0.06)] transition-colors hover:bg-palette-sand/30"
                          >
                            <td className="px-6 py-4 text-[13.5px] font-semibold text-text-primary">
                              {row.country}
                            </td>
                            <EmergencyNumberCell value={row.allInOne} emphasis />
                            <EmergencyNumberCell value={row.police} />
                            <EmergencyNumberCell value={row.ambulance} />
                            <EmergencyNumberCell value={row.fire} />
                          </tr>
                        ))}
                        {directoryRows.length === 0 && (
                          <tr className="border-t border-[rgba(28,34,22,0.06)]">
                            <td colSpan={5} className="px-6 py-8 text-center text-[13.5px] text-text-muted">
                              No country matches “{contactQuery}”.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="border-t border-[rgba(139,154,110,0.2)] bg-palette-sand/30 px-6 py-4">
                    <p className="text-[12.5px] text-text-secondary">
                      {directoryQuery
                        ? EMERGENCY_NOTES[1]
                        : activeRegion.note || EMERGENCY_NOTES[1]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Standing rules */}
              <div className="grid gap-4 md:grid-cols-2">
                {EMERGENCY_NOTES.map(note => (
                  <div
                    key={note}
                    className="border-glow-card rounded-[24px] border border-[rgba(139,154,110,0.25)] bg-[#FFFFFF] p-6 shadow-card"
                  >
                    <p className="text-[13px] text-text-secondary">{note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Share / QR Modal */}
      <AnimatePresence>
        {showShareModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowShareModal(null)}
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-sm rounded-2xl border border-[rgba(139,154,110,0.3)] bg-[#FFFFFF] p-6 text-center shadow-2xl"
            >
              <h3 className="font-serif text-[22px] italic text-text-primary mb-2">Offline Survival QR</h3>
              <p className="text-xs text-text-secondary mb-6">Scan with any phone camera to save this protocol offline into Apple Wallet or Android Files.</p>
              
              <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-2xl border-2 border-dashed border-palette-sage bg-palette-sand/40 p-4">
                <div className="flex flex-col items-center gap-2">
                  <ShieldCheck className="h-16 w-16 text-palette-sage" />
                  <span className="text-[11px] font-mono text-text-muted">FIRSTHOUR-SYNC-VALID</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <Button onClick={() => setShowShareModal(null)}>Done</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Generate Modal */}
      <AnimatePresence>
        {isGenerateOpen && (
          <GenerateModal 
            isOpen={isGenerateOpen} 
            onClose={() => setIsGenerateOpen(false)} 
            onPlanCreated={(id) => { 
              setIsGenerateOpen(false); 
              setViewingPlanId(id); 
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// One cell of the international emergency directory.
function EmergencyNumberCell({ value, emphasis = false }: { value: string | null; emphasis?: boolean }) {
  if (!value) {
    return (
      <td className="px-6 py-4 text-[13px] text-text-muted/70">
        <span aria-label="No separate number published">—</span>
      </td>
    );
  }
  return (
    <td className="px-6 py-4">
      <span
        className={`whitespace-nowrap tabular-nums ${
          emphasis ? 'text-[14px] font-bold text-palette-sage' : 'text-[13.5px] text-text-primary'
        }`}
      >
        {value}
      </span>
    </td>
  );
}

// PlanView Component
function PlanView({ 
  plan, 
  onBack, 
  toggleStep,
  onShare 
}: { 
  plan: SurvivalPlan; 
  onBack: () => void; 
  toggleStep: (planId: string, phaseId: string, stepId: string) => void;
  onShare: () => void;
}) {
  const completedCount = plan.phases.reduce((acc, p) => acc + p.steps.filter(s => s.completed).length, 0);
  const totalCount = plan.phases.reduce((acc, p) => acc + p.steps.length, 0);
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-8 max-w-4xl mx-auto pb-20">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-sm font-semibold text-palette-sage hover:underline cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Command Center
        </button>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" onClick={() => window.print()}>
            <Printer className="mr-1.5 h-3.5 w-3.5" /> Print Pocket Dossier
          </Button>
          <Button size="sm" onClick={onShare}>
            <Share2 className="mr-1.5 h-3.5 w-3.5" /> Share / QR Card
          </Button>
        </div>
      </div>

      {/* Header Info */}
      <div className="border-glow-card rounded-[28px] border border-[rgba(139,154,110,0.3)] bg-[#FFFFFF] p-8 shadow-card">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-palette-sand px-3 py-1 text-xs font-semibold uppercase tracking-wider text-palette-sage mb-3">
              <ShieldCheck className="h-3.5 w-3.5" /> Timed household cadence
            </div>
            <h1 className="font-serif text-[32px] md:text-[38px] italic text-text-primary leading-tight">
              {plan.title}
            </h1>
            <p className="text-[15px] text-text-secondary mt-1">{plan.subtitle}</p>
          </div>

          <div className="flex flex-col items-start md:items-end shrink-0">
            <span className="text-xs text-text-muted">Protocol Completion</span>
            <span className="font-serif text-[32px] text-palette-sage">{percent}%</span>
            <span className="text-xs text-text-secondary">{completedCount} of {totalCount} verified</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 h-2.5 w-full rounded-full bg-palette-grey overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            className="h-full bg-palette-sage rounded-full"
          />
        </div>
      </div>

      {/* Timed Phases List */}
      <div className="flex flex-col gap-6">
        {plan.phases.map((phase, i) => (
          <div 
            key={phase.id} 
            className="border-glow-card rounded-[28px] border border-[rgba(139,154,110,0.25)] bg-[#FFFFFF] p-6 shadow-card md:p-8"
          >
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[rgba(139,154,110,0.18)] pb-4">
              <div className="flex items-center gap-3">
                <span className={`rounded-xl px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${
                  i === 0 
                    ? 'bg-palette-sage text-[#F7F2EB]' 
                    : i === 1 
                      ? 'bg-palette-sand text-text-primary border border-palette-sage/30' 
                      : 'bg-palette-grey text-text-primary'
                }`}>
                  Phase {i + 1}
                </span>
                <h3 className="font-serif text-[22px] italic text-text-primary">{phase.title}</h3>
              </div>
              <span className="text-xs font-mono font-semibold text-text-muted">
                Cadence Window: {phase.timeRange}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {phase.steps.map((step, stepIdx) => (
                <div 
                  key={step.id} 
                  onClick={() => toggleStep(plan.id, phase.id, step.id)}
                  className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-4 transition-all ${
                    step.completed 
                      ? 'border-palette-sage/30 bg-palette-sand/40 opacity-75' 
                      : 'border-[rgba(139,154,110,0.2)] bg-palette-cream/40 hover:border-palette-sage hover:bg-palette-sand/30'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {step.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-palette-sage" />
                    ) : (
                      <Circle className="h-5 w-5 text-[rgba(139,154,110,0.4)]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className={`text-[15px] font-semibold text-text-primary ${step.completed ? 'line-through text-text-muted' : ''}`}>
                        {stepIdx + 1}. {step.title}
                      </h4>
                      {step.priority === 'critical' && (
                        <span className="rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-bold text-red-700 uppercase tracking-wider">
                          Critical
                        </span>
                      )}
                    </div>
                    <p className={`text-[13px] text-text-secondary mt-1 ${step.completed ? 'line-through text-text-muted' : ''}`}>
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

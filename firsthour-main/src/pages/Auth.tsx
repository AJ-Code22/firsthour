import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import ToggleSwitch from '../components/ui/ToggleSwitch';
import CompassRing from '../components/reactbits/CompassRing';
import { BorderGlow } from '../components/reactbits/BorderGlow';
import { Eye, EyeOff, ShieldCheck, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { user, loading, loginUser } = useAuthStore();

  // Redirect as an effect rather than during render.
  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true });
  }, [user, navigate]);

  const handleAuthError = (err: any) => {
    const code = err?.code || '';
    if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') return 'Incorrect credentials. Try again.';
    if (code === 'auth/user-not-found') return 'No account with this email.';
    if (code === 'auth/email-already-in-use') return 'That email is already registered.';
    if (code === 'auth/weak-password') return 'Use at least 8 characters with a number.';
    if (code === 'auth/invalid-email') return 'That email address looks incomplete.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setStatusMessage('');

    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (isSignUp && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (isSignUp && password.length < 8) {
      setError('Use at least 8 characters with a number.');
      return;
    }

    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
      const isRealFirebase = apiKey && !apiKey.includes('mock');

      if (isRealFirebase) {
        if (isSignUp) {
          await createUserWithEmailAndPassword(auth, email, password);
        } else {
          await signInWithEmailAndPassword(auth, email, password);
        }
        navigate('/dashboard');
        return;
      }

      // Local session when Firebase credentials are not configured.
      setStatusMessage('Firebase is not configured, so this session is stored locally on this device.');
      window.setTimeout(() => {
        loginUser(email, name || email.split('@')[0]);
        navigate('/dashboard');
      }, 400);
    } catch (err: any) {
      const specificError = handleAuthError(err);
      setError(specificError || 'Could not reach the authentication service. Check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (loading || user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-palette-cream">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-palette-sage border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-palette-cream text-text-primary selection:bg-palette-sage selection:text-white">
      {/* Left panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-[var(--dusk-900)] p-12 lg:flex">
        <div className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-palette-sage/10 blur-3xl" />

        <div className="relative z-10 grid flex-1 place-items-center">
          <CompassRing
            size={430}
            tilt={57}
            accent="#B7C894"
            value={null}
            label="60"
            sublabel="minutes covered"
            pulse
          />
        </div>

        <div className="relative z-10">
          <button
            onClick={() => navigate('/')}
            className="mb-8 flex items-center gap-2.5 transition-opacity hover:opacity-80"
          >
            <img src="/logo-mark-light.png" alt="" className="h-7 w-auto" />
            <span className="text-[19px] font-extrabold tracking-tight text-[#F3EFE6]">FirstHour</span>
          </button>

          <div className="eyebrow mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(183,200,148,0.35)] bg-[rgba(183,200,148,0.1)] px-3 py-1 text-[10px] text-[#DDE6C9]">
            <ShieldCheck className="h-4 w-4" /> Operational readiness
          </div>

          <h2 className="mb-6 max-w-md text-[30px] leading-[1.18] text-[#F3EFE6]">
            When seconds count, confusion is the real hazard.
          </h2>
          <p className="max-w-md text-[15px] text-[#B9C1AE]">
            Untimed emergency plans fail under stress. FirstHour structures your first sixty minutes
            into three prioritised windows with one clear owner for every action.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            {[
              'Tailored to your building, location and household',
              'Cached locally with a printable wallet card and QR export',
              'Shared household checklist with per-step completion'
            ].map((text, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3 rounded-xl border border-[rgba(183,200,148,0.2)] bg-[rgba(183,200,148,0.07)] px-4 py-2.5 text-[14px] text-[#E4E9DB] backdrop-blur-sm"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#B7C894]" />
                <span>{text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-8 flex items-center justify-between border-t border-[rgba(183,200,148,0.18)] pt-6 text-[11px] uppercase tracking-[0.18em] text-[#7E8A70]">
          <span>Three timed phases</span>
          <span>Readable offline</span>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex w-full flex-col items-center justify-center p-6 md:p-12 lg:w-1/2">
        <div className="w-full max-w-[420px]">
          <div className="mb-8 text-center">
            <div className="mb-4 flex items-center justify-center gap-2.5 lg:hidden">
              <img src="/logo-mark.png" alt="" className="h-7 w-auto" />
              <span className="text-[19px] font-extrabold tracking-tight text-text-primary">FirstHour</span>
            </div>
            <h1 className="mb-2 text-[30px] leading-tight text-text-primary">
              {isSignUp ? 'Create your household account' : 'Welcome back'}
            </h1>
            <p className="text-[14px] text-text-secondary">
              {isSignUp
                ? 'Set up the portal that holds your household emergency plans.'
                : 'Sign in to open your saved protocols and checklist.'}
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex rounded-xl border border-[rgba(139,154,110,0.2)] bg-palette-grey p-1">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(false);
                setError('');
              }}
              className="relative flex-1 rounded-lg py-2.5 text-[14px] font-medium transition-colors"
            >
              {!isSignUp && <motion.div layoutId="authTab" className="absolute inset-0 rounded-lg bg-[#FFFFFF] shadow-sm" />}
              <span className={`relative z-10 ${!isSignUp ? 'font-semibold text-text-primary' : 'text-text-muted'}`}>
                Sign in
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(true);
                setError('');
              }}
              className="relative flex-1 rounded-lg py-2.5 text-[14px] font-medium transition-colors"
            >
              {isSignUp && <motion.div layoutId="authTab" className="absolute inset-0 rounded-lg bg-[#FFFFFF] shadow-sm" />}
              <span className={`relative z-10 ${isSignUp ? 'font-semibold text-text-primary' : 'text-text-muted'}`}>
                Sign up
              </span>
            </button>
          </div>

          <BorderGlow
            borderRadius={20}
            backgroundColor="#FFFFFF"
            glowRadius={34}
            edgeSensitivity={26}
            className="p-6 shadow-card"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <AnimatePresence>
                {isSignUp && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Input
                      label="Full name"
                      placeholder="Alex Hayes"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <Input
                label="Email address"
                type="email"
                placeholder="alex@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-9 cursor-pointer p-1 text-text-muted hover:text-text-primary"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              <AnimatePresence>
                {isSignUp && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Input
                      label="Confirm password"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      required={isSignUp}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {!isSignUp && (
                <div className="toggle-row !border-b-0 !py-1">
                  <label className="toggle-label" htmlFor="toggle-remember">
                    <span className="toggle-text">Remember this device</span>
                    <span className="toggle-hint">Skips the login step on your next visit</span>
                  </label>
                  <ToggleSwitch id="toggle-remember" checked={remember} onChange={setRemember} />
                </div>
              )}

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-[13px] text-red-700"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}
                {statusMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-lg border border-palette-sage/30 bg-palette-sage/15 p-3 text-[13px] text-text-primary"
                  >
                    {statusMessage}
                  </motion.div>
                )}
              </AnimatePresence>

              <Button type="submit" className="mt-1 w-full" isLoading={isLoading}>
                {isSignUp ? (
                  <>
                    Create account <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Sign in <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </BorderGlow>

          <p className="mt-6 text-center text-[12px] text-text-muted">
            By continuing you agree to FirstHour&apos;s{' '}
            <a href="#" className="text-text-secondary hover:underline">
              terms of use
            </a>{' '}
            and{' '}
            <a href="#" className="text-text-secondary hover:underline">
              privacy notice
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

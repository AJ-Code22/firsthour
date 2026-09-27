import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

type GlowStyle = CSSProperties & Record<string, string | number>;

export interface BorderGlowProps {
  children: ReactNode;
  /** Corner radius in px — mirrored on the glow pseudo element. */
  borderRadius?: number;
  /** Surface colour of the card. */
  backgroundColor?: string;
  /** Purple / pink / blue triple used by the radial cursor glow. */
  colors?: [string, string, string];
  /** Base radius of the glow in px. */
  glowRadius?: number;
  /** Multiplier applied to the computed opacity. */
  glowIntensity?: number;
  /** How many px from an edge the glow starts responding. */
  edgeSensitivity?: number;
  /** Extra px added to the glow radius as the cursor nears the edge. */
  coneSpread?: number;
  /** Adds the slow hue-rotation cycle. */
  animated?: boolean;
  className?: string;
  style?: CSSProperties;
}

const toRgb = (hex: string) => {
  const value = hex.replace('#', '');
  const full = value.length === 3 ? value.split('').map(c => c + c).join('') : value;
  const int = parseInt(full, 16);
  return `${(int >> 16) & 255}, ${(int >> 8) & 255}, ${int & 255}`;
};

/**
 * Cursor-tracked edge glow. Pointer maths runs outside React state: the handler
 * only writes CSS custom properties, so no re-render and no layout is triggered.
 */
export function BorderGlow({
  children,
  borderRadius = 28,
  backgroundColor = '#120F17',
  colors = ['#c084fc', '#f472b6', '#38bdf8'],
  glowRadius = 40,
  glowIntensity = 1,
  edgeSensitivity = 30,
  coneSpread = 25,
  animated = false,
  className = '',
  style
}: BorderGlowProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = ref.current;
    if (!card) return;

    const [c1, c2, c3] = colors.map(toRgb);
    card.style.setProperty('--glow-c1', c1);
    card.style.setProperty('--glow-c2', c2);
    card.style.setProperty('--glow-c3', c3);
  }, [colors]);

  useEffect(() => {
    const card = ref.current;
    if (!card) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;

    const onMove = (clientX: number, clientY: number, strength: number) => {
      const rect = card.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const minDist = Math.min(x, rect.width - x, y, rect.height - y);
      const nearEdge = minDist <= edgeSensitivity;
      const raw = nearEdge ? Math.pow(1 - Math.max(minDist, 0) / edgeSensitivity, 1.5) : 0;
      const opacity = Math.min(1, Math.max(0, raw));

      card.style.setProperty('--glow-x', `${((x / rect.width) * 100).toFixed(2)}%`);
      card.style.setProperty('--glow-y', `${((y / rect.height) * 100).toFixed(2)}%`);
      card.style.setProperty('--glow-opacity', (opacity * strength).toFixed(3));
      card.style.setProperty('--glow-size', `${glowRadius + coneSpread * opacity}px`);
    };

    const handleMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY, 1);
    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) onMove(t.clientX, t.clientY, 0.6);
    };

    const fadeOut = () => {
      const current = parseFloat(card.style.getPropertyValue('--glow-opacity') || '0');
      if (current <= 0.01) {
        card.style.setProperty('--glow-opacity', '0');
        return;
      }
      card.style.setProperty('--glow-opacity', (current - 0.06).toFixed(3));
      raf = requestAnimationFrame(fadeOut);
    };

    const handleLeave = () => {
      cancelAnimationFrame(raf);
      if (reduceMotion) {
        card.style.setProperty('--glow-opacity', '0');
        return;
      }
      raf = requestAnimationFrame(fadeOut);
    };

    card.addEventListener('mousemove', handleMouseMove, { passive: true });
    card.addEventListener('mouseleave', handleLeave, { passive: true });
    card.addEventListener('touchmove', handleTouchMove, { passive: true });
    card.addEventListener('touchend', handleLeave, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleLeave);
      card.removeEventListener('touchmove', handleTouchMove);
      card.removeEventListener('touchend', handleLeave);
    };
  }, [edgeSensitivity, coneSpread, glowRadius, glowIntensity]);

  const glowStyle: GlowStyle = {
    borderRadius,
    background: backgroundColor,
    '--glow-intensity': glowIntensity,
    ...style
  };

  return (
    <div
      ref={ref}
      className={`border-glow-card${animated ? ' border-glow-card--animated' : ''}${
        className ? ` ${className}` : ''
      }`}
      style={glowStyle}
    >
      {children}
    </div>
  );
}

export default BorderGlow;

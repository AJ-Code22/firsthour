import { useEffect, useRef } from 'react';

export interface BorderGlowGroupOptions {
  /** How many px from an edge the glow starts responding. */
  edgeSensitivity?: number;
  /** Extra px added to the glow radius as the cursor nears the edge. */
  coneSpread?: number;
  /** Base glow radius in px. */
  glowRadius?: number;
}

/**
 * Group variant — attaches one delegated pointer handler to a container and lets
 * every `.border-glow-card` descendant light up. Cheaper than one listener per
 * card when a page renders dozens of them, and it survives React re-renders
 * because nothing is bound per card.
 */
export function useBorderGlowGroup<T extends HTMLElement = HTMLDivElement>(
  options: BorderGlowGroupOptions = {}
) {
  const { edgeSensitivity = 30, coneSpread = 25, glowRadius = 40 } = options;
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    let activeCard: HTMLElement | null = null;
    let raf = 0;

    const paint = (card: HTMLElement, clientX: number, clientY: number) => {
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
      card.style.setProperty('--glow-opacity', opacity.toFixed(3));
      card.style.setProperty('--glow-size', `${glowRadius + coneSpread * opacity}px`);
    };

    const clear = (card: HTMLElement) => {
      const current = parseFloat(card.style.getPropertyValue('--glow-opacity') || '0');
      if (current <= 0.01) {
        card.style.setProperty('--glow-opacity', '0');
        return;
      }
      card.style.setProperty('--glow-opacity', (current - 0.08).toFixed(3));
      raf = requestAnimationFrame(() => clear(card));
    };

    const onMove = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const card = target?.closest?.('.border-glow-card') as HTMLElement | null;
      if (!card || !root.contains(card)) {
        if (activeCard) {
          const stale = activeCard;
          activeCard = null;
          cancelAnimationFrame(raf);
          clear(stale);
        }
        return;
      }
      if (card !== activeCard) {
        if (activeCard) clear(activeCard);
        activeCard = card;
      }
      paint(card, e.clientX, e.clientY);
    };

    const onLeave = () => {
      if (activeCard) {
        const stale = activeCard;
        activeCard = null;
        clear(stale);
      }
    };

    root.addEventListener('pointermove', onMove, { passive: true });
    root.addEventListener('pointerleave', onLeave, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
    };
  }, [edgeSensitivity, coneSpread, glowRadius]);

  return ref;
}

export default useBorderGlowGroup;

import type { CSSProperties } from 'react';
import './CompassRing.css';

export interface CompassRingProps {
  /** Diameter of the ring in px. */
  size?: number;
  /** 3D pitch of the disc — 0 is flat and face-on, 90 is edge-on. */
  tilt?: number;
  /** Accent used by the ticks, needle and progress arc. */
  accent?: string;
  /** 0–100 progress ring. Pass null for a free-spinning dial. */
  value?: number | null;
  /** Large figure shown flat in the middle of the dial. */
  label?: string;
  /** Caption under the figure. */
  sublabel?: string;
  /** Adds the evenly spaced cardinal letters. */
  cardinals?: boolean;
  /** Enables the topographic pulse ripples. */
  pulse?: boolean;
  className?: string;
}

const CARDINALS: Array<{ key: string; deg: number }> = [
  { key: 'N', deg: 0 },
  { key: 'E', deg: 90 },
  { key: 'S', deg: 180 },
  { key: 'W', deg: 270 }
];

/**
 * A minimalist glassmorphic compass ring: a tilted instrument disc with
 * counter-rotating tick bands, a cardinal bezel and a topographic pulse
 * radiating from the centre. Pure CSS transforms — the rings run on the
 * compositor, so it stays cheap even when several are mounted.
 */
export default function CompassRing({
  size = 320,
  tilt = 58,
  accent = '#8B9A6E',
  value = null,
  label,
  sublabel,
  cardinals = true,
  pulse = true,
  className = ''
}: CompassRingProps) {
  const pct = value === null || value === undefined ? null : Math.min(100, Math.max(0, value));

  const style = {
    '--cr-size': `${size}px`,
    '--cr-tilt': `${tilt}deg`,
    '--cr-accent': accent,
    '--cr-pct': pct === null ? 0 : pct
  } as CSSProperties;

  return (
    <div className={`compass-ring${className ? ` ${className}` : ''}`} style={style} aria-hidden="true">
      <div className="compass-ring__scene">
        <div className="compass-ring__halo" />

        <div className="compass-ring__disc">
          {/* slow outer tick band */}
          <div className="compass-ring__ticks compass-ring__ticks--outer" />

          {/* counter-rotating fine tick band */}
          <div className="compass-ring__ticks compass-ring__ticks--fine" />

          {/* cardinal bezel */}
          {cardinals && (
            <div className="compass-ring__cardinals">
              {CARDINALS.map(c => (
                <span
                  key={c.key}
                  className={`compass-ring__cardinal${c.key === 'N' ? ' is-north' : ''}`}
                  style={{ transform: `rotate(${c.deg}deg) translateY(calc(var(--cr-size) * -0.345)) rotate(${-c.deg}deg)` }}
                >
                  {c.key}
                </span>
              ))}
            </div>
          )}

          {/* progress arc */}
          <div className="compass-ring__track" />
          <div className={`compass-ring__arc${pct === null ? ' compass-ring__arc--free' : ''}`} />

          {/* needle */}
          <div className="compass-ring__needle">
            <span className="compass-ring__needle-body" />
            <span className="compass-ring__needle-tail" />
          </div>

          {/* topographic pulse */}
          {pulse && (
            <div className="compass-ring__topo">
              <span className="compass-ring__ripple" style={{ animationDelay: '0s' }} />
              <span className="compass-ring__ripple" style={{ animationDelay: '1.2s' }} />
              <span className="compass-ring__ripple" style={{ animationDelay: '2.4s' }} />
            </div>
          )}

          {/* glass sheen — stays in the disc plane */}
          <div className="compass-ring__glass" />
        </div>

        {/* flat readout, counter-rotated so it always faces the viewer */}
        {(label || sublabel) && (
          <div className="compass-ring__readout">
            {label && <span className="compass-ring__figure">{label}</span>}
            {sublabel && <span className="compass-ring__caption eyebrow">{sublabel}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

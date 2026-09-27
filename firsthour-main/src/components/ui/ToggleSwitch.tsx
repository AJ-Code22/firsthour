import type { CSSProperties } from 'react';

export interface ToggleSwitchProps {
  /** Unique id — shared by the input and the label it maps to. */
  id: string;
  name?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** Track hue when checked. 25 = warm amber, 12 = coral red, 120 = green. */
  hue?: number;
  saturation?: string;
  lightness?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * UIverse-style switch / slider (pattern by _2944). Styles live in
 * globals.css so the single `.switch` implementation is shared by the landing
 * page and the plan generator modal.
 */
export default function ToggleSwitch({
  id,
  name,
  checked,
  onChange,
  hue = 25,
  saturation = '85%',
  lightness = '52%',
  disabled = false,
  className = ''
}: ToggleSwitchProps) {
  const style = {
    '--button-hue': hue,
    '--button-saturation': saturation,
    '--button-lightness': lightness
  } as CSSProperties;

  return (
    <label className={`switch${className ? ` ${className}` : ''}`} style={style}>
      <input
        type="checkbox"
        id={id}
        name={name ?? id}
        checked={checked}
        disabled={disabled}
        onChange={e => onChange(e.target.checked)}
      />
      <div className="slider">
        <div className="glow" />
        <span className="icon-on" aria-hidden="true">
          ✓
        </span>
        <span className="icon-off" aria-hidden="true">
          ○
        </span>
      </div>
    </label>
  );
}

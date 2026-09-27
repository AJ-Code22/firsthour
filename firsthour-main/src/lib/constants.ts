import type { LucideIcon } from 'lucide-react';
import {
  MountainSnow,
  CloudRain,
  Flame,
  Wind,
  Tornado,
  Waves,
  FlaskConical,
  Zap
} from 'lucide-react';

export const DISASTER_TYPES = [
  { id: 'earthquake', name: 'Earthquake', icon: MountainSnow, color: 'amber' },
  { id: 'flood', name: 'Flood', icon: CloudRain, color: 'blue' },
  { id: 'wildfire', name: 'Wildfire', icon: Flame, color: 'coral' },
  { id: 'hurricane', name: 'Hurricane', icon: Wind, color: 'purple' },
  { id: 'tornado', name: 'Tornado', icon: Tornado, color: 'gray' },
  { id: 'tsunami', name: 'Tsunami', icon: Waves, color: 'blue' },
  { id: 'chemical_spill', name: 'Chemical Spill', icon: FlaskConical, color: 'green' },
  { id: 'power_outage', name: 'Power Outage', icon: Zap, color: 'yellow' }
] as const satisfies readonly { id: string; name: string; icon: LucideIcon; color: string }[];

export type DisasterId = typeof DISASTER_TYPES[number]['id'];

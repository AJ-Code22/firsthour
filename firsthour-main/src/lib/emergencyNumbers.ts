/**
 * International emergency numbers.
 *
 * Columns mirror how the numbers are usually published: an all-in-one dispatch
 * number where one exists, then the individual police / ambulance / fire lines.
 * A null cell means the country publishes no separate line for that service.
 */

export interface EmergencyRow {
  country: string;
  /** Single number that reaches police, ambulance and fire. */
  allInOne: string | null;
  police: string | null;
  ambulance: string | null;
  fire: string | null;
}

export interface EmergencyRegion {
  id: string;
  name: string;
  /** Short summary shown above the table. */
  note?: string;
  rows: EmergencyRow[];
}

export const EMERGENCY_REGIONS: EmergencyRegion[] = [
  {
    id: 'americas',
    name: 'Americas',
    rows: [
      { country: 'United States', allInOne: '911', police: '911', ambulance: '911', fire: '911' },
      { country: 'Canada', allInOne: '911', police: '911', ambulance: '911', fire: '911' },
      { country: 'Mexico', allInOne: '911', police: '911', ambulance: '911', fire: '911' },
      { country: 'Argentina', allInOne: '911', police: '101', ambulance: '107', fire: '100' },
      { country: 'Brazil', allInOne: null, police: '190', ambulance: '192', fire: '193' },
      { country: 'Chile', allInOne: null, police: '133', ambulance: '131', fire: '132' },
      { country: 'Colombia', allInOne: '123', police: '123', ambulance: '123', fire: '119' },
      { country: 'Peru', allInOne: null, police: '105', ambulance: '106', fire: '116' }
    ]
  },
  {
    id: 'europe',
    name: 'Europe',
    note: '112 works as a universal emergency number across all EU member states, the UK, Switzerland, and most non-EU European countries.',
    rows: [
      { country: 'United Kingdom', allInOne: '999 / 112', police: '999', ambulance: '999', fire: '999' },
      { country: 'France', allInOne: '112', police: '17', ambulance: '15', fire: '18' },
      { country: 'Germany', allInOne: '112', police: '110', ambulance: '112', fire: '112' },
      { country: 'Italy', allInOne: '112', police: '112', ambulance: '112', fire: '112' },
      { country: 'Spain', allInOne: '112', police: '091', ambulance: '061', fire: '080' },
      { country: 'Netherlands', allInOne: '112', police: '112', ambulance: '112', fire: '112' },
      { country: 'Switzerland', allInOne: '112', police: '117', ambulance: '144', fire: '118' },
      { country: 'Turkey', allInOne: '112', police: '112', ambulance: '112', fire: '112' },
      { country: 'Russia', allInOne: '112', police: '102', ambulance: '103', fire: '101' }
    ]
  },
  {
    id: 'asia-pacific',
    name: 'Asia-Pacific',
    rows: [
      { country: 'Australia', allInOne: '000', police: '000', ambulance: '000', fire: '000' },
      { country: 'China', allInOne: null, police: '110', ambulance: '120', fire: '119' },
      { country: 'India', allInOne: '112', police: '100 / 112', ambulance: '102 / 112', fire: '101 / 112' },
      { country: 'Indonesia', allInOne: '112', police: '110', ambulance: '118', fire: '113' },
      { country: 'Japan', allInOne: null, police: '110', ambulance: '119', fire: '119' },
      { country: 'New Zealand', allInOne: '111', police: '111', ambulance: '111', fire: '111' },
      { country: 'Philippines', allInOne: '911', police: '911', ambulance: '911', fire: '911' },
      { country: 'Singapore', allInOne: null, police: '999', ambulance: '995', fire: '995' },
      { country: 'South Korea', allInOne: null, police: '112', ambulance: '119', fire: '119' },
      { country: 'Thailand', allInOne: null, police: '191', ambulance: '1669', fire: '199' },
      { country: 'Vietnam', allInOne: null, police: '113', ambulance: '115', fire: '114' }
    ]
  },
  {
    id: 'middle-east-africa',
    name: 'Middle East & Africa',
    rows: [
      { country: 'United Arab Emirates', allInOne: null, police: '999', ambulance: '998', fire: '997' },
      { country: 'Saudi Arabia', allInOne: '911 (most regions)', police: '999', ambulance: '997', fire: '998' },
      { country: 'Egypt', allInOne: '112', police: '122', ambulance: '123', fire: '180' },
      { country: 'Israel', allInOne: null, police: '100', ambulance: '101', fire: '102' },
      { country: 'Kenya', allInOne: '112 / 999', police: '999', ambulance: '999', fire: '999' },
      { country: 'Morocco', allInOne: null, police: '191', ambulance: '515', fire: '15' },
      { country: 'South Africa', allInOne: '112 (mobile)', police: '10111', ambulance: '10177', fire: '10177' }
    ]
  }
];

export const EMERGENCY_NOTES: string[] = [
  '112 works as a universal emergency number across all EU member states, the UK, Switzerland, and most non-EU European countries.',
  'On almost any GSM mobile phone worldwide, dialling 112 or 911 routes to the nearest local emergency dispatch centre — even without a local SIM card or roaming plan.'
];

/** Numbers that are useful regardless of where you live. */
export const UNIVERSAL_SERVICES: Array<{ title: string; number: string; desc: string }> = [
  { title: 'United States — national dispatch', number: '911', desc: 'Police, fire and ambulance on one line' },
  { title: 'European Union — universal', number: '112', desc: 'Works across EU member states and the UK' },
  { title: 'US poison control', number: '1-800-222-1222', desc: '24-hour toxic exposure guidance' },
  { title: 'FEMA disaster helpline', number: '1-800-621-3362', desc: 'US federal relief and registration' }
];

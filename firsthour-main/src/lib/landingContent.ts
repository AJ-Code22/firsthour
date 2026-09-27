/**
 * Landing-page content. Copy is intentionally descriptive of what the product
 * does — no user counts, ratings, testimonials or authority claims.
 */

export interface GalleryEntry {
  /** Number marker, e.g. "01". */
  index: string;
  title: string;
  /** Short line shown under the title in the detail panel. */
  subCaption: string;
  /** What the panel represents, in a single phrase. */
  represents: string;
  /** Descriptive body copy. */
  body: string;
  image: string;
  alt: string;
}

const img = (name: string) => `/Images%20Ui%20Main/${name}`;

export const GALLERY_ENTRIES: GalleryEntry[] = [
  {
    index: '01',
    title: 'Imminence',
    subCaption: 'When chaos strikes, seconds count.',
    represents: 'The sudden crisis',
    body:
      "Nature moves without warning. When disaster arrives, the scale feels overwhelming, and panic sets in immediately if you don't have a plan ready.",
    image: img('Mountain.jpg'),
    alt: 'Snow-covered mountain ridge above cloud'
  },
  {
    index: '02',
    title: 'Navigation',
    subCaption: 'Clear paths through the initial fog.',
    represents: 'Navigating the chaos',
    body:
      'Disaster zones are filled with confusion, low visibility, and conflicting advice. FirstHour cuts through the fog with a clear, step-by-step route for your family.',
    image: img('Forest.jpg'),
    alt: 'Misty forest path winding between tall trees'
  },
  {
    index: '03',
    title: 'Resilience',
    subCaption: 'Unshakable structure under pressure.',
    represents: 'Unshakable groundwork',
    body:
      'A plan tailored to your exact home layout and location stands firm under extreme pressure, keeping your loved ones anchored when everything else shifts.',
    image: img('Sea.jpg'),
    alt: 'Open sea breaking against a shoreline'
  },
  {
    index: '04',
    title: 'Clarity',
    subCaption: 'Replaces panic with exact, minute-by-minute execution.',
    represents: 'The first 60 minutes',
    body:
      'Replacing chaos with calm precision. Minute-by-minute cadences give every family member a clear role and complete focus in the critical first hour.',
    image: img('Lake.jpg'),
    alt: 'Still lake reflecting an empty sky'
  },
  {
    index: '05',
    title: 'Sanctuary',
    subCaption: 'Reaching safety with those who matter most.',
    represents: 'Safe haven & reunion',
    body:
      'The ultimate goal: emerging on the other side safely. Reconnect at your designated rendezvous point with total peace of mind.',
    image: img('Valley.jpg'),
    alt: 'Green valley opening toward distant peaks'
  }
];

export const GALLERY_ACCORDION_ITEMS = GALLERY_ENTRIES.map(entry => ({
  image: entry.image,
  label: `${entry.index} / ${entry.title}`,
  alt: entry.alt
}));

export const DRIFT_TILES = Array.from({ length: 10 }, (_, i) => ({
  image: `/Top%20images/${i + 1}.jpg`,
  title: `Preparedness reference ${i + 1}`
}));

export const CURVED_LOOP_TEXT =
  'The first 60 minutes determine survival ✦ Minute by minute ✦ Tailored to your home ✦ Offline ready ✦';

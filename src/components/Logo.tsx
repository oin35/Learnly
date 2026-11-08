/**
 * App logo: a blonde, clean-shaven man in a tuxedo (like the 🤵🏼‍♂️ emoji), drawn here so it looks the same on
 * every device.
 *
 * Designed small first (it is shown at about 34 px): flat colors, few shapes, bold silhouette, no fine detail.
 * The curly hair is a cap of overlapping circles; the smile is a single short curve.
 */
type Curl = [x: number, y: number, r: number];

const HAIR = "#c4953f"; // dark golden blonde
const HAIR_LINE = "#94702a";

/** `count` circles of radius `r` along an elliptical arc (angles in degrees, 270 = straight up). */
function arc(count: number, cx: number, cy: number, rx: number, ry: number, from: number, to: number, r: number): Curl[] {
  return Array.from({ length: count }, (_, i) => {
    const a = ((from + ((to - from) * i) / (count - 1)) * Math.PI) / 180;
    return [+(cx + rx * Math.cos(a)).toFixed(2), +(cy + ry * Math.sin(a)).toFixed(2), r] as Curl;
  });
}

// Two layers: a short curly back layer with a small lift at the front, and a smaller layer of curls over the forehead
const BACK: Curl[] = [...arc(9, 32, 27, 13.6, 14.6, 198, 342, 4.2), [26.8, 11.6, 4.1], [32, 10.6, 4.2], [37.2, 11.6, 4.1]];
const FRONT: Curl[] = [[27.4, 17, 2.3], [32.2, 15.8, 2.3], [37, 16.6, 2.3], [40.4, 19, 1.9], [24, 19.4, 1.9]];
// A single short, thin curve with a slight smirk: no teeth, no mustache
const SMILE = "M29 36.8 Q32.6 38.8 35.8 36";

function Curls({ curls }: { curls: Curl[] }) {
  return (
    <g>
      {/* outline pass, then fill pass: one clean silhouette with no lines inside the hair */}
      {curls.map(([x, y, r], i) => (
        <circle key={`o${i}`} cx={x} cy={y} r={r} fill={HAIR_LINE} stroke={HAIR_LINE} strokeWidth="1.6" />
      ))}
      {curls.map(([x, y, r], i) => (
        <circle key={`f${i}`} cx={x} cy={y} r={r} fill={HAIR} />
      ))}
    </g>
  );
}

export function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg className="logo" viewBox="0 0 64 64" width={size} height={size} role="img" aria-label="Don Pablo’s Dutch Class logo">
      <defs>
        <clipPath id="logo-clip">
          <circle cx="32" cy="32" r="32" />
        </clipPath>
      </defs>
      <circle cx="32" cy="32" r="32" fill="#fde8da" />
      <g clipPath="url(#logo-clip)">
        {/* jacket and lapels */}
        <path d="M4 66 C4 52 14 47 24 45 L40 45 C50 47 60 52 60 66 Z" fill="#1d1f27" />
        <path d="M24 45 L32 62 L21 66 L16 52 Z" fill="#2c2f3a" />
        <path d="M40 45 L32 62 L43 66 L48 52 Z" fill="#2c2f3a" />
        {/* shirt */}
        <path d="M24 45 L32 62 L40 45 Z" fill="#ffffff" />
        {/* neck */}
        <path d="M27 38 L37 38 L37 46 C35 48 29 48 27 46 Z" fill="#e3ae83" />
        {/* bow tie */}
        <path d="M32 50 L24 46.5 L24 55 Z" fill="#1d1f27" />
        <path d="M32 50 L40 46.5 L40 55 Z" fill="#1d1f27" />
        <rect x="29.6" y="48" width="4.8" height="5.2" rx="1.4" fill="#2c2f3a" />
        {/* hair behind the face */}
        <Curls curls={BACK} />
        {/* ears */}
        <ellipse cx="19.2" cy="28.4" rx="2.4" ry="3.3" fill="#eebd94" />
        <ellipse cx="44.8" cy="28.4" rx="2.4" ry="3.3" fill="#eebd94" />
        {/* face */}
        <ellipse cx="32" cy="27" rx="12.8" ry="14.6" fill="#f2c9a1" />
        {/* curls over the forehead */}
        <Curls curls={FRONT} />
        {/* eyebrows, eyes */}
        <path d="M23.8 24.4 Q26.4 23 29 24.4" fill="none" stroke="#9a7430" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M35 24.4 Q37.6 23 40.2 24.4" fill="none" stroke="#9a7430" strokeWidth="1.5" strokeLinecap="round" />
        <ellipse cx="26.4" cy="28.2" rx="1.5" ry="1.9" fill="#2a1d18" />
        <ellipse cx="37.6" cy="28.2" rx="1.5" ry="1.9" fill="#2a1d18" />
        {/* smile: one short, thin curve. No mustache. */}
        <path d={SMILE} fill="none" stroke="#b0664f" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

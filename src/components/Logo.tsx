/**
 * App logo: a blonde, clean-shaven man in a tuxedo (like the 🤵🏼‍♂️ emoji), drawn here so it looks the same on
 * every device. The hair is built from curls (circles): `hair` picks the length and volume.
 */
export type HairStyle = "curly" | "curly-long" | "curly-big";

type Curl = [x: number, y: number, r: number];

const HAIR = "#c4953f"; // dark golden blonde
const HAIR_LINE = "#8c6724";
const HAIR_HI = "#dcb55f";

const STYLES: Record<HairStyle, { back: Curl[]; front: Curl[] }> = {
  // Curls to ear level, a fringe of curls over the forehead
  curly: {
    back: [[22, 13, 6], [28.5, 9, 6.5], [35.5, 8.5, 6.5], [42, 12, 6], [46.5, 18, 5.6], [17.5, 18, 5.6], [17, 25, 5], [47, 25, 5], [17.8, 31, 4.6], [46.2, 31, 4.6]],
    front: [[24, 17, 4.6], [29.8, 15, 4.6], [35.4, 14.6, 4.6], [40.8, 16.6, 4.6], [20.4, 20.6, 3.4], [43.6, 20.6, 3.4]],
  },
  // Longer: ringlets fall past the jaw onto the shoulders
  "curly-long": {
    back: [[22, 12.5, 6.2], [28.5, 8.4, 6.8], [35.5, 8, 6.8], [42, 11.6, 6.2], [47, 18, 5.8], [17, 18, 5.8], [15.8, 25, 5.4], [48.2, 25, 5.4], [15.6, 31.5, 5.2], [48.4, 31.5, 5.2], [16.6, 38, 5], [47.4, 38, 5], [18.6, 44, 4.8], [45.4, 44, 4.8]],
    front: [[25, 16.8, 4.9], [31, 14.6, 4.9], [37, 15.6, 4.9], [42, 18.6, 4], [21.4, 20.4, 3.8], [43.4, 21.4, 3.2]],
  },
  // Big, tight curls: lots of volume on top and at the sides
  "curly-big": {
    back: [[20, 14, 7.4], [27, 8.4, 8], [36, 7.6, 8], [44.2, 13.4, 7.4], [14.6, 22, 6.4], [49.4, 22, 6.4], [15, 29.6, 5.6], [49, 29.6, 5.6], [17.4, 35, 4.6], [46.6, 35, 4.6]],
    front: [[23, 17.4, 4.2], [28.6, 15.4, 4.2], [34.4, 15.2, 4.2], [40, 17.2, 4.2], [20.6, 21.2, 3.2], [43.4, 21.2, 3.2]],
  },
};

/** Outline pass first, fill pass second: one clean silhouette, with a ringlet swirl and a highlight on each curl. */
function Curls({ curls }: { curls: Curl[] }) {
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      {curls.map(([x, y, r], i) => (
        <circle key={`o${i}`} cx={x} cy={y} r={r} fill={HAIR_LINE} stroke={HAIR_LINE} strokeWidth="1.6" />
      ))}
      {curls.map(([x, y, r], i) => (
        <circle key={`f${i}`} cx={x} cy={y} r={r} fill={HAIR} />
      ))}
      {curls.map(([x, y, r], i) => (
        <g key={`d${i}`} fill="none">
          <path d={`M${x - r * 0.45} ${y + r * 0.35} Q${x - r * 0.05} ${y - r * 0.55} ${x + r * 0.5} ${y + r * 0.1}`} stroke={HAIR_LINE} strokeWidth="0.8" opacity="0.65" />
          <path d={`M${x - r * 0.55} ${y - r * 0.2} Q${x - r * 0.3} ${y - r * 0.6} ${x + r * 0.05} ${y - r * 0.62}`} stroke={HAIR_HI} strokeWidth="0.9" />
        </g>
      ))}
    </g>
  );
}

export function Logo({ size = 36, hair = "curly" }: { size?: number; hair?: HairStyle }) {
  const { back, front } = STYLES[hair];
  return (
    <svg className="logo" viewBox="0 0 64 64" width={size} height={size} role="img" aria-label="Don Pablo’s Dutch Class logo">
      <defs>
        <clipPath id="logo-clip">
          <circle cx="32" cy="32" r="32" />
        </clipPath>
      </defs>
      <circle cx="32" cy="32" r="32" fill="#fde8da" />
      <g clipPath="url(#logo-clip)">
        {/* jacket */}
        <path d="M4 66 C4 52 14 47 24 45 L40 45 C50 47 60 52 60 66 Z" fill="#1d1f27" />
        {/* shirt */}
        <path d="M24 45 L32 62 L40 45 Z" fill="#ffffff" />
        {/* lapels */}
        <path d="M24 45 L32 62 L21 66 L16 52 Z" fill="#2c2f3a" />
        <path d="M40 45 L32 62 L43 66 L48 52 Z" fill="#2c2f3a" />
        {/* neck */}
        <path d="M27 38 L37 38 L37 46 C35 48 29 48 27 46 Z" fill="#e3ae83" />
        {/* collar */}
        <path d="M24 44 L30 47 L32 52 L26 48 Z" fill="#ffffff" />
        <path d="M40 44 L34 47 L32 52 L38 48 Z" fill="#ffffff" />
        {/* bow tie */}
        <path d="M32 50 L24 46.5 L24 55 Z" fill="#1d1f27" />
        <path d="M32 50 L40 46.5 L40 55 Z" fill="#1d1f27" />
        <rect x="29.6" y="48" width="4.8" height="5.2" rx="1.4" fill="#2c2f3a" />
        {/* hair behind the face */}
        <Curls curls={back} />
        {/* ears */}
        <ellipse cx="19.2" cy="28" rx="2.4" ry="3.4" fill="#eebd94" />
        <ellipse cx="44.8" cy="28" rx="2.4" ry="3.4" fill="#eebd94" />
        {/* face */}
        <ellipse cx="32" cy="27" rx="12.8" ry="14.6" fill="#f2c9a1" />
        {/* curls over the forehead */}
        <Curls curls={front} />
        {/* eyebrows */}
        <path d="M23.4 24.2 Q26.4 22.6 29.2 24.2" fill="none" stroke="#9a7430" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M34.8 24.2 Q37.6 22.6 40.6 24.2" fill="none" stroke="#9a7430" strokeWidth="1.7" strokeLinecap="round" />
        {/* eyes */}
        <ellipse cx="26.4" cy="28" rx="1.7" ry="2.1" fill="#2a1d18" />
        <ellipse cx="37.6" cy="28" rx="1.7" ry="2.1" fill="#2a1d18" />
        {/* nose */}
        <path d="M32 29 Q30.6 33 32.6 33.6" fill="none" stroke="#d29a72" strokeWidth="1.3" strokeLinecap="round" />
        {/* smile: no mustache */}
        <path d="M26.6 35.6 Q32 40.4 37.4 35.6" fill="none" stroke="#9c4a3c" strokeWidth="1.9" strokeLinecap="round" />
      </g>
    </svg>
  );
}

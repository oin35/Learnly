/**
 * App logo: a blonde man in a tuxedo (like the 🤵🏼‍♂️ emoji), drawn here so it looks the same on every device.
 * Clean-shaven by design.
 */
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
        {/* ears */}
        <ellipse cx="19.2" cy="28" rx="2.4" ry="3.4" fill="#eebd94" />
        <ellipse cx="44.8" cy="28" rx="2.4" ry="3.4" fill="#eebd94" />
        {/* face */}
        <ellipse cx="32" cy="27" rx="12.8" ry="14.6" fill="#f2c9a1" />
        {/* hair */}
        <path d="M18.6 26 C17.4 14 24 8.5 32.4 8.6 C41 8.7 47 14.6 45.4 26 C44.4 21.6 42.2 18.6 38.6 17.2 C33.6 19.4 25.4 19.2 21.4 17.6 C19.6 19.6 18.8 22.4 18.6 26 Z" fill="#e6bd57" stroke="#c9972f" strokeWidth="0.9" strokeLinejoin="round" />
        {/* eyebrows */}
        <path d="M23.4 24 Q26.4 22.4 29.2 24" fill="none" stroke="#b98a3a" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M34.8 24 Q37.6 22.4 40.6 24" fill="none" stroke="#b98a3a" strokeWidth="1.7" strokeLinecap="round" />
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

export const DocVaultLogo = ({ size = 24, className = "", iconColor, partColor }: { size?: number, className?: string, iconColor?: string, partColor?: string }) => {
  const baseColor = iconColor || "#0EA5E9";
  const accentColor = partColor || "#FFFFFF";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="docvaultLogoGradient" x1="0" y1="0" x2="24" y2="24">
          <stop offset="0%" stopColor={baseColor} />
          <stop offset="100%" stopColor="#0B63C3" />
        </linearGradient>
        <radialGradient id="docvaultLogoGlow" cx="12" cy="8" r="8" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0B1638" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="3" y="4" width="18" height="16" rx="5" fill="url(#docvaultLogoGradient)" />
      <circle cx="12" cy="9" r="7.2" fill="url(#docvaultLogoGlow)" />
      <path d="M6.2 9.1h11.6c0.77 0 1.4 0.63 1.4 1.4v3.8c0 0.77-0.63 1.4-1.4 1.4H6.2c-0.77 0-1.4-0.63-1.4-1.4V10.5c0-0.77 0.63-1.4 1.4-1.4Z" fill="rgba(255,255,255,0.18)" />
      <path d="M7.5 10.4h9c0.41 0 0.75 0.34 0.75 0.75v2.6c0 0.41-0.34 0.75-0.75 0.75h-9c-0.41 0-0.75-0.34-0.75-0.75v-2.6c0-0.41 0.34-0.75 0.75-0.75Z" fill={accentColor} />
      <circle cx="12" cy="13.7" r="1.15" fill={baseColor} />
      <path d="M12 15.4v1.2" stroke={baseColor} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M7.8 11.5v3.7C7.8 17.58 9.92 19.7 12.6 19.7h-0.6c2.68 0 4.8-2.12 4.8-4.8v-3.7" stroke={accentColor} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

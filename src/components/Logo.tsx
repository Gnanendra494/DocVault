export const DocVaultLogo = ({ size = 24, className = "" }: { size?: number, className?: string, iconColor?: string, partColor?: string }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <radialGradient id="docvaultBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#000000" />
        </radialGradient>
        <linearGradient id="docvaultTextGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f2fe" />
          <stop offset="100%" stopColor="#4facfe" />
        </linearGradient>
        <filter id="docvaultNeon" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="25" floodColor="#00f2fe" floodOpacity="0.8" />
          <feDropShadow dx="0" dy="10" stdDeviation="15" floodColor="#000000" floodOpacity="0.9" />
        </filter>
      </defs>
      <rect width="1024" height="1024" fill="url(#docvaultBg)" rx="225" />
      <text x="512" y="560" fontFamily="system-ui, -apple-system, sans-serif" fontSize="160" fontWeight="900" fill="url(#docvaultTextGlow)" filter="url(#docvaultNeon)" textAnchor="middle" letterSpacing="4">DocVault</text>
    </svg>
  )
}

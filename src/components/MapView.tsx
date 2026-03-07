import { motion } from "framer-motion";

// Simulated map with roads, parks, and water features
export default function MapView({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={`relative w-full h-full map-bg overflow-hidden ${className}`}>
      {/* Grid roads */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Major roads */}
        {[15, 35, 55, 75].map((y) => (
          <line key={`h${y}`} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="hsl(0,0%,85%)" strokeWidth="3" />
        ))}
        {[20, 40, 60, 80].map((x) => (
          <line key={`v${x}`} x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%" stroke="hsl(0,0%,85%)" strokeWidth="3" />
        ))}
        {/* Minor roads */}
        {[8, 25, 45, 65, 85, 92].map((y) => (
          <line key={`hm${y}`} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="hsl(0,0%,90%)" strokeWidth="1.5" />
        ))}
        {[10, 30, 50, 70, 90].map((x) => (
          <line key={`vm${x}`} x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%" stroke="hsl(0,0%,90%)" strokeWidth="1.5" />
        ))}
        {/* Park areas */}
        <rect x="5%" y="10%" width="12%" height="18%" rx="8" fill="hsl(140, 35%, 88%)" />
        <rect x="70%" y="60%" width="15%" height="12%" rx="8" fill="hsl(140, 35%, 88%)" />
        <rect x="45%" y="5%" width="8%" height="10%" rx="6" fill="hsl(140, 35%, 90%)" />
        {/* Water */}
        <ellipse cx="85%" cy="20%" rx="10%" ry="15%" fill="hsl(200, 40%, 90%)" />
        {/* Street labels */}
        <text x="22%" y="53.5%" fill="hsl(0,0%,70%)" fontSize="9" fontFamily="Inter">MARKET ST</text>
        <text x="62%" y="33.5%" fill="hsl(0,0%,70%)" fontSize="9" fontFamily="Inter">MISSION ST</text>
        <text x="41.5%" y="18%" fill="hsl(0,0%,70%)" fontSize="8" fontFamily="Inter" transform="rotate(90, 41.5%, 18%)">VAN NESS</text>
      </svg>
      {children}
    </div>
  );
}

// Map marker component
export function MapMarker({ 
  x, y, color = "bg-primary", size = "w-3 h-3", pulse = false, label, onClick 
}: { 
  x: string; y: string; color?: string; size?: string; pulse?: boolean; label?: string; onClick?: () => void;
}) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="absolute z-10 cursor-pointer"
      style={{ left: x, top: y }}
      onClick={onClick}
    >
      <div className="relative flex flex-col items-center">
        <div className={`${size} rounded-full ${color} border-2 border-card uber-shadow`}>
          {pulse && <div className={`absolute inset-0 rounded-full ${color} animate-ping opacity-30`} />}
        </div>
        {label && (
          <div className="mt-1 px-1.5 py-0.5 bg-card rounded text-[9px] font-medium uber-shadow whitespace-nowrap">
            {label}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Car marker
export function CarMarker({ x, y, rotation = 0 }: { x: string; y: string; rotation?: number }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="absolute z-20"
      style={{ left: x, top: y }}
    >
      <div style={{ transform: `rotate(${rotation}deg)` }}>
        <div className="w-4 h-7 bg-primary rounded-sm uber-shadow flex items-center justify-center">
          <div className="w-2.5 h-1.5 bg-primary-foreground/20 rounded-sm mt-0.5" />
        </div>
      </div>
    </motion.div>
  );
}

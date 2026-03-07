import { motion } from "framer-motion";
import { Database, MapPin, Wifi, Construction } from "lucide-react";

const rewards = [
  { id: 1, type: "Pothole Detection", location: "Market St & 5th", reward: 0.45, time: "2 min ago", icon: Construction },
  { id: 2, type: "5G Dead Zone", location: "Mission District", reward: 0.82, time: "8 min ago", icon: Wifi },
  { id: 3, type: "Traffic Flow Data", location: "I-280 Southbound", reward: 0.23, time: "12 min ago", icon: MapPin },
  { id: 4, type: "Road Surface Scan", location: "Van Ness Ave", reward: 0.56, time: "18 min ago", icon: Construction },
  { id: 5, type: "5G Signal Mapping", location: "SOMA District", reward: 0.91, time: "25 min ago", icon: Wifi },
];

export default function DataRewardsLedger() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-sm">Data Rewards Ledger</h3>
        </div>
        <span className="text-xs text-primary font-semibold">+$14.82 today</span>
      </div>
      <div className="space-y-2">
        {rewards.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 p-2.5 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <r.icon className="w-3.5 h-3.5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium truncate">{r.type}</div>
              <div className="text-[10px] text-muted-foreground truncate">{r.location}</div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-xs font-semibold text-primary">+${r.reward.toFixed(2)}</div>
              <div className="text-[10px] text-muted-foreground">{r.time}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

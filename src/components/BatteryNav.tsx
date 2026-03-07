import { motion } from "framer-motion";
import { Battery, Zap, Navigation, Clock } from "lucide-react";

export default function BatteryNav() {
  const batteryLevel = 34;

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm">Battery-Smart Navigation</h3>
        <div className="flex items-center gap-1.5">
          <Battery className={`w-4 h-4 ${batteryLevel < 40 ? "text-uber-orange" : "text-primary"}`} />
          <span className={`text-sm font-bold ${batteryLevel < 40 ? "text-uber-orange" : "text-primary"}`}>
            {batteryLevel}%
          </span>
        </div>
      </div>

      {/* Battery bar */}
      <div className="w-full h-2 bg-secondary rounded-full mb-4 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${batteryLevel}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full ${
            batteryLevel < 20 ? "bg-destructive" : batteryLevel < 40 ? "bg-uber-orange" : "bg-primary"
          }`}
        />
      </div>

      {/* Suggested Flash-Hub */}
      <div className="rounded-lg bg-primary/5 border border-primary/20 p-3 glow-green">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-primary">Flash-Hub Recommended</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">SOMA Hub Station</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <Navigation className="w-3 h-3" /> 0.8 mi · 
              <Clock className="w-3 h-3" /> 12 min charge
            </div>
          </div>
          <button className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity">
            Route
          </button>
        </div>
      </div>

      <div className="mt-3 text-[10px] text-muted-foreground">
        ⚡ 150 mi range added in 12 min · 3 stalls available
      </div>
    </div>
  );
}

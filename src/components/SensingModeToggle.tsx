import { useState } from "react";
import { motion } from "framer-motion";
import { Radio, Shield } from "lucide-react";

export default function SensingModeToggle() {
  const [active, setActive] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-sm">City-Insights Sensing</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Passive infrastructure monitoring</p>
        </div>
        <button
          onClick={() => setActive(!active)}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            active ? "bg-primary" : "bg-secondary"
          }`}
        >
          <motion.div
            animate={{ x: active ? 24 : 2 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute top-1 w-4 h-4 rounded-full bg-primary-foreground"
          />
        </button>
      </div>

      {active && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Potholes", count: 12, color: "text-uber-orange" },
              { label: "5G Gaps", count: 3, color: "text-uber-blue" },
              { label: "Traffic", count: 8, color: "text-uber-yellow" },
            ].map((item) => (
              <div key={item.label} className="rounded-lg bg-secondary p-3 text-center">
                <div className={`text-lg font-bold ${item.color}`}>{item.count}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-primary animate-pulse-green" />
              <span className="text-xs text-muted-foreground">Collecting data…</span>
            </div>
            <button
              onClick={() => setPrivacyMode(!privacyMode)}
              className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md transition-colors ${
                privacyMode ? "bg-destructive/10 text-destructive" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <Shield className="w-3 h-3" />
              {privacyMode ? "Privacy On" : "Privacy Mode"}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

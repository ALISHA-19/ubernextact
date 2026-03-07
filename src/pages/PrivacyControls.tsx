import { useState } from "react";
import { Shield, Eye, EyeOff, MapPin, Wifi, Car, Lock } from "lucide-react";
import { motion } from "framer-motion";

const dataTypes = [
  { id: "gps", label: "GPS Location", icon: MapPin, description: "Route and position data", enabled: true },
  { id: "accelerometer", label: "Accelerometer", icon: Car, description: "Road surface detection", enabled: true },
  { id: "network", label: "Network Signal", icon: Wifi, description: "5G/LTE coverage mapping", enabled: true },
];

export default function PrivacyControls() {
  const [privacyMode, setPrivacyMode] = useState(false);
  const [toggles, setToggles] = useState(
    Object.fromEntries(dataTypes.map((d) => [d.id, d.enabled]))
  );

  const toggle = (id: string) => setToggles((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6 animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" /> Privacy & Control
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Full transparency and control over your data</p>
      </div>

      {/* Privacy mode master toggle */}
      <div className={`rounded-xl border p-5 transition-colors ${privacyMode ? "border-destructive bg-destructive/5" : "border-border bg-card"}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {privacyMode ? <EyeOff className="w-5 h-5 text-destructive" /> : <Eye className="w-5 h-5 text-primary" />}
            <div>
              <h3 className="font-semibold text-sm">Privacy Mode</h3>
              <p className="text-xs text-muted-foreground">Pause all sensor data collection</p>
            </div>
          </div>
          <button
            onClick={() => setPrivacyMode(!privacyMode)}
            className={`relative w-12 h-6 rounded-full transition-colors ${privacyMode ? "bg-destructive" : "bg-primary"}`}
          >
            <motion.div
              animate={{ x: privacyMode ? 24 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute top-1 w-4 h-4 rounded-full bg-foreground"
            />
          </button>
        </div>
        {privacyMode && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-destructive mt-3">
            All sensor collection paused. You won't earn Data Rewards while in Privacy Mode.
          </motion.p>
        )}
      </div>

      {/* Granular controls */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-4">
        <h3 className="font-semibold text-sm">Data Collection Controls</h3>
        {dataTypes.map((dt) => (
          <div key={dt.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                <dt.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <div className="text-sm font-medium">{dt.label}</div>
                <div className="text-xs text-muted-foreground">{dt.description}</div>
              </div>
            </div>
            <button
              onClick={() => toggle(dt.id)}
              disabled={privacyMode}
              className={`relative w-10 h-5 rounded-full transition-colors ${
                toggles[dt.id] && !privacyMode ? "bg-primary" : "bg-muted"
              } disabled:opacity-50`}
            >
              <motion.div
                animate={{ x: toggles[dt.id] && !privacyMode ? 20 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-0.5 w-4 h-4 rounded-full bg-foreground"
              />
            </button>
          </div>
        ))}
      </div>

      {/* Data guardrails */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <Lock className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-sm">Data Guardrails</h3>
        </div>
        <div className="space-y-2 text-xs text-muted-foreground">
          <p>✓ All sensor data is anonymized — GPS/accelerometer decoupled from identity</p>
          <p>✓ Data aggregated before sharing with municipal partners</p>
          <p>✓ No personal routes or patterns are stored or sold</p>
          <p>✓ You can delete all collected data at any time</p>
        </div>
      </div>
    </div>
  );
}

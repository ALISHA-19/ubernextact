import { useState } from "react";
import { motion } from "framer-motion";
import { User, Shield, Eye, EyeOff, MapPin, Wifi, Car, Lock, ChevronRight, Star, Zap, Bell, HelpCircle, LogOut } from "lucide-react";

const dataTypes = [
  { id: "gps", label: "GPS Location", icon: MapPin, description: "Route and position data" },
  { id: "accelerometer", label: "Accelerometer", icon: Car, description: "Road surface detection" },
  { id: "network", label: "Network Signal", icon: Wifi, description: "5G/LTE coverage mapping" },
];

export default function AccountPage() {
  const [privacyMode, setPrivacyMode] = useState(false);
  const [toggles, setToggles] = useState<Record<string, boolean>>({ gps: true, accelerometer: true, network: true });

  const toggle = (id: string) => setToggles((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="pb-20 md:pb-6">
      {/* Profile header */}
      <div className="px-5 pt-6 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
            <User className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Marcus Johnson</h1>
            <div className="flex items-center gap-2 mt-1">
              <Star className="w-3.5 h-3.5 text-uber-yellow" />
              <span className="text-sm text-muted-foreground">4.96 · Gold Driver</span>
            </div>
          </div>
        </div>
      </div>

      {/* Earnings summary card */}
      <div className="px-5 mb-6">
        <div className="bg-card rounded-2xl uber-shadow p-5">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold">$12,480</div>
              <div className="text-xs text-muted-foreground">This month</div>
            </div>
            <div>
              <div className="text-xl font-bold text-uber-green">$847</div>
              <div className="text-xs text-muted-foreground">Data Rewards</div>
            </div>
            <div>
              <div className="text-xl font-bold">6.2h</div>
              <div className="text-xs text-muted-foreground">Avg daily</div>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy & Data section */}
      <div className="px-5 mb-6">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Privacy & Data</h3>
        
        {/* Privacy mode toggle */}
        <div className={`rounded-2xl uber-shadow p-4 mb-3 ${privacyMode ? "bg-uber-orange-light border border-uber-orange/20" : "bg-card"}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {privacyMode ? <EyeOff className="w-5 h-5 text-uber-orange" /> : <Eye className="w-5 h-5 text-uber-green" />}
              <div>
                <div className="text-sm font-semibold">Privacy Mode</div>
                <div className="text-xs text-muted-foreground">
                  {privacyMode ? "All data collection paused" : "Data anonymized & collecting"}
                </div>
              </div>
            </div>
            <button
              onClick={() => setPrivacyMode(!privacyMode)}
              className={`relative w-12 h-7 rounded-full transition-colors ${privacyMode ? "bg-uber-orange" : "bg-uber-green"}`}
            >
              <motion.div
                animate={{ x: privacyMode ? 22 : 3 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 w-5 h-5 rounded-full bg-card"
              />
            </button>
          </div>
          {privacyMode && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-uber-orange mt-2">
              You won't earn Data Rewards while in Privacy Mode.
            </motion.p>
          )}
        </div>

        {/* Granular toggles */}
        <div className="bg-card rounded-2xl uber-shadow divide-y divide-border">
          {dataTypes.map((dt) => (
            <div key={dt.id} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
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
                className={`relative w-10 h-6 rounded-full transition-colors ${
                  toggles[dt.id] && !privacyMode ? "bg-uber-green" : "bg-uber-gray-200"
                } disabled:opacity-40`}
              >
                <motion.div
                  animate={{ x: toggles[dt.id] && !privacyMode ? 18 : 3 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute top-1 w-4 h-4 rounded-full bg-card"
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Data guardrails */}
      <div className="px-5 mb-6">
        <div className="bg-card rounded-2xl uber-shadow p-4">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-4 h-4 text-uber-green" />
            <span className="text-sm font-semibold">Data Guardrails</span>
          </div>
          <div className="space-y-2 text-xs text-muted-foreground">
            <p>✓ All sensor data anonymized — GPS decoupled from identity</p>
            <p>✓ Data aggregated before sharing with municipal partners</p>
            <p>✓ No personal routes or patterns stored or sold</p>
            <p>✓ Delete all collected data at any time</p>
          </div>
        </div>
      </div>

      {/* Settings links */}
      <div className="px-5 mb-6">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Settings</h3>
        <div className="bg-card rounded-2xl uber-shadow divide-y divide-border">
          {[
            { icon: Zap, label: "Uber Fuel Pass", subtitle: "Manage charging membership" },
            { icon: Bell, label: "Notifications", subtitle: "Alerts & preferences" },
            { icon: HelpCircle, label: "Help", subtitle: "Support & FAQ" },
          ].map((item) => (
            <button key={item.label} className="w-full flex items-center gap-3 p-4 text-left">
              <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
                <item.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">{item.label}</div>
                <div className="text-xs text-muted-foreground">{item.subtitle}</div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>

      <div className="px-5">
        <button className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-secondary text-sm font-medium text-uber-red">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </div>
  );
}

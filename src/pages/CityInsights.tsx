import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Construction, Wifi, Car, Filter, Download, Eye } from "lucide-react";

const heatmapData = [
  { id: 1, type: "pothole", severity: "high", lat: "37.7849", lng: "-122.4094", street: "Market St & 5th", reports: 24, lastSeen: "3 min ago" },
  { id: 2, type: "5g_dead", severity: "medium", lat: "37.7599", lng: "-122.4148", street: "Mission & 16th", reports: 8, lastSeen: "12 min ago" },
  { id: 3, type: "traffic", severity: "high", lat: "37.7749", lng: "-122.4194", street: "I-280 on-ramp", reports: 156, lastSeen: "1 min ago" },
  { id: 4, type: "pothole", severity: "low", lat: "37.7849", lng: "-122.3994", street: "Folsom & 7th", reports: 5, lastSeen: "45 min ago" },
  { id: 5, type: "5g_dead", severity: "high", lat: "37.7699", lng: "-122.4294", street: "Castro & 18th", reports: 31, lastSeen: "5 min ago" },
  { id: 6, type: "traffic", severity: "medium", lat: "37.7949", lng: "-122.3994", street: "Embarcadero", reports: 89, lastSeen: "8 min ago" },
];

const typeConfig = {
  pothole: { icon: Construction, color: "text-uber-orange", bg: "bg-uber-orange/10", label: "Pothole" },
  "5g_dead": { icon: Wifi, color: "text-uber-blue", bg: "bg-uber-blue/10", label: "5G Dead Zone" },
  traffic: { icon: Car, color: "text-uber-red", bg: "bg-uber-red/10", label: "Traffic" },
};

const severityColors = {
  high: "bg-destructive",
  medium: "bg-uber-orange",
  low: "bg-uber-yellow",
};

export default function CityInsights() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const filters = ["all", "pothole", "5g_dead", "traffic"];
  const filtered = activeFilter === "all" ? heatmapData : heatmapData.filter((d) => d.type === activeFilter);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-slide-up">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">City Insights</h1>
          <p className="text-sm text-muted-foreground mt-1">Real-time infrastructure health powered by fleet sensors</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-sm text-secondary-foreground hover:bg-muted transition-colors">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
            <Eye className="w-3.5 h-3.5" /> Municipal View
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Active Anomalies", value: "47", icon: MapPin, color: "text-uber-orange" },
          { label: "Sensors Online", value: "2,841", icon: Wifi, color: "text-primary" },
          { label: "Reports Today", value: "1,293", icon: Construction, color: "text-uber-blue" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Map placeholder + data list */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Simulated heatmap */}
        <div className="lg:col-span-3 rounded-xl border border-border bg-card overflow-hidden relative" style={{ minHeight: 420 }}>
          <div className="absolute inset-0 gradient-mesh" />
          {/* Grid overlay to simulate map */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: "linear-gradient(hsl(0 0% 30%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 30%) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }} />
          {/* Anomaly dots */}
          {filtered.map((d, i) => {
            const config = typeConfig[d.type as keyof typeof typeConfig];
            const positions = [
              { top: "25%", left: "35%" },
              { top: "55%", left: "20%" },
              { top: "15%", left: "60%" },
              { top: "65%", left: "70%" },
              { top: "45%", left: "45%" },
              { top: "30%", left: "75%" },
            ];
            const pos = positions[i % positions.length];
            return (
              <motion.div
                key={d.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="absolute z-10"
                style={pos}
              >
                <div className="relative group cursor-pointer">
                  <div className={`w-4 h-4 rounded-full ${severityColors[d.severity as keyof typeof severityColors]} animate-pulse`} />
                  <div className={`absolute w-8 h-8 rounded-full ${severityColors[d.severity as keyof typeof severityColors]} opacity-20 -inset-2 animate-ping`} />
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden group-hover:block z-20">
                    <div className="glass rounded-lg p-2 text-xs whitespace-nowrap">
                      <div className="font-semibold">{config.label}</div>
                      <div className="text-muted-foreground">{d.street}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
          {/* Map label */}
          <div className="absolute bottom-4 left-4 glass rounded-lg px-3 py-2 text-xs z-10">
            <span className="text-muted-foreground">San Francisco · Live</span>
            <span className="ml-2 w-2 h-2 rounded-full bg-primary inline-block animate-pulse-green" />
          </div>
        </div>

        {/* Data list */}
        <div className="lg:col-span-2 space-y-3">
          {/* Filters */}
          <div className="flex gap-1.5">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                  activeFilter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                {f === "5g_dead" ? "5G" : f}
              </button>
            ))}
          </div>

          <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
            {filtered.map((d, i) => {
              const config = typeConfig[d.type as keyof typeof typeConfig];
              return (
                <motion.div
                  key={d.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-lg border border-border bg-card p-3 hover:bg-secondary/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                      <config.icon className={`w-4 h-4 ${config.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{config.label}</span>
                        <span className={`w-1.5 h-1.5 rounded-full ${severityColors[d.severity as keyof typeof severityColors]}`} />
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">{d.street}</div>
                      <div className="flex items-center gap-3 mt-1.5 text-[10px] text-muted-foreground">
                        <span>{d.reports} reports</span>
                        <span>{d.lastSeen}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

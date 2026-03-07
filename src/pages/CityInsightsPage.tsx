import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Construction, Wifi, Car, Filter, Download, Eye, X, ChevronDown } from "lucide-react";
import MapView, { MapMarker } from "@/components/MapView";

const heatmapData = [
  { id: 1, type: "pothole", severity: "high", street: "Market St & 5th", reports: 24, lastSeen: "3 min ago" },
  { id: 2, type: "5g_dead", severity: "medium", street: "Mission & 16th", reports: 8, lastSeen: "12 min ago" },
  { id: 3, type: "traffic", severity: "high", street: "I-280 on-ramp", reports: 156, lastSeen: "1 min ago" },
  { id: 4, type: "pothole", severity: "low", street: "Folsom & 7th", reports: 5, lastSeen: "45 min ago" },
  { id: 5, type: "5g_dead", severity: "high", street: "Castro & 18th", reports: 31, lastSeen: "5 min ago" },
  { id: 6, type: "traffic", severity: "medium", street: "Embarcadero", reports: 89, lastSeen: "8 min ago" },
];

const typeConfig: Record<string, { icon: any; color: string; bg: string; markerColor: string; label: string }> = {
  pothole: { icon: Construction, color: "text-uber-orange", bg: "bg-uber-orange-light", markerColor: "bg-uber-orange", label: "Pothole" },
  "5g_dead": { icon: Wifi, color: "text-uber-blue", bg: "bg-uber-blue-light", markerColor: "bg-uber-blue", label: "5G Dead Zone" },
  traffic: { icon: Car, color: "text-uber-red", bg: "bg-uber-orange-light", markerColor: "bg-uber-red", label: "Traffic" },
};

const markerPositions = [
  { x: "28%", y: "32%" }, { x: "52%", y: "58%" }, { x: "18%", y: "48%" },
  { x: "68%", y: "25%" }, { x: "40%", y: "72%" }, { x: "78%", y: "45%" },
];

export default function CityInsightsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [showList, setShowList] = useState(false);
  
  const filters = ["all", "pothole", "5g_dead", "traffic"];
  const filtered = activeFilter === "all" ? heatmapData : heatmapData.filter((d) => d.type === activeFilter);

  return (
    <div className="relative h-[calc(100vh-64px)] flex flex-col">
      {/* Map */}
      <div className="flex-1 relative">
        <MapView>
          {filtered.map((d, i) => {
            const config = typeConfig[d.type];
            const pos = markerPositions[i % markerPositions.length];
            return (
              <MapMarker
                key={d.id}
                x={pos.x}
                y={pos.y}
                color={config.markerColor}
                pulse={d.severity === "high"}
                label={config.label}
                onClick={() => setSelectedItem(d.id)}
              />
            );
          })}
        </MapView>

        {/* Top bar overlay */}
        <div className="absolute top-4 left-4 right-4 flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 px-4 py-2.5 bg-card rounded-full uber-shadow">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">San Francisco</span>
            <span className="text-xs text-muted-foreground ml-1">· Live</span>
            <span className="ml-1 w-2 h-2 rounded-full bg-uber-green animate-pulse-soft" />
          </div>
        </div>

        {/* Filter chips */}
        <div className="absolute top-16 left-4 right-4 flex gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium uber-shadow transition-colors capitalize ${
                activeFilter === f ? "bg-primary text-primary-foreground" : "bg-card text-foreground"
              }`}
            >
              {f === "5g_dead" ? "5G" : f === "all" ? "All" : f}
            </button>
          ))}
        </div>

        {/* Stats overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex gap-2">
          {[
            { label: "Anomalies", value: "47", color: "text-uber-orange" },
            { label: "Sensors", value: "2,841", color: "text-uber-green" },
            { label: "Today", value: "1,293", color: "text-uber-blue" },
          ].map((s) => (
            <div key={s.label} className="flex-1 bg-card rounded-2xl uber-shadow p-3 text-center">
              <div className={`text-lg font-bold ${s.color}`}>{s.value}</div>
              <div className="text-[10px] text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom sheet - anomaly list */}
      <div className="bottom-sheet z-40">
        <button
          className="w-full flex justify-center pt-3 pb-2"
          onClick={() => setShowList(!showList)}
        >
          <div className="w-10 h-1 bg-uber-gray-300 rounded-full" />
        </button>

        <div className="px-5 pb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Infrastructure Alerts</h3>
            <div className="flex gap-2">
              <button className="p-2 rounded-full bg-secondary">
                <Download className="w-4 h-4 text-muted-foreground" />
              </button>
              <button className="px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" /> Municipal
              </button>
            </div>
          </div>

          <div className={`space-y-2 overflow-auto ${showList ? "max-h-[40vh]" : "max-h-[120px]"} transition-all`}>
            {filtered.map((d) => {
              const config = typeConfig[d.type];
              return (
                <motion.div
                  key={d.id}
                  layout
                  className="flex items-center gap-3 p-3 rounded-xl bg-uber-gray-50 cursor-pointer active:bg-secondary transition-colors"
                  onClick={() => setSelectedItem(d.id === selectedItem ? null : d.id)}
                >
                  <div className={`w-9 h-9 rounded-xl ${config.bg} flex items-center justify-center shrink-0`}>
                    <config.icon className={`w-4 h-4 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{config.label}</div>
                    <div className="text-xs text-muted-foreground">{d.street}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-medium">{d.reports} reports</div>
                    <div className="text-[10px] text-muted-foreground">{d.lastSeen}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="h-14 md:hidden" />
    </div>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Battery, Zap, Navigation, Clock, MapPin, Radio, Shield, DollarSign, ChevronUp, ChevronDown, TrendingUp, Wifi, Construction, Car } from "lucide-react";
import MapView, { MapMarker, CarMarker } from "@/components/MapView";

export default function HomePage() {
  const [sheetExpanded, setSheetExpanded] = useState(false);
  const [sensingActive, setSensingActive] = useState(true);
  const batteryLevel = 34;

  return (
    <div className="relative h-[calc(100vh-64px)] md:h-[calc(100vh-64px)] flex flex-col">
      {/* Map area */}
      <div className="flex-1 relative">
        <MapView>
          {/* Car markers (other Uber vehicles) */}
          <CarMarker x="30%" y="25%" rotation={45} />
          <CarMarker x="55%" y="40%" rotation={-20} />
          <CarMarker x="70%" y="30%" rotation={90} />
          <CarMarker x="25%" y="60%" rotation={160} />
          <CarMarker x="48%" y="70%" rotation={-45} />
          
          {/* Anomaly markers from sensing */}
          {sensingActive && (
            <>
              <MapMarker x="35%" y="35%" color="bg-uber-orange" pulse label="Pothole" />
              <MapMarker x="60%" y="55%" color="bg-uber-blue" pulse label="5G Gap" />
              <MapMarker x="22%" y="45%" color="bg-uber-orange" label="Pothole" />
              <MapMarker x="75%" y="25%" color="bg-uber-blue" label="5G Gap" />
            </>
          )}

          {/* Flash-Hub markers */}
          <MapMarker x="45%" y="50%" color="bg-uber-green" size="w-4 h-4" label="Flash-Hub" />
          <MapMarker x="65%" y="70%" color="bg-uber-green" size="w-4 h-4" label="Flash-Hub" />

          {/* Current location */}
          <motion.div
            className="absolute z-30"
            style={{ left: "42%", top: "45%" }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <div className="relative">
              <div className="w-4 h-4 rounded-full bg-uber-blue border-[3px] border-card uber-shadow" />
              <div className="absolute inset-0 w-4 h-4 rounded-full bg-uber-blue animate-ping opacity-20" />
              <div className="absolute -inset-3 w-10 h-10 rounded-full bg-uber-blue/10" />
            </div>
          </motion.div>
        </MapView>

        {/* Sensing badge overlay */}
        {sensingActive && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 left-4 right-4 md:left-auto md:right-4 md:w-auto"
          >
            <div className="flex items-center gap-2 px-3 py-2 bg-card rounded-full uber-shadow text-xs">
              <Radio className="w-3.5 h-3.5 text-uber-green animate-pulse-soft" />
              <span className="font-medium">Sensing active</span>
              <span className="text-muted-foreground">· 12 anomalies detected</span>
            </div>
          </motion.div>
        )}

        {/* Battery warning overlay */}
        {batteryLevel < 40 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-16 left-4 right-4 md:left-auto md:right-4 md:w-72"
          >
            <div className="flex items-center gap-3 px-4 py-3 bg-card rounded-2xl uber-shadow border border-uber-orange/20">
              <div className="w-10 h-10 rounded-full bg-uber-orange-light flex items-center justify-center shrink-0">
                <Battery className="w-5 h-5 text-uber-orange" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold">Battery Low · {batteryLevel}%</div>
                <div className="text-xs text-muted-foreground">Flash-Hub 0.8 mi away · 12 min charge</div>
              </div>
              <button className="uber-btn text-xs px-3 py-2">Route</button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom sheet */}
      <motion.div
        className="bottom-sheet relative z-40"
        initial={{ y: 0 }}
        animate={{ height: sheetExpanded ? "70vh" : "auto" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Handle */}
        <button
          className="w-full flex justify-center pt-3 pb-2"
          onClick={() => setSheetExpanded(!sheetExpanded)}
        >
          <div className="w-10 h-1 bg-uber-gray-300 rounded-full" />
        </button>

        <div className="px-5 pb-6 space-y-4 overflow-auto" style={{ maxHeight: sheetExpanded ? "65vh" : "auto" }}>
          {/* Quick stats row */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">$284.50</div>
              <div className="text-xs text-muted-foreground">Today's earnings</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-lg font-bold text-uber-green">+$14.82</div>
                <div className="text-[10px] text-muted-foreground">Data Rewards</div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setSheetExpanded(!sheetExpanded); }}
                className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"
              >
                {sheetExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Quick action cards */}
          <div className="grid grid-cols-2 gap-3">
            {/* Sensing toggle */}
            <button
              onClick={() => setSensingActive(!sensingActive)}
              className={`p-4 rounded-2xl text-left transition-all ${
                sensingActive ? "bg-primary text-primary-foreground" : "bg-secondary"
              }`}
            >
              <Radio className="w-5 h-5 mb-2" />
              <div className="text-sm font-semibold">City Sensing</div>
              <div className={`text-xs mt-0.5 ${sensingActive ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                {sensingActive ? "Active · Earning" : "Paused"}
              </div>
            </button>

            {/* Privacy toggle */}
            <button className="p-4 rounded-2xl bg-secondary text-left transition-all hover:bg-accent">
              <Shield className="w-5 h-5 mb-2 text-muted-foreground" />
              <div className="text-sm font-semibold">Privacy Mode</div>
              <div className="text-xs text-muted-foreground mt-0.5">Data anonymized</div>
            </button>
          </div>

          {/* Expanded content */}
          <AnimatePresence>
            {sheetExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* Earnings breakdown */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold">Earnings Breakdown</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-secondary rounded-xl p-3 text-center">
                      <DollarSign className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                      <div className="text-lg font-bold">$269.68</div>
                      <div className="text-[10px] text-muted-foreground">Rides</div>
                    </div>
                    <div className="bg-uber-green-light rounded-xl p-3 text-center">
                      <TrendingUp className="w-4 h-4 mx-auto mb-1 text-uber-green" />
                      <div className="text-lg font-bold text-uber-green">$14.82</div>
                      <div className="text-[10px] text-muted-foreground">Data Rewards</div>
                    </div>
                    <div className="bg-secondary rounded-xl p-3 text-center">
                      <Clock className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                      <div className="text-lg font-bold">$45.89</div>
                      <div className="text-[10px] text-muted-foreground">EPH</div>
                    </div>
                  </div>
                </div>

                {/* Recent data rewards */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold">Recent Data Rewards</h3>
                  {[
                    { type: "Pothole Detection", loc: "Market St & 5th", reward: 0.45, time: "2m ago", icon: Construction, color: "bg-uber-orange-light", iconColor: "text-uber-orange" },
                    { type: "5G Dead Zone", loc: "Mission District", reward: 0.82, time: "8m ago", icon: Wifi, color: "bg-uber-blue-light", iconColor: "text-uber-blue" },
                    { type: "Traffic Flow", loc: "I-280 Southbound", reward: 0.23, time: "12m ago", icon: Car, color: "bg-secondary", iconColor: "text-muted-foreground" },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-uber-gray-50">
                      <div className={`w-9 h-9 rounded-xl ${r.color} flex items-center justify-center shrink-0`}>
                        <r.icon className={`w-4 h-4 ${r.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">{r.type}</div>
                        <div className="text-xs text-muted-foreground">{r.loc}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-uber-green">+${r.reward.toFixed(2)}</div>
                        <div className="text-[10px] text-muted-foreground">{r.time}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Battery & charge */}
                <div className="bg-uber-gray-50 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold">Battery Status</h3>
                    <span className="text-sm font-bold text-uber-orange">{batteryLevel}%</span>
                  </div>
                  <div className="w-full h-2 bg-uber-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${batteryLevel}%` }}
                      transition={{ duration: 1 }}
                      className="h-full rounded-full bg-uber-orange"
                    />
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-card rounded-xl uber-shadow">
                    <div className="w-10 h-10 rounded-xl bg-uber-green-light flex items-center justify-center">
                      <Zap className="w-5 h-5 text-uber-green" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold">SOMA Flash-Hub</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Navigation className="w-3 h-3" /> 0.8 mi ·
                        <Clock className="w-3 h-3" /> 12 min · 3 stalls open
                      </div>
                    </div>
                    <button className="uber-btn text-xs px-3 py-2">Route</button>
                  </div>
                </div>

                {/* Sensing stats */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-uber-orange-light rounded-xl p-3 text-center">
                    <div className="text-xl font-bold text-uber-orange">12</div>
                    <div className="text-[10px] text-muted-foreground">Potholes</div>
                  </div>
                  <div className="bg-uber-blue-light rounded-xl p-3 text-center">
                    <div className="text-xl font-bold text-uber-blue">3</div>
                    <div className="text-[10px] text-muted-foreground">5G Gaps</div>
                  </div>
                  <div className="bg-secondary rounded-xl p-3 text-center">
                    <div className="text-xl font-bold">8</div>
                    <div className="text-[10px] text-muted-foreground">Traffic</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Bottom nav spacing for mobile */}
      <div className="h-14 md:hidden" />
    </div>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Clock, MapPin, Star, Check, Battery, Users, Navigation, ChevronRight } from "lucide-react";
import MapView, { MapMarker } from "@/components/MapView";

const hubs = [
  { id: 1, name: "SOMA Hub Station", address: "185 Berry St", distance: "0.8 mi", stallsAvail: 3, stallsTotal: 8, chargeTime: "12 min", pricePerMin: 0.35, rating: 4.9, priority: true, x: "45%", y: "50%" },
  { id: 2, name: "Mission Flash-Hub", address: "2100 Mission St", distance: "1.2 mi", stallsAvail: 1, stallsTotal: 6, chargeTime: "14 min", pricePerMin: 0.32, rating: 4.7, priority: false, x: "30%", y: "65%" },
  { id: 3, name: "FiDi Supercharge", address: "101 California St", distance: "2.1 mi", stallsAvail: 5, stallsTotal: 12, chargeTime: "11 min", pricePerMin: 0.42, rating: 4.8, priority: true, x: "65%", y: "30%" },
  { id: 4, name: "Sunset Quick-Charge", address: "1500 Irving St", distance: "4.5 mi", stallsAvail: 7, stallsTotal: 10, chargeTime: "13 min", pricePerMin: 0.28, rating: 4.6, priority: false, x: "15%", y: "40%" },
];

export default function FlashHubPage() {
  const [selectedHub, setSelectedHub] = useState<number | null>(null);
  const [reserving, setReserving] = useState(false);
  const [reserved, setReserved] = useState<number | null>(null);

  const handleReserve = (hubId: number) => {
    setReserving(true);
    setTimeout(() => { setReserved(hubId); setReserving(false); }, 1500);
  };

  const selected = hubs.find((h) => h.id === selectedHub);

  return (
    <div className="relative h-[calc(100vh-64px)] flex flex-col">
      {/* Map */}
      <div className="flex-1 relative">
        <MapView>
          {hubs.map((hub) => (
            <MapMarker
              key={hub.id}
              x={hub.x}
              y={hub.y}
              color="bg-uber-green"
              size={selectedHub === hub.id ? "w-5 h-5" : "w-4 h-4"}
              pulse={hub.stallsAvail <= 2}
              label={`${hub.stallsAvail} open`}
              onClick={() => setSelectedHub(hub.id)}
            />
          ))}
          
          {/* Your location */}
          <motion.div className="absolute z-30" style={{ left: "42%", top: "45%" }}>
            <div className="w-4 h-4 rounded-full bg-uber-blue border-[3px] border-card uber-shadow" />
          </motion.div>
        </MapView>

        {/* Top summary */}
        <div className="absolute top-4 left-4 right-4 flex gap-2">
          <div className="flex-1 bg-card rounded-2xl uber-shadow p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-uber-green-light flex items-center justify-center">
              <Zap className="w-5 h-5 text-uber-green" />
            </div>
            <div>
              <div className="text-sm font-bold">16 stalls open</div>
              <div className="text-xs text-muted-foreground">0 min avg wait</div>
            </div>
          </div>
          <div className="bg-card rounded-2xl uber-shadow p-3 flex items-center gap-2">
            <Users className="w-4 h-4 text-uber-orange" />
            <div>
              <div className="text-xs font-bold">Gold</div>
              <div className="text-[10px] text-muted-foreground">Priority</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom sheet - hub list */}
      <div className="bottom-sheet z-40">
        <button className="w-full flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-uber-gray-300 rounded-full" />
        </button>

        <div className="px-5 pb-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Nearby Flash-Hubs</h3>
            <span className="text-xs text-muted-foreground">150 mi in 12 min</span>
          </div>

          <div className="space-y-2 max-h-[35vh] overflow-auto">
            {hubs.map((hub) => (
              <motion.div
                key={hub.id}
                layout
                onClick={() => setSelectedHub(selectedHub === hub.id ? null : hub.id)}
                className={`rounded-2xl border transition-all cursor-pointer ${
                  selectedHub === hub.id ? "border-uber-green bg-uber-green-light/30" : "border-border bg-card"
                }`}
              >
                <div className="flex items-center gap-3 p-3">
                  <div className="w-11 h-11 rounded-xl bg-uber-green-light flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-uber-green" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{hub.name}</span>
                      {hub.priority && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-uber-orange-light text-uber-orange font-bold uppercase">
                          Priority
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" /> {hub.distance} · 
                      <Clock className="w-3 h-3" /> {hub.chargeTime} · 
                      <Star className="w-3 h-3 text-uber-yellow" /> {hub.rating}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold text-uber-green">{hub.stallsAvail}/{hub.stallsTotal}</div>
                    <div className="flex gap-0.5 mt-1 justify-end">
                      {Array.from({ length: hub.stallsTotal }).map((_, j) => (
                        <div key={j} className={`w-1.5 h-1.5 rounded-full ${j < hub.stallsAvail ? "bg-uber-green" : "bg-uber-gray-200"}`} />
                      ))}
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {selectedHub === hub.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-3 pb-3"
                    >
                      <div className="border-t border-border pt-3 flex items-center justify-between">
                        <div className="space-y-0.5 text-xs text-muted-foreground">
                          <div>Est. cost: <span className="text-foreground font-medium">${(parseFloat(hub.chargeTime) * hub.pricePerMin).toFixed(2)}</span></div>
                          <div>Range: <span className="text-foreground font-medium">+150 mi</span></div>
                        </div>
                        {reserved === hub.id ? (
                          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-uber-green-light text-uber-green text-sm font-semibold">
                            <Check className="w-4 h-4" /> Reserved
                          </div>
                        ) : (
                          <button
                            onClick={(e) => { e.stopPropagation(); handleReserve(hub.id); }}
                            disabled={reserving}
                            className="uber-btn rounded-full text-sm disabled:opacity-50"
                          >
                            {reserving ? "Reserving…" : "Reserve Stall"}
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-14 md:hidden" />
    </div>
  );
}

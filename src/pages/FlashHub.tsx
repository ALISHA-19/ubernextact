import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Clock, MapPin, Star, Check, Battery, Users } from "lucide-react";

const hubs = [
  { id: 1, name: "SOMA Hub Station", address: "185 Berry St", distance: "0.8 mi", stallsAvail: 3, stallsTotal: 8, chargeTime: "12 min", pricePerMin: 0.35, rating: 4.9, priority: true },
  { id: 2, name: "Mission Flash-Hub", address: "2100 Mission St", distance: "1.2 mi", stallsAvail: 1, stallsTotal: 6, chargeTime: "14 min", pricePerMin: 0.32, rating: 4.7, priority: false },
  { id: 3, name: "FiDi Supercharge", address: "101 California St", distance: "2.1 mi", stallsAvail: 5, stallsTotal: 12, chargeTime: "11 min", pricePerMin: 0.42, rating: 4.8, priority: true },
  { id: 4, name: "Sunset Quick-Charge", address: "1500 Irving St", distance: "4.5 mi", stallsAvail: 7, stallsTotal: 10, chargeTime: "13 min", pricePerMin: 0.28, rating: 4.6, priority: false },
];

export default function FlashHub() {
  const [selectedHub, setSelectedHub] = useState<number | null>(null);
  const [reserving, setReserving] = useState(false);
  const [reserved, setReserved] = useState<number | null>(null);

  const handleReserve = (hubId: number) => {
    setReserving(true);
    setTimeout(() => {
      setReserved(hubId);
      setReserving(false);
    }, 1500);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Zap className="w-6 h-6 text-primary" /> Flash-Hub
        </h1>
        <p className="text-sm text-muted-foreground mt-1">150 miles in 12 minutes. Zero queue time.</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="text-xl font-bold">16</div>
            <div className="text-xs text-muted-foreground">Stalls Available</div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-uber-blue/10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-uber-blue" />
          </div>
          <div>
            <div className="text-xl font-bold">0 min</div>
            <div className="text-xs text-muted-foreground">Avg Wait Time</div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-uber-orange/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-uber-orange" />
          </div>
          <div>
            <div className="text-xl font-bold">Gold</div>
            <div className="text-xs text-muted-foreground">Your Tier · Priority Access</div>
          </div>
        </div>
      </div>

      {/* Hub list */}
      <div className="space-y-3">
        {hubs.map((hub, i) => (
          <motion.div
            key={hub.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => setSelectedHub(selectedHub === hub.id ? null : hub.id)}
            className={`rounded-xl border bg-card p-4 cursor-pointer transition-all ${
              selectedHub === hub.id ? "border-primary glow-green" : "border-border hover:border-muted-foreground/30"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{hub.name}</span>
                    {hub.priority && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-uber-yellow/10 text-uber-yellow font-semibold">
                        PRIORITY
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> {hub.address} · {hub.distance}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 text-uber-yellow" /> {hub.rating}</span>
                    <span>${hub.pricePerMin}/min</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-1.5">
                  <Battery className="w-4 h-4 text-primary" />
                  <span className="text-sm font-bold text-primary">{hub.chargeTime}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {hub.stallsAvail}/{hub.stallsTotal} stalls
                </div>
                {/* Stall indicator dots */}
                <div className="flex gap-0.5 mt-1 justify-end">
                  {Array.from({ length: hub.stallsTotal }).map((_, j) => (
                    <div
                      key={j}
                      className={`w-1.5 h-1.5 rounded-full ${j < hub.stallsAvail ? "bg-primary" : "bg-muted"}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Expanded details */}
            <AnimatePresence>
              {selectedHub === hub.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-border"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Estimated cost: <span className="text-foreground font-medium">${(parseFloat(hub.chargeTime) * hub.pricePerMin).toFixed(2)}</span></div>
                      <div className="text-xs text-muted-foreground">Range added: <span className="text-foreground font-medium">150 mi</span></div>
                    </div>
                    {reserved === hub.id ? (
                      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-semibold">
                        <Check className="w-4 h-4" /> Reserved
                      </div>
                    ) : (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleReserve(hub.id); }}
                        disabled={reserving}
                        className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
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
  );
}

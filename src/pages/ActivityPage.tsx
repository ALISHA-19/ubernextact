import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Target, DollarSign, Clock, Zap, ChevronRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from "recharts";

const weeklyData = [
  { day: "Mon", rides: 42, data: 4.2 },
  { day: "Tue", rides: 48, data: 5.5 },
  { day: "Wed", rides: 39, data: 3.8 },
  { day: "Thu", rides: 51, data: 6.2 },
  { day: "Fri", rides: 55, data: 7.8 },
  { day: "Sat", rides: 58, data: 8.1 },
  { day: "Sun", rides: 44, data: 5.0 },
];

const pieData = [
  { name: "Potholes", value: 42, color: "hsl(28, 100%, 50%)" },
  { name: "5G Gaps", value: 23, color: "hsl(210, 100%, 50%)" },
  { name: "Traffic", value: 35, color: "hsl(0, 0%, 75%)" },
];

const stats = [
  { title: "Detection Rate", value: "94.2%", subtitle: "+2.1% this week", icon: Target },
  { title: "Hub Utilization", value: "84%", subtitle: "+5% this week", icon: Zap },
  { title: "Avg EPH", value: "$48.14", subtitle: "+$3.20 vs last week", icon: DollarSign },
  { title: "Data Revenue", value: "$1,247", subtitle: "This month", icon: TrendingUp },
];

export default function ActivityPage() {
  return (
    <div className="pb-20 md:pb-6">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold">Activity</h1>
        <p className="text-sm text-muted-foreground mt-1">Performance & intelligence metrics</p>
      </div>

      {/* Stats grid */}
      <div className="px-5 grid grid-cols-2 gap-3 mb-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-2xl uber-shadow p-4"
          >
            <s.icon className="w-5 h-5 text-muted-foreground mb-2" />
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.subtitle}</div>
          </motion.div>
        ))}
      </div>

      {/* Weekly earnings chart */}
      <div className="px-5 mb-6">
        <div className="bg-card rounded-2xl uber-shadow p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Weekly Earnings</h3>
            <div className="flex gap-3 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-foreground" /> Rides
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-uber-green" /> Data
              </span>
            </div>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} barGap={2}>
                <XAxis dataKey="day" tick={{ fill: "hsl(0,0%,65%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ background: "white", border: "1px solid hsl(0,0%,90%)", borderRadius: 12, fontSize: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }} />
                <Bar dataKey="rides" fill="hsl(0, 0%, 7%)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="data" fill="hsl(152, 69%, 40%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Anomaly breakdown */}
      <div className="px-5 mb-6">
        <div className="bg-card rounded-2xl uber-shadow p-5">
          <h3 className="font-semibold mb-4">City Anomaly Breakdown</h3>
          <div className="flex items-center gap-6">
            <div className="w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value" strokeWidth={0}>
                    {pieData.map((d) => <Cell key={d.name} fill={d.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              {pieData.map((d) => (
                <div key={d.name} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm">
                    <span className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                    {d.name}
                  </span>
                  <span className="text-sm font-semibold">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="px-5 space-y-2">
        {["Earnings History", "Data Rewards Log", "Charging History"].map((label) => (
          <button key={label} className="w-full flex items-center justify-between p-4 bg-card rounded-2xl uber-shadow">
            <span className="text-sm font-medium">{label}</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  );
}

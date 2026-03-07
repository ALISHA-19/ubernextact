import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Target, DollarSign } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const weeklyData = [
  { day: "Mon", accuracy: 92, utilization: 78, eph: 42 },
  { day: "Tue", accuracy: 95, utilization: 85, eph: 48 },
  { day: "Wed", accuracy: 88, utilization: 72, eph: 39 },
  { day: "Thu", accuracy: 94, utilization: 91, eph: 51 },
  { day: "Fri", accuracy: 97, utilization: 88, eph: 55 },
  { day: "Sat", accuracy: 93, utilization: 95, eph: 58 },
  { day: "Sun", accuracy: 91, utilization: 82, eph: 44 },
];

const pieData = [
  { name: "Potholes", value: 42, color: "hsl(28, 100%, 55%)" },
  { name: "5G Gaps", value: 23, color: "hsl(210, 100%, 56%)" },
  { name: "Traffic", value: 35, color: "hsl(0, 72%, 51%)" },
];

export default function MetricsDashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Metrics Engine</h1>
        <p className="text-sm text-muted-foreground mt-1">Infrastructure accuracy, fleet utilization & earnings performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "Detection Accuracy", value: "94.2%", icon: Target, trend: "+2.1%" },
          { title: "Hub Utilization", value: "84%", icon: BarChart3, trend: "+5%" },
          { title: "Avg EPH", value: "$48.14", icon: DollarSign, trend: "+8%" },
          { title: "Data Revenue", value: "$1,247", icon: TrendingUp, trend: "+34%" },
        ].map((m) => (
          <div key={m.title} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{m.title}</span>
              <m.icon className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl font-bold">{m.value}</div>
            <span className="text-xs text-primary font-medium">↑ {m.trend}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Weekly performance */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold mb-4">Weekly Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ background: "hsl(0,0%,10%)", border: "1px solid hsl(0,0%,16%)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="accuracy" fill="hsl(152, 69%, 53%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="utilization" fill="hsl(210, 100%, 56%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Anomaly breakdown */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold mb-4">Anomaly Breakdown</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" strokeWidth={0}>
                  {pieData.map((d) => (
                    <Cell key={d.name} fill={d.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                  {d.name}
                </span>
                <span className="font-medium">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

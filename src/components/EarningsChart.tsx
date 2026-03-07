import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { time: "6AM", rides: 12, data: 3.2 },
  { time: "8AM", rides: 45, data: 8.5 },
  { time: "10AM", rides: 38, data: 6.1 },
  { time: "12PM", rides: 52, data: 9.8 },
  { time: "2PM", rides: 41, data: 7.2 },
  { time: "4PM", rides: 58, data: 11.3 },
  { time: "6PM", rides: 65, data: 14.2 },
  { time: "8PM", rides: 48, data: 10.1 },
];

export default function EarningsChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-sm">Earnings Overview</h3>
          <p className="text-xs text-muted-foreground">Ride income + Data Rewards</p>
        </div>
        <div className="flex gap-3 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary" /> Rides
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-uber-blue" /> Data
          </span>
        </div>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(152, 69%, 53%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(152, 69%, 53%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(210, 100%, 56%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(210, 100%, 56%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                background: "hsl(0,0%,10%)",
                border: "1px solid hsl(0,0%,16%)",
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Area type="monotone" dataKey="rides" stroke="hsl(152, 69%, 53%)" fill="url(#greenGrad)" strokeWidth={2} />
            <Area type="monotone" dataKey="data" stroke="hsl(210, 100%, 56%)" fill="url(#blueGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

import { DollarSign, TrendingUp, Clock, Fuel } from "lucide-react";
import StatCard from "@/components/StatCard";
import SensingModeToggle from "@/components/SensingModeToggle";
import EarningsChart from "@/components/EarningsChart";
import DataRewardsLedger from "@/components/DataRewardsLedger";
import BatteryNav from "@/components/BatteryNav";

export default function DriverDashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Good evening, Marcus</h1>
        <p className="text-sm text-muted-foreground mt-1">Your car and phone are earning while you drive.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's Earnings"
          value="$284.50"
          icon={DollarSign}
          trend={{ value: "12%", positive: true }}
          subtitle="vs yesterday"
          glow
        />
        <StatCard
          title="Data Rewards"
          value="$14.82"
          icon={TrendingUp}
          trend={{ value: "34%", positive: true }}
          subtitle="passive income"
        />
        <StatCard
          title="Online Hours"
          value="6.2h"
          icon={Clock}
          subtitle="EPH: $45.89"
        />
        <StatCard
          title="Range Left"
          value="82 mi"
          icon={Fuel}
          trend={{ value: "Low", positive: false }}
          subtitle="charge recommended"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <EarningsChart />
          <DataRewardsLedger />
        </div>
        <div className="space-y-4">
          <BatteryNav />
          <SensingModeToggle />
        </div>
      </div>
    </div>
  );
}

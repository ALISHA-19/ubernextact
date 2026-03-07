import { NavLink, useLocation } from "react-router-dom";
import { Home, MapPin, Zap, BarChart3, User } from "lucide-react";

const tabs = [
  { path: "/", label: "Home", icon: Home },
  { path: "/city-insights", label: "Insights", icon: MapPin },
  { path: "/flash-hub", label: "Charge", icon: Zap },
  { path: "/metrics", label: "Activity", icon: BarChart3 },
  { path: "/account", label: "Account", icon: User },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border uber-shadow-top md:hidden">
      <div className="flex items-center justify-around h-14 px-2">
        {tabs.map(({ path, label, icon: Icon }) => {
          const active = location.pathname === path;
          return (
            <NavLink
              key={path}
              to={path}
              className="flex flex-col items-center gap-0.5 py-1 px-3"
            >
              <Icon className={`w-5 h-5 ${active ? "text-foreground" : "text-muted-foreground"}`} strokeWidth={active ? 2.5 : 1.5} />
              <span className={`text-[10px] ${active ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                {label}
              </span>
            </NavLink>
          );
        })}
      </div>
      {/* Safe area padding for iOS */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}

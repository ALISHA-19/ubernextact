import { NavLink, useLocation } from "react-router-dom";
import { Home, MapPin, Zap, BarChart3, User, Menu } from "lucide-react";

const links = [
  { path: "/", label: "Home", icon: Home },
  { path: "/city-insights", label: "City Insights", icon: MapPin },
  { path: "/flash-hub", label: "Flash-Hub", icon: Zap },
  { path: "/metrics", label: "Activity", icon: BarChart3 },
  { path: "/account", label: "Account", icon: User },
];

export default function TopNav() {
  const location = useLocation();

  return (
    <header className="hidden md:flex items-center justify-between h-16 px-6 bg-card border-b border-border sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <span className="text-xl font-bold tracking-tight">Uber</span>
        <nav className="flex items-center gap-1">
          {links.slice(0, 4).map(({ path, label, icon: Icon }) => {
            const active = location.pathname === path;
            return (
              <NavLink
                key={path}
                to={path}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            );
          })}
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <NavLink
          to="/account"
          className="flex items-center gap-2 px-3 py-2 rounded-full text-sm text-muted-foreground hover:bg-secondary transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <span className="font-medium">Marcus</span>
        </NavLink>
      </div>
    </header>
  );
}

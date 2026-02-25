import { useState } from "react";
import {
  LayoutDashboard,
  ShieldCheck,
  Calendar,
  BarChart2,
  Layers,
  Database,
  GitBranch,
  Settings,
  HelpCircle,
  Hexagon,
  icons,
  TypeIcon,
} from "lucide-react";

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

const SidebarItem = ({
  icon: Icon,
  label,
  viewId,
  active = false,
  collapsed,
  badge,
  onClick,
}: {
  icon: any;
  label?: string;
  viewId: string;
  active?: boolean;
  collapsed: boolean;
  badge?: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
      active ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"
    } ${collapsed ? "justify-center" : "gap-3"}`}
  >
    <Icon
      size={18}
      className={
        active ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
      }
    />
    {!collapsed && <span className="text-sm font-medium">{label}</span>}

    {!collapsed && badge && (
      <span className="ml-auto text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
        {badge}
      </span>
    )}
  </button>
);

type SectionLabelProps = {
  label: string;
  collapsed?: boolean;
};

const SectionLabel = ({ label, collapsed = false }: SectionLabelProps) => (
  <div className="px-3 mb-2 mt-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
    {!collapsed && label}
  </div>
);
interface SidebarProps {
  collapsed: boolean;
  activeView: string;
  onNavigate: (view: string) => void;
}
export const Sidebar = ({ activeView, onNavigate }: SidebarProps) => {
  const [collapsed, setcollapsed] = useState(false);
  const togglesidebar = () => {
    setcollapsed(!collapsed);
  };
  return (
    <div
      className={`w-64 h-full bg-white border-r border-gray-200 flex flex-col shrink-0 ${collapsed ? "collapsed" : ""}`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100 cursor-pointer">
        <div className="flex  items-center gap-18 text-blue-600">
          <span
            className="flex  gap-2 items-center  font-bold text-lg text-gray-900 tracking-tight"
            onClick={() => onNavigate("dashboard")}
          >
            <Hexagon size={24} strokeWidth={2.5} className="text-blue-600" />
            {!collapsed && "FlowBuild"}
          </span>
          <button className="text-2xl cursor-pointer" onClick={togglesidebar}>
            {collapsed ? "➡" : "☰"}
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
        <SectionLabel label={!collapsed ? "Platform" : ""} />

        <SidebarItem
          icon={LayoutDashboard}
          label={!collapsed ? "Dashboard" : undefined}
          viewId="dashboard"
          active={activeView === "dashboard"}
          collapsed={collapsed}
          onClick={() => onNavigate("dashboard")}
        />

        <SidebarItem
          icon={ShieldCheck}
          label="Compliance"
          viewId="compliance"
          active={activeView === "compliance"}
          collapsed={collapsed}
          onClick={() => onNavigate("compliance")}
        />

        <SidebarItem
          icon={Calendar}
          label="Scheduler"
          viewId="scheduler"
          badge="3"
          active={activeView === "scheduler"}
          collapsed={collapsed}
          onClick={() => onNavigate("scheduler")}
        />

        <SectionLabel label={!collapsed ? "Operations" : ""} />

        <SidebarItem
          icon={BarChart2}
          label="Analytics"
          viewId="analytics"
          active={activeView === "analytics"}
          collapsed={collapsed}
          onClick={() => onNavigate("analytics")}
        />

        <SidebarItem
          icon={Layers}
          label="Integrations"
          viewId="integrations"
          active={activeView === "integrations"}
          collapsed={collapsed}
          onClick={() => onNavigate("integrations")}
        />

        <SidebarItem
          icon={Database}
          label="Repository"
          viewId="repository"
          active={activeView === "repository"}
          collapsed={collapsed}
          onClick={() => onNavigate("repository")}
        />

        <SidebarItem
          icon={GitBranch}
          label="Workflows"
          viewId="workflows"
          active={activeView === "workflows"}
          collapsed={collapsed}
          onClick={() => onNavigate("workflows")}
        />

        <SectionLabel label={!collapsed ? "System" : ""} />

        <SidebarItem
          icon={Settings}
          label="Settings"
          viewId="settings"
          active={activeView === "settings"}
          collapsed={collapsed}
          onClick={() => onNavigate("settings")}
        />

        <SidebarItem
          icon={HelpCircle}
          label="Help & Support"
          viewId="help"
          active={activeView === "help"}
          collapsed={collapsed}
          onClick={() => onNavigate("help")}
        />
      </div>

      {/* User Profile / Bottom Footer */}
      <div className="p-4 border-t border-gray-200">
        <div
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
          onClick={() => onNavigate("settings")}
        >
          <div className="w-8 h-8 rounded-full bg-linear-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-xs shadow-sm">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {!collapsed && "Jane Doe"}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {!collapsed && "jane@company.com"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

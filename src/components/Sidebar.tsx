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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  activeView: string;
  onNavigate: (view: string) => void;
  onToggle: () => void;
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
    aria-label={label}
    title={label}
    className={`w-full flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
      active ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:bg-gray-100"
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

const SectionLabel = ({ label, collapsed = false }: { label: string; collapsed?: boolean }) => (
  <div className={`px-3 mb-2 mt-6 text-xs font-semibold text-gray-400 uppercase tracking-wider ${collapsed ? "text-center opacity-0 h-0 my-0 overflow-hidden" : ""}`}>
    {label}
  </div>
);

export const Sidebar = ({ activeView, onNavigate, collapsed, onToggle }: SidebarProps) => {
  return (
    <div
      className={`h-full bg-white flex flex-col shrink-0 transition-all duration-300 ${collapsed ? "w-0 opacity-0 overflow-hidden border-r-0" : "w-64 border-r border-gray-200"}`}
    >
      {/* Logo */}
      <div className={`h-16 flex items-center px-6 border-b border-gray-100 cursor-pointer ${collapsed ? "justify-center" : "justify-between"}`}>
        <div
          className="flex items-center gap-2 text-gray-900 font-bold text-lg tracking-tight overflow-hidden"
          onClick={() => onNavigate("dashboard")}
        >
          <Hexagon size={24} strokeWidth={2.5} className="text-blue-600 shrink-0" />
          {!collapsed && <span className="truncate">FlowBuild</span>}
        </div>

        {/* Toggle button - hidden on mobile (handled by App.tsx header) */}
        <button
          className="hidden md:flex p-1 hover:bg-gray-100 rounded-md text-gray-400 transition-colors"
          onClick={onToggle}
        >
          <ChevronLeft size={18} />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
        <SectionLabel label="Platform" collapsed={collapsed} />

        <SidebarItem
          icon={LayoutDashboard}
          label="Dashboard"
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

        <SectionLabel label="Operations" collapsed={collapsed} />

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
          active={activeView === "workflows" || activeView === "workflow-editor"}
          collapsed={collapsed}
          onClick={() => onNavigate("workflows")}
        />

        <div className="space-y-1">
          <SidebarItem
            icon={Layers}
            label="Logic Modules"
            viewId="modules"
            active={activeView === "modules" || activeView === "module-editor" || activeView === "terminal-logic"}
            collapsed={collapsed}
            onClick={() => onNavigate("modules")}
          />
          {!collapsed && (
            <div className="pl-9 space-y-1">
              <button
                onClick={() => onNavigate("modules")}
                className={`w-full text-left px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeView === "modules" || activeView === "module-editor" ? "text-blue-600 bg-blue-50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                Module Library
              </button>
              <button
                onClick={() => onNavigate("terminal-logic")}
                className={`w-full text-left px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeView === "terminal-logic" ? "text-blue-600 bg-blue-50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                Terminal Logic
              </button>
            </div>
          )}
        </div>

        <SectionLabel label="System" collapsed={collapsed} />

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
          className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${collapsed ? "justify-center" : ""}`}
          onClick={() => onNavigate("settings")}
        >
          <div className="w-8 h-8 rounded-full bg-linear-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-xs shadow-sm shrink-0">
            JD
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Jane Doe</p>
              <p className="text-xs text-gray-500 truncate">jane@company.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

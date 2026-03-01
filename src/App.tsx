import React, { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { StructuredWorkflowEditor } from "./components/StructuredWorkflowEditor";
import { Menu, X } from "lucide-react";

// View Imports
import { DashboardView } from "./components/views/DashboardView";
import { AnalyticsView } from "./components/views/AnalyticsView";
import { ComplianceView } from "./components/views/ComplianceView";
import { IntegrationsView } from "./components/views/IntegrationsView";
import { SchedulerView } from "./components/views/SchedulerView";
import { RepositoryView } from "./components/views/RepositoryView";
import { SettingsView } from "./components/views/SettingsView";
import { HelpView } from "./components/views/HelpView";
import { ModulesView } from "./components/views/ModulesView";

const App = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigate = (view: string) => {
    setActiveView(view);
    setIsMobileMenuOpen(false); // Close mobile menu on navigation
    if (["workflows", "modules", "module-editor"].includes(view)) {
      setIsSidebarCollapsed(true);
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardView />;
      case "analytics":
        return <AnalyticsView />;
      case "compliance":
        return <ComplianceView />;
      case "integrations":
        return <IntegrationsView />;
      case "scheduler":
        return <SchedulerView />;
      case "repository":
        return <RepositoryView />;
      case "settings":
        return <SettingsView />;
      case "help":
        return <HelpView />;
      case "modules":
        return <ModulesView onEditModule={(name) => setActiveView("module-editor")} />;
      case "module-editor":
        return <StructuredWorkflowEditor mode="module" key="module-editor" />;
      case "workflows":
      default:
        return <StructuredWorkflowEditor mode="workflow" />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gray-50 overflow-hidden font-sans text-gray-900 selection:bg-blue-100">
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 flex items-center px-4 justify-between">
        <div className="flex items-center gap-2 font-bold text-gray-900">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white">F</div>
          <span>FlowBuild</span>
        </div>
        <button
          onClick={toggleMobileMenu}
          className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar - Desktop and Mobile Overlay */}
      <div className={`
        fixed inset-0 z-40 md:relative md:flex md:inset-auto
        ${isMobileMenuOpen ? "block" : "hidden"}
      `}>
        {/* Backdrop for mobile */}
        <div
          className="absolute inset-0 bg-gray-900/50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div className="relative h-full shrink-0 z-50">
          <Sidebar
            activeView={activeView}
            onNavigate={handleNavigate}
            collapsed={isSidebarCollapsed}
            onToggle={toggleSidebar}
          />
        </div>
      </div>

      <main className="flex-1 h-full relative flex flex-col min-w-0 bg-gray-50 pt-16 md:pt-0">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;

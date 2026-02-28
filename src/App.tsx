import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar";
// RightPanel removed as per request to maximize canvas space
import { StructuredWorkflowEditor } from "./components/StructuredWorkflowEditor";

// View Imports
import { DashboardView } from "./components/views/DashboardView";
import { AnalyticsView } from "./components/views/AnalyticsView";
import { ComplianceView } from "./components/views/ComplianceView";
import { IntegrationsView } from "./components/views/IntegrationsView";
import { SchedulerView } from "./components/views/SchedulerView";
import { RepositoryView } from "./components/views/RepositoryView";
import { SettingsView } from "./components/views/SettingsView";
import { HelpView } from "./components/views/HelpView";

const App = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [collapsed, setcollapsed] = useState(false);
  const togglesidebar = () => {
    setcollapsed(!collapsed);
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
      case "workflows":
      default:
        return <StructuredWorkflowEditor />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gray-50 overflow-hidden font-sans text-gray-900 selection:bg-blue-100">
      <div className="hidden md:flex flex-col h-full shrink-0">
        <Sidebar
          activeView={activeView}
          onNavigate={setActiveView}
          collapsed={collapsed}
        />
      </div>
      <button
        className="text-2xl  text cursor-pointer  mb-187 "
        onClick={togglesidebar}
      >
        {""}
      </button>
      <main className="flex-1 h-full relative flex flex-col min-w-0 bg-gray-50">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;

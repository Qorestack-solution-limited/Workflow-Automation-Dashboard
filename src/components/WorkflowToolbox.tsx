import React from "react";
import {
  Zap,
  FileJson,
  ArrowRightLeft,
  Filter,
  Database,
  Globe,
  Clock,
  Code,
  Mail,
  Slack,
  MessageSquare,
  Search,
  GitBranch,
  Repeat,
  FileText,
  Type,
  Calculator,
  Calendar,
  UserPlus,
} from "lucide-react";

const ToolboxItem = ({ type, label, icon: Icon, color, iconName }: any) => {
  const onDragStart = (
    event: React.DragEvent,
    nodeType: string,
    nodeLabel: string,
    nodeIcon: string,
    nodeColor: string,
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("application/label", nodeLabel);
    event.dataTransfer.setData("application/icon", nodeIcon);
    event.dataTransfer.setData("application/color", nodeColor);
    event.dataTransfer.effectAllowed = "move";
  };

  const hoverColors: Record<string, string> = {
    "text-amber-600": "group-hover:text-amber-600 group-hover:bg-amber-600/10",
    "text-cyan-600": "group-hover:text-cyan-600 group-hover:bg-cyan-600/10",
    "text-purple-600": "group-hover:text-purple-600 group-hover:bg-purple-600/10",
    "text-blue-600": "group-hover:text-blue-600 group-hover:bg-blue-600/10",
    "text-orange-600": "group-hover:text-orange-600 group-hover:bg-orange-600/10",
    "text-gray-600": "group-hover:text-gray-600 group-hover:bg-gray-600/10",
    "text-indigo-600": "group-hover:text-indigo-600 group-hover:bg-indigo-600/10",
    "text-green-600": "group-hover:text-green-600 group-hover:bg-green-600/10",
    "text-blue-500": "group-hover:text-blue-500 group-hover:bg-blue-500/10",
    "text-red-600": "group-hover:text-red-600 group-hover:bg-red-600/10",
    "text-yellow-600": "group-hover:text-yellow-600 group-hover:bg-yellow-600/10",
    "text-red-500": "group-hover:text-red-500 group-hover:bg-red-500/10",
    "text-purple-500": "group-hover:text-purple-500 group-hover:bg-purple-500/10",
    "text-emerald-500": "group-hover:text-emerald-500 group-hover:bg-emerald-500/10",
  };

  return (
    <div
      className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg cursor-grab hover:border-blue-400 hover:shadow-sm transition-all mb-2 group active:cursor-grabbing"
      draggable
      onDragStart={(e) => onDragStart(e, "custom", label, iconName, color)}
    >
      <div
        className={`p-1.5 rounded-md bg-gray-50 text-gray-500 ${hoverColors[color] || ""} transition-colors`}
      >
        <Icon size={16} />
      </div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
  );
};

const CategoryLabel = ({ label }: { label: string }) => (
  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 mt-4 pl-1">
    {label}
  </div>
);

export const WorkflowToolbox = () => {
  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 flex flex-col shrink-0">
      <div className="p-4 border-b border-gray-100">
        <h2 className="font-bold text-gray-900">Builder</h2>
        <p className="text-xs text-gray-500 mb-3">Drag nodes to the canvas</p>
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search components..."
            className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-xs focus:ring-1 focus:ring-blue-500 focus:bg-white outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <CategoryLabel label="Logic" />
        <ToolboxItem
          type="custom"
          label="Condition"
          icon={GitBranch}
          iconName="GitBranch"
          color="text-amber-600"
        />
        <ToolboxItem
          type="custom"
          label="Loop"
          icon={Repeat}
          iconName="Repeat"
          color="text-cyan-600"
        />

        <CategoryLabel label="Triggers & Events" />
        <ToolboxItem
          type="custom"
          label="Webhook"
          icon={Globe}
          iconName="Globe"
          color="text-purple-600"
        />
        <ToolboxItem
          type="custom"
          label="Schedule"
          icon={Clock}
          iconName="Clock"
          color="text-blue-600"
        />
        <ToolboxItem
          type="custom"
          label="Form Submit"
          icon={Zap}
          iconName="Zap"
          color="text-orange-600"
        />
        <ToolboxItem
          type="custom"
          label="Manual Trigger"
          icon={Zap}
          iconName="Zap"
          color="text-gray-600"
        />
        <ToolboxItem
          type="custom"
          label="Incoming SFTP"
          icon={Database}
          iconName="Database"
          color="text-indigo-600"
        />
        <ToolboxItem
          type="custom"
          label="Shopify Webhook"
          icon={Globe}
          iconName="Globe"
          color="text-emerald-500"
        />

        <CategoryLabel label="Transformers" />
        <ToolboxItem
          type="custom"
          label="Set Value"
          icon={FileText}
          iconName="FileText"
          color="text-indigo-600"
        />
        <ToolboxItem
          type="custom"
          label="Data Mapper"
          icon={ArrowRightLeft}
          iconName="ArrowRightLeft"
          color="text-green-600"
        />
        <ToolboxItem
          type="custom"
          label="HTTP Lookup"
          icon={Globe}
          iconName="Globe"
          color="text-blue-500"
        />
        <ToolboxItem
          type="custom"
          label="Filter"
          icon={Filter}
          iconName="Filter"
          color="text-red-600"
        />
        <ToolboxItem
          type="custom"
          label="JS Code"
          icon={Code}
          iconName="Code"
          color="text-yellow-600"
        />

        <CategoryLabel label="Specialized Transformers" />
        <ToolboxItem
          type="custom"
          label="String: Cut"
          icon={Type}
          iconName="Type"
          color="text-blue-600"
        />
        <ToolboxItem
          type="custom"
          label="String: Case"
          icon={Type}
          iconName="Type"
          color="text-blue-600"
        />
        <ToolboxItem
          type="custom"
          label="String: Join"
          icon={Type}
          iconName="Type"
          color="text-blue-600"
        />
        <ToolboxItem
          type="custom"
          label="String: Replace"
          icon={Type}
          iconName="Type"
          color="text-blue-600"
        />
        <ToolboxItem
          type="custom"
          label="Math: Calculate"
          icon={Calculator}
          iconName="Calculator"
          color="text-purple-600"
        />
        <ToolboxItem
          type="custom"
          label="Number: Format"
          icon={Calculator}
          iconName="Calculator"
          color="text-purple-600"
        />
        <ToolboxItem
          type="custom"
          label="Date: Format"
          icon={Calendar}
          iconName="Calendar"
          color="text-orange-600"
        />
        <ToolboxItem
          type="custom"
          label="Date: Add/Subtract"
          icon={Calendar}
          iconName="Calendar"
          color="text-orange-600"
        />
        <ToolboxItem
          type="custom"
          label="Enrichment: Customer"
          icon={UserPlus}
          iconName="UserPlus"
          color="text-pink-600"
        />
        <ToolboxItem
          type="custom"
          label="Enrichment: Product"
          icon={UserPlus}
          iconName="UserPlus"
          color="text-pink-600"
        />

        <CategoryLabel label="Integrations" />
        <ToolboxItem
          type="custom"
          label="Database Query"
          icon={Database}
          iconName="Database"
          color="text-blue-500"
        />
        <ToolboxItem
          type="custom"
          label="Send Email"
          icon={Mail}
          iconName="Mail"
          color="text-red-500"
        />
        <ToolboxItem
          type="custom"
          label="Slack Message"
          icon={Slack}
          iconName="Slack"
          color="text-purple-500"
        />
        <ToolboxItem
          type="custom"
          label="OpenAI Prompt"
          icon={MessageSquare}
          iconName="MessageSquare"
          color="text-emerald-500"
        />
      </div>
    </div>
  );
};

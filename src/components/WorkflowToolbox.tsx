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
} from "lucide-react";

const ToolboxItem = ({ type, label, icon: Icon, color }: any) => {
  const onDragStart = (
    event: React.DragEvent,
    nodeType: string,
    nodeLabel: string,
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("application/label", nodeLabel);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg cursor-grab hover:border-blue-400 hover:shadow-sm transition-all mb-2 group active:cursor-grabbing"
      draggable
      onDragStart={(e) => onDragStart(e, "custom", label)}
    >
      <div
        className={`p-1.5 rounded-md bg-gray-50 text-gray-500 group-hover:${color} group-hover:bg-opacity-10 transition-colors`}
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
        <CategoryLabel label="Triggers & Events" />
        <ToolboxItem
          type="custom"
          label="Webhook"
          icon={Globe}
          color="text-purple-600"
        />
        <ToolboxItem
          type="custom"
          label="Schedule"
          icon={Clock}
          color="text-blue-600"
        />
        <ToolboxItem
          type="custom"
          label="Form Submit"
          icon={Zap}
          color="text-orange-600"
        />
        <ToolboxItem
          type="custom"
          label="Manual Trigger"
          icon={Zap}
          color="text-gray-600"
        />

        <CategoryLabel label="Transformers" />
        <ToolboxItem
          type="custom"
          label="JSON Parser"
          icon={FileJson}
          color="text-indigo-600"
        />
        <ToolboxItem
          type="custom"
          label="Data Mapper"
          icon={ArrowRightLeft}
          color="text-green-600"
        />
        <ToolboxItem
          type="custom"
          label="Filter"
          icon={Filter}
          color="text-red-600"
        />
        <ToolboxItem
          type="custom"
          label="JS Code"
          icon={Code}
          color="text-yellow-600"
        />

        <CategoryLabel label="Integrations" />
        <ToolboxItem
          type="custom"
          label="Database Query"
          icon={Database}
          color="text-blue-500"
        />
        <ToolboxItem
          type="custom"
          label="Send Email"
          icon={Mail}
          color="text-red-500"
        />
        <ToolboxItem
          type="custom"
          label="Slack Message"
          icon={Slack}
          color="text-purple-500"
        />
        <ToolboxItem
          type="custom"
          label="OpenAI Prompt"
          icon={MessageSquare}
          color="text-emerald-500"
        />
      </div>
    </div>
  );
};

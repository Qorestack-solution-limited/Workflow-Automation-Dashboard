import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import {
  Zap,
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
  ShoppingBag,
  MousePointerClick,
  FolderInput,
} from "lucide-react";

const ToolboxItem = ({ label, icon: Icon, color, iconName }: any) => {
  const onDragStart = (
    event: React.DragEvent,
    nodeType: string,
    nodeLabel: string,
    nodeIcon: string,
    nodeColor: string,
  ) => {
    event.dataTransfer.setData("application/label", nodeLabel);
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
        className={`p-1.5 rounded-md bg-gray-50 text-gray-500 ${hoverColors[color] || ""} transition-colors shrink-0`}
      >
        <Icon size={16} />
      </div>
      <span className="text-sm font-medium text-gray-700 truncate">{label}</span>
    </div>
  );
};

const CategoryLabel = ({ label }: { label: string }) => (
  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 mt-6 pl-1">
    {label}
  </div>
);

export const WorkflowToolbox = ({ mode = 'workflow' }: { mode?: 'workflow' | 'module' }) => {
  return (
    <div className="w-full h-full bg-white flex flex-col shrink-0 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h2 className="font-bold text-gray-900 text-sm">Components</h2>
        <p className="text-[10px] text-gray-500 mb-3">Drag to the canvas</p>
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-xs focus:ring-1 focus:ring-blue-500 focus:bg-white outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <Accordion type="multiple" defaultValue={["logic", "triggers", "transformers"]} className="w-full">
          <AccordionItem value="logic" className="border-b-0 px-4">
            <AccordionTrigger className="hover:no-underline py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Logic
            </AccordionTrigger>
            <AccordionContent className="pb-2">
              <ToolboxItem label="Condition" icon={GitBranch} color="text-amber-600" />
              <ToolboxItem label="Loop" icon={Repeat} color="text-cyan-600" />
            </AccordionContent>
          </AccordionItem>

          {mode === 'workflow' && (
            <AccordionItem value="triggers" className="border-b-0 px-4">
              <AccordionTrigger className="hover:no-underline py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Triggers
              </AccordionTrigger>
              <AccordionContent className="pb-2">
                <ToolboxItem label="Webhook" icon={Globe} color="text-purple-600" />
                <ToolboxItem label="Schedule" icon={Clock} color="text-blue-600" />
                <ToolboxItem label="Form Submit" icon={Zap} color="text-orange-600" />
                <ToolboxItem label="Manual Trigger" icon={MousePointerClick} color="text-emerald-500" />
                <ToolboxItem label="Incoming SFTP" icon={FolderInput} color="text-indigo-600" />
                <ToolboxItem label="Shopify Webhook" icon={ShoppingBag} color="text-green-600" />
              </AccordionContent>
            </AccordionItem>
          )}

          <AccordionItem value="transformers" className="border-b-0 px-4">
            <AccordionTrigger className="hover:no-underline py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Transformers
            </AccordionTrigger>
            <AccordionContent className="pb-2">
              <ToolboxItem label="Set Value" icon={FileText} color="text-indigo-600" />
              <ToolboxItem label="Data Mapper" icon={ArrowRightLeft} color="text-green-600" />
              <ToolboxItem label="Filter" icon={Filter} color="text-red-600" />
              <ToolboxItem label="JS Code" icon={Code} color="text-yellow-600" />
            </AccordionContent>
          </AccordionItem>

          {mode === 'workflow' && (
            <AccordionItem value="modules" className="border-b-0 px-4">
              <AccordionTrigger className="hover:no-underline py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Modules
              </AccordionTrigger>
              <AccordionContent className="pb-2">
                <ToolboxItem label="Call Module" icon={GitBranch} color="text-blue-600" />
              </AccordionContent>
            </AccordionItem>
          )}

          <AccordionItem value="integrations" className="border-b-0 px-4">
            <AccordionTrigger className="hover:no-underline py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Integrations
            </AccordionTrigger>
            <AccordionContent className="pb-2">
              <ToolboxItem label="Database" icon={Database} color="text-blue-500" />
              <ToolboxItem label="Email" icon={Mail} color="text-red-500" />
              <ToolboxItem label="Slack" icon={Slack} color="text-purple-500" />
              <ToolboxItem label="AI Prompt" icon={MessageSquare} color="text-emerald-500" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

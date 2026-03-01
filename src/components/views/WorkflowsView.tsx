import React from 'react';
import { Plus, Zap, MoreVertical, Search, Clock, Globe, Calendar, Play } from 'lucide-react';

const WorkflowCard = ({ name, description, triggerType, status, lastModified, onEdit }: any) => {
  const TriggerIcon = triggerType === 'Webhook' ? Globe : triggerType === 'Schedule' ? Calendar : Zap;

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all group flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-amber-50 rounded-lg group-hover:bg-amber-500 transition-colors">
          <TriggerIcon size={20} className="text-amber-600 group-hover:text-white transition-colors" />
        </div>
        <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                status === 'active' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-500'
            }`}>
                {status}
            </span>
            <button className="text-gray-400 hover:text-gray-600 p-1 rounded-md">
                <MoreVertical size={16} />
            </button>
        </div>
      </div>
      <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors cursor-pointer" onClick={onEdit}>{name}</h3>
      <p className="text-xs text-gray-500 mb-4 line-clamp-2">{description}</p>

      <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
          <Clock size={12} />
          <span>Modified {lastModified}</span>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded uppercase tracking-wider">{triggerType}</span>
            <button className="p-1.5 bg-gray-50 hover:bg-blue-50 text-gray-400 hover:text-blue-600 rounded transition-colors" title="Run Now">
                <Play size={12} fill="currentColor" />
            </button>
        </div>
      </div>
    </div>
  );
};

export const WorkflowsView = ({ onEditWorkflow }: { onEditWorkflow: (name: string) => void }) => {
  return (
    <div className="p-4 sm:p-8 h-full overflow-y-auto bg-gray-50/50">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Workflows</h1>
          <p className="text-sm text-gray-500">Automate your business logic with triggers and modules</p>
        </div>
        <button
          onClick={() => onEditWorkflow("New Workflow")}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium shadow-sm transition-all"
        >
          <Plus size={16} />
          <span>Create Workflow</span>
        </button>
      </div>

      <div className="mb-6">
        <div className="relative w-full sm:max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
                type="text"
                placeholder="Search workflows..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        <WorkflowCard
          name="Shopify Order Synchronization"
          description="Syncs new orders to the ERP and notifies the warehouse team via Slack."
          triggerType="Webhook"
          status="active"
          lastModified="10 mins ago"
          onEdit={() => onEditWorkflow("Shopify Order Synchronization")}
        />
        <WorkflowCard
          name="Daily Inventory Cleanup"
          description="Runs every midnight to archive out-of-stock items and update catalog status."
          triggerType="Schedule"
          status="active"
          lastModified="3 hrs ago"
          onEdit={() => onEditWorkflow("Daily Inventory Cleanup")}
        />
        <WorkflowCard
          name="Customer Support Webhook"
          description="Processes incoming support tickets from the external form submission."
          triggerType="Form Submit"
          status="draft"
          lastModified="Yesterday"
          onEdit={() => onEditWorkflow("Customer Support Webhook")}
        />
      </div>
    </div>
  );
};

export default WorkflowsView;

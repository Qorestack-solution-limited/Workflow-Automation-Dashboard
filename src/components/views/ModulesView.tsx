import React from 'react';
import { Plus, GitBranch, MoreVertical, Search, Clock, Shield } from 'lucide-react';

const ModuleCard = ({ name, description, steps, lastModified, onEdit }: any) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all group flex flex-col h-full">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-600 transition-colors">
        <GitBranch size={20} className="text-blue-600 group-hover:text-white transition-colors" />
      </div>
      <button className="text-gray-400 hover:text-gray-600 p-1 rounded-md">
        <MoreVertical size={16} />
      </button>
    </div>
    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors cursor-pointer" onClick={onEdit}>{name}</h3>
    <p className="text-xs text-gray-500 mb-4 line-clamp-2">{description}</p>
    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
      <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
        <Clock size={12} />
        <span>Modified {lastModified}</span>
      </div>
      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider">{steps} Steps</span>
    </div>
  </div>
);

export const ModulesView = ({ onEditModule }: { onEditModule: (name: string) => void }) => {
  return (
    <div className="p-4 sm:p-8 h-full overflow-y-auto bg-gray-50/50">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Logic Modules</h1>
          <p className="text-sm text-gray-500">Reusable logic components for your workflows</p>
        </div>
        <button
          onClick={() => onEditModule("New Module")}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium shadow-sm transition-all"
        >
          <Plus size={16} />
          <span>Create Module</span>
        </button>
      </div>

      <div className="mb-6">
        <div className="relative w-full sm:max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
                type="text"
                placeholder="Search modules..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        <ModuleCard
          name="Standard Order Enrichment"
          description="Fetches customer tiers and applies discount logic based on loyalty status."
          steps={12}
          lastModified="2 hrs ago"
          onEdit={() => onEditModule("Standard Order Enrichment")}
        />
        <ModuleCard
          name="Customer Data Cleansing"
          description="Normalizes phone numbers, validates emails, and formats address strings."
          steps={8}
          lastModified="Yesterday"
          onEdit={() => onEditModule("Customer Data Cleansing")}
        />
        <ModuleCard
          name="VAT Calculation Engine"
          description="Global tax calculation logic supporting EU, US, and APAC regions."
          steps={15}
          lastModified="3 days ago"
          onEdit={() => onEditModule("VAT Calculation Engine")}
        />
      </div>
    </div>
  );
};

export default ModulesView;

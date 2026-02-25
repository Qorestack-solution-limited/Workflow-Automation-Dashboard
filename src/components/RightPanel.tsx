import React from 'react';
import { Search, PieChart, Activity, Zap, CheckCircle, FileCheck, ArrowRight } from 'lucide-react';

const ProgressItem = ({ label, percentage, color }: { label: string, percentage: number, color: string }) => (
  <div className="mb-4">
    <div className="flex justify-between items-center mb-1.5">
      <span className="text-xs font-medium text-gray-700">{label}</span>
      <span className="text-xs font-semibold text-gray-900">{percentage}%</span>
    </div>
    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div 
        className={`h-full rounded-full ${color}`} 
        style={{ width: `${percentage}%` }} 
      />
    </div>
  </div>
);

const InsightCard = ({ title, value, icon: Icon, trend, trendUp }: { title: string, value: string, icon: any, trend: string, trendUp: boolean }) => (
  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
    <div className="flex justify-between items-start mb-2">
      <div className="p-1.5 bg-white rounded-lg shadow-sm text-gray-600">
        <Icon size={14} />
      </div>
      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${trendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
        {trend}
      </span>
    </div>
    <div className="text-lg font-bold text-gray-900 mb-0.5">{value}</div>
    <div className="text-[11px] text-gray-500 font-medium">{title}</div>
  </div>
);

const FlowObjectiveItem = ({ title, status }: { title: string, status: 'complete' | 'active' | 'pending' }) => {
  const statusStyles = {
    complete: { icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    active: { icon: Activity, color: 'text-blue-500', bg: 'bg-blue-50' },
    pending: { icon: ArrowRight, color: 'text-gray-400', bg: 'bg-gray-50' },
  };
  
  const style = statusStyles[status];
  const Icon = style.icon;

  return (
    <div className="flex items-center gap-3 p-2.5 rounded-lg border border-gray-100 bg-white shadow-sm mb-2 hover:shadow-md transition-shadow cursor-default">
      <div className={`p-1.5 rounded-md ${style.bg} ${style.color}`}>
        <Icon size={14} />
      </div>
      <span className="text-xs font-medium text-gray-700 flex-1">{title}</span>
    </div>
  );
};

export const RightPanel = () => {
  return (
    <div className="w-72 h-full bg-white border-l border-gray-200 flex flex-col flex-shrink-0">
      {/* Search Header */}
      <div className="h-16 flex items-center px-5 border-b border-gray-100">
        <div className="relative w-full">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search insights..." 
            className="w-full pl-9 pr-3 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all outline-none"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5">
        
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <InsightCard 
            title="Success Rate" 
            value="98.2%" 
            icon={Zap} 
            trend="+2.4%" 
            trendUp={true} 
          />
          <InsightCard 
            title="Avg Time" 
            value="1.2s" 
            icon={Activity} 
            trend="-0.3s" 
            trendUp={true} 
          />
        </div>

        {/* Automation Coverage Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <PieChart size={16} className="text-blue-600" />
            <h3 className="font-semibold text-gray-900 text-sm">Automation Coverage</h3>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
             <ProgressItem label="Workflow Efficiency" percentage={92} color="bg-gradient-to-r from-blue-500 to-purple-500" />
             <ProgressItem label="Node Optimization" percentage={78} color="bg-gradient-to-r from-emerald-400 to-emerald-600" />
             <ProgressItem label="Error Handling" percentage={45} color="bg-gradient-to-r from-orange-400 to-orange-600" />
          </div>
        </div>

        {/* Flow Objectives */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FileCheck size={16} className="text-purple-600" />
            <h3 className="font-semibold text-gray-900 text-sm">Flow Objectives</h3>
          </div>
          <div className="space-y-1">
             <FlowObjectiveItem title="Output Generation" status="complete" />
             <FlowObjectiveItem title="Action Trigger" status="active" />
             <FlowObjectiveItem title="Data Validation" status="pending" />
             <FlowObjectiveItem title="Registration Form" status="pending" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default RightPanel;

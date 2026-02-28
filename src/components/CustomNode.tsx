import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { MoreHorizontal, AlertCircle, CheckCircle2, Clock, Activity } from 'lucide-react';

const Badge = ({ children, color }: { children: React.ReactNode; color: string }) => {
  const colorClasses:Record<string, string> = {
    green: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    orange: 'bg-orange-100 text-orange-700 border-orange-200',
    purple: 'bg-purple-100 text-purple-700 border-purple-200',
    red: 'bg-red-100 text-red-700 border-red-200',
    gray: 'bg-gray-100 text-gray-700 border-gray-200',
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${colorClasses[color] || colorClasses.gray} flex items-center gap-1`}>
      {children}
    </span>
  );
};

export const CustomNode = memo(({ id, data, selected }: { id: string; data: any; selected?: boolean }) => {
  const isContainer = data.label === 'Condition' || data.label === 'Loop' || data.isContainer;

  return (
    <div className={`${isContainer ? 'w-80 min-h-[200px] border-dashed' : 'w-64'} bg-white rounded-xl shadow-sm border ${selected ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-gray-200'} hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group`}>
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <div className={`p-2 rounded-lg ${data.iconBg || 'bg-gray-100'} ${data.iconColor || 'text-gray-600'}`}>
            {data.icon || <Activity size={16} />}
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreHorizontal size={16} />
          </button>
        </div>

        {/* Title & Subtitle */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight">{data.label}</h3>
            {data.branch && (
               <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase ${data.branch === 'true' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                 {data.branch}
               </span>
            )}
          </div>
          <p className="text-xs text-gray-500 font-medium">{data.subLabel || 'Workflow Node'}</p>
        </div>

        {/* Badges/Stats */}
        <div className="flex flex-wrap gap-2 mt-3">
           {data.stats && data.stats.map((stat: any, idx: number) => (
             <Badge key={idx} color={stat.color}>
               {stat.icon === 'check' && <CheckCircle2 size={10} />}
               {stat.icon === 'alert' && <AlertCircle size={10} />}
               {stat.icon === 'clock' && <Clock size={10} />}
               {stat.label}
             </Badge>
           ))}
        </div>

        {/* Configuration Summary */}
        <div className="mt-3 pt-3 border-t border-gray-50 space-y-1.5">
          {data.label === "Set Value" && data.key && (
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Set</span>
              <span className="text-[11px] font-mono bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-100 truncate flex-1">
                {data.key} = {data.value || "..."}
              </span>
            </div>
          )}
          {data.label === "Data Mapper" && data.mappings && data.mappings.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Maps</span>
              <span className="text-[11px] font-medium text-gray-600">
                {data.mappings.length} mapping{data.mappings.length > 1 ? 's' : ''} defined
              </span>
            </div>
          )}
          {data.label === "HTTP Lookup" && data.url && (
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold uppercase ${data.method === 'POST' ? 'text-orange-500' : 'text-blue-500'}`}>
                {data.method || 'GET'}
              </span>
              <span className="text-[11px] text-gray-600 truncate flex-1">
                {data.url}
              </span>
            </div>
          )}
          {data.label === "Filter" && data.conditionField && (
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase">If</span>
              <span className="text-[11px] font-medium text-gray-600 truncate flex-1">
                {data.conditionField} {data.operator || 'equals'} ...
              </span>
            </div>
          )}
          {data.label === "Webhook" && (
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-purple-500 uppercase">{data.method || 'POST'}</span>
              <span className="text-[11px] text-gray-500 truncate flex-1">/hooks/{id}</span>
            </div>
          )}
          {data.label === "Schedule" && data.cron && (
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-blue-500 uppercase">Cron</span>
              <span className="text-[11px] text-gray-600 font-mono">{data.cron}</span>
            </div>
          )}
          {data.label === "JS Code" && (
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-yellow-500 uppercase">Code</span>
              <span className="text-[11px] text-gray-500 italic">Custom script</span>
            </div>
          )}
        </div>

        {/* Conditional Branches */}
        {data.label === 'Condition' && (
          <div className="mt-6 flex gap-4 h-32">
            <div className="flex-1 border border-emerald-200 bg-emerald-50/30 rounded-lg p-2 flex flex-col items-center">
              <span className="text-[10px] font-bold text-emerald-600 uppercase mb-2">True</span>
              <div className="flex-1 w-full border-2 border-dashed border-emerald-100 rounded-md flex items-center justify-center">
                 <span className="text-[8px] text-emerald-400">Drop here</span>
              </div>
            </div>
            <div className="flex-1 border border-red-200 bg-red-50/30 rounded-lg p-2 flex flex-col items-center">
              <span className="text-[10px] font-bold text-red-600 uppercase mb-2">False</span>
              <div className="flex-1 w-full border-2 border-dashed border-red-100 rounded-md flex items-center justify-center">
                 <span className="text-[8px] text-red-400">Drop here</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Handles */}
      <Handle type="target" position={Position.Top} className="!w-3 !h-3 !bg-gray-400 !border-2 !border-white transition-colors group-hover:!bg-blue-500" />
      <Handle type="source" position={Position.Bottom} className="!w-3 !h-3 !bg-gray-400 !border-2 !border-white transition-colors group-hover:!bg-blue-500" />
    </div>
  );
});

export default CustomNode;

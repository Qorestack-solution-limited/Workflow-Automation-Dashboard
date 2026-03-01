import React from 'react';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Clock, 
  MoreVertical, 
  Search, 
  Filter 
} from 'lucide-react';

const ComplianceRow = ({ id, policy, status, lastCheck, auditor }: any) => {
  const statusStyles = {
    pass: { color: 'text-green-700 bg-green-50', icon: CheckCircle, text: 'Compliant' },
    fail: { color: 'text-red-700 bg-red-50', icon: XCircle, text: 'Violation' },
    warn: { color: 'text-orange-700 bg-orange-50', icon: AlertCircle, text: 'Warning' },
    check: { color: 'text-blue-700 bg-blue-50', icon: Clock, text: 'Checking' },
  };

  const Style = statusStyles[status as keyof typeof statusStyles];
  const Icon = Style.icon;

  return (
    <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
      <td className="py-4 px-4 sm:px-6 text-xs sm:text-sm font-medium text-gray-900">#{id}</td>
      <td className="py-4 px-4 sm:px-6 text-xs sm:text-sm text-gray-700 min-w-[150px]">{policy}</td>
      <td className="py-4 px-4 sm:px-6">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap ${Style.color}`}>
          <Icon size={12} />
          {Style.text}
        </span>
      </td>
      <td className="py-4 px-4 sm:px-6 text-xs sm:text-sm text-gray-500 whitespace-nowrap">{lastCheck}</td>
      <td className="hidden md:table-cell py-4 px-6 text-sm text-gray-500">{auditor}</td>
      <td className="py-4 px-4 sm:px-6 text-right">
        <button className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100">
          <MoreVertical size={16} />
        </button>
      </td>
    </tr>
  );
};

export const ComplianceView = () => {
  return (
    <div className="p-4 sm:p-8 h-full overflow-y-auto bg-gray-50/50">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Compliance & Audit</h1>
          <p className="text-sm text-gray-500">Monitor system adherence to policies</p>
        </div>
        <div className="flex gap-2">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">
                <Filter size={16} />
                Filter
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                Run Audit
            </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Table Header Filter */}
        <div className="p-4 border-b border-gray-100 bg-gray-50/30">
            <div className="relative w-full sm:max-w-md">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search policies..." 
                    className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
            </div>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
                <thead className="bg-gray-50/50 text-left">
                    <tr>
                    <th className="py-3 px-4 sm:px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="py-3 px-4 sm:px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Policy</th>
                    <th className="py-3 px-4 sm:px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="py-3 px-4 sm:px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Checked</th>
                    <th className="hidden md:table-cell py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Auditor</th>
                    <th className="py-3 px-4 sm:px-6 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <ComplianceRow id="3821" policy="GDPR Data Retention" status="pass" lastCheck="2 hrs ago" auditor="System" />
                    <ComplianceRow id="3822" policy="SOC2 Access Control" status="pass" lastCheck="5 hrs ago" auditor="Admin" />
                    <ComplianceRow id="3823" policy="PII Encryption" status="fail" lastCheck="1 day ago" auditor="Security Bot" />
                    <ComplianceRow id="3824" policy="API Rate Limiting" status="warn" lastCheck="12 hrs ago" auditor="System" />
                    <ComplianceRow id="3825" policy="Database Backups" status="check" lastCheck="Just now" auditor="Job #291" />
                    <ComplianceRow id="3826" policy="HIPAA Audit Logs" status="pass" lastCheck="3 days ago" auditor="Ext Auditor" />
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

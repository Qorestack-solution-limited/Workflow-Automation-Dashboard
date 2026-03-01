import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';

const executionData = [
  { name: 'Jan', success: 4000, error: 240 },
  { name: 'Feb', success: 3000, error: 139 },
  { name: 'Mar', success: 2000, error: 980 },
  { name: 'Apr', success: 2780, error: 390 },
  { name: 'May', success: 1890, error: 480 },
  { name: 'Jun', success: 2390, error: 380 },
];

const sourceData = [
  { name: 'API Triggers', value: 400, color: '#3b82f6' },
  { name: 'Scheduled', value: 300, color: '#10b981' },
  { name: 'Manual', value: 300, color: '#8b5cf6' },
  { name: 'Webhooks', value: 200, color: '#f59e0b' },
];

const latencyData = [
  { name: '00:00', ms: 120 },
  { name: '04:00', ms: 132 },
  { name: '08:00', ms: 450 },
  { name: '12:00', ms: 890 },
  { name: '16:00', ms: 340 },
  { name: '20:00', ms: 150 },
  { name: '23:59', ms: 110 },
];

export const AnalyticsView = () => {
  return (
    <div className="p-4 sm:p-8 h-full overflow-y-auto bg-gray-50/50">
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-sm text-gray-500">Deep dive into your system metrics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
        {/* Success vs Error */}
        <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-6">Execution Status</h3>
          <div className="h-64 sm:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={executionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="success" name="Successful" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="error" name="Failed" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trigger Sources */}
        <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-6">Trigger Sources</h3>
          <div className="h-64 sm:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius="60%"
                  outerRadius="80%"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Latency Chart */}
      <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm mb-8">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-6">System Latency (Avg ms)</h3>
        <div className="h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={latencyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Line type="monotone" dataKey="ms" stroke="#8b5cf6" strokeWidth={3} dot={{r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff'}} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Clock } from 'lucide-react';

const CalendarEvent = ({ title, time, type, duration }: any) => {
    const typeColors = {
        meeting: 'bg-blue-100 border-l-4 border-blue-500 text-blue-700',
        audit: 'bg-purple-100 border-l-4 border-purple-500 text-purple-700',
        maintenance: 'bg-orange-100 border-l-4 border-orange-500 text-orange-700',
    };

    return (
        <div className={`p-2 rounded mb-2 text-[10px] font-medium cursor-pointer hover:opacity-80 transition-opacity ${typeColors[type as keyof typeof typeColors] || 'bg-gray-100'}`}>
            <div className="flex justify-between mb-1">
                <span>{time}</span>
                <span className="opacity-75 hidden sm:inline">{duration}</span>
            </div>
            <div className="font-bold truncate">{title}</div>
        </div>
    );
};

export const SchedulerView = () => {
  const days = ['Mon 12', 'Tue 13', 'Wed 14', 'Thu 15', 'Fri 16', 'Sat 17', 'Sun 18'];
  const hours = Array.from({ length: 11 }, (_, i) => i + 8); // 8 AM to 6 PM

  return (
    <div className="p-4 sm:p-8 h-full flex flex-col bg-gray-50/50">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 shrink-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Scheduler</h1>
          <p className="text-sm text-gray-500">Manage automated job execution times</p>
        </div>
        <div className="flex gap-2">
            <div className="flex flex-1 sm:flex-none bg-white rounded-lg border border-gray-200 p-1 shadow-sm">
                <button className="p-1 hover:bg-gray-100 rounded text-gray-600"><ChevronLeft size={18} /></button>
                <div className="flex-1 px-4 py-1 font-medium text-xs sm:text-sm flex items-center justify-center whitespace-nowrap">Feb 2026</div>
                <button className="p-1 hover:bg-gray-100 rounded text-gray-600"><ChevronRight size={18} /></button>
            </div>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium shadow-sm">
                <Plus size={16} />
                <span className="hidden sm:inline">Schedule Job</span>
                <span className="sm:hidden">New</span>
            </button>
        </div>
      </div>

      <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col min-h-0">
        <div className="overflow-x-auto flex flex-col flex-1 min-h-0">
            {/* Header Row */}
            <div className="flex border-b border-gray-200 min-w-[800px]">
                <div className="w-16 border-r border-gray-100 bg-gray-50/50"></div>
                {days.map(day => (
                    <div key={day} className="flex-1 py-3 text-center text-xs sm:text-sm font-semibold text-gray-700 border-r border-gray-100 last:border-0 bg-gray-50/30">
                        {day}
                    </div>
                ))}
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto min-w-[800px] relative custom-scrollbar">
                {hours.map(hour => (
                    <div key={hour} className="flex min-h-[80px] border-b border-gray-100 last:border-0">
                        <div className="w-16 border-r border-gray-100 text-[10px] text-gray-400 font-medium p-2 text-right relative">
                            <span className="-top-2.5 right-2 absolute">{hour}:00</span>
                        </div>
                        {days.map((day, i) => (
                            <div key={`${day}-${hour}`} className="flex-1 border-r border-gray-100 last:border-0 p-1 relative group hover:bg-gray-50/30 transition-colors">
                                {i === 1 && hour === 9 && <CalendarEvent title="Data Sync" time="09:00" duration="30m" type="meeting" />}
                                {i === 2 && hour === 14 && <CalendarEvent title="System Audit" time="14:00" duration="1h" type="audit" />}
                                {i === 4 && hour === 10 && <CalendarEvent title="DB Backup" time="10:00" duration="15m" type="maintenance" />}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

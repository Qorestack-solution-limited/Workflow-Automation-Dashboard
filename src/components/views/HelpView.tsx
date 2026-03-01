import React from 'react';
import { HelpCircle, MessageCircle, FileText, ChevronRight } from 'lucide-react';

const FAQItem = ({ question, answer }: any) => (
  <div className="border border-gray-200 rounded-lg p-4 bg-white hover:border-blue-200 transition-colors cursor-pointer group">
    <div className="flex justify-between items-center mb-2">
      <h4 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">{question}</h4>
      <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-500 transition-colors shrink-0" />
    </div>
    <p className="text-sm text-gray-500 line-clamp-2">{answer}</p>
  </div>
);

export const HelpView = () => {
  return (
    <div className="p-4 sm:p-8 h-full overflow-y-auto bg-gray-50/50">
       <div className="text-center mb-12 max-w-2xl mx-auto pt-8 sm:pt-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 px-4">How can we help you?</h1>
        <div className="relative px-4">
             <input 
                type="text" 
                placeholder="Search help articles..."
                className="w-full px-6 py-3 rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all text-sm"
            />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto mb-12 px-4">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center hover:shadow-md transition-all cursor-pointer">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Documentation</h3>
            <p className="text-xs sm:text-sm text-gray-500 mb-4">Read our guides.</p>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">Read Docs</span>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center hover:shadow-md transition-all cursor-pointer">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Forum</h3>
            <p className="text-xs sm:text-sm text-gray-500 mb-4">Connect with peers.</p>
            <span className="text-[10px] font-bold text-green-600 uppercase tracking-wide">Join Now</span>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center hover:shadow-md transition-all cursor-pointer sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Support</h3>
            <p className="text-xs sm:text-sm text-gray-500 mb-4">Contact our team.</p>
            <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wide">Open Ticket</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
            <FAQItem question="How do I connect a new database?" answer="Go to the Integrations tab, select 'Database', and follow the connection wizard to input your credentials." />
            <FAQItem question="Can I schedule workflows to run hourly?" answer="Yes, use the Scheduler module to set up CRON-like schedules for any active workflow." />
            <FAQItem question="Where can I find my API keys?" answer="API keys are located in Settings > Security > API Tokens. You can generate new ones there." />
        </div>
      </div>
    </div>
  );
};

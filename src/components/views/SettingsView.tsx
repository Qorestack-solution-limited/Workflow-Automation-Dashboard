import React from 'react';
import { Save, Bell, Lock, User, Globe } from 'lucide-react';

export const SettingsView = () => {
  return (
    <div className="p-4 sm:p-8 h-full overflow-y-auto bg-gray-50/50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-sm text-gray-500">Manage your workspace configuration</p>
        </div>

        <div className="space-y-6">

            {/* Profile Section */}
            <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-100">
                    <User size={20} className="text-gray-400" />
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Profile</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
                        <input type="text" defaultValue="Jane Doe" className="w-full p-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white transition-all outline-none focus:ring-2 focus:ring-blue-100" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
                        <input type="email" defaultValue="jane@company.com" className="w-full p-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white transition-all outline-none focus:ring-2 focus:ring-blue-100" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Bio</label>
                        <textarea className="w-full p-2.5 border border-gray-200 rounded-lg text-sm h-24 bg-gray-50 focus:bg-white transition-all outline-none focus:ring-2 focus:ring-blue-100" placeholder="Tell us about yourself..." />
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-100">
                    <Bell size={20} className="text-gray-400" />
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <div className="text-sm font-medium text-gray-900">Email Alerts</div>
                            <div className="text-xs text-gray-500">Critical system alerts and daily summaries</div>
                        </div>
                        <input type="checkbox" defaultChecked className="w-10 h-5 appearance-none bg-gray-200 rounded-full checked:bg-blue-600 transition-colors relative cursor-pointer before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:rounded-full before:top-0.5 before:left-0.5 checked:before:translate-x-5 before:transition-transform" />
                    </div>
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <div className="text-sm font-medium text-gray-900">Workflow Failures</div>
                            <div className="text-xs text-gray-500">Instant alerts when a trigger fails</div>
                        </div>
                        <input type="checkbox" defaultChecked className="w-10 h-5 appearance-none bg-gray-200 rounded-full checked:bg-blue-600 transition-colors relative cursor-pointer before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:rounded-full before:top-0.5 before:left-0.5 checked:before:translate-x-5 before:transition-transform" />
                    </div>
                </div>
            </div>

            {/* Security */}
            <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-100">
                    <Lock size={20} className="text-gray-400" />
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Security</h3>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <div className="text-sm font-medium text-gray-900">2FA</div>
                            <div className="text-xs text-gray-500">Enable two-factor authentication</div>
                        </div>
                        <button className="text-sm text-blue-600 font-bold hover:text-blue-700">Enable</button>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <div className="text-sm font-medium text-gray-900">API Tokens</div>
                            <div className="text-xs text-gray-500">Manage your access keys</div>
                        </div>
                        <button className="text-sm text-blue-600 font-bold hover:text-blue-700">Manage</button>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4 mb-8">
                <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-bold shadow-md hover:shadow-lg transition-all">
                    <Save size={16} />
                    Save Configuration
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

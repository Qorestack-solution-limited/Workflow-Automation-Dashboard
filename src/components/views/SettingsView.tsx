import React from 'react';
import { Save, Bell, Lock, User, Globe } from 'lucide-react';

export const SettingsView = () => {
  return (
    <div className="p-8 h-full overflow-y-auto bg-gray-50/50 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">Manage your workspace configuration</p>
      </div>

      <div className="space-y-6">
        
        {/* Profile Section */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-100">
                <User size={20} className="text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900">Profile Settings</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" defaultValue="Jane Doe" className="w-full p-2 border border-gray-200 rounded-lg text-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input type="email" defaultValue="jane@company.com" className="w-full p-2 border border-gray-200 rounded-lg text-sm" />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea className="w-full p-2 border border-gray-200 rounded-lg text-sm h-24" placeholder="Tell us about yourself..." />
                </div>
            </div>
        </div>

        {/* Notifications */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-100">
                <Bell size={20} className="text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            </div>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-sm font-medium text-gray-900">Email Alerts</div>
                        <div className="text-xs text-gray-500">Receive daily summaries and critical alerts via email</div>
                    </div>
                    <input type="checkbox" defaultChecked className="toggle" />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-sm font-medium text-gray-900">Workflow Failures</div>
                        <div className="text-xs text-gray-500">Instant notification when a workflow breaks</div>
                    </div>
                    <input type="checkbox" defaultChecked className="toggle" />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-sm font-medium text-gray-900">Marketing Updates</div>
                        <div className="text-xs text-gray-500">Receive product updates and newsletters</div>
                    </div>
                    <input type="checkbox" className="toggle" />
                </div>
            </div>
        </div>

        {/* Security */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-100">
                <Lock size={20} className="text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900">Security</h3>
            </div>
            <div className="flex items-center justify-between mb-4">
                 <div>
                    <div className="text-sm font-medium text-gray-900">Two-Factor Authentication</div>
                    <div className="text-xs text-gray-500">Add an extra layer of security to your account</div>
                </div>
                <button className="text-sm text-blue-600 font-medium hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">Enable</button>
            </div>
            <div className="flex items-center justify-between">
                 <div>
                    <div className="text-sm font-medium text-gray-900">API Tokens</div>
                    <div className="text-xs text-gray-500">Manage your personal access tokens</div>
                </div>
                <button className="text-sm text-blue-600 font-medium hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">Manage</button>
            </div>
        </div>
        
        <div className="flex justify-end pt-4">
            <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium shadow-sm hover:shadow-md transition-all">
                <Save size={16} />
                Save Changes
            </button>
        </div>

      </div>
    </div>
  );
};

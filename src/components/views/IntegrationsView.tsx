import React from 'react';
import { Plus, Github, Slack, Trello, Mail, Database, Cloud, MessageSquare, Terminal } from 'lucide-react';

const IntegrationCard = ({ name, description, icon: Icon, connected, category }: any) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all group">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
        <Icon size={24} className="text-gray-700 group-hover:text-blue-600 transition-colors" />
      </div>
      {connected ? (
        <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">Connected</span>
      ) : (
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
          Connect
        </button>
      )}
    </div>
    <h3 className="font-bold text-gray-900 mb-1">{name}</h3>
    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{description}</p>
    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
      <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded-md">{category}</span>
    </div>
  </div>
);

export const IntegrationsView = () => {
  return (
    <div className="p-8 h-full overflow-y-auto bg-gray-50/50">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Integrations Marketplace</h1>
          <p className="text-gray-500">Connect your tools to automate workflows</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium shadow-sm hover:shadow-md transition-all">
          <Plus size={16} />
          Request Integration
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <IntegrationCard 
          name="Slack" 
          description="Send notifications and interact with your team directly from workflows."
          icon={Slack}
          connected={true}
          category="Communication"
        />
        <IntegrationCard 
          name="GitHub" 
          description="Trigger workflows on pull requests, commits, and issues automatically."
          icon={Github}
          connected={true}
          category="Developer Tools"
        />
        <IntegrationCard 
          name="PostgreSQL" 
          description="Connect to your SQL database to read, write, and manage data records."
          icon={Database}
          connected={false}
          category="Database"
        />
        <IntegrationCard 
          name="AWS Lambda" 
          description="Execute serverless functions as part of your complex logic chains."
          icon={Cloud}
          connected={true}
          category="Cloud"
        />
        <IntegrationCard 
          name="Gmail" 
          description="Automate email responses, organization, and draft creation."
          icon={Mail}
          connected={false}
          category="Communication"
        />
        <IntegrationCard 
          name="Trello" 
          description="Manage boards, lists, and cards programmatically."
          icon={Trello}
          connected={false}
          category="Productivity"
        />
        <IntegrationCard 
          name="Intercom" 
          description="Sync customer data and trigger support workflows."
          icon={MessageSquare}
          connected={false}
          category="Support"
        />
        <IntegrationCard 
          name="Custom API" 
          description="Connect any REST or GraphQL endpoint to your system."
          icon={Terminal}
          connected={true}
          category="General"
        />
      </div>
    </div>
  );
};

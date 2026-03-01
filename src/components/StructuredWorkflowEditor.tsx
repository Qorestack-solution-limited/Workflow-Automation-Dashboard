import React, { useState, useCallback } from 'react';
import {
  Plus,
  GripVertical,
  ChevronRight,
  MoreHorizontal,
  Settings2,
  BookOpen,
  Trash2,
  Play,
  Save,
  ChevronDown,
  X,
  Globe,
  Clock,
  Zap,
  Database,
  ArrowRightLeft,
  Filter,
  Code,
  Mail,
  Slack,
  MessageSquare,
  FileText,
  Type,
  Calculator,
  Calendar,
  UserPlus
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { WorkflowToolbox } from './WorkflowToolbox';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';

// Mock types for transformers and triggers
type StepType =
  | 'Value mapper' | 'String: Cut' | 'String: Replace' | 'Condition' | 'Loop' | 'Data Mapper' | 'Set Value'
  | 'Webhook' | 'Schedule' | 'Form Submit' | 'Manual Trigger' | 'Incoming SFTP' | 'Shopify Webhook'
  | 'HTTP Lookup' | 'Filter' | 'JS Code' | 'Database Query' | 'Send Email' | 'Slack Message' | 'OpenAI Prompt'
  | 'Math: Calculate' | 'Date: Format' | 'Date: Add/Subtract' | 'Enrichment: Customer' | 'Enrichment: Product'
  | 'String: Case' | 'String: Join' | 'Number: Format';

interface Step {
  id: string;
  type: StepType;
  label: string;
  config: any;
  children?: Step[];
  branch?: 'true' | 'false';
}

const StepConnector = ({ isLast, colorClass, top = 24 }: { isLast?: boolean, colorClass: string, top?: number }) => (
  <div className="absolute -left-4 top-0 bottom-0 w-4 pointer-events-none">
    {/* Vertical line */}
    <div
      className={`absolute left-0 top-0 border-l-2 ${colorClass}`}
      style={{
        height: isLast ? `${top}px` : 'calc(100% + 16px)'
      }}
    />
    {/* Horizontal line */}
    <div
      className={`absolute left-0 border-t-2 ${colorClass}`}
      style={{ top: `${top}px`, width: '16px' }}
    />
  </div>
);

const TreeItem = ({ children, isLast, colorClass, top = 24 }: { children: React.ReactNode, isLast?: boolean, colorClass: string, top?: number }) => (
  <div className="relative">
    <StepConnector isLast={isLast} colorClass={colorClass} top={top} />
    {children}
  </div>
);

const TransformerTester = () => (
  <div className="w-[450px] h-full bg-white border-l border-gray-200 flex flex-col">
    <div className="p-4 border-b border-gray-100 flex justify-between items-center">
      <div className="flex gap-4">
        <button className="text-sm font-medium text-gray-500 hover:text-gray-900">Overview</button>
        <button className="text-sm font-medium text-blue-600 border-b-2 border-blue-600 pb-4 -mb-4">Transformer tester</button>
      </div>
    </div>

    <div className="p-4 border-b border-gray-100 bg-gray-50 flex gap-2 items-center">
      <select className="flex-1 h-9 px-3 bg-white border border-gray-200 rounded text-sm">
        <option>New test</option>
      </select>
      <Button size="icon" className="bg-blue-600 hover:bg-blue-700 h-9 w-9">
        <Play size={16} fill="white" />
      </Button>
      <Button variant="outline" size="icon" className="h-9 w-9">
        <Settings2 size={16} />
      </Button>
      <Button variant="outline" size="icon" className="h-9 w-9">
        <Save size={16} />
      </Button>
    </div>

    <Tabs defaultValue="input" className="flex-1 flex flex-col">
      <div className="px-4 border-b border-gray-100 flex justify-between items-center bg-white">
        <TabsList className="bg-transparent border-none p-0 h-12">
          <TabsTrigger value="input" className="data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full bg-transparent">Input</TabsTrigger>
          <TabsTrigger value="expected" className="data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full bg-transparent">Expected</TabsTrigger>
          <TabsTrigger value="results" className="data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full bg-transparent">Results</TabsTrigger>
        </TabsList>
        <Button variant="ghost" size="icon" className="h-8 w-8">
           <Play size={14} className="rotate-90" />
        </Button>
      </div>
      <TabsContent value="input" className="flex-1 p-0 m-0 bg-gray-50">
        <div className="h-full font-mono text-sm p-4 text-blue-600">
          <div className="flex gap-4">
            <span className="text-gray-400 select-none">1</span>
            <span>{`{}`}</span>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  </div>
);

const TransformerStepCard = ({ step, onUpdate, onDelete, onAddNested, onDropOnBranch }: { step: Step, onUpdate: any, onDelete: any, onAddNested?: any, onDropOnBranch?: any }) => {
  const [isOpen, setIsOpen] = useState(true);

  const isLogic = step.type === 'Condition' || step.type === 'Loop';
  const isTrigger = ['Webhook', 'Schedule', 'Form Submit', 'Manual Trigger', 'Incoming SFTP', 'Shopify Webhook'].includes(step.type);

  const trueBranchSteps = step.children?.filter(c => c.branch === 'true') || [];
  const falseBranchSteps = step.children?.filter(c => c.branch === 'false') || [];
  const loopSteps = step.children || [];

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, branch?: 'true' | 'false') => {
    e.preventDefault();
    e.stopPropagation();
    const type = e.dataTransfer.getData('application/label') as StepType;
    if (type && onDropOnBranch) {
      onDropOnBranch(step.id, branch, type);
    }
  };

  const renderLogicConfig = () => {
    if (step.type === 'Condition') {
      return (
        <div className="space-y-4">
          <div className="flex gap-4 items-end">
            <div className="flex-1 space-y-1.5">
              <Label className="text-xs font-bold text-gray-700">Property</Label>
              <Input placeholder="order.status" className="h-9 text-xs bg-white" />
            </div>
            <div className="w-32 space-y-1.5">
              <Label className="text-xs font-bold text-gray-700">Operator</Label>
              <select className="w-full h-9 px-2 bg-white border border-gray-200 rounded text-xs">
                <option value="equals">equals</option>
                <option value="not_equals">not equals</option>
                <option value="contains">contains</option>
                <option value="exists">exists</option>
                <option value="greater_than">greater than</option>
                <option value="less_than">less than</option>
              </select>
            </div>
            <div className="flex-1 space-y-1.5">
              <Label className="text-xs font-bold text-gray-700">Value</Label>
              <Input placeholder="paid" className="h-9 text-xs bg-white" />
            </div>
          </div>
        </div>
      );
    }
    if (step.type === 'Loop') {
      return (
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-gray-700">Array Path <span className="text-red-500">*</span></Label>
            <Input placeholder="order.line_items" className="h-9 text-xs bg-white" />
            <p className="text-[10px] text-gray-500">Specify the path to the array you want to iterate over.</p>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderTriggerConfig = () => {
    switch (step.type) {
      case 'Webhook':
      case 'Shopify Webhook':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-gray-700">Webhook URL</Label>
              <div className="flex gap-2">
                <Input value="https://api.flowbuild.com/hooks/xyz123" readOnly className="bg-gray-50 font-mono text-xs" />
                <Button variant="outline" size="sm">Copy</Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold text-gray-700">Authentication</Label>
              <select className="w-full h-10 px-3 bg-white border border-gray-200 rounded text-sm">
                <option>None</option>
                <option>API Key</option>
                <option>Bearer Token</option>
              </select>
            </div>
          </div>
        );
      case 'Schedule':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-gray-700">Schedule Type</Label>
              <select className="w-full h-10 px-3 bg-white border border-gray-200 rounded text-sm">
                <option>Interval</option>
                <option>Cron Expression</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold text-gray-700">Interval (minutes)</Label>
              <Input type="number" defaultValue="15" className="h-10 bg-white" />
            </div>
          </div>
        );
      case 'Form Submit':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-gray-700">Form ID</Label>
              <Input placeholder="Enter Form ID..." className="h-10 bg-white" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold text-gray-700">Fields to Capture</Label>
              <div className="space-y-2">
                {['email', 'full_name', 'message'].map(field => (
                  <label key={field} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" defaultChecked /> {field}
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
      case 'Manual Trigger':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-gray-700">Parameters</Label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input placeholder="Param Name" className="h-9 text-xs" defaultValue="user_id" />
                  <Input placeholder="Default Value" className="h-9 text-xs" />
                </div>
                <Button variant="outline" size="sm" className="w-full text-xs h-8">Add Parameter</Button>
              </div>
            </div>
          </div>
        );
      case 'Incoming SFTP':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Host</Label>
                <Input placeholder="sftp.example.com" className="h-9 text-xs" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Port</Label>
                <Input defaultValue="22" className="h-9 text-xs" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold text-gray-700">Directory Path</Label>
              <Input placeholder="/uploads/orders" className="h-9 text-xs" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold text-gray-700">Credentials</Label>
              <select className="w-full h-9 px-2 bg-white border border-gray-200 rounded text-xs">
                <option>Select saved credential...</option>
                <option>Production SFTP Key</option>
              </select>
            </div>
          </div>
        );
      default:
        return <div className="text-sm text-gray-500 italic">No specific configuration for this trigger.</div>;
    }
  };

  const renderTransformerConfig = () => {
    const specializedConfig = () => {
      switch (step.type) {
        case 'String: Cut':
          return (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Start Index</Label>
                <Input type="number" defaultValue="0" className="h-9 text-xs bg-white" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Length</Label>
                <Input type="number" placeholder="End of string" className="h-9 text-xs bg-white" />
              </div>
            </div>
          );
        case 'Date: Add/Subtract':
          return (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-gray-700">Amount</Label>
                  <Input type="number" defaultValue="1" className="h-9 text-xs bg-white" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-gray-700">Unit</Label>
                  <select className="w-full h-9 px-2 bg-white border border-gray-200 rounded text-xs">
                    <option value="days">Days</option>
                    <option value="months">Months</option>
                    <option value="years">Years</option>
                    <option value="hours">Hours</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Operation</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-xs">
                    <input type="radio" name="date_op" value="add" defaultChecked /> Add
                  </label>
                  <label className="flex items-center gap-2 text-xs">
                    <input type="radio" name="date_op" value="subtract" /> Subtract
                  </label>
                </div>
              </div>
            </div>
          );
        case 'String: Replace':
          return (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Search for</Label>
                <Input placeholder="Text to find" className="h-9 text-xs bg-white" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Replace with</Label>
                <Input placeholder="New text" className="h-9 text-xs bg-white" />
              </div>
            </div>
          );
        case 'Enrichment: Product':
          return (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Product SKU / ID</Label>
                <Input placeholder="line_item.sku" className="h-9 text-xs bg-white" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Data Source</Label>
                <select className="w-full h-9 px-2 bg-white border border-gray-200 rounded text-xs">
                  <option value="inventory">Inventory System</option>
                  <option value="pim">PIM</option>
                  <option value="shopify">Shopify Storefront</option>
                </select>
              </div>
            </div>
          );
        case 'Math: Calculate':
          return (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Operation</Label>
                <select className="w-full h-9 px-2 bg-white border border-gray-200 rounded text-xs">
                  <option value="add">Add</option>
                  <option value="subtract">Subtract</option>
                  <option value="multiply">Multiply</option>
                  <option value="divide">Divide</option>
                  <option value="round">Round</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Value to use</Label>
                <Input placeholder="Constant or field path" className="h-9 text-xs bg-white" />
              </div>
            </div>
          );
        case 'Number: Format':
          return (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Format Style</Label>
                <select className="w-full h-9 px-2 bg-white border border-gray-200 rounded text-xs">
                  <option value="currency">Currency</option>
                  <option value="decimal">Decimal</option>
                  <option value="percent">Percent</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Currency Code</Label>
                <Input defaultValue="USD" className="h-9 text-xs bg-white" />
              </div>
            </div>
          );
        case 'Date: Format':
          return (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Input Format</Label>
                <Input placeholder="ISO-8601" className="h-9 text-xs bg-white" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Output Format</Label>
                <select className="w-full h-9 px-2 bg-white border border-gray-200 rounded text-xs">
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MMMM Do YYYY">MMMM Do YYYY</option>
                  <option value="timestamp">Unix Timestamp</option>
                </select>
              </div>
            </div>
          );
        case 'String: Case':
          return (
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-gray-700">Transform to</Label>
              <select className="w-full h-9 px-2 bg-white border border-gray-200 rounded text-xs">
                <option value="uppercase">UPPERCASE</option>
                <option value="lowercase">lowercase</option>
                <option value="capitalize">Capitalize</option>
                <option value="snake_case">snake_case</option>
                <option value="camelCase">camelCase</option>
              </select>
            </div>
          );
        case 'String: Join':
          return (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Separator</Label>
                <Input defaultValue=", " className="h-9 text-xs bg-white" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Array Path</Label>
                <Input placeholder="items.tags" className="h-9 text-xs bg-white" />
              </div>
            </div>
          );
        case 'Enrichment: Customer':
          return (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Customer ID / Email</Label>
                <Input placeholder="customer.id" className="h-9 text-xs bg-white" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Fields to Fetch</Label>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-[10px] font-bold border border-blue-100">Orders</span>
                  <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-[10px] font-bold border border-blue-100">Loyalty</span>
                  <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-[10px] font-bold border border-blue-100">Segments</span>
                </div>
              </div>
            </div>
          );
        default:
          return null;
      }
    };

    const configContent = specializedConfig();

    return (
      <>
        {configContent && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Settings2 size={14} className="text-gray-400" />
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Step Specific Configuration</span>
            </div>
            {configContent}
          </div>
        )}
        <div className="space-y-2">
          <Label className="text-xs font-bold text-gray-700 flex items-center gap-1">
            Accessor <span className="text-red-500">*</span>
          </Label>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-2 px-3 py-2 border border-gray-200 rounded bg-white">
              <span className="text-sm text-gray-600 flex-1">Key accessor</span>
              <ChevronDown size={14} className="text-gray-400" />
            </div>
            <Button variant="ghost" size="icon" className="h-9 w-9 border border-gray-200 text-gray-400"><BookOpen size={16} /></Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 border border-gray-200 text-gray-400"><MoreHorizontal size={16} /></Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-bold text-gray-700">Root</Label>
          <Input className="h-10 bg-white" placeholder="" />
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <Label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Keys</Label>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400"><MoreHorizontal size={16} /></Button>
          </div>

          {['name', 'title'].map((key, idx) => (
            <div key={idx} className="flex gap-3 items-center group/key">
              <GripVertical size={16} className="text-gray-300 cursor-grab" />
              <Input value={key} className="h-10 flex-1 bg-white" readOnly />
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 group-hover/key:text-red-500"><MoreHorizontal size={16} /></Button>
            </div>
          ))}

          <Button variant="ghost" className="text-blue-600 hover:text-blue-700 p-0 h-auto text-sm font-medium">
            <Plus size={14} className="mr-2" /> Add keys
          </Button>
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <Label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Field Mappings</Label>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400"><MoreHorizontal size={16} /></Button>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-12 gap-2 items-center">
              <div className="col-span-4"><Label className="text-[10px] uppercase text-gray-500 font-bold">Source Field</Label></div>
              <div className="col-span-4"><Label className="text-[10px] uppercase text-gray-500 font-bold">Target Field</Label></div>
              <div className="col-span-3"><Label className="text-[10px] uppercase text-gray-500 font-bold">Data Type</Label></div>
              <div className="col-span-1"></div>
            </div>

            {[
              { source: 'customer.email', target: 'Email', type: 'String' },
              { source: 'order.total_price', target: 'Amount', type: 'Number' }
            ].map((mapping, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-2 items-center group/mapping">
                <div className="col-span-4">
                  <Input defaultValue={mapping.source} className="h-9 text-xs bg-white" />
                </div>
                <div className="col-span-4">
                  <Input defaultValue={mapping.target} className="h-9 text-xs bg-white" />
                </div>
                <div className="col-span-3">
                  <select defaultValue={mapping.type} className="w-full h-9 px-2 bg-white border border-gray-200 rounded text-xs">
                    <option value="String">String</option>
                    <option value="Number">Number</option>
                    <option value="Boolean">Boolean</option>
                    <option value="Date">Date</option>
                    <option value="Object">Object</option>
                    <option value="Array">Array</option>
                  </select>
                </div>
                <div className="col-span-1 flex justify-end">
                   <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-500"><X size={14} /></Button>
                </div>
              </div>
            ))}
          </div>

          <Button variant="ghost" className="text-blue-600 hover:text-blue-700 p-0 h-auto text-sm font-medium">
             <Plus size={14} className="mr-2" /> Add field mapping
          </Button>
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <Label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Mappers</Label>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400"><MoreHorizontal size={16} /></Button>
          </div>

          <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden p-4 space-y-4">
            <div className="flex items-center gap-3">
              <GripVertical size={16} className="text-gray-300 cursor-grab" />
              <div className="flex-1 flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded">
                <span className="text-sm text-gray-700 flex-1">String: Cut</span>
                <ChevronDown size={14} className="text-gray-400" />
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400"><BookOpen size={16} /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400"><MoreHorizontal size={16} /></Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Start <span className="text-red-500">*</span></Label>
                <Input value="0" className="h-9 bg-white" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Length</Label>
                <Input placeholder="" className="h-9 bg-white" />
              </div>
            </div>
          </div>

          <Button variant="ghost" className="text-blue-600 hover:text-blue-700 p-0 h-auto text-sm font-medium">
             <Plus size={14} className="mr-2" /> Add mappers
          </Button>
        </div>
      </>
    );
  };

  return (
    <div className="mb-4" data-testid={`step-${step.type}`}>
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        {/* Step Header */}
        <div className="p-3 flex items-center gap-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <GripVertical size={16} className="text-gray-300 cursor-grab" />
          <div className="flex-1 flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">{isTrigger ? 'Trigger Name' : 'Manage name'}</span>
            <div className="flex-1 flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded group">
              <span className="text-sm text-gray-700 flex-1">{step.type}</span>
              <ChevronDown size={14} className="text-gray-400" />
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400"><BookOpen size={16} /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400"><Settings2 size={16} /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-600" onClick={(e) => { e.stopPropagation(); onDelete(step.id); }}><Trash2 size={16} /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400"><MoreHorizontal size={16} /></Button>
          </div>
        </div>

        {/* Step Body (Config) */}
        {isOpen && (
          <div className="p-6 space-y-6 bg-white border-b border-gray-100">
            {isTrigger ? renderTriggerConfig() : (isLogic ? renderLogicConfig() : renderTransformerConfig())}
          </div>
        )}

        {/* Nested Content for Logic Steps */}
        {isOpen && step.type === 'Condition' && (
          <div className="p-6 bg-gray-50/50 space-y-8 border-t border-gray-100">
            <div className="space-y-4">
               <div className="flex items-center gap-2">
                 <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded">True branch</span>
               </div>
               <div
                  className="pl-6 min-h-[50px] space-y-4 relative"
                  onDragOver={onDragOver}
                  onDrop={(e) => handleDrop(e, 'true')}
                >
                 {trueBranchSteps.map((child, idx) => (
                   <TreeItem key={child.id} colorClass="border-emerald-200">
                     <TransformerStepCard
                      step={child}
                      onUpdate={() => {}}
                      onDelete={onDelete}
                      onAddNested={onAddNested}
                      onDropOnBranch={onDropOnBranch}
                     />
                   </TreeItem>
                 ))}
                 <TreeItem isLast={true} colorClass="border-emerald-200" top={16}>
                   <div className="py-2 text-center border border-dashed border-emerald-100 rounded-md bg-emerald-50/30 text-emerald-400 text-xs">
                      Drop items here
                   </div>
                 </TreeItem>
                 <div className="pl-0">
                  <Button variant="ghost" className="text-emerald-600 hover:text-emerald-700 p-0 h-auto text-xs font-medium" onClick={() => onAddNested(step.id, 'true')}>
                    <Plus size={14} className="mr-2" /> Add transformer to True branch
                  </Button>
                 </div>
               </div>
            </div>

            <div className="space-y-4">
               <div className="flex items-center gap-2">
                 <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded">False branch</span>
               </div>
               <div
                  className="pl-6 min-h-[50px] space-y-4 relative"
                  onDragOver={onDragOver}
                  onDrop={(e) => handleDrop(e, 'false')}
               >
                 {falseBranchSteps.map((child, idx) => (
                   <TreeItem key={child.id} colorClass="border-red-200">
                     <TransformerStepCard
                      step={child}
                      onUpdate={() => {}}
                      onDelete={onDelete}
                      onAddNested={onAddNested}
                      onDropOnBranch={onDropOnBranch}
                     />
                   </TreeItem>
                 ))}
                 <TreeItem isLast={true} colorClass="border-red-200" top={16}>
                   <div className="py-2 text-center border border-dashed border-red-100 rounded-md bg-red-50/30 text-red-400 text-xs">
                      Drop items here
                   </div>
                 </TreeItem>
                 <div className="pl-0">
                  <Button variant="ghost" className="text-red-600 hover:text-red-700 p-0 h-auto text-xs font-medium" onClick={() => onAddNested(step.id, 'false')}>
                    <Plus size={14} className="mr-2" /> Add transformer to False branch
                  </Button>
                 </div>
               </div>
            </div>
          </div>
        )}

        {isOpen && step.type === 'Loop' && (
           <div className="p-6 bg-gray-50/50 space-y-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                 <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded">Loop body</span>
               </div>
               <div
                  className="pl-6 min-h-[50px] space-y-4 relative"
                  onDragOver={onDragOver}
                  onDrop={(e) => handleDrop(e)}
               >
                 {loopSteps.map((child, idx) => (
                   <TreeItem key={child.id} colorClass="border-blue-200">
                     <TransformerStepCard
                      step={child}
                      onUpdate={() => {}}
                      onDelete={onDelete}
                      onAddNested={onAddNested}
                      onDropOnBranch={onDropOnBranch}
                     />
                   </TreeItem>
                 ))}
                 <TreeItem isLast={true} colorClass="border-blue-200" top={16}>
                   <div className="py-2 text-center border border-dashed border-blue-100 rounded-md bg-blue-50/30 text-blue-400 text-xs">
                      Drop items here
                   </div>
                 </TreeItem>
                 <div className="pl-0">
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-700 p-0 h-auto text-xs font-medium" onClick={() => onAddNested(step.id)}>
                    <Plus size={14} className="mr-2" /> Add transformer to Loop body
                  </Button>
                 </div>
               </div>
           </div>
        )}
      </div>
    </div>
  );
};

export const StructuredWorkflowEditor = () => {
  const [isTesterCollapsed, setIsTesterCollapsed] = useState(false);
  const [triggers, setTriggers] = useState<Step[]>([
    { id: 't1', type: 'Shopify Webhook', label: 'Shopify Order Trigger', config: {} }
  ]);
  const [steps, setSteps] = useState<Step[]>([
    { id: '1', type: 'Value mapper', label: 'Manage name', config: {} },
    {
      id: '2',
      type: 'Condition',
      label: 'If Shopify order',
      config: {},
      children: [
        { id: '3', type: 'Set Value', label: 'Set priority', config: {}, branch: 'true' }
      ]
    },
    {
      id: '4',
      type: 'Loop',
      label: 'Iterate items',
      config: {},
      children: []
    }
  ]);

  const handleDelete = useCallback((id: string) => {
    setTriggers(prev => prev.filter(t => t.id !== id));
    setSteps(prev => {
      const removeFromList = (list: Step[]): Step[] => {
        return list
          .filter(step => step.id !== id)
          .map(step => ({
            ...step,
            children: step.children ? removeFromList(step.children) : undefined
          }));
      };
      return removeFromList(prev);
    });
  }, []);

  const handleAddNested = useCallback((parentId: string, branch?: 'true' | 'false', type: StepType = 'Set Value') => {
    setSteps(prev => {
      const updateChildren = (list: Step[]): Step[] => {
        return list.map(step => {
          if (step.id === parentId) {
            const newChild: Step = {
              id: Math.random().toString(36).substr(2, 9),
              type,
              label: `New ${type}`,
              config: {},
              branch
            };
            return { ...step, children: [...(step.children || []), newChild] };
          }
          if (step.children) {
            return { ...step, children: updateChildren(step.children) };
          }
          return step;
        });
      };
      return updateChildren(prev);
    });
  }, []);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const label = event.dataTransfer.getData('application/label') as StepType;
    if (!label) return;

    const newStep: Step = {
      id: Math.random().toString(36).substr(2, 9),
      type: label,
      label: `New ${label}`,
      config: {}
    };

    const isTrigger = ['Webhook', 'Schedule', 'Form Submit', 'Manual Trigger', 'Incoming SFTP', 'Shopify Webhook'].includes(label);

    if (isTrigger) {
      setTriggers(prev => [...prev, newStep]);
    } else {
      setSteps(prev => [...prev, newStep]);
    }
  }, []);

  return (
    <div className="flex h-full w-full bg-gray-50 overflow-hidden relative">
      <WorkflowToolbox />

      <div
        className="flex-1 flex flex-col min-w-0 overflow-y-auto"
        onDragOver={onDragOver}
        onDrop={onDrop}
        data-testid="workflow-editor-content"
      >
        {/* Header / Toolbar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center gap-2 text-sm">
           <span className="text-gray-900 font-bold">Transformers</span>
           <ChevronRight size={14} className="text-gray-400" />
           <span className="text-blue-600 font-medium">Shopify to sFTP [850 Transformer][TravelPro.EU][Loc...</span>
           <button className="p-1 hover:bg-gray-100 rounded text-gray-400"><Settings2 size={14} /></button>
           <button className="p-1 hover:bg-gray-100 rounded text-gray-400"><BookOpen size={14} /></button>

           <div className="ml-auto flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-md bg-white">
                <Play size={14} className="text-green-600 fill-green-600" />
                <span className="font-semibold text-gray-700">Saved</span>
                <ChevronDown size={14} className="text-gray-400 ml-1" />
              </div>
              <Button variant="ghost" size="icon" className="h-9 w-9 border border-gray-200"><MoreHorizontal size={18} /></Button>
              <Button className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 gap-2">
                <ChevronRight size={16} className="rotate-180" /> Back
              </Button>
           </div>
        </div>

        {/* Content Area */}
        <div className="p-8 flex-1">
          <div className="max-w-4xl mx-auto space-y-12">

            {/* Triggers Section */}
            <section className="space-y-4 relative">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-tight flex items-center gap-2">
                <Zap size={14} className="text-amber-500" /> Triggers & Events
              </h2>
              <div className="pl-4 border-l-2 border-amber-400 space-y-4" data-testid="triggers-list">
                {triggers.length === 0 ? (
                  <div className="p-4 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 text-center bg-gray-50/50">
                    Drag and drop triggers here to initiate the workflow
                  </div>
                ) : (
                  triggers.map(trigger => (
                    <TransformerStepCard
                      key={trigger.id}
                      step={trigger}
                      onUpdate={() => {}}
                      onDelete={handleDelete}
                    />
                  ))
                )}
              </div>
              <Button variant="ghost" className="text-amber-600 hover:text-amber-700 p-0 h-auto text-sm font-medium">
                <Plus size={16} className="mr-2" /> Add trigger
              </Button>
            </section>

            {/* Node Filters */}
            <section className="space-y-4">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-tight">Node filters</h2>
              <div className="pl-4 border-l-2 border-gray-300 min-h-[20px]">
                <Button variant="ghost" className="text-blue-600 hover:text-blue-700 p-0 h-auto text-sm font-medium">
                  <Plus size={16} className="mr-2" /> Add node filter
                </Button>
              </div>
            </section>

            {/* Data Transformers */}
            <section className="space-y-4 relative">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-tight">Data transformers</h2>

              <div className="pl-4 border-l-2 border-blue-500 space-y-4" data-testid="transformers-list">
                {steps.map(step => (
                  <TransformerStepCard
                    key={step.id}
                    step={step}
                    onUpdate={() => {}}
                    onDelete={handleDelete}
                    onAddNested={handleAddNested}
                    onDropOnBranch={handleAddNested}
                  />
                ))}
              </div>

              <div className="flex items-center gap-4 mt-8">
                <div className="w-4 h-4 rounded-full border-2 border-blue-500 bg-white" />
                <Button variant="ghost" className="text-blue-600 hover:text-blue-700 p-0 h-auto text-sm font-medium">
                   <Plus size={16} className="mr-2" /> Add key accessor
                </Button>
              </div>
            </section>
          </div>
        </div>

        <div className="h-12 border-t border-gray-200 bg-white flex items-center px-8 text-xs font-medium text-blue-600 cursor-pointer hover:bg-gray-50 transition-colors">
           <ChevronRight size={14} className="mr-2 rotate-270" /> Back to top
        </div>
      </div>

      <div className={`transition-all duration-300 ease-in-out flex h-full ${isTesterCollapsed ? 'w-0' : 'w-[450px]'}`}>
        {!isTesterCollapsed && <TransformerTester />}

        <button
          onClick={() => setIsTesterCollapsed(!isTesterCollapsed)}
          className={`absolute top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:bg-gray-50 transition-all z-50 ${isTesterCollapsed ? 'right-4' : 'right-[435px]'}`}
          title={isTesterCollapsed ? "Open Tester" : "Close Tester"}
        >
          {isTesterCollapsed ? <ChevronRight size={16} className="rotate-180" /> : <ChevronRight size={16} />}
        </button>
      </div>
    </div>
  );
};

export default StructuredWorkflowEditor;

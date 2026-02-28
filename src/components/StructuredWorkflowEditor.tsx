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
  FileText
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { WorkflowToolbox } from './WorkflowToolbox';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';

// Mock types for transformers and triggers
type StepType =
  | 'Value mapper' | 'String: Cut' | 'Condition' | 'Loop' | 'Data Mapper' | 'Set Value'
  | 'Webhook' | 'Schedule' | 'Form Submit' | 'Manual Trigger' | 'Incoming SFTP' | 'Shopify Webhook'
  | 'HTTP Lookup' | 'Filter' | 'JS Code' | 'Database Query' | 'Send Email' | 'Slack Message' | 'OpenAI Prompt';

interface Step {
  id: string;
  type: StepType;
  label: string;
  config: any;
  children?: Step[];
  branch?: 'true' | 'false';
}

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
      onDropOnBranch(step.id, type, branch);
    }
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
          <div className="space-y-2">
            <Label className="text-xs font-bold text-gray-700">Form ID</Label>
            <Input placeholder="Enter Form ID..." className="h-10 bg-white" />
          </div>
        );
      default:
        return <div className="text-sm text-gray-500 italic">No specific configuration for this trigger.</div>;
    }
  };

  const renderTransformerConfig = () => {
    return (
      <>
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
        {isOpen && !isLogic && (
          <div className="p-6 space-y-6 bg-white">
            {isTrigger ? renderTriggerConfig() : renderTransformerConfig()}
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
                  className="pl-4 border-l-2 border-emerald-200 min-h-[50px] space-y-4"
                  onDragOver={onDragOver}
                  onDrop={(e) => handleDrop(e, 'true')}
                >
                 {step.children?.filter(c => c.branch === 'true').map(child => (
                   <TransformerStepCard
                    key={child.id}
                    step={child}
                    onUpdate={() => {}}
                    onDelete={onDelete}
                    onAddNested={onAddNested}
                    onDropOnBranch={onDropOnBranch}
                   />
                 ))}
                 <div className="py-2 text-center border border-dashed border-emerald-100 rounded-md bg-emerald-50/30 text-emerald-400 text-xs">
                    Drop items here
                 </div>
                 <Button variant="ghost" className="text-emerald-600 hover:text-emerald-700 p-0 h-auto text-xs font-medium" onClick={() => onAddNested(step.id, 'true')}>
                   <Plus size={14} className="mr-2" /> Add transformer to True branch
                 </Button>
               </div>
            </div>

            <div className="space-y-4">
               <div className="flex items-center gap-2">
                 <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded">False branch</span>
               </div>
               <div
                  className="pl-4 border-l-2 border-red-200 min-h-[50px] space-y-4"
                  onDragOver={onDragOver}
                  onDrop={(e) => handleDrop(e, 'false')}
               >
                 {step.children?.filter(c => c.branch === 'false').map(child => (
                   <TransformerStepCard
                    key={child.id}
                    step={child}
                    onUpdate={() => {}}
                    onDelete={onDelete}
                    onAddNested={onAddNested}
                    onDropOnBranch={onDropOnBranch}
                   />
                 ))}
                 <div className="py-2 text-center border border-dashed border-red-100 rounded-md bg-red-50/30 text-red-400 text-xs">
                    Drop items here
                 </div>
                 <Button variant="ghost" className="text-red-600 hover:text-red-700 p-0 h-auto text-xs font-medium" onClick={() => onAddNested(step.id, 'false')}>
                   <Plus size={14} className="mr-2" /> Add transformer to False branch
                 </Button>
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
                  className="pl-4 border-l-2 border-blue-200 min-h-[50px] space-y-4"
                  onDragOver={onDragOver}
                  onDrop={(e) => handleDrop(e)}
               >
                 {step.children?.map(child => (
                   <TransformerStepCard
                    key={child.id}
                    step={child}
                    onUpdate={() => {}}
                    onDelete={onDelete}
                    onAddNested={onAddNested}
                    onDropOnBranch={onDropOnBranch}
                   />
                 ))}
                 <div className="py-2 text-center border border-dashed border-blue-100 rounded-md bg-blue-50/30 text-blue-400 text-xs">
                    Drop items here
                 </div>
                 <Button variant="ghost" className="text-blue-600 hover:text-blue-700 p-0 h-auto text-xs font-medium" onClick={() => onAddNested(step.id)}>
                   <Plus size={14} className="mr-2" /> Add transformer to Loop body
                 </Button>
               </div>
           </div>
        )}
      </div>
    </div>
  );
};

export const StructuredWorkflowEditor = () => {
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
    <div className="flex h-full w-full bg-gray-50 overflow-hidden">
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

      <TransformerTester />
    </div>
  );
};

export default StructuredWorkflowEditor;

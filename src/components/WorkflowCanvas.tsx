import React, { useCallback, useRef, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  MarkerType,
  ReactFlowProvider,
  useReactFlow,
  Node,
} from "reactflow";
import "reactflow/dist/style.css";
import { CustomNode } from "./CustomNode";
import {
  User,
  Database,
  Settings,
  FileText,
  Zap,
  ShieldCheck,
  Flag,
  Globe,
  Clock,
  FileJson,
  ArrowRightLeft,
  Filter,
  Code,
  Mail,
  Slack,
  MessageSquare,
  X,
  Trash2,
  GitBranch,
  Repeat,
} from "lucide-react";
import { WorkflowToolbox } from "./WorkflowToolbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Plus, Trash } from "lucide-react";

const iconMap: Record<string, any> = {
  User: <User size={16} />,
  Database: <Database size={16} />,
  Settings: <Settings size={16} />,
  FileText: <FileText size={16} />,
  Zap: <Zap size={16} />,
  ShieldCheck: <ShieldCheck size={16} />,
  Flag: <Flag size={16} />,
  Globe: <Globe size={16} />,
  Clock: <Clock size={16} />,
  FileJson: <FileJson size={16} />,
  ArrowRightLeft: <ArrowRightLeft size={16} />,
  Filter: <Filter size={16} />,
  Code: <Code size={16} />,
  Mail: <Mail size={16} />,
  Slack: <Slack size={16} />,
  MessageSquare: <MessageSquare size={16} />,
  GitBranch: <GitBranch size={16} />,
  Repeat: <Repeat size={16} />,
};

const nodeTypes = {
  custom: CustomNode,
};

const NodeConfigPanel = ({
  node,
  onUpdate,
  onDelete,
  onClose,
}: {
  node: any;
  onUpdate: (id: string, data: any) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}) => {
  if (!node) return null;

  const renderTransformerFields = () => {
    switch (node.data.label) {
      case "Set Value":
        return (
          <>
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase text-gray-400">Key / Path</Label>
              <Input
                value={node.data.key || ""}
                onChange={(e) => onUpdate(node.id, { key: e.target.value })}
                placeholder="e.g. customer.name"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase text-gray-400">Value</Label>
              <Input
                value={node.data.value || ""}
                onChange={(e) => onUpdate(node.id, { value: e.target.value })}
                placeholder="Static value or {{var}}"
              />
            </div>
          </>
        );
      case "Data Mapper":
        const mappings = node.data.mappings || [{ from: "", to: "", start: "0", length: "" }];
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-xs font-semibold uppercase text-gray-400">Node Filters</Label>
                <Button variant="ghost" size="sm" className="h-6 text-[10px] text-blue-600 px-2">
                  <Plus size={10} className="mr-1" /> Add node filter
                </Button>
              </div>
              <div className="text-[10px] text-gray-400 italic bg-gray-50 p-2 rounded border border-dashed">
                No filters defined.
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-xs font-semibold uppercase text-gray-400">Mappings</Label>
              {mappings.map((m: any, idx: number) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-100 space-y-3 relative group/mapping">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label className="text-[10px] text-gray-500 uppercase">From</Label>
                      <Input
                        value={m.from}
                        onChange={(e) => {
                          const newMappings = [...mappings];
                          newMappings[idx].from = e.target.value;
                          onUpdate(node.id, { mappings: newMappings });
                        }}
                        placeholder="Path"
                        className="h-8 text-xs bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] text-gray-500 uppercase">To</Label>
                      <Input
                        value={m.to}
                        onChange={(e) => {
                          const newMappings = [...mappings];
                          newMappings[idx].to = e.target.value;
                          onUpdate(node.id, { mappings: newMappings });
                        }}
                        placeholder="Path"
                        className="h-8 text-xs bg-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200/50">
                    <div className="space-y-1">
                      <Label className="text-[10px] text-gray-500 uppercase">Start</Label>
                      <Input
                        type="number"
                        value={m.start}
                        onChange={(e) => {
                          const newMappings = [...mappings];
                          newMappings[idx].start = e.target.value;
                          onUpdate(node.id, { mappings: newMappings });
                        }}
                        className="h-8 text-xs bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] text-gray-500 uppercase">Length</Label>
                      <Input
                        type="number"
                        value={m.length}
                        onChange={(e) => {
                          const newMappings = [...mappings];
                          newMappings[idx].length = e.target.value;
                          onUpdate(node.id, { mappings: newMappings });
                        }}
                        placeholder="Max"
                        className="h-8 text-xs bg-white"
                      />
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 absolute -top-2 -right-2 bg-white shadow-sm border border-gray-100 text-gray-400 hover:text-red-500 opacity-0 group-hover/mapping:opacity-100 transition-opacity"
                    onClick={() => {
                      const newMappings = mappings.filter((_: any, i: number) => i !== idx);
                      onUpdate(node.id, { mappings: newMappings });
                    }}
                  >
                    <Trash size={12} />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs border-dashed"
                onClick={() => {
                  onUpdate(node.id, { mappings: [...mappings, { from: "", to: "", start: "0", length: "" }] });
                }}
              >
                <Plus size={14} className="mr-1" /> Add Mapping
              </Button>
            </div>
          </div>
        );
      case "HTTP Lookup":
        return (
          <>
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase text-gray-400">Endpoint URL</Label>
              <Input
                value={node.data.url || ""}
                onChange={(e) => onUpdate(node.id, { url: e.target.value })}
                placeholder="https://api.example.com/..."
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase text-gray-400">Method</Label>
              <select
                className="w-full h-9 px-3 py-1 bg-white border border-gray-200 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500"
                value={node.data.method || "GET"}
                onChange={(e) => onUpdate(node.id, { method: e.target.value })}
              >
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
              </select>
            </div>
          </>
        );
      case "Filter":
        return (
          <>
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase text-gray-400">Condition Field</Label>
              <Input
                value={node.data.conditionField || ""}
                onChange={(e) => onUpdate(node.id, { conditionField: e.target.value })}
                placeholder="e.g. status"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase text-gray-400">Operator</Label>
              <select
                className="w-full h-9 px-3 py-1 bg-white border border-gray-200 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500"
                value={node.data.operator || "equals"}
                onChange={(e) => onUpdate(node.id, { operator: e.target.value })}
              >
                <option value="equals">Equals</option>
                <option value="not_equals">Not Equals</option>
                <option value="contains">Contains</option>
                <option value="exists">Exists</option>
              </select>
            </div>
          </>
        );
      case "Webhook":
        return (
          <>
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase text-gray-400">Webhook URL</Label>
              <div className="p-2 bg-gray-50 border border-gray-200 rounded text-[10px] font-mono break-all text-gray-600">
                https://hooks.flowbuild.com/{node.id}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase text-gray-400">Method</Label>
              <select
                className="w-full h-9 px-3 py-1 bg-white border border-gray-200 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500"
                value={node.data.method || "POST"}
                onChange={(e) => onUpdate(node.id, { method: e.target.value })}
              >
                <option>POST</option>
                <option>GET</option>
              </select>
            </div>
          </>
        );
      case "Schedule":
        return (
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase text-gray-400">Cron Expression</Label>
            <Input
              value={node.data.cron || ""}
              onChange={(e) => onUpdate(node.id, { cron: e.target.value })}
              placeholder="0 * * * *"
            />
            <p className="text-[10px] text-gray-400 italic">Example: 0 * * * * (Every hour)</p>
          </div>
        );
      case "Form Submit":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="form-id" className="text-xs font-semibold uppercase text-gray-400">Form ID</Label>
              <Input
                id="form-id"
                value={node.data.formId || ""}
                onChange={(e) => onUpdate(node.id, { formId: e.target.value })}
                placeholder="e.g. contact-form-001"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="success-msg" className="text-xs font-semibold uppercase text-gray-400">Success Message</Label>
              <Input
                id="success-msg"
                value={node.data.successMessage || ""}
                onChange={(e) => onUpdate(node.id, { successMessage: e.target.value })}
                placeholder="Thank you for your submission!"
              />
            </div>
          </>
        );
      case "Manual Trigger":
        return (
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase text-gray-400">Input Schema (JSON)</Label>
            <textarea
              className="w-full h-32 p-2 bg-gray-900 text-gray-100 font-mono text-xs rounded border border-gray-700 outline-none focus:ring-1 focus:ring-blue-500"
              value={node.data.schema || '{\n  "type": "object",\n  "properties": {}\n}'}
              onChange={(e) => onUpdate(node.id, { schema: e.target.value })}
              spellCheck={false}
            />
          </div>
        );
      case "JS Code":
        return (
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase text-gray-400">JavaScript Code</Label>
            <textarea
              className="w-full h-32 p-2 bg-gray-900 text-gray-100 font-mono text-xs rounded border border-gray-700 outline-none focus:ring-1 focus:ring-blue-500"
              value={node.data.code || "// input contains the incoming data\nreturn input;"}
              onChange={(e) => onUpdate(node.id, { code: e.target.value })}
              spellCheck={false}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-80 h-full bg-white border-l border-gray-200 flex flex-col shrink-0">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h2 className="font-bold text-gray-900">Configure</h2>
          <p className="text-xs text-gray-500">Update node properties</p>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors"
        >
          <X size={18} className="text-gray-400" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase text-gray-400">Label</Label>
          <Input
            value={node.data.label}
            onChange={(e) => onUpdate(node.id, { label: e.target.value })}
            className="h-9"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase text-gray-400">Sub Label</Label>
          <Input
            value={node.data.subLabel}
            onChange={(e) => onUpdate(node.id, { subLabel: e.target.value })}
            className="h-9"
          />
        </div>

        <div className="pt-4 border-t border-gray-100 space-y-6">
          {renderTransformerFields()}
        </div>

        {['Webhook', 'Schedule', 'Form Submit', 'Manual Trigger', 'Incoming SFTP', 'Shopify Webhook'].includes(node.data.label) && (
          <div className="pt-6">
            <Button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white gap-2"
              onClick={() => onUpdate(node.id, {
                lastTested: new Date().toISOString(),
                status: 'success'
              })}
            >
              <Zap size={16} />
              Test Trigger
            </Button>
            <p className="text-[10px] text-gray-400 text-center mt-2">
              Simulates an incoming event to test connected nodes.
            </p>
          </div>
        )}
      </div>
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={() => onDelete(node.id)}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors text-sm font-medium"
        >
          <Trash2 size={16} />
          Delete Node
        </button>
      </div>
    </div>
  );
};

const initialNodes = [
  // Top Level
  {
    id: "1",
    type: "custom",
    position: { x: 0, y: 0 },
    data: {
      label: "User Initializing",
      subLabel: "Session Start",
      icon: <User size={16} />,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      stats: [{ label: "Active", color: "blue", icon: "clock" }],
    },
  },

  // Second Layer
  {
    id: "2",
    type: "custom",
    position: { x: -250, y: 150 },
    data: {
      label: "Initialize Data",
      subLabel: "Fetch Context",
      icon: <Database size={16} />,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      stats: [{ label: "Cached", color: "purple", icon: "check" }],
    },
  },
  {
    id: "3",
    type: "custom",
    position: { x: 250, y: 150 },
    data: {
      label: "Setup Automation",
      subLabel: "Config Loader",
      icon: <Settings size={16} />,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      stats: [{ label: "Ready", color: "purple", icon: "check" }],
    },
  },

  // Third Layer
  {
    id: "4",
    type: "custom",
    position: { x: -250, y: 300 },
    data: {
      label: "Data Collection",
      subLabel: "Input Stream",
      icon: <FileText size={16} />,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      stats: [{ label: " collecting...", color: "blue", icon: "clock" }],
    },
  },
  {
    id: "5",
    type: "custom",
    position: { x: 250, y: 300 },
    data: {
      label: "Trigger Automation",
      subLabel: "Event Listener",
      icon: <Zap size={16} />,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      stats: [{ label: "Waiting", color: "orange", icon: "alert" }],
    },
  },

  // Middle Layer (Converging)
  {
    id: "6",
    type: "custom",
    position: { x: 0, y: 450 },
    data: {
      label: "Data Validation",
      subLabel: "Quality Gate",
      icon: <ShieldCheck size={16} />,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      stats: [{ label: "99.9% Valid", color: "green", icon: "check" }],
    },
  },

  // Action Sequence
  {
    id: "7",
    type: "custom",
    position: { x: 0, y: 600 },
    data: {
      label: "Action Trigger",
      subLabel: "Execute Payload",
      icon: <Zap size={16} />,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      stats: [{ label: "Running", color: "blue", icon: "clock" }],
    },
  },

  {
    id: "8",
    type: "custom",
    position: { x: 0, y: 750 },
    data: {
      label: "Output Generation",
      subLabel: "Report Builder",
      icon: <FileText size={16} />,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      stats: [{ label: "Generated", color: "green", icon: "check" }],
    },
  },

  // Final
  {
    id: "9",
    type: "custom",
    position: { x: 0, y: 900 },
    data: {
      label: "Finalize",
      subLabel: "Cleanup & Log",
      icon: <Flag size={16} />,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
      stats: [{ label: "Complete", color: "gray", icon: "check" }],
    },
  },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#bdbdbd" },
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#bdbdbd" },
  },

  {
    id: "e2-4",
    source: "2",
    target: "4",
    type: "smoothstep",
    style: { stroke: "#bdbdbd" },
  },
  {
    id: "e3-5",
    source: "3",
    target: "5",
    type: "smoothstep",
    style: { stroke: "#bdbdbd" },
  },

  {
    id: "e4-6",
    source: "4",
    target: "6",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#6366f1" },
  }, // Converging
  {
    id: "e5-6",
    source: "5",
    target: "6",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#6366f1" },
  }, // Converging

  {
    id: "e6-7",
    source: "6",
    target: "7",
    type: "smoothstep",
    style: { stroke: "#bdbdbd" },
  },
  {
    id: "e7-8",
    source: "7",
    target: "8",
    type: "smoothstep",
    style: { stroke: "#bdbdbd" },
  },
  {
    id: "e8-9",
    source: "8",
    target: "9",
    type: "smoothstep",
    style: { stroke: "#10b981", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#10b981" },
  },
];

let id = 10;
const getId = () => `${id++}`;

const WorkflowCanvasContent = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const { project, getNode } = useReactFlow();

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  const handleUpdateNode = useCallback(
    (id: string, newData: any) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              data: {
                ...node.data,
                ...newData,
              },
            };
          }
          return node;
        }),
      );
    },
    [setNodes],
  );

  const handleDeleteNode = useCallback(
    (id: string) => {
      setNodes((nds) => nds.filter((node) => node.id !== id));
      setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
      setSelectedNodeId(null);
    },
    [setNodes, setEdges],
  );

  const onNodeDragStop = useCallback(
    (event: React.MouseEvent, node: Node) => {
      const targetElement = document.elementFromPoint(event.clientX, event.clientY);
      const containerElement = targetElement?.closest(".react-flow__node");
      const parentId = containerElement?.getAttribute("data-id");

      if (parentId && parentId !== node.id) {
        const parentNode = getNode(parentId);
        if (parentNode && (parentNode.data.label === "Condition" || parentNode.data.label === "Loop")) {
          setNodes((nds) =>
            nds.map((n) => {
              if (n.id === node.id) {
                // Get parent's absolute position
                const parentAbsX = parentNode.positionAbsolute?.x || parentNode.position.x;
                const parentAbsY = parentNode.positionAbsolute?.y || parentNode.position.y;

                // Get node's current absolute position
                const nodeAbsX = node.positionAbsolute?.x || node.position.x;
                const nodeAbsY = node.positionAbsolute?.y || node.position.y;

                const relX = nodeAbsX - parentAbsX;
                const relY = nodeAbsY - parentAbsY;
                const position = { x: relX, y: relY };

                let branch = undefined;
                if (parentNode.data.label === "Condition") {
                  branch = relX < 160 ? "true" : "false";
                }

                return {
                  ...n,
                  parentNode: parentId,
                  extent: "parent" as const,
                  position,
                  data: { ...n.data, branch }
                };
              }
              return n;
            }),
          );
        }
      } else if (!parentId && node.parentNode) {
        // Dragged out of parent, return to top level
        setNodes((nds) =>
          nds.map((n) => {
            if (n.id === node.id) {
              const nodeAbsX = node.positionAbsolute?.x || node.position.x;
              const nodeAbsY = node.positionAbsolute?.y || node.position.y;

              return {
                ...n,
                parentNode: undefined,
                extent: undefined,
                position: { x: nodeAbsX, y: nodeAbsY },
                data: { ...n.data, branch: undefined }
              };
            }
            return n;
          })
        );
      }
    },
    [getNode, setNodes],
  );

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      const label = event.dataTransfer.getData("application/label");
      const iconName = event.dataTransfer.getData("application/icon");
      const colorClass = event.dataTransfer.getData("application/color");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      if (!reactFlowBounds) return;

      const position = project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      // Find if we are dropping onto a container node
      const targetElement = document.elementFromPoint(event.clientX, event.clientY);
      const containerElement = targetElement?.closest(".react-flow__node");
      const parentId = containerElement?.getAttribute("data-id");
      const parentNode = parentId ? getNode(parentId) : null;

      const isLogicNode = label === "Condition" || label === "Loop";

      const newNode: any = {
        id: getId(),
        type,
        position,
        data: {
          label: label,
          subLabel: "New Node",
          icon: iconMap[iconName] || <Zap size={16} />,
          iconBg: colorClass ? `${colorClass.replace("text-", "bg-")}/20` : "bg-blue-100",
          iconColor: colorClass || "text-blue-600",
          stats: [],
          isContainer: isLogicNode,
        },
      };

      if (parentNode && (parentNode.data.label === "Condition" || parentNode.data.label === "Loop")) {
        newNode.parentNode = parentNode.id;
        newNode.extent = "parent";

        // Adjust position relative to parent's absolute position
        const parentAbsX = parentNode.positionAbsolute?.x || parentNode.position.x;
        const parentAbsY = parentNode.positionAbsolute?.y || parentNode.position.y;

        const relX = position.x - parentAbsX;
        const relY = position.y - parentAbsY;
        newNode.position = { x: relX, y: relY };

        if (parentNode.data.label === "Condition") {
          newNode.data.branch = relX < 160 ? "true" : "false";
        }
      }

      setNodes((nds) => nds.concat(newNode));
    },
    [project, setNodes, getNode],
  );

  return (
    <div className="w-full h-full flex overflow-hidden bg-gray-50">
      <WorkflowToolbox />
      <div className="flex-1 h-full relative" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={() => console.log("React Flow initialized")}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          onNodeDragStop={onNodeDragStop}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background color="#aaa" gap={20} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
      {selectedNode && (
        <NodeConfigPanel
          node={selectedNode}
          onUpdate={handleUpdateNode}
          onDelete={handleDeleteNode}
          onClose={() => setSelectedNodeId(null)}
        />
      )}
    </div>
  );
};

export const WorkflowCanvas = () => (
  <ReactFlowProvider>
    <WorkflowCanvasContent />
  </ReactFlowProvider>
);

export default WorkflowCanvas;

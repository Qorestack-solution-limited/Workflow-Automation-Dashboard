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

  return (
    <div className="w-72 h-full bg-white border-l border-gray-200 flex flex-col shrink-0">
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
          <Label htmlFor="node-label" className="text-xs font-semibold uppercase text-gray-400">Label</Label>
          <Input
            id="node-label"
            value={node.data.label}
            onChange={(e) => onUpdate(node.id, { label: e.target.value })}
            className="h-9"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="node-sublabel" className="text-xs font-semibold uppercase text-gray-400">Sub Label</Label>
          <Input
            id="node-sublabel"
            value={node.data.subLabel}
            onChange={(e) => onUpdate(node.id, { subLabel: e.target.value })}
            className="h-9"
          />
        </div>
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
                // Adjust position to be relative to parent
                const relX = n.position.x - parentNode.position.x;
                const relY = n.position.y - parentNode.position.y;
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
        // adjust position to be relative to parent
        const relX = position.x - parentNode.position.x;
        const relY = position.y - parentNode.position.y;
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

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
} from "lucide-react";
import { WorkflowToolbox } from "./WorkflowToolbox";

const nodeTypes = {
  custom: CustomNode,
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
  const { project } = useReactFlow();

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      const label = event.dataTransfer.getData("application/label");

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

      const newNode = {
        id: getId(),
        type,
        position,
        data: {
          label: label,
          subLabel: "New Node",
          icon: <Zap size={16} />,
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
          stats: [],
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [project, setNodes],
  );

  return (
    <div className="w-full h-full flex">
      <WorkflowToolbox />
    </div>
  );
};

export const WorkflowCanvas = () => (
  <ReactFlowProvider>
    <WorkflowCanvasContent />
  </ReactFlowProvider>
);

export default WorkflowCanvas;

import { useCallback } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
  MiniMap,
  Panel
} from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import Toolbar from "./components/Toolbar";
import { CANVAS_STYLES } from "./lib/config";

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="w-full h-screen font-atkinson">
      <ReactFlow 
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        style={CANVAS_STYLES}
      >
        <Panel position="top-left">
          <Toolbar/>
        </Panel>
        <Panel position="top-right">
          <h1 className="h-12 bg-blue-400 leading-[48px] text-xl font-bold italic px-6 rounded-full text-white drop-shadow-md">Junction Flow</h1>
        </Panel>
        <Controls/>
        <MiniMap/>
        <Background variant="dots" gap={12} size={0.5}/>
      </ReactFlow>
    </div>
  )
}
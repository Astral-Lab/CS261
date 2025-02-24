import { 
  useCallback, 
  useMemo, 
  useState, 
  useRef 
} from "react";
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
import JunctionLaneNode from "./components/JunctionLaneNode";
import JunctionIntersectionNode from "./components/JunctionIntersectionNode";
import ContextMenu from "./components/ContextMenu";

// Must disable node inputs whilst simulation running???
// pass in prop that determines the position of the connector?

const initialNodes = [
  {
    id: 'n-1',
    type: 'junctionLane',
    position: { x: 0, y: 0 },
    data: {
      handlePosition: "Bottom",
      label: "northbound 1"
    }
  },
  {
    id: 'n-2',
    type: 'junctionLane',
    position: { x: 0, y: 0 },
    data: {
      handlePosition: "Bottom",
      label: "northbound 2"
    }
  },
  {
    id: 'n-3',
    type: 'junctionLane',
    position: { x: 0, y: 0 },
    data: {
      handlePosition: "Bottom",
      label: "northbound 3"
    }
  },
  {
    id: 'e-1',
    type: 'junctionLane',
    position: { x: 0, y: 0 },
    data: {
      handlePosition: "Left",
      label: "eastbound 1"
    }
  },
  {
    id: 'e-2',
    type: 'junctionLane',
    position: { x: 0, y: 0 },
    data: {
      handlePosition: "Left",
      label: "eastbound 2"
    }
  },
  {
    id: 'e-3',
    type: 'junctionLane',
    position: { x: 0, y: 0 },
    data: {
      handlePosition: "Left",
      label: "eastbound 3"
    }
  },
  {
    id: 's-1',
    type: 'junctionLane',
    position: { x: 0, y: 0 },
    data: {
      handlePosition: "Top",
      label: "southbound 1"
    }
  },
  {
    id: 's-2',
    type: 'junctionLane',
    position: { x: 0, y: 0 },
    data: {
      handlePosition: "Top",
      label: "southbound 2"
    }
  },
  {
    id: 's-3',
    type: 'junctionLane',
    position: { x: 0, y: 0 },
    data: {
      handlePosition: "Top",
      label: "southbound 3"
    }
  },
  {
    id: 'w-1',
    type: 'junctionLane',
    position: { x: 0, y: 0 },
    data: {
      handlePosition: "Right",
      label: "westbound 1"
    }
  },
  {
    id: 'w-2',
    type: 'junctionLane',
    position: { x: 0, y: 0 },
    data: {
      handlePosition: "Right",
      label: "westbound 2"
    }
  },
  {
    id: 'w-3',
    type: 'junctionLane',
    position: { x: 0, y: 0 },
    data: {
      handlePosition: "Right",
      label: "westbound 3"
    }
  },
  {
    id: 'i-1',
    type: 'junctionIntersection',
    position: { x: 0, y: 0 },
  },
];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState();
  const [menu, setMenu] = useState(null);
  const ref = useRef(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onPaneClick = useCallback(
    (event) => {
      // Prevent native context menu from showing
      event.preventDefault();

      // Calculate position of the context menu
      const pane = ref.current.getBoundingClientRect();
      setMenu({
        // prevent menu being painted off screen...
        // top: event.clientY < pane.height - 200 && event.clientY,
        // left: event.clientX < pane.width - 200 && event.clientX,
        // right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        // bottom: event.clientY >= pane.height - 200 && pane.height - event.clientY,
        x: event.pageX,
        y: event.pageY
      });
    },
    [setMenu]
  );

  const nodeTypes = useMemo(() => ({ 
    junctionLane: JunctionLaneNode,
    junctionIntersection: JunctionIntersectionNode
  }), []);

  return (
    <div 
      className="w-full h-screen font-fira-code select-none relative"
      onContextMenu={onPaneClick} 
    >
      {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
      <ReactFlow 
        ref={ref}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        style={CANVAS_STYLES}
        nodeTypes={nodeTypes}
        fitView
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
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
import { generateJunctionNodesAndEdges } from "./lib/utils";
import useMobileLayout from "./lib/hooks";

// Must disable node inputs whilst simulation running???
export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(generateJunctionNodesAndEdges(2));
  const [edges, setEdges, onEdgesChange] = useEdgesState();
  const [menu, setMenu] = useState(null);
  const isMobile = useMobileLayout();
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
        nodeOrigin={[0.5, 0.5]}
        fitView
      >
        <Panel position="top-left">
          <Toolbar/>
        </Panel>
        <Panel position="top-right">
          <h1 className="h-12 bg-blue-400 leading-[48px] text-xl font-bold italic px-6 rounded-full text-white drop-shadow-md">Junction Flow</h1>
        </Panel>
        {!isMobile && <Controls/>}
        {!isMobile && <MiniMap/>}
        <Background variant="dots" gap={12} size={0.5}/>
      </ReactFlow>
    </div>
  )
}
import { 
  useCallback, 
  useMemo, 
  useState, 
  useRef, 
  useEffect
} from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  Panel
} from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import Toolbar from "./components/Toolbar";
import { CANVAS_STYLES } from "./lib/config";
import JunctionLaneNode from "./components/JunctionLaneNode";
import JunctionIntersectionNode from "./components/JunctionIntersectionNode";
import { 
  generateJunctionEdges, 
  generateJunctionNodes 
} from "./lib/utils";
import useMobileLayout from "./lib/hooks";
import CreateAndLoadJunction from "./components/CreateAndLoadMenu";
import JunctionFlowHints from "./components/JunctionFlowHints";

// Must disable node inputs whilst simulation running???
export default function App() {
  const [laneCount, setLaneCount] = useState(2)
  const [nodes, setNodes, onNodesChange] = useNodesState(generateJunctionNodes(laneCount));
  const [edges, setEdges, onEdgesChange] = useEdgesState(generateJunctionEdges(laneCount));
  const isMobile = useMobileLayout();
  const ref = useRef(null);

  const nodeTypes = useMemo(() => ({ 
    junctionLane: JunctionLaneNode,
    junctionIntersection: JunctionIntersectionNode
  }), []);

  useEffect(() => {
    setNodes(generateJunctionNodes(laneCount));
    setEdges(generateJunctionEdges(laneCount));

  }, [laneCount]);

  return (
    <div className="w-full flex h-screen font-fira-code select-none relative py-8 pr-8">
      {/* <CreateAndLoadJunction/> */}
      <div className="w-1/4 h-full flex flex-col justify-between px-8">
        <h1 className="text-center text-4xl text-blue-400 font-fira-code mt-8">Junction Flow</h1>
        {/* <ol className="w-full flex flex-col gap-6 border-y-[1px] border-black py-8">
          <li className="text-sm">1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, omnis. Illo velit.</li>
          <li className="text-sm">2. sint dicta voluptate consectetur unde consequuntur, aperiam dolores explicabo tenetur tempora minus impedit vel illum dignissimos quaerat provident?</li>
          <li className="text-sm">3. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, omnis. Illo velit.</li>
        </ol> */}
        <JunctionFlowHints/>
        <p className="text-[10px] text-center">This project is completed as part of the <span className="font-bold">Software Engineering</span> module (Group 34) at the University of Warwick.</p>
      </div>
      <ReactFlow 
        ref={ref}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        style={CANVAS_STYLES}
        nodeTypes={nodeTypes}
        nodeOrigin={[0.5, 0.5]}
        fitView
        className="rounded-2xl drop-shadow-sm"
        minZoom={0.01}
      >
        <Panel position="top-right">
          <Toolbar/>
        </Panel>
        {/* <Panel position="top-right">
          <h1 className="h-12 bg-blue-400 leading-[48px] text-xl font-bold italic px-6 rounded-full text-white drop-shadow-md">Junction Flow</h1>
        </Panel> */}
        {!isMobile && <Controls/>}
        {/* {!isMobile && <MiniMap/>} */}
        <Background variant="dots" gap={12} size={0.5}/>
      </ReactFlow>
    </div>
  )
}
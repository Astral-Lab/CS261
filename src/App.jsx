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
import { 
  generateJunctionEdges, 
  generateJunctionNodes 
} from "./lib/utils";
import useMobileLayout from "./lib/hooks";
import CreateAndLoadJunction from "./components/CreateAndLoadMenu";

// Must disable node inputs whilst simulation running???
export default function App() {
  const [laneCount, setLaneCount] = useState(1)
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
      {isMobile && (
        <div className="w-full h-8 bg-blue-400 flex justify-center items-center">
          <h1 className="text-white font-fira-code font-[500]">JUNCTION FLOW</h1>
        </div>
      )}
      {/* <CreateAndLoadJunction/> */}
      <div className="w-1/4 h-full flex flex-col gap-8 px-8">
        <h1 className="text-center text-4xl text-blue-400 font-poetsen-one mt-8">Junction Flow</h1>
        <ul className="w-full grid grid-cols-2 gap-2">
          <li>
              <button 
                  className="w-full h-16 bg-[#E0E0E0] rounded-xl shadow-xs lg:opacity-80 lg:hover:opacity-100 transition-opacity duration-300"
                  onClick={() => setLaneCount(1)}
              >1 lane</button>
          </li>
          <li>
              <button 
                  className="w-full h-16 bg-[#E0E0E0] rounded-xl shadow-xs lg:opacity-80 lg:hover:opacity-100 transition-opacity duration-300"
                  onClick={() => setLaneCount(2)}
              >2 lane</button>
          </li>
          <li>
              <button 
                  className="w-full h-16 bg-[#E0E0E0] rounded-xl shadow-xs lg:opacity-80 lg:hover:opacity-100 transition-opacity duration-300"
                  onClick={() => setLaneCount(3)}
              >3 lane</button>
          </li>
          <li>
              <button 
                  className="w-full h-16 bg-[#E0E0E0] rounded-xl shadow-xs lg:opacity-80 lg:hover:opacity-100 transition-opacity duration-300"
                  onClick={() => setLaneCount(4)}
              >4 lane</button>
          </li>
          <li>
              <button 
                  className="w-full h-16 bg-[#E0E0E0] rounded-xl shadow-xs lg:opacity-80 lg:hover:opacity-100 transition-opacity duration-300"
                  onClick={() => setLaneCount(5)}
              >5 lane</button>
          </li>
        </ul>
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
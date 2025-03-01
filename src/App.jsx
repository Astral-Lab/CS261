import { 
  useCallback, 
  useMemo, 
  useState, 
  useRef, 
  useEffect,
  useReducer
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
import ToolbarButton from "./components/ToolbarButton";
import { DEFAULT_ICON_SIZE } from "./lib/config";
import { IoMdPlay } from "react-icons/io";
import { IoSaveSharp } from "react-icons/io5";
import { IoStatsChart } from "react-icons/io5";
import { RiAddLine } from "react-icons/ri";
import SlideableContainer from "./components/SlideableContainer";
import ScoreAndStatsMenu from "./components/ScoreAndStatsMenu";
import SaveAndShareMenu from "./components/SaveAndShareMenu";

// Must disable node inputs whilst simulation running???
// dim left half of screen when menu open...
export default function App() {
  const [laneCount, setLaneCount] = useState(2)
  const [nodes, setNodes, onNodesChange] = useNodesState(generateJunctionNodes(laneCount));
  const [edges, setEdges, onEdgesChange] = useEdgesState(generateJunctionEdges(laneCount));
  const isMobile = useMobileLayout();
  const ref = useRef(null);
  const createRef = useRef(null);
  const saveRef = useRef(null);
  const statsRef = useRef(null);

  const nodeTypes = useMemo(() => ({ 
    junctionLane: JunctionLaneNode,
    junctionIntersection: JunctionIntersectionNode
  }), []);

  // on junction change repaint node diagram
  useEffect(() => {
    setNodes(generateJunctionNodes(laneCount));
    setEdges(generateJunctionEdges(laneCount));

  }, [laneCount]);

  return (
    <div className="w-full flex h-screen font-fira-code select-none relative py-8 pr-8 group/parent overflow-hidden">
      {/* <div className="w-full h-full bg-white absolute inset-0 group-[:has(:checked)]/parent:opacity-10"></div> */}
      <SlideableContainer ref={createRef} content={<CreateAndLoadJunction/>} id="create"/>
      <SlideableContainer ref={statsRef} content={<ScoreAndStatsMenu/>} id="score"/>
      <SlideableContainer ref={saveRef} content={<SaveAndShareMenu/>} id="save"/>
      <div className="w-1/4 h-full flex flex-col justify-between px-8">
        <h1 className="text-center text-4xl text-blue-400 font-fira-code mt-8">Junction Flow</h1>
        <JunctionFlowHints/>
        <p className="text-[10px] text-center italic">This project is completed as part of the Software Engineering module <span className="font-bold">(Group 34)</span> at the University of Warwick.</p>
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
          <ul className="flex gap-2">
            <ToolbarButton
                icon={<RiAddLine size={DEFAULT_ICON_SIZE}/>}
                title={"create or load junction"}
                ref={createRef}
                id="create"
            />
            <ToolbarButton
                icon={<IoMdPlay size={DEFAULT_ICON_SIZE}/>}
                title={"play"}
                onClick={null}
                id="play"
            />
            <ToolbarButton
                icon={<IoStatsChart size={DEFAULT_ICON_SIZE}/>}
                title={"stats"}
                ref={statsRef}
                id="score"
            />
            <ToolbarButton
                icon={<IoSaveSharp size={DEFAULT_ICON_SIZE}/>}
                title={"save junction"}
                ref={saveRef}
                id="save"
            />
          </ul>
        </Panel>
        {!isMobile && <Controls/>}
        <Background variant="dots" gap={12} size={0.5}/>
      </ReactFlow>
    </div>
  )
}
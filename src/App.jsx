import { 
  useMemo, 
  useRef, 
  useEffect,
  useState
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
  decodeSharedURL,
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
import { FaStop } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { RiAddLine } from "react-icons/ri";
import SlideableContainer from "./components/SlideableContainer";
import ScoreAndStatsMenu from "./components/ScoreAndStatsMenu";
import SaveAndShareMenu from "./components/SaveAndShareMenu";
import { useSearchParams } from "react-router";
import { 
  useDispatch, 
  useSelector 
} from "react-redux";
import { 
  loadJunction, 
  selectJunction 
} from "./stores/junctionSlice";
import { 
  useReactFlow, 
  useStoreApi 
} from '@xyflow/react';

export default function App() {
  const junction = useSelector(selectJunction);
  const [nodes, setNodes, onNodesChange] = useNodesState(generateJunctionNodes(junction.laneCount));
  const [edges, setEdges, onEdgesChange] = useEdgesState(generateJunctionEdges(junction.laneCount));
  const [runSim, setRunSim] = useState(false);
  const [searchParams] = useSearchParams();
  const isMobile = useMobileLayout();
  const createRef = useRef(null);
  const saveRef = useRef(null);
  const statsRef = useRef(null);
  const ref = useRef(null);
  const dispatch = useDispatch();
  const reactFlow = useReactFlow();

  const nodeTypes = useMemo(() => ({ 
    junctionLane: JunctionLaneNode,
    junctionIntersection: JunctionIntersectionNode

  }), []);

  // on junction change repaint node diagram
  useEffect(() => {
    setNodes(generateJunctionNodes(junction.laneCount));
    setEdges(generateJunctionEdges(junction.laneCount));

    // reset canvas view to fit new junction
    setTimeout(() => reactFlow.fitView(), 100);

  }, [junction.laneCount]);

  // on page load checks if URL is a shareable link and loads that junction to the interface
  useEffect(() => {
    if(searchParams.get("data")) {
      dispatch(loadJunction(decodeSharedURL(searchParams.get("data"))));
    }

  }, []);

  const store = useStoreApi();
  const { setCenter } = useReactFlow();

  useEffect(() => {
    let currentNodeIndex = 0;

    const focusNode = () => {
      const { nodeLookup } = store.getState();
      const nodes = Array.from(nodeLookup).map(([, node]) => node).slice(1);
  
      if (nodes.length > 0) {
        const node = nodes[currentNodeIndex];
  
        const x = node.position.x
        const y = node.position.y
        const zoom = 1;
  
        setCenter(x, y, { zoom, duration: 1000 });

        currentNodeIndex = ((currentNodeIndex + 1) % nodes.length);
      }
    }

    let interval;

    if(runSim) {
      interval = setInterval(focusNode, 2000);
    } else {
      reactFlow.fitView()
    }

    // cleanup function...
    return () => clearInterval(interval);
  }, [runSim]);

  return (
    <div className="w-full flex h-screen font-fira-code select-none relative py-8 pr-8 group/parent overflow-hidden">
      <SlideableContainer 
        ref={createRef} 
        content={<CreateAndLoadJunction/>} 
        id="create"
      />
      <SlideableContainer 
        ref={statsRef} 
        content={<ScoreAndStatsMenu/>} 
        id="score"
      />
      <SlideableContainer 
        ref={saveRef} 
        content={<SaveAndShareMenu ref={saveRef}/>} 
        id="save"
      />
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
                icon={runSim ? 
                  <FaStop size={DEFAULT_ICON_SIZE}/> : 
                  <IoMdPlay size={DEFAULT_ICON_SIZE}/>
                }
                title={"play"}
                id="play"
                onClick={() => setRunSim(!runSim)}
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
        <Background 
          variant="dots" 
          gap={12} 
          size={0.5}
        />
      </ReactFlow>
    </div>
  )
}
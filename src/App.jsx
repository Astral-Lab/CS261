import { 
  useMemo, 
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
import { CANVAS_STYLES } from "./lib/config";
import JunctionLaneNode from "./components/JunctionLaneNode";
import JunctionIntersectionNode from "./components/JunctionIntersectionNode";
import { 
  computeNodeSideMidpoint,
  computeSimulationSideBreakpoints,
  decodeSharedURL,
  generateJunctionEdges, 
  generateJunctionNodes, 
  getSimluationLaneQueues
} from "./lib/utils";
import useMobileLayout from "./lib/hooks";
import CreateAndLoadJunction from "./components/CreateAndLoadMenu";
import JunctionFlowHints from "./components/JunctionFlowHints";
import ToolbarButton from "./components/ToolbarButton";
import { DEFAULT_ICON_SIZE } from "./lib/config";
import { IoMdPlay } from "react-icons/io";
import { IoSaveSharp } from "react-icons/io5";
import { FaStop } from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";
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
  incrementSimulationSeconds,
  initSimulation,
  loadJunction, 
  resetSimulationSeconds, 
  selectJunction, 
  selectSimulation,
  setSimulationActiveLaneIndex,
  toggleSimulation,
  updateSimulationQueues
} from "./stores/junctionSlice";
import { 
  useReactFlow, 
  useStoreApi 
} from '@xyflow/react';

export default function App() {
  const junction = useSelector(selectJunction);
  const simulation = useSelector(selectSimulation);
  const [nodes, setNodes, onNodesChange] = useNodesState(generateJunctionNodes(junction.laneCount));
  const [edges, setEdges, onEdgesChange] = useEdgesState(generateJunctionEdges(junction.laneCount));
  const [searchParams] = useSearchParams();
  const isMobile = useMobileLayout();
  const createRef = useRef(null);
  const saveRef = useRef(null);
  const statsRef = useRef(null);
  const ref = useRef(null);
  const dispatch = useDispatch();
  const reactFlow = useReactFlow();
  const store = useStoreApi();
  const { setCenter } = useReactFlow();
  const { nodeLookup } = store.getState();
  const laneNodes = Array.from(nodeLookup).map(([, node]) => node).slice(1); // ignore junction node

  const nodeTypes = useMemo(() => ({ 
    junctionLane: JunctionLaneNode,
    junctionIntersection: JunctionIntersectionNode

  }), []);

  // on junction change repaint node diagram
  useEffect(() => {
    setNodes(generateJunctionNodes(junction.laneCount));
    setEdges(generateJunctionEdges(junction.laneCount));
    dispatch(initSimulation(junction.laneCount));

    // reset canvas view to fit new junction
    setTimeout(() => reactFlow.fitView(), 100);

  }, [junction.laneCount]);

  // on page load checks if URL is a shareable link and loads that junction to the interface
  useEffect(() => {
    if(searchParams.get("data")) {
      dispatch(loadJunction(decodeSharedURL(searchParams.get("data"))));
    }

  }, []);

  useEffect(() => {
    const ANIM_OPTIONS = { zoom: 0.5, duration: 2000 };
    const segmentSize = laneNodes.length / 4;
    const [
      northBreakpoint,
      eastBreakpoint,
      southBreakpoint,
      westBreakpoint
    ] = computeSimulationSideBreakpoints(junction);

    const handleSimulation = () => {
      dispatch(incrementSimulationSeconds());

      if(simulation.seconds === 1) {
        // initially animate to north
        if(laneNodes.length > 0) {
          let [x, y] = computeNodeSideMidpoint(laneNodes.slice(0, segmentSize), "x");
          setCenter(x, y, ANIM_OPTIONS);
        }
      }

      // light cycle complete reset to 0
      if(simulation.seconds === junction.lightDuration) {
        dispatch(resetSimulationSeconds());
      }

      // northbound period
      if(simulation.seconds === northBreakpoint) {
        // animate to east
        if(laneNodes.length > 0) {
          let [x, y] = computeNodeSideMidpoint(laneNodes.slice(segmentSize, segmentSize * 2), "y");
          setCenter(x, y, ANIM_OPTIONS);
        }

        // activate east side
        dispatch(setSimulationActiveLaneIndex(2));

      // eastbound period
      } else if(simulation.seconds === eastBreakpoint) {
        // animate to south
        if(laneNodes.length > 0) {
          let [x, y] = computeNodeSideMidpoint(laneNodes.slice(segmentSize * 2, segmentSize * 3), "x");
          setCenter(x, y, ANIM_OPTIONS);
        }

        // activate south side
        dispatch(setSimulationActiveLaneIndex(3));

      // southbound period
      } else if(simulation.seconds === southBreakpoint) {
        // animate to west
        if(laneNodes.length > 0) {
          let [x, y] = computeNodeSideMidpoint(laneNodes.slice(segmentSize * 3, segmentSize * 4), "y");
          setCenter(x, y, ANIM_OPTIONS);
        }

        // activate west side
        dispatch(setSimulationActiveLaneIndex(4));

      // westbound period
      } else if(simulation.seconds === westBreakpoint) {
        // animate to north
        if(laneNodes.length > 0) {
          let [x, y] = computeNodeSideMidpoint(laneNodes.slice(0, segmentSize), "x");
          setCenter(x, y, ANIM_OPTIONS);
        }

        // activate north side
        dispatch(setSimulationActiveLaneIndex(1));

      }

      // update lane queues each second
      dispatch(updateSimulationQueues(getSimluationLaneQueues(junction, simulation)));
    }

    let interval;

    if(simulation.runSim) {
      // grab the interval id for cleanup function
      interval = setInterval(handleSimulation, 1000);

    } else {
      // reset viewport to fit the node diagram
      reactFlow.fitView();
    }

    // sideffect clean up
    return () => {
      clearInterval(interval);
    }

  }, [simulation, junction, laneNodes]); 
  
  const handleRunSimulation = () => {
    dispatch(initSimulation(junction.laneCount));

    if(simulation.runSim) {
      // reset sim 
      dispatch(toggleSimulation());
      dispatch(resetSimulationSeconds());

    } else {
      // init sim
      dispatch(toggleSimulation());

    }
  }

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-0 h-screen font-fira-code select-none relative p-4 lg:py-8 lg:pr-8 group/parent overflow-hidden">
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
      <div className="w-full lg:w-1/4 h-16 lg:h-full flex lg:flex-col justify-between items-center lg:items-start lg:px-8 group/hint mt-4 lg:mt-0">
        <h1 className="text-center text-2xl lg:text-4xl text-blue-400 font-fira-code lg:mt-8">Junction Flow</h1>
        <div className="lg:hidden w-12 h-12 flex justify-center items-center z-20 lg:z-0 relative">
          <input 
            className="w-full h-full opacity-0 absolute inset-0"
            type="checkbox"
          />
          <FaExclamationCircle size={"24px"}/>
        </div>
        <JunctionFlowHints/>
        {!isMobile && <p className="text-[10px] text-center italic">This project is completed as part of the Software Engineering module <span className="font-bold">(Group 34)</span> at the University of Warwick.</p>}
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
        <Panel position={isMobile ? "bottom-left" : "top-right"}>
          <ul className="flex gap-2">
            <ToolbarButton
                icon={<RiAddLine size={DEFAULT_ICON_SIZE}/>}
                title={"create or load junction"}
                ref={createRef}
                id="create"
            />
            <ToolbarButton
                icon={simulation.runSim ? 
                  <FaStop size={DEFAULT_ICON_SIZE}/> : 
                  <IoMdPlay size={DEFAULT_ICON_SIZE}/>
                }
                title={"play"}
                id="play"
                onClick={handleRunSimulation}
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
      {isMobile && <p className="text-[10px] text-center italic">This project is completed as part of the Software Engineering module <span className="font-bold">(Group 34)</span> at the University of Warwick.</p>}
    </div>
  )
}
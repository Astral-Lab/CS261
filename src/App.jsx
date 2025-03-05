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
  initSimulation,
  loadJunction, 
  selectJunction, 
  selectSimulation,
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
  const [runSim, setRunSim] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [activeLaneIndex, setActiveLaneIndex] = useState(0); // put both (and seconds) into sim state in redux...
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

  // work in progress
  const store = useStoreApi();
  const { setCenter } = useReactFlow();

  // useEffect(() => {
  //   let currentNodeIndex = 0;

  //   const focusNode = () => {
  //     const { nodeLookup } = store.getState();
  //     const nodes = Array.from(nodeLookup).map(([, node]) => node).slice(1);
  
  //     if (nodes.length > 0) {
  //       const node = nodes[currentNodeIndex];
  
  //       const x = node.position.x
  //       const y = node.position.y
  //       const zoom = 1;
  
  //       setCenter(x, y, { zoom, duration: 1000 });

  //       currentNodeIndex = ((currentNodeIndex + 1) % nodes.length);
  //     }
  //   }

  //   let interval;

  //   if(runSim) {
  //     interval = setInterval(focusNode, 2000);
  //   } else {
  //     reactFlow.fitView()
  //   }

  //   // cleanup function...
  //   return () => clearInterval(interval);
  // }, [runSim]);

  useEffect(() => {
    const handleSimulation = () => {
      setSeconds(seconds + 1);

      // light cycle complete reset to 0
      if(seconds === junction.lightDuration) {
        setSeconds(0);
      }

      // northbound period
      if(seconds === 15) {
        // animate to north

        // activate east side
        setActiveLaneIndex(1);

      // eastbound period
      } else if(seconds === 30) {
        // animate to east
        // activate south side
        setActiveLaneIndex(2);

      // southbound period
      } else if(seconds === 45) {
        // animate to south
        // activate west side
        setActiveLaneIndex(3);

      // westbound period
      } else if(seconds === 60) {
        // animate to west
        // activate north side
        setActiveLaneIndex(4);

      }

      console.log("SIMULATION STEP: ", seconds, " ACTIVE SIDE: ", activeLaneIndex);

      // update lane queues each second
      dispatch(updateSimulationQueues(getSimluationLaneQueues(junction, activeLaneIndex, simulation)));
    }

    let interval;

    if(runSim) {
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

  }, [runSim, simulation, junction, seconds, activeLaneIndex, activeLaneIndex]); 
  
  const handleRunSimulation = () => {
    dispatch(initSimulation(junction.laneCount));

    if(runSim) {
      // reset sim 
      setRunSim(false);

    } else {
      // init sim
      setRunSim(true);

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
                icon={runSim ? 
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
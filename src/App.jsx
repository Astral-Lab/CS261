import { 
  useMemo, 
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
import { 
  CANVAS_STYLES, 
  DEFAULT_JUNCTION 
} from "./lib/config";
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

function reducer(state, action) {
  switch(action.type) {
    case "INCREMENT_LANE_COUNT": {
      return {
          ...state,
          laneCount: (state.laneCount % 4) + 1
          // update number of lanes...
      }
    }
    case "DECREMENT_LANE_COUNT": {
      return {
          ...state,
          laneCount: (state.laneCount - 1) || 4
          // update number of lanes... as if on 3 lane and go to 2 lane, need to fill or remove old lanes...
      }
    }
    case "CHANGE_JUNCTION_NAME": {
      return {
        ...state
      }
    }
    case "CHANGE_LIGHT_DURATION": {
      return {
        ...state
      }
    }
    case "CHANGE_LIGHT_PRIORITY": {
      return {
        ...state
      }
    }
    case "CHANGE_LANE_VPH": {
      return {
        ...state
      }
    }
    case "CHANGE_LANE_LEFT_TURN": {
      return {
        ...state
      }
    }
  }
  throw Error("Unknown action: " + action.type);
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, DEFAULT_JUNCTION);
  const [nodes, setNodes, onNodesChange] = useNodesState(generateJunctionNodes(state.laneCount));
  const [edges, setEdges, onEdgesChange] = useEdgesState(generateJunctionEdges(state.laneCount));
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
    setNodes(generateJunctionNodes(state.laneCount));
    setEdges(generateJunctionEdges(state.laneCount));

    // reset canvas view to fit new junction

  }, [state.laneCount]);

  useEffect(() => {
    // init custom shared junction via url...
  }, []);

  return (
    <div className="w-full flex h-screen font-fira-code select-none relative py-8 pr-8 group/parent overflow-hidden">
      <SlideableContainer 
        ref={createRef} 
        content={<CreateAndLoadJunction state={state} dispatch={dispatch}/>} 
        id="create"
      />
      <SlideableContainer 
        ref={statsRef} 
        content={<ScoreAndStatsMenu state={state}/>} 
        id="score"
      />
      <SlideableContainer 
        ref={saveRef} 
        content={<SaveAndShareMenu/>} 
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
        <Background 
          variant="dots" 
          gap={12} 
          size={0.5}
        />
      </ReactFlow>
    </div>
  )
}
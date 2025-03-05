import { 
    DEFAULT_JUNCTION, 
    DEFAULT_SIMULATION 
} from "@/lib/config";
import { createSlice } from "@reduxjs/toolkit";
import { createDefaultLanes, generateSimulationLaneQueues } from "@/lib/utils";

const initialState = {
    junctions: [DEFAULT_JUNCTION],
    current: DEFAULT_JUNCTION,
    simulation: DEFAULT_SIMULATION
}

const junctionSlice = createSlice({
    name: "junctions",
    initialState,
    reducers: {
        saveJunction: (state, action) => {
            // overwrite junction with the same name
            if(state.junctions.some(junction => junction.name === action.payload.name)) {
                state.junctions = state.junctions.map(junction => junction.name === action.payload.name ? action.payload : junction);

            // otherwise save as a new junction
            } else {
                state.junctions = [...state.junctions, action.payload];
            }
        },
        deleteJunction: (state, action) => {
            state.junctions = state.junctions.filter(junction => junction.name !== action.payload);
        },
        updateValue: (state, action) => {
            state.value = action.payload
        },
        incrementLaneCount: (state) => {
            const newLaneCount = (state.current.laneCount % 4) + 1;

            state.current.laneCount = newLaneCount;
            state.current.score = 0;
            state.current.lightDuration = 60;
            state.current.lightPriority = [1, 1, 1, 1];
            state.current.lanes = createDefaultLanes(newLaneCount);
        },
        decrementLaneCount: (state) => {
            const newLaneCount = (state.current.laneCount - 1) || 4;

            state.current.laneCount = newLaneCount;
            state.current.score = 0;
            state.current.lightDuration = 60;
            state.current.lightPriority = [1, 1, 1, 1];
            state.current.lanes = createDefaultLanes(newLaneCount);
        },
        changeJunctionName: (state, action) => {
            state.current.name = action.payload;
        },
        changeLightDuration: (state, action) => {
           state.current.lightDuration = action.payload;
        },
        changeLightPriority: (state, action) => {
            state.current.lightPriority[action.payload.light] = action.payload.value;
        },
        changeLaneVph: (state, action) => {
            state.current.lanes[state.current.lanes.findIndex(lane => lane.label === action.payload.label)].vph = action.payload.value;
        },
        loadJunction: (state, action) => {
            state.current = action.payload;
        },
        updateSimulationQueues: (state, action) => {
            state.simulation.queues = action.payload;
        },
        initSimulation: (state, action) => {
            state.simulation.seconds = 0;
            state.simulation.activeSideIndex = 1;
            state.simulation.queues = generateSimulationLaneQueues(action.payload);
        },
        incrementSimulationSeconds: (state, action) => {
            state.simulation.seconds += 1;
        },
        resetSimulationSeconds: (state, action) => {
            state.simulation.seconds = 0;
        },
        toggleSimulation: (state, action) => {
            state.simulation.runSim = !state.simulation.runSim;
        },
        setSimulationActiveLaneIndex: (state, action) => {
            state.simulation.activeSideIndex = action.payload;
        }
    }
});

export const { 
    saveJunction, 
    deleteJunction, 
    updateValue,
    incrementLaneCount,
    decrementLaneCount,
    changeJunctionName,
    changeLightDuration,
    changeLightPriority,
    changeLaneVph,
    loadJunction,
    updateSimulationQueues,
    initSimulation,
    incrementSimulationSeconds,
    resetSimulationSeconds,
    toggleSimulation,
    setSimulationActiveLaneIndex
} = junctionSlice.actions;

export default junctionSlice.reducer;

export const selectJunctions = state => state.junctions.junctions;

export const selectJunction = state => state.junctions.current;

export const selectLaneById = (state, id) => state.junctions.current.lanes.find(lane => lane.label === id);

export const selectSimulation = state => state.junctions.simulation;

export const selectSimulationQueueSizeById = (state, id) => state.junctions.simulation.queues.find(queue => queue.label === id)?.queueSize;
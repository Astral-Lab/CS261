import { DEFAULT_JUNCTION } from "@/lib/config";
import { createSlice } from "@reduxjs/toolkit";
import { createDefaultLanes } from "@/lib/utils";

const initialState = {
    junctions: [DEFAULT_JUNCTION],
    current: DEFAULT_JUNCTION
}

const junctionSlice = createSlice({
    name: "junctions",
    initialState,
    reducers: {
        saveJunction: (state, action) => {
            // overwrite junction with the same name
            if(state.junctions.some(junction => junction.name === action.payload.name)) {
                state.junctions = state.junctions.map(junction => junction.name === payload.name ? action.payload : junction);

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
            state.current.laneCount = (state.current.laneCount % 4) + 1;
            state.current.score = 0;
            state.current.lightDuration = 60;
            state.current.lightPriority = [0, 0, 0, 0];
            state.current.lanes = createDefaultLanes((state.current.laneCount % 4) + 1);
        },
        decrementLaneCount: (state) => {
            state.current.laneCount = (state.current.laneCount - 1) || 4;
            state.current.score = 0;
            state.current.lightDuration = 60;
            state.current.lightPriority = [0, 0, 0, 0];
            state.current.lanes = createDefaultLanes((state.current.laneCount - 1) || 4);
        },
        changeJunctionName: (state, action) => {
            state.current.name = action.payload;
        },
        changeLightDuration: (state, action) => {
           
        },
        changeLightPriority: (state, action) => {

        },
        changeLaneVph: (state, action) => {
            console.log(action.payload);
            state.current.lanes[state.current.lanes.findIndex(lane => lane.label === action.payload.label)].vph = action.payload.value;
        },
        changeLaneLeftTurn: (state, action) => {

        },
        loadJunction: (state, action) => {
            state.current = action.payload;
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
    changeLaneLeftTurn,
    loadJunction
} = junctionSlice.actions;

export default junctionSlice.reducer;

export const selectJunctions = state => state.junctions.junctions;

export const selectJunction = state => state.junctions.current;

export const selectLaneById = (state, id) => state.junctions.current.lanes.find(lane => lane.label === id);
import { createSlice } from "@reduxjs/toolkit";

// example junction obj
const example = {
    name: "warwick 1",
    score: 2341,
    laneCount: 4,
    lightDuration: 60,
    lightPriority: [1, 2, 3, 4],
    lanes: [{
        vph: null,
        label: null,
        leftTurn: false
    }]
}

const initialState = {
    junctions: [example]
}

const junctionSlice = createSlice({
    name: "junctions",
    initialState,
    reducers: {
        saveJunction: (state, action) => {
            state.junctions = [...state.junctions, action.payload];
        },
        deleteJunction: (state, action) => {
            state.junctions = state.junctions.filter(junction => junction.name !== action.payload);
        }
    }
});

export const { saveJunction, deleteJunction } = junctionSlice.actions;

export default junctionSlice.reducer;

// might need to memoise this selector?
export const selectJunctions = state => state.junctions.junctions;
import { DEFAULT_JUNCTION } from "@/lib/config";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    junctions: [DEFAULT_JUNCTION]
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
        }
    }
});

export const { saveJunction, deleteJunction } = junctionSlice.actions;

export default junctionSlice.reducer;

// might need to memoise this selector?
export const selectJunctions = state => state.junctions.junctions;
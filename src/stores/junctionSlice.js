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
            state.junctions = [...state.junctions, action.payload];
            // if junction saved with same name overwrite that junction, otherwise create new
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
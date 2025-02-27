import { createSlice } from "@reduxjs/toolkit";

// example junction obj
const j = {
    name: "the react junction",
    score: null,
    lightDuration: null,
    lightPriority: [],
    
}

const initialState = {

}

const junctionSlice = createSlice({
    name: "junctions",
    initialState,
    reducers: {
        
    }
});

// export reducers...

export default junctionSlice.reducer;

// export selectors...
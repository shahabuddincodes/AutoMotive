import { createSlice } from "@reduxjs/toolkit";

const TabSlice = createSlice({
    name : 'Tabs',
    initialState : {
        activeTabs : 'Home',
        category : 'Facebook',
        brandsTab : 'Lexus',
    },
    reducers:
    {
         setActiveTabs(state,action){
                state.activeTabs = action.payload
            },
         setcategory(state,action){
                state.category = action.payload
            },
         setActiveBrand(state,action){
                state.brandsTab = action.payload
            },

    }
})

export const {setActiveTabs , setcategory , setActiveBrand} = TabSlice.actions;

export default TabSlice.reducer;
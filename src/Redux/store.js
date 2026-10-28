import { configureStore } from "@reduxjs/toolkit";

import TabSlice from './Tabs.js'

export const Store = configureStore({
    reducer:{
        tabs :TabSlice,
    }
});
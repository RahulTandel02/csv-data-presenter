import { createSlice } from "@reduxjs/toolkit";

const inventoryOverviewSlice = createSlice({
    name: 'inventory-overview',
    initialState: {
        data: [],
        error: null,
        loading: false
    },
    reducers: {
        fetchInventoryOverview: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchInventoryOverviewSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        fetchInventoryOverviewDataFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})


export const { fetchInventoryOverview, fetchInventoryOverviewSuccess, fetchInventoryOverviewDataFail } = inventoryOverviewSlice.actions;
export default inventoryOverviewSlice.reducer;
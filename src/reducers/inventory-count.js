import { createSlice } from "@reduxjs/toolkit";

const inventorySlice = createSlice({
    name: 'inventory',
    initialState: {
        data: [],
        error: null,
        loading: false
    },
    reducers: {
        fetchInventoryData: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchInventorySuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        fetchInventoryDataFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})


export const { fetchInventoryData, fetchInventorySuccess, fetchInventoryDataFail } = inventorySlice.actions;
export default inventorySlice.reducer;
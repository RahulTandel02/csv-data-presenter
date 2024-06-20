import { createSlice } from "@reduxjs/toolkit";

const inventoryMSRP = createSlice({
    name: 'inventory-MSRP',
    initialState: {
        data: [],
        error: null,
        loading: false
    },
    reducers: {
        fetchInventoryMSRP: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchInventoryMSRPSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        fetchInventoryMSRPDataFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})


export const { fetchInventoryMSRP, fetchInventoryMSRPSuccess, fetchInventoryMSRPDataFail } = inventoryMSRP.actions;
export default inventoryMSRP.reducer;
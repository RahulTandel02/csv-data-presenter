import { createSlice } from "@reduxjs/toolkit";

const historyLog = createSlice({
    name: 'history-log',
    initialState: {
        data: [],
        error: null,
        loading: false
    },
    reducers: {
        fetchHistoryLog: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchHistoryLogSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        fetchHistoryLogDataFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})


export const { fetchHistoryLog, fetchHistoryLogSuccess, fetchHistoryLogDataFail } = historyLog.actions;
export default historyLog.reducer;
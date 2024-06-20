import { combineReducers } from "@reduxjs/toolkit";
import inventoryReducer from "./inventory-count";
import inventoryOverviewReducer from './inventory-overview'
import inventoryMsrp from "./inventory-msrp";
import historyLog from "./history-log";

const rootReducers = combineReducers({
    inventory: inventoryReducer,
    inventoryOverview: inventoryOverviewReducer,
    inventoryMSRP: inventoryMsrp,
    historyLog: historyLog
})

export default rootReducers
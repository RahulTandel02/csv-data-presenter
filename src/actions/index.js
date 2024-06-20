import axios from 'axios';
import { fetchInventoryData, fetchInventorySuccess, fetchInventoryDataFail } from '../reducers/inventory-count'
import { fetchInventoryOverview, fetchInventoryOverviewSuccess, fetchInventoryOverviewDataFail } from '../reducers/inventory-overview'
import { fetchInventoryMSRP, fetchInventoryMSRPSuccess, fetchInventoryMSRPDataFail } from '../reducers/inventory-msrp'
import { fetchHistoryLog, fetchHistoryLogDataFail, fetchHistoryLogSuccess } from '../reducers/history-log'

const queryBuilder = (query) => {
    return Object.keys(query).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(query[key])).join('&')


}

export const fetchData = (query) => async dispatch => {
    dispatch(fetchInventoryData());

    try {
        // const { condition, to, from, dataFormat } = query
        const newQuery = queryBuilder(query)
        const response = await axios.get(`http://localhost:5000/api/inventory-count?${newQuery}`);
        dispatch(fetchInventorySuccess(response.data));
    } catch (error) {
        dispatch(fetchInventoryDataFail(error.message));
    }
};

export const fetchDataMSRP = (query) => async dispatch => {
    dispatch(fetchInventoryMSRP());

    try {
        // const { condition, to, from, dataFormat } = query
        const newQuery = queryBuilder(query)
        const response = await axios.get(`http://localhost:5000/api/inventory-msrp?${newQuery}`);
        dispatch(fetchInventoryMSRPSuccess(response.data));
    } catch (error) {
        dispatch(fetchInventoryMSRPDataFail(error.message));
    }
};

export const fetchInventoryOverviewData = () => async dispatch => {
    dispatch(fetchInventoryOverview())
    try {
        const response = await axios.get('http://localhost:5000/api/inventory')
        dispatch(fetchInventoryOverviewSuccess(response.data))
    } catch (error) {
        dispatch(fetchInventoryOverviewDataFail(error.message))
    }
}

export const fetchHistoryLogAction = (query) => async dispatch => {
    dispatch(fetchHistoryLog())
    try {
        const newQuery = queryBuilder(query)
        const response = await axios.get(`http://localhost:5000/api/history-log?${newQuery}`)
        dispatch(fetchHistoryLogSuccess(response.data))
    } catch (error) {
        dispatch(fetchHistoryLogDataFail(error.message))
    }
}
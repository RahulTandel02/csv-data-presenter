import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchInventoryOverviewData } from "../actions"

function InventoryOverview(props) {

    const dispatch = useDispatch()
    const dataRes = useSelector(state => state.inventoryOverview).data
    console.log(dataRes)

    return (
        <>


            <div>
                <h3 className='fs-6 my-3'>Recent Gathered Data {new Date(dataRes.recentDate).toLocaleDateString()}</h3>
                <div className='d-flex justify-content-between align-items-center'>
                    <div style={{ height: "100px", width: "120px" }} className='shadow p-3 mb-5 bg-white rounded p-3'>
                        {dataRes.newUnits}
                        <p className='fs-6 text-warning'># new Units</p>
                    </div>
                    <div style={{ height: "100px", width: "120px" }} className='shadow p-3 mb-5 bg-white rounded p-3'>
                        ${dataRes.newUnitsMSRP}
                        <p className='fs-6 text-warning'>New MSRP</p>
                    </div>
                    <div style={{ height: "100px", width: "120px" }} className='shadow p-3 mb-5 bg-white rounded p-3'>
                        ${dataRes.newAvgMSRP}
                        <p className='fs-6 text-warning'>New Avg MSRP</p>
                    </div>
                    <div style={{ height: "100px", width: "120px" }} className='shadow p-3 mb-5 bg-white rounded p-3'>
                        {dataRes.usedUnits}
                        <p className='fs-6 text-warning'># Used units</p>
                    </div>
                    <div style={{ height: "100px", width: "120px" }} className='shadow p-3 mb-5 bg-white rounded p-3'>
                        ${dataRes.usedUnitMSRP}
                        <p className='fs-6 text-warning'>Used MSRP</p>
                    </div>
                    <div style={{ height: "100px", width: "120px" }} className='shadow p-3 mb-5 bg-white rounded p-3'>
                        ${dataRes.usedAvgMSRP}
                        <p className='fs-6 text-warning'>Used Avg. MSRP</p>
                    </div>
                    <div style={{ height: "100px", width: "120px" }} className='shadow p-3 mb-5 bg-white rounded p-3'>
                        {dataRes.cpoUnits}
                        <p className='fs-6 text-warning'># CPO Units</p>
                    </div>
                    <div style={{ height: "100px", width: "120px" }} className='shadow p-3 mb-5 bg-white rounded p-3'>
                        ${dataRes.cpoMSRP}
                        <p className='fs-6 text-warning'>CPO MSRP</p>
                    </div>
                </div>
            </div> {/* Inventory info */}
        </>
    )

}

export default InventoryOverview
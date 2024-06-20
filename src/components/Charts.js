import { useEffect } from "react"
import Chart from "../Chart"

function Charts(props) {
    useEffect(() => {

    }, [props])
    return (
        <>
            <div>
                <span className='fs-6 my-3 me-2'>Inventory count</span>
                <button className='btn btn-primary' onClick={() => props.handleChange('new')} >New</button>
                <button className='btn btn-primary mx-2' onClick={() => props.handleChange('used')}>Used</button>
                <button className='btn btn-primary' onClick={() => props.handleChange('cpo')}>CPO</button>
                <div className='mt-4'>
                    <Chart data={props.data} id="chartdiv"></Chart>
                </div>
            </div> {/*Inventory count */}

            <div>
                <span className='fs-6 my-3 me-2'>Inventory count</span>
                <button className='btn btn-primary' onClick={() => props.handleChange('new')} >New</button>
                <button className='btn btn-primary mx-2' onClick={() => props.handleChange('used')}>Used</button>
                <button className='btn btn-primary' onClick={() => props.handleChange('cpo')}>CPO</button>
                <div className="mt-4">
                    <Chart data={props.data} id="chartdiv2"></Chart>
                </div>
            </div>
        </>
    )
}

export default Charts